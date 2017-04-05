import Expo from 'expo';
import React, { Component } from 'react';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { NativeRouter, Route } from 'react-router';

import * as reducers from './reducers';
import App from './containers/App';

const createStoreWithMiddleware = applyMiddleware(thunk, createLogger())(
  createStore
);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Main;

Expo.registerRootComponent(Main);
