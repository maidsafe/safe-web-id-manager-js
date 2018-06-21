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
            // bookmarks : []
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
    //
    // describe( 'render() with one tab', () =>
    // {
    //     beforeEach( () =>
    //     {
    //         props = { ...props, bookmarks: [{ url: 'hello', isActiveTab: true }] };
    //         wrapper = shallow( <Avatar { ...props } /> );
    //     } );
    //
    //     it( 'should have a peruse__page class', () =>
    //     {
    //         expect( wrapper.find( `.${CLASSES.PERUSE_PAGE}` ).length ).toBe( 1 );
    //     } );
    //
    //     it( 'should have one url list', () =>
    //     {
    //         expect( wrapper.find( UrlList ).length ).toBe( 1 );
    //     } );
    //
    //     it( 'should have one link', () =>
    //     {
    //         wrapper = mount( <Avatar { ...props } /> );
    //         expect( wrapper.find( 'a' ).length ).toBe( 1 );
    //     } );
    //
    // } );
    //
    //
    // describe( 'props', () =>
    // {
    //     describe( 'tabs', () =>
    //     {
    //         it( 'tabs length should be "0" by default', () =>
    //         {
    //             expect( instance.props.bookmarks.length ).toBe( 0 );
    //         } );
    //     } );
    // } );
} );
