import { createActions } from 'redux-actions';

export const TYPES = {
    SET_CURRENT_SCHEMA : 'SET_CURRENT_SCHEMA'
};

export const {
    setCurrentSchema
    // , removeBookmark

} = createActions( TYPES.SET_CURRENT_SCHEMA );
