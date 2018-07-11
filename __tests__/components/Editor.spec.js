import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Editor from 'components/Editor/Editor';

describe( 'Editor', () =>
{
    let wrapper;
    let instance;
    let props;

    beforeEach( () =>
    {
        props = {
            match : { url: '/editor/josh' },
            updateWebId : jest.fn(),
            webIds : [{
                nick: 'josh',
                uri: 'safe://lalala'
            }]
        };

        wrapper = shallow( <Editor { ...props } /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        it( 'should have name Editor', () =>
        {
            expect( instance.constructor.name ).toBe( 'Editor' );
        } );
    } );

    describe( 'render()', () =>
    {
        beforeEach( () =>
        {
            // props = { ...props };

            wrapper = mount( <MemoryRouter initialEntries={ ['/edit/josh'] } >
            <Editor { ...props } />
        </MemoryRouter>);
        } );

        // it( 'should have idForm ', () =>
        // {
        //     expect( wrapper.find( 'IdForm' ).length ).toBe( 1 );
        // } );

        // it.only( 'should have idForm if name given', () =>
        // {
        //     props = { ...props, match: { url: 'editor/name'} };
        //
        //     wrapper = mount(
        //          <MemoryRouter initialEntries={ ['editor/name'] } initialIndex={0}  >
        //             <Editor  />
        //          </MemoryRouter>
        //                  );
        //
        //     expect( wrapper.find( 'IdForm' ).length ).toBe( 1 );
        // } );
    } );

} );
