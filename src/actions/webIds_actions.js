import { createActions } from 'redux-actions';

export const TYPES = {
    ADD_WEB_ID            : 'ADD_WEB_ID',
    UPDATE_WEB_ID         : 'UPDATE_WEB_ID',
    SET_AVAILABLE_WEB_IDS : 'SET_AVAILABLE_WEB_IDS'
};

export const {
    addWebId,
    updateWebId,
    setAvailableWebIds
} = createActions( {

    [TYPES.ADD_WEB_ID] : ( payload ) =>

        ( { ...payload, id: Math.random().toString( 32 ) } ), // fakexor
    [TYPES.UPDATE_WEB_ID] : ( payload ) =>
        payload,
    [TYPES.SET_AVAILABLE_WEB_IDS] : ( payload ) =>
        payload,
} );
