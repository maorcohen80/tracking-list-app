// Action creator

export const addItems = items => {
  return {
    type: 'ADD_ITEMS',
    payload: items
  };
};

export const addRecivedItem = item => {
  return {
    type: 'ADD_RECEIVED',
    payload: item
  };
};
export const updateRecivedItems = items => {
  return {
    type: 'UPDATE_RECEIVED',
    payload: items
  };
};

export const setCurrency = type => {
  return {
    type: 'SET_CURRENCY',
    payload: type
  };
};

export const setRate = rate => {
  return {
    type: 'SET_RATE',
    payload: rate
  };
};
