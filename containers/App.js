import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import Weather from './Weather';
import Settings from './Settings';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    backgroundColor: #F5FCFF;
    padding: 40
`;

const App = () => (
  <NativeRouter>
    <Container>
      <View>
        <Link to="/" underlayColor="#f0f4f7">
          <Text>Settings</Text>
        </Link>
        <Link to="/settings" underlayColor="#f0f4f7">
          <Text>Weather</Text>
        </Link>
      </View>

      <Route exact path="/settings" component={Settings} />
      <Route exact path="/" component={Weather} />
    </Container>
  </NativeRouter>
);

export default App;
