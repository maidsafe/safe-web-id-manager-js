import { createActions } from 'redux-actions';
import { message } from 'antd';
import { SAFE_CONSTANTS } from '../constants';

export const TYPES = {
    ADD_WEB_ID            : 'ADD_WEB_ID',
    UPDATE_WEB_ID         : 'UPDATE_WEB_ID',
    GET_AVAILABLE_WEB_IDS : 'GET_AVAILABLE_WEB_IDS',
    GET_WEB_ID            : 'GET_WEB_ID'
};

const TYPE_TAG = 16048;

const sanitizeWebId = ( webId ) =>
{
    const newWebId = {};

    // sanitize for webid rdf for now.
    Object.keys( webId ).forEach( key =>
    {
        if ( webId[key] && typeof webId[key] !== 'undefined' )
        {
            newWebId[key] = webId[key];
            if ( typeof newWebId[key] === 'string' )
            {
                newWebId[key] = webId[key].trim();
            }

            if ( key === 'uri' || key === 'website' )
            {
                newWebId[key] = `safe://${newWebId[key]}`;
            }
        }
    } );
    console.log( 'post sanitizing', newWebId );

    return newWebId;
};


export const {
    addWebId,
    updateWebId,
    // getWebId,
    getAvailableWebIds
} = createActions( {

    [TYPES.ADD_WEB_ID] : async ( payload ) =>
    {
        const { idApp, history, webId } = payload;

        if ( !idApp ) throw new Error( 'No idApp provided to action' );

        const newWebId = sanitizeWebId( webId );

        if ( window.name ) return newWebId; // jest short circuit

        try
        {
            const md = await idApp.mutableData.newRandomPublic( TYPE_TAG );
            await md.quickSetup( {} );
            const webIdRDF = await md.emulateAs( 'WebID' );
            await webIdRDF.create( newWebId, newWebId.nick );
        }
        catch ( e )
        {
            if( e && e.message === 'No ID has been found in the RDF graph.' )
            {
                message.error( 'This publicName already exists (created by another app). You can\'t make a webId here, sorry! ' );
                return {};
            }

            console.error( 'Error in addWebId', e );
            message.error( 'Error creating webId on the network' );
            return {};
        }
        message.success( 'WebId created succesfully' );

        console.log( 'WebId created on the network.' );
        history.push( '/' ); // back to main page
        return newWebId;
    },
    [TYPES.UPDATE_WEB_ID] : async ( payload ) =>
    {
        const { idApp, webId, history } = payload;

        if ( !idApp ) throw new Error( 'No idApp provided to update action' );

        const newWebId = sanitizeWebId( webId );

        if ( window.name ) return newWebId; // jest short circuit

        try
        {
            const mdUri = newWebId.uri;

            const { serviceMd, type, path } = await idApp.fetch( mdUri );

            let pulledWebId;
            if ( type === 'RDF' )
            {
                pulledWebId = await serviceMd.emulateAs( 'WebID' );
                await pulledWebId.fetchContent();
            }
            await pulledWebId.update( newWebId );
        }
        catch ( e )
        {
            console.error( 'Error in updateWebId', e );
            message.error( 'Error updating webID on the network' );
            return e;
        }

        console.log( 'WebId updated on the network.', history );
        message.success( 'WebId updated successfully' );

        // why is this undefined? poush to newnickname....
        history.push( '/' ); // back to main page
        return newWebId;
    },
    [TYPES.GET_AVAILABLE_WEB_IDS] : async ( payload ) =>
    {
        console.log( 'Getting available ids' );
        const { idApp } = payload;

        if ( window.name ) return []; // jest short circuit

        const webIds = await idApp.web.getWebIds( );

        const actualIds = webIds.map( webId =>
        {
            const me = webId['#me'];

            // remove what is appended later
            me.uri = webId['@id'].replace( 'safe://', '' );

            if ( me.website )
            {
                me.website = me.website.replace( 'safe://', '' );
            }

            return me;
        } );
        return actualIds;
    }
} );
