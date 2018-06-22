import { TYPES } from '../actions/webIds_actions';

const initialState = {
    connected: false
}

export default ( state = initialState, action ) =>
{
    const { payload } = action;

    switch ( action.type )
    {
        case TYPES.SET_AVAILABLE_WEB_IDS: {
            return payload;
        }
        // from browser not needed
        // case TYPES.SET_SELECTED_WEB_ID: {
        //     const selectedId = payload;
        // }

        default:
            return state;
    }
};
