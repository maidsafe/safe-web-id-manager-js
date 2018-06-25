import { TYPES } from '../actions/safe_actions';

export const initialState = {
}

export default ( state = initialState, action ) =>
{
    const { payload } = action;

    switch ( action.type )
    {
        case TYPES.SAFE_AUTHORISE: {
            return { ...state, ...payload };
        }
        // from browser not needed
        // case TYPES.SET_SELECTED_WEB_ID: {
        //     const selectedId = payload;
        // }

        default: {
            return state;
        }
    }
};
