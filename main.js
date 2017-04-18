import Expo, { Font } from 'expo';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { NativeRouter, Route } from 'react-router';
import CenterCenter from './components/CenterCenter';
import * as reducers from './reducers';
import App from './containers/App';

const createStoreWithMiddleware = applyMiddleware(thunk, createLogger())(
  createStore
);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

class Main extends Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'din-engschrift-std': require('./assets/fonts/DINEngschriftStd.ttf')
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    if (!this.state.fontLoaded) {
      return <CenterCenter><Text>Loading...</Text></CenterCenter>;
    } else {
      return (
        <Provider store={store}>
          <App />
        </Provider>
      );
    }
  }
}

export default Main;

Expo.registerRootComponent(Main);
