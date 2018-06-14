import { TYPES } from '../actions/webIds_actions';

const initialState = [
    {
        name: 'Josh1',
        avatar : 'base6444',
        inbox: {},
        website: 'safe://some.tester',
        pk : ''
    },
    {
        name: 'Gab',
        avatar : 'base6444',
        inbox: {},
        website: 'safe://lallalaa',
        pk : ''
    }
]

export default ( state = initialState, action ) =>
{
    const { payload } = action;

    switch ( action.type )
    {
        case TYPES.SET_CURRENT_SCHEMA: {
        }

        default:
            return state;
    }
};
