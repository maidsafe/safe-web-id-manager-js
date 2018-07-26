import { createActions } from 'redux-actions';
import { APP_INFO } from '../constants';
import {message} from 'antd';

export const TYPES = {
    SAFE_AUTHORISE : 'SAFE_AUTHORISE'
};


export const {
    safeAuthorise
    // , removeBookmark

} = createActions( {
    [TYPES.SAFE_AUTHORISE] : async () =>
    {
        if ( window.name ) return; // jest short circuit

        if ( !safe )
        {
            throw new Error( 'SAFE APIs are missing' );
        }

        try
        {
            const app = await safe.initialiseApp( APP_INFO.info );
            const authUri = await app.auth.genAuthUri( APP_INFO.permissions, APP_INFO.opts );
            const response = await safe.authorise( authUri );
            const connectedApp = await app.auth.loginFromUri( response );

            return { idApp: connectedApp };
        }
        catch ( e )
        {
            message.error('Error authenticating on the network.')
            console.log( 'Error in auth attempt', e );
        }

        message.success('Authenticated successfully.')
    }
} );
