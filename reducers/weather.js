import * as types from '../actions/actionTypes';

export default function settings(
  state = {
    location: {
      city: null,
      longitude: null,
      latitude: null
    },
    currentWeather: null,
    oldWeather: null
  },
  action = {}
) {
  switch (action.type) {
    case types.RECEIVE_PHONE_LOCATION:
      return {
        ...state,
        location: {
          ...state.location,
          ...action.payload
        }
      };
    case types.RECEIVE_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload
      };
    case types.RECEIVE_OLD_WEATHER:
      return {
        ...state,
        oldWeather: action.payload
      };
    case types.RECEIVE_CITY_NAME:
      return {
        ...state,
        location: {
          ...state.location,
          city: action.payload
        }
      };
    default:
      return state;
  }
}
