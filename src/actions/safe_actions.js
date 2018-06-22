import { createActions } from 'redux-actions';
import {APP_INFO} from '../constants';

export const TYPES = {
    SAFE_AUTHORISE : 'SAFE_AUTHORISE'
};


export const {
    safeAuthorise
    // , removeBookmark

} = createActions( {
    [TYPES.SAFE_AUTHORISE] : async () =>
    {
        // console.log(window.name)
        if( window.name ) return; // jest short circuit

        if ( !safe )
        {
            throw new Error( 'SAFE APIs are missing' );
        }

        console.log( 'appinfo', APP_INFO )
        try {

            const app = await safe.initialiseApp( APP_INFO.info );

            console.log( 'app itself', app )
            const authUri = await app.auth.genAuthUri( APP_INFO.permissions, APP_INFO.opts );

            console.log('uathiijdiui', authUri)

            let response = await safe.authorise( authUri );
            console.log('authorised the app', response, app);

            let connectedApp = await app.auth.loginFromUri( response );

            return { idApp : connectedApp };

        } catch (e) {
            console.log('eeeeee', e)
        }


        console.log( 'attempting connect...' );
    }
} );
