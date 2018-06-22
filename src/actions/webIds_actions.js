import { createActions } from 'redux-actions';

export const TYPES = {
    SET_AVAILABLE_WEB_IDS : 'SET_AVAILABLE_WEB_IDS'
};

export const {
    setAvailableWebIds
    // , removeBookmark

} = createActions( TYPES.SET_AVAILABLE_WEB_IDS );
