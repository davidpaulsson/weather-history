// @flow

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import moment from 'moment';
import keys from '../constants';

export default class WeatherHistory extends Component {
  state: {
    location: object,
    city: string,
    currentWeather: object,
    oldWeather: object,
    oneYearAgo: number,
    errorMessage: string,
    unitType: string
  };

  constructor(props) {
    super(props);
    this.state = {
      location: null,
      city: null,
      currentWeather: null,
      oldWeather: null,
      oneYearAgo: moment().subtract(1, 'year').unix(),
      errorMessage: null,
      unitType: 'si'
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this.getLocation();
    }
  }

  getLocation = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied'
        });
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('getLocation()', location);

      this.setState({ location });
      this.getCityName();
      this.getCurrentWeather();
      this.getOldWeather();
    } catch (err) {
      console.error(err);
    }
  };

  getCityName = async () => {
    try {
      const { location } = this.state;
      const { latitude, longitude } = location.coords;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${keys.google}`
      );

      const json = await response.json();
      console.log('getCityName()', json);
      const city = json.results[0].address_components.find(addr => {
        return addr.types[0] === 'locality'
          ? 1
          : addr.types[0] === 'administrative_area_level_1' ? 1 : 0;
      });

      this.setState({ city: city.long_name });
    } catch (err) {
      console.error(err);
    }
  };

  getCurrentWeather = async () => {
    try {
      const { location, oneYearAgo, unitType } = this.state;
      const { latitude, longitude } = location.coords;
      const response = await fetch(
        `https://api.darksky.net/forecast/${keys.darksky}/${latitude},${longitude}?units=${unitType}`
      );

      const json = await response.json();
      console.log('getCurrentWeather()', json);

      this.setState({ currentWeather: json.daily.data[0] });
    } catch (err) {
      console.log(err);
    }
  };

  getOldWeather = async () => {
    try {
      const { location, oneYearAgo, unitType } = this.state;
      const { latitude, longitude } = location.coords;
      const response = await fetch(
        `https://api.darksky.net/forecast/${keys.darksky}/${latitude},${longitude},${oneYearAgo}?units=${unitType}`
      );

      const json = await response.json();
      console.log('getOldWeather()', json);

      this.setState({ oldWeather: json.daily.data[0] });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (this.state.errorMessage) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>{this.state.errorMessage}</Text>
        </View>
      );
    }

    console.log(this.state);

    if (this.state.currentWeather && this.state.city) {
      let maxTemp: number = Math.round(
        this.state.currentWeather.temperatureMax
      );
      let minTemp: number = Math.round(
        this.state.currentWeather.temperatureMin
      );

      let description: string = this.state.currentWeather.summary;
      currentWeatherString = `The temperature in ${this.state.city} today is ${maxTemp}\xA0°C (max) & ${minTemp}\xA0°C (min) and ${description.toLowerCase()}`;
    }

    if (this.state.oldWeather && this.state.city) {
      let date: string = moment.unix(this.state.oneYearAgo).format('LL');
      let maxTemp: number = Math.round(this.state.oldWeather.temperatureMax);
      let minTemp: number = Math.round(this.state.oldWeather.temperatureMin);

      let description: string = this.state.oldWeather.summary;
      weatherString = `The temperature in ${this.state.city} on ${date} was ${maxTemp}\xA0°C (max) & ${minTemp}\xA0°C (min) and it was ${description.toLowerCase()}`;
    }

    return (
      <View style={styles.container}>
        {this.state.currentWeather && this.state.city
          ? <Text style={styles.textCurrent}>
              {currentWeatherString}
            </Text>
          : <Text style={styles.text}>Loading...</Text>}

        {this.state.oldWeather && this.state.city
          ? <Text style={styles.text}>
              {weatherString}
            </Text>
          : <Text style={styles.text}>Loading...</Text>}
      </View>
    );
  }
}

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
