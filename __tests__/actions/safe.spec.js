import * as safe from 'actions/safe_actions';
import toBeType from 'jest-tobetype';

expect.extend( toBeType );

describe( 'safe actions', () =>
{
    it( 'should have types', () =>
    {
        expect( safe.TYPES ).toBeDefined();
    } );

    it( 'should authorise app', () =>
    {
        expect.assertions( 2 );

        const expectedAction = {
            type : safe.TYPES.SAFE_AUTHORISE,
        };
        expect( safe.safeAuthorise( ) ).toMatchObject( expectedAction );
        expect( safe.safeAuthorise( ).payload ).toBeType( 'object' ); // although is specifically a promise...
    } );
} );
