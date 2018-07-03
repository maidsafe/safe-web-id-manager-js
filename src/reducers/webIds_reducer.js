import { TYPES } from '../actions/webIds_actions';

export const initialState = [
    {
        name    : 'Josh1',
        avatar  : 'base6444',
        inbox   : {},
        website : 'safe://some.tester',
        pk      : ''
    },
    {
        name    : 'Gab',
        avatar  : 'base6444',
        inbox   : {},
        website : 'safe://lallalaa',
        pk      : ''
    }
];

export default ( state = initialState, action ) =>
{
    const { payload } = action;
    switch ( action.type )
    {
        case TYPES.ADD_WEB_ID:
        {
            return [...state, payload];
        }
        case TYPES.UPDATE_WEB_ID:
        {
            const oldIdIndex = state.findIndex( webId => webId.id === payload.id );
            const oldId = state[oldIdIndex];
            const updatedId = { ...oldId, ...payload };

            const newState = [ ...state ];

            newState[oldIdIndex] = updatedId;
            return newState;
        }
        case TYPES.GET_AVAILABLE_WEB_IDS: {
            return [ ...payload ];
        }
        // from browser not needed
        // case TYPES.SET_SELECTED_WEB_ID: {
        //     const selectedId = payload;
        // }

        default:
            return state;
    }
};
