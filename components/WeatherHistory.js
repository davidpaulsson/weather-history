// @flow

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import moment from 'moment';
import keys from '../constants';

const WeatherHistory = () => {
  return <Text>This is the WeatherHistory view</Text>;
};

export default WeatherHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 40
  },
  text: {
    textAlign: 'center',
    color: '#333333'
  },
  textCurrent: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20
  }
});
