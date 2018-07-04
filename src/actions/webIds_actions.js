import { createActions } from 'redux-actions';
// import {message} from 'antd';
import { SAFE_CONSTANTS } from '../constants';

export const TYPES = {
    ADD_WEB_ID            : 'ADD_WEB_ID',
    UPDATE_WEB_ID         : 'UPDATE_WEB_ID',
    GET_AVAILABLE_WEB_IDS : 'GET_AVAILABLE_WEB_IDS',
    GET_WEB_ID            : 'GET_WEB_ID'
};

const TYPE_TAG = 16048;

const sanitizePayload = ( payload ) =>
{
    const newWebId = {};

    // sanitize for webid rdf for now.
    Object.keys( payload.webId ).forEach( key =>
    {
        if ( payload.webId[key] && payload.webId[key].length > 0 )
        {
            newWebId[key] = payload.webId[key];
        }
    } );

    return newWebId;
};


export const {
    addWebId,
    updateWebId,
    getWebId,
    getAvailableWebIds
} = createActions( {

    [TYPES.ADD_WEB_ID] : async ( payload ) =>
    {
        const newWebId = sanitizePayload( payload );

        if ( window.name ) return newWebId; // jest short circuit

        const { idApp, history } = payload;

        try
        {
            const md = await idApp.mutableData.newRandomPublic( TYPE_TAG );
            await md.quickSetup( {} );

            const webId = await md.emulateAs( 'WebID' );
            await webId.create( newWebId, newWebId.nickname );

            console.log( 'WebId created on the network.' );
            history.push( '/' ); // back to main page

            return newWebId;

            // message.success( 'WebId created on the network.' );
        }
        catch ( e )
        {
            console.log( 'Error in addWebId', e );
        }
    },
    [TYPES.UPDATE_WEB_ID] : async ( payload ) =>
    {
        const updatedWebId = sanitizePayload( payload );


        const { idApp, webId } = payload;

        if ( window.name ) return webId; // jest short circuit

        try
        {


            // const md = await idApp.mutableData.newRandomPublic( TYPE_TAG );
            // await md.quickSetup({});
            // const webId = await md.emulateAs('WebID');
            // await webId.create(profile);
            //
            // profile.name = 'Gabriel Updated';
            // await webId.update(profile);
            //
            // await md.quickSetup({});
            //
            // const webId = await md.emulateAs( 'WebID' );
            // await webId.create( updatedWebId );
            //
            // console.log( 'WebId created on the network.' );
            // message.success( 'WebId created on the network.' );
        }
        catch ( e )
        {
            console.log( 'error in updateWebId', e );
        }

        return updatedWebId;
    },
    [TYPES.GET_WEB_ID] : async ( payload ) =>
    {
        console.log( 'GetWebId action.' );
        const { idApp, webId } = payload;
        console.log( 'gottt WebId.', webId );

        if ( window.name ) return { ...webId }; // jest short circuit

        const targetXorName = webId.xorName;
        const targetTypeTag = parseInt( webId.typeTag );
        // TODO: Helper this function upppp
        const newMd = await idApp.mutableData.newPublic( targetXorName, targetTypeTag );
        const fetchedWebId = await newMd.emulateAs( 'WebID' );
        await fetchedWebId.fetchContent();
        const serialised = await fetchedWebId.serialise( 'application/ld+json' );

        console.log( 'GOT WEBIDDDD', serialised );

        return serialised;
    },
    [TYPES.GET_AVAILABLE_WEB_IDS] : async ( payload ) =>
    {
        console.log( 'Getting available ids' );
        const { idApp } = payload;

        if ( window.name ) return []; // jest short circuit

        const webIds = await idApp.web.getWebIds( );

        return webIds;
    }
} );
