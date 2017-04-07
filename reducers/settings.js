import * as types from '../actions/actionTypes';

export default function settings(
  state = {
    unitType: 'si',
    language: 'en'
  },
  action = {}
) {
  switch (action.type) {
    case types.SET_UNIT_TYPE:
      return {
        ...state,
        unitType: action.unitType
      };
    case types.SET_LOCALE:
      return {
        ...state,
        language: action.locale
      };
    default:
      return state;
  }
}
