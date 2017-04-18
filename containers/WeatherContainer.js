import React, { Component } from 'react';
import { Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as weatherActions from '../actions/weatherActions';
import Weather from '../components/Weather';
import CenterCenter from '../components/CenterCenter';

class WeatherContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.fetchData();
  }

  render() {
    if (this.props.loading) {
      return <CenterCenter><Text>Loading...</Text></CenterCenter>;
    } else {
      return <Weather {...this.props} />;
    }
  }
}

export default connect(
  state => {
    if (state.frontend.isFetching) {
      return {
        loading: true
      };
    } else {
      return {
        loading: false,
        city: state.weather.location.city,
        currentTemperatureMax: state.weather.currentWeather.temperatureMax,
        currentTemperatureMin: state.weather.currentWeather.temperatureMin,
        currentWeatherSummary: state.weather.currentWeather.summary,
        oldTemperatureMax: state.weather.oldWeather.temperatureMax,
        oldTemperatureMin: state.weather.oldWeather.temperatureMin,
        oldWeatherSummary: state.weather.oldWeather.summary
      };
    }
  },
  dispatch => ({
    actions: bindActionCreators(weatherActions, dispatch)
  })
)(WeatherContainer);
