import * as types from './actionTypes';

export const toggleIsFetching = bool => ({
    type: types.TOGGLE_IS_FETCHING,
    payload: bool
});
