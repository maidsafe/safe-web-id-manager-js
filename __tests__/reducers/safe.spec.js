import safeReducer, { initialState } from 'reducers/safe_reducer';
import { TYPES } from 'actions/safe_actions';



describe( 'safe reducer', () =>
{
    it( 'should return the initial state', () =>
    {
        expect( safeReducer( undefined, {} ) ).toEqual( initialState );
    } );

    describe( 'SAFE_AUTHORISE', () =>
    {
        it( 'should handle updating state with authed app', () =>
        {
            expect(
                safeReducer( undefined, {
                    type    : TYPES.SAFE_AUTHORISE,
                    payload: { connected: true } //fake payload
                } )
        ).toMatchObject( { connected: true } );
        } );
    } );

});
