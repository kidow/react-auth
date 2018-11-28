import React from 'react';
import ReactDOM from 'react-dom';
import 'lib/styles/index.scss'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import socket from 'lib/socket'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './store'
import { composeWithDevTools } from 'redux-devtools-extension'
import penderMiddleware from 'redux-pender'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(penderMiddleware())))

const socketURI = 
  process.env.NODE_ENV === 'production'
    ? ((window.location.protocol === "https:") ? "wss://" : "ws//") + window.location.href + "/ws"
    : 'ws://localhost:4000/ws'

socket.initialize(store, socketURI)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path='/' component={App}/>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
