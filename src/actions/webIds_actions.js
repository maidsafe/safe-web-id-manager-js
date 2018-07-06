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

const sanitizeWebId = ( webId ) =>
{
    console.log('sanitizing', webId)
    const newWebId = {};

    // sanitize for webid rdf for now.
    Object.keys( webId ).forEach( key =>
    {
        if ( webId[key] && webId[key].length > 0 )
        {
            newWebId[key] = webId[key];
        }
    } );

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

        if( !idApp ) throw new Error( 'No idApp provided to action' );

        const newWebId = sanitizeWebId( webId );

        if ( window.name ) return newWebId; // jest short circuit

        console.log('newWEbiddddd', newWebId, idApp )
        try
        {
            const md = await idApp.mutableData.newRandomPublic( TYPE_TAG );
            await md.quickSetup( {} );
            console.log('HEREWEARE', newWebId, newWebId.nick)
            const webId = await md.emulateAs( 'WebID' );
            await webId.create( newWebId, newWebId.nick );
            console.log('HEREWEARE 222222222')

            // message.success( 'WebId created on the network.' );
        }
        catch ( e )
        {
            console.log( 'Error in addWebId', e );
            return;
        }

        console.log( 'WebId created on the network.' );
        history.push( '/' ); // back to main page
        return newWebId;
    },
    [TYPES.UPDATE_WEB_ID] : async ( payload ) =>
    {
        const { idApp, webId } = payload;
        const updatedWebId = sanitizeWebId( webId );

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
    [TYPES.GET_AVAILABLE_WEB_IDS] : async ( payload ) =>
    {
        console.log( 'Getting available ids' );
        const { idApp } = payload;

        if ( window.name ) return []; // jest short circuit

        const webIds = await idApp.web.getWebIds( );

        return webIds;
    }
} );
