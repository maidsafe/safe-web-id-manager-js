import { combineReducers } from 'redux';
import webIds from './webIds_reducer';
import safe from './safe_reducer';

// Add your new reducer here
const reducers = {
    safe,
    webIds
};

const rootReducer = combineReducers( reducers );

export default rootReducer;
