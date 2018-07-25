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
            match : { url: '/editor/lala.lalala' },
            updateWebId : jest.fn(),
            webIds : [{
                nick: 'josh',
                uri: 'lala.lalala'
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
            props = { ...props, match: { url: '/editor/josh'} };
            wrapper = mount( <Editor { ...props } />);
        } );

        it( 'should not have idForm if no name given', () =>
        {
            expect( wrapper.find( 'IdForm' ).length ).toBe( 0 );
        } );

        it( 'should have idForm if id given', () =>
        {
            const testProps = { ...props };
            testProps.match.params = { id: 'lala.lalala' }

            wrapper = mount(
                 // <MemoryRouter initialEntries={ ['/','editor','josh']} initialIndex={0}   >
                    <Editor  {...testProps} />
                 // </MemoryRouter>
                         );

            expect( wrapper.find( 'IdForm' ).length ).toBe( 1 );
        } );
    } );

} );
