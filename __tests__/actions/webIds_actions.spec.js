import * as webIdsActions from 'actions/webIds_actions';
import toBeType from 'jest-tobetype';

expect.extend( toBeType );

describe( 'webIds actions', () =>
{
    it( 'should have types', () =>
    {
        expect( webIdsActions.TYPES ).toBeDefined();
    } );

    it( 'should add ADD_WEB_ID', async () =>
    {
        expect.assertions(3);

        const payload = {
            webId: {
                name : 'testerton'
            }
        };

        const expectedAction = {
            type : webIdsActions.TYPES.ADD_WEB_ID
        };

        const res = webIdsActions.addWebId( payload )
        const resultPayload = await res.payload;

        expect( res ).toMatchObject( expectedAction );
        expect( resultPayload ).not.toHaveProperty( 'idApp' );
        expect( resultPayload ).toEqual( payload.webId );
    } );

    it( 'should update UDPATE_WEB_ID', () =>
    {
        const payload = {
            name : 'testerton',
            id   : 6
        };
        const expectedAction = {
            type : webIdsActions.TYPES.UPDATE_WEB_ID,
            payload
        };
        expect( webIdsActions.updateWebId( payload ) ).toMatchObject( expectedAction );
    } );

    it( 'should add SET_AVAILABLE_WEB_IDS', () =>
    {
        const payload = [{ name: 'woo' }];
        const expectedAction = {
            type : webIdsActions.TYPES.SET_AVAILABLE_WEB_IDS,
            payload
        };
        expect( webIdsActions.setAvailableWebIds( payload ) ).toMatchObject( expectedAction );
    } );
} );
