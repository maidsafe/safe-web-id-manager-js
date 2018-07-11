import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import App from 'containers/App';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

function configureStore( initialState )
{
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware( thunk )
    );
}

describe( 'App', () =>
{
    let wrapper;
    const initialEntries = ['/'];
    let props;

    beforeEach( () =>
    {
        window.safe = { initialiseApp: jest.fn() }

        const store = configureStore( {} );

        props = {
            store : configureStore( {} )
        };

        wrapper = mount( <MemoryRouter initialEntries={ initialEntries } initialIndex={ 0 } >
            <App { ...props } />
        </MemoryRouter> );
    } );


    describe( 'render()', () =>
    {
        it( 'should contain a Switch component', () =>
        {
            expect( wrapper.find( 'Switch' ).length ).toBe( 1 );
        } );


        it( 'should have a Header', () =>
        {
            props = { ...props };

            wrapper = mount( <MemoryRouter initialEntries={ ['/'] } >
                <App { ...props } />
            </MemoryRouter> );
            expect( wrapper.find( 'Header' ).length ).toBe( 1 );
        } );

    } );


    describe( '/', () =>
    {
        it( 'should have a List (as it redirects)', () =>
        {
            props = { ...props };

            wrapper = mount( <MemoryRouter initialEntries={ ['/'] } >
                <App { ...props } />
            </MemoryRouter> );
            expect( wrapper.find( 'List' ).length ).toBe( 1 );
        } );

        it( 'should have a no form', () =>
        {
            props = { ...props };

            wrapper = mount( <MemoryRouter initialEntries={ ['/'] } >
                <App { ...props } />
                             </MemoryRouter> );
            expect( wrapper.find( 'Editor' ).length ).toBe( 0 );
            expect( wrapper.find( 'IdForm' ).length ).toBe( 0 );
        } );
    } );


    describe( '/create', () =>
    {

        it( 'should have a form', () =>
        {
            props = { ...props };

            wrapper = mount( <MemoryRouter initialEntries={ ['/create/new'] } >
                <App { ...props } />
            </MemoryRouter> );
            expect( wrapper.find( 'Editor' ).length ).toBe( 0 );
            expect( wrapper.find( 'IdForm' ).length ).toBe( 1 );
        } );
    } );


    describe( '/edit/:name', () =>
    {

        it( 'should have idForm if name given', () =>
        {
            props = { ...props };
            props.store=  configureStore( { webIds : [ { nick: 'name' }]} )

            wrapper = mount( <MemoryRouter initialEntries={ ['/edit/name'] } >
                <App { ...props } />
                             </MemoryRouter> );
            expect( wrapper.find( 'Editor' ).length ).toBe( 1 );
            expect( wrapper.find( 'IdForm' ).length ).toBe( 1 );
        } );
    } );
} );
