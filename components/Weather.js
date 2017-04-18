import React from 'react';
import { View, StatusBar } from 'react-native';
import Expo from 'expo';
import moment from 'moment';

import TransparentText from './TransparentText';

const { LinearGradient } = Expo;

const WeatherHistory = ({
  // currentTemperatureMax,
  // currentTemperatureMin,
  // currentWeatherSummary,
  oldTemperatureMax,
  oldTemperatureMin,
  oldWeatherSummary,
  city
}) => (
  <LinearGradient
    colors={['#182330', '#334a83', '#a27df8']}
    style={{
      flex: 1,
      flexDirection: 'column'
    }}
  >
    <StatusBar hidden={true} />
    <View style={{ padding: 30 }}>
      <TransparentText text={city} style={{ fontSize: 22 }} />
      <TransparentText
        text={moment().subtract(1, 'year').format('LL')}
        style={{ fontSize: 28 }}
      />
    </View>
    <View style={{ flex: 1, justifyContent: 'center', padding: 30 }}>
      <TransparentText text="It was" style={{ opacity: 0.6 }} />
      <TransparentText text={`${Math.round(oldTemperatureMax)} degrees and`} />
      <TransparentText text={oldWeatherSummary} />
    </View>
    <View
      style={{
        flexDirection: 'row',
        padding: 30
      }}
    >
      <View style={{ flex: 1 }}>
        <TransparentText text="Temp" style={{ fontSize: 18 }} />
        <TransparentText
          text={`${Math.round(oldTemperatureMax)}°/${Math.round(oldTemperatureMin)}°`}
          style={{ fontSize: 24 }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <TransparentText text="Humidity" style={{ fontSize: 18 }} />
        <TransparentText text="65%" style={{ fontSize: 24 }} />
      </View>
      <View style={{ flex: 1 }}>
        <TransparentText text="Wind" style={{ fontSize: 18 }} />
        <TransparentText text="NW 6 MPS" style={{ fontSize: 24 }} />
      </View>
    </View>
  </LinearGradient>
);

export default WeatherHistory;
