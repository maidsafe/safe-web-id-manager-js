import { createActions } from 'redux-actions';
import { APP_INFO } from '../constants/index.js';

export const TYPES = {
    SAFE_AUTHORISE : 'SAFE_AUTHORISE'
};


export const {
    safeAuthorise
    // , removeBookmark

} = createActions( {
    [TYPES.SAFE_AUTHORISE] : async () =>
    {
        if ( !safe )
        {
            throw new Error('SAFE APIs are missing')
        }

        // try{
        //     // safe.initialiseApp( APP_INFO )
        // }

        console.log( 'attempting connect...' );
    }
} );
