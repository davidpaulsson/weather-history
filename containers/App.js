import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NativeRouter, Route, Link, Switch } from 'react-router-native';
import Weather from './Weather';
import Settings from './Settings';

const App = () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/" component={Weather} />
    </Switch>
  </NativeRouter>
);

export default App;
