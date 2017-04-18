import * as types from './actionTypes';

const toggleIsFetching = bool => ({
  type: types.TOGGLE_IS_FETCHING,
  payload: bool
});

export const checkIsFetching = () => async (dispatch, getState) => {
  const { weather } = getState();

  if (
    // Check if we have all data our weather ui needs
    weather.currentWeather && weather.oldWeather && weather.location.city
  ) {
    // if we do, set state `frontend.isFetching` to false
    dispatch(toggleIsFetching(false));
  } else {
    // if not, set state `frontend.isFetching` to true
    dispatch(toggleIsFetching(true));
  }
};
