import * as types from '../actions/actionTypes';

export default function settings(
  state = {
    unitType: 'si',
    language: 'en'
  },
  action = {}
) {
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    case types.SET_UNIT_TYPE:
      return {
        ...state,
        unitType: action.unitType
      };
    default:
      return state;
  }
}
