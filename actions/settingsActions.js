import * as types from './actionTypes';

export const increment = () => ({
  type: types.INCREMENT
});

export const decrement = () => ({
  type: types.DECREMENT
});

export const setUnitType = (unitType: string) => ({
  type: types.SET_UNIT_TYPE,
  unitType
});
