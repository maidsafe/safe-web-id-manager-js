import { createActions } from 'redux-actions';
// import {message} from 'antd';

export const TYPES = {
    ADD_WEB_ID            : 'ADD_WEB_ID',
    UPDATE_WEB_ID         : 'UPDATE_WEB_ID',
    SET_AVAILABLE_WEB_IDS : 'SET_AVAILABLE_WEB_IDS'
};

const TYPE_TAG = 16048;

export const {
    addWebId,
    updateWebId,
    setAvailableWebIds
} = createActions( {

    [TYPES.ADD_WEB_ID] : async ( payload ) =>
    {
        const newWebId = {};

        //sanitize for webid rdf for now.
        Object.keys( payload.webId ).forEach( key =>
        {
            if( payload.webId[key] )
            {
                newWebId[key] = payload.webId[key];
            }
        })

        if ( window.name ) return newWebId; // jest short circuit

        const { idApp } = payload;

        try{

            const md = await idApp.mutableData.newRandomPublic( TYPE_TAG );
            await md.quickSetup({});

            const webId = await md.emulateAs( 'WebID' );
            await webId.create( newWebId );

            console.log( 'WebId created on the network.' );
            // message.success( 'WebId created on the network.' );
        }
        catch( e )
        {
            console.log('errror in addWebId', e);
        }
    },
    [TYPES.UPDATE_WEB_ID] : ( payload ) =>
        payload,
    [TYPES.SET_AVAILABLE_WEB_IDS] : ( payload ) =>
        payload,
} );
