import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import moment from 'moment';
import keys from '../constants';
import CenterCenter from './CenterCenter';

const WeatherHistory = (
  {
    currentTemperatureMax,
    currentTemperatureMin,
    currentWeatherSummary,
    oldTemperatureMax,
    oldTemperatureMin,
    oldWeatherSummary
  }
) => {
  return (
    <View>
      <CenterCenter>
        <Text>Current weather</Text>
        <Text>{Math.round(currentTemperatureMax)} °C(max)</Text>
        <Text>{Math.round(currentTemperatureMin)} °C(min)</Text>
        <Text>{currentWeatherSummary}</Text>
      </CenterCenter>
      <CenterCenter>
        <Text>Last years weather</Text>
        <Text>{Math.round(oldTemperatureMax)} °C(max)</Text>
        <Text>{Math.round(oldTemperatureMin)} °C(min)</Text>
        <Text>{oldWeatherSummary}</Text>
      </CenterCenter>
    </View>
  );
};

export default WeatherHistory;
