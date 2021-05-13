export const addCart = (item) => ({
  type: 'ADD_ITEM',
  payload: item,
});

export const deleteCart = (item) => ({
  type: 'DELETE_ITEM',
  payload: item,
});

export const deleteAll = () => ({
  type: 'DELETE_ALL',
  payload: [],
});

export const increment = (item) => ({
  type: 'INCREMENT',
  payload: item,
});

export const decrement = (item) => ({
  type: 'DECREMENT',
  payload: item,
});

export const increment2 = (item) => ({
  type: 'INCREMENT2',
  payload: item,
});

export const decrement2 = (item) => ({
  type: 'DECREMENT2',
  payload: item,
});