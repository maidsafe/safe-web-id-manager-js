import { createActions } from 'redux-actions';
// import {message} from 'antd';
import { SAFE_CONSTANTS } from '../constants';

export const TYPES = {
    ADD_WEB_ID            : 'ADD_WEB_ID',
    UPDATE_WEB_ID         : 'UPDATE_WEB_ID',
    GET_AVAILABLE_WEB_IDS : 'GET_AVAILABLE_WEB_IDS'
};

const TYPE_TAG = 16048;

const sanitizePayload = ( payload ) =>
{
    const newWebId = {};

    // sanitize for webid rdf for now.
    Object.keys( payload.webId ).forEach( key =>
    {
        if ( payload.webId[key] )
        {
            newWebId[key] = payload.webId[key];
        }
    } );

    return newWebId;
};



export const {
    addWebId,
    updateWebId,
    getAvailableWebIds
} = createActions( {

    [TYPES.ADD_WEB_ID] : async ( payload ) =>
    {
        const newWebId = sanitizePayload( payload );

        if ( window.name ) return newWebId; // jest short circuit

        const { idApp } = payload;

        try
        {
            const md = await idApp.mutableData.newRandomPublic( TYPE_TAG );
            await md.quickSetup( {} );

            const webId = await md.emulateAs( 'WebID' );
            await webId.create( newWebId, newWebId.nickname );

            console.log( 'WebId created on the network.' );

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

        if ( window.name ) return updatedWebId; // jest short circuit

        const { idApp } = payload;

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
        const { idApp } = payload;
        let webIds;
        try{

            webIds = await idApp.web.getWebIds( );

            return webIds;
        }
        catch(e)
        {
            console.log('Error in getAvailableWebIds', e)
        }


        return []
    }
} );
