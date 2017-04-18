import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NativeRouter, Route, Link, Switch } from 'react-router-native';
import WeatherContainer from './WeatherContainer';
import SettingsContainer from './SettingsContainer';

const App = () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/settings" component={SettingsContainer} />
      <Route exact path="/" component={WeatherContainer} />
    </Switch>
  </NativeRouter>
);

export default App;
