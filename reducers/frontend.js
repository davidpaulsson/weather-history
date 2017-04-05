import * as types from '../actions/actionTypes';

export default function settings(
  state = {
    isFetching: false
  },
  action = {}
) {
  switch (action.type) {
    case types.TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      };
    default:
      return state;
  }
}
