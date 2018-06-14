import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './containers/App';
import rootReducer from './reducers';


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
