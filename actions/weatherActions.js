import fetch from 'fetch-everywhere';
import moment from 'moment';
import { Location, Permissions } from 'expo';
import * as frontendActions from './frontendActions';
import * as types from './actionTypes';
import keys from '../constants';

export const fetchData = () => {
  return dispatch => {
    dispatch(frontendActions.checkIsFetching());
    dispatch(fetchPhoneLocation());
  };
};

/**
 * FETCH_PHONE_LOCATION
 */

export const receivePhoneLocation = ({ latitude, longitude }) => ({
  type: types.RECEIVE_PHONE_LOCATION,
  payload: {
    latitude,
    longitude
  }
});

const fetchPhoneLocation = () => {
  return async dispatch => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== 'granted') {
        console.error('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Alright! Now we know where we are, lets fire off a bunch of xhr
      // requests to fetch the data we need
      dispatch(receivePhoneLocation({ latitude, longitude }));
      dispatch(fetchOldWeather({ latitude, longitude }));
      dispatch(fetchCurrentWeather({ latitude, longitude }));
      dispatch(fetchCityName({ latitude, longitude }));
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * FETCH_CURRENT_WEATHER
 */

const fetchCurrentWeather = ({ latitude, longitude }) => {
  return async (dispatch, getState) => {
    try {
      const { unitType } = getState().settings;
      const response = await fetch(
        `https://api.darksky.net/forecast/${keys.darksky}/${latitude},${longitude}?units=${unitType}`
      );
      const json = await response.json();

      dispatch(receiveCurrentWeather(json.daily.data[0]));
      dispatch(frontendActions.checkIsFetching());
    } catch (error) {
      console.error(error);
    }
  };
};

export const receiveCurrentWeather = weather => ({
  type: types.RECEIVE_CURRENT_WEATHER,
  payload: weather
});

/**
 * FETCH_OLD_WEATHER
 */

const fetchOldWeather = ({ latitude, longitude }) => {
  return async (dispatch, getState) => {
    try {
      const { unitType } = getState().settings;
      const oneYearAgo = moment().subtract(1, 'year').unix();
      const response = await fetch(
        `https://api.darksky.net/forecast/${keys.darksky}/${latitude},${longitude},${oneYearAgo}?units=${unitType}`
      );
      const json = await response.json();

      dispatch(receiveOldWeather(json.daily.data[0]));
      dispatch(frontendActions.checkIsFetching());
    } catch (error) {
      console.error(error);
    }
  };
};
export const receiveOldWeather = weather => ({
  type: types.RECEIVE_OLD_WEATHER,
  payload: weather
});

/**
 * FETCH_CITY_NAME
 */

const fetchCityName = ({ latitude, longitude }) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${keys.google}`
      );

      const json = await response.json();
      const city = json.results[0].address_components.find(addr => {
        return addr.types[0] === 'locality'
          ? 1
          : addr.types[0] === 'administrative_area_level_1' ? 1 : 0;
      });

      dispatch(receiveCityName(city.long_name));
      dispatch(frontendActions.checkIsFetching());
    } catch (error) {
      console.error(error);
    }
  };
};

export const receiveCityName = city => ({
  type: types.RECEIVE_CITY_NAME,
  payload: city
});
