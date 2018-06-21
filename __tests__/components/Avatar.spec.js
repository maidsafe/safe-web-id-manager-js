import React from 'react';
import { shallow } from 'enzyme';

import Avatar from 'components/Avatar/Avatar';

describe( 'Avatar', () =>
{
    let wrapper;
    let instance;
    let props;

    beforeEach( () =>
    {
        props = {
        };

        wrapper = shallow( <Avatar { ...props } /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        it( 'should have name Avatar', () =>
        {
            expect( instance.constructor.name ).toBe( 'Avatar' );
        } );
    } );


    describe( 'render()', () =>
    {
        beforeEach( () =>
        {
            props = { ...props };
            wrapper = shallow( <Avatar { ...props } /> );
        } );

        it( 'should contain an Upload component', () =>
        {
            expect( wrapper.find( 'Upload' ).length ).toBe( 1 );
        } );

    } );

} );
