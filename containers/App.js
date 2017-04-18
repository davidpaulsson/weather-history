import React from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';
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
