import { combineReducers } from 'redux';
import webIds from './webIds_reducer';

// Add your new reducer here
const reducers = {
    webIds
};

const rootReducer = combineReducers( reducers );

export default rootReducer;
