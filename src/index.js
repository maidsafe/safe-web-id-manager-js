import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './containers/App';
import rootReducer from './reducers';

if( window.webIdEventEmitter )
{
    console.log('webId emitter exists!');

    window.webIdEventEmitter.on( 'update', ( webId ) =>
    {
        console.log('WebId has been updated (though not sure what to do with it...)', webId );
    })
}

function configureStore( initialState )
{
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware( thunk )
    );
}

const store = configureStore( {} );

const reactRoot = document.getElementById( 'react-root' );

render(
    <BrowserRouter>
        <App store={ store } />
    </BrowserRouter>
    ,
    reactRoot
);
