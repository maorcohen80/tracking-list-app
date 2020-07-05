import { combineReducers } from 'redux';

const itemsReducers = (items = [], action) => {
  if (action.type === 'ADD_ITEMS') {
    return action.payload;
  }

  if (action.type === 'ADD_RECEIVED') {
    let newItemsList = items.filter(item => {
      return item.id !== action.payload.id;
    })
    items = newItemsList;
  }

  return items;
};

const receivedItemsReducer = (itemsRecived = [], action) => {
  if (action.type === 'ADD_RECEIVED') {
    let items = [...itemsRecived];
    items.push(action.payload);
    itemsRecived = items;
  }
  if (action.type === 'UPDATE_RECEIVED') {
    let updatedItems = [...itemsRecived];
    updatedItems = action.payload;
    itemsRecived = updatedItems;
  }

  return itemsRecived;
};

const currencyReducer = (currencyIndex = 0, action) => {
  if (action.type === 'SET_CURRENCY') {
    return action.payload;
  }

  return currencyIndex;
};

const rateReducer = (rate = 0, action) => {
  if (action.type === 'SET_RATE') {
    return action.payload;
  }

  return rate;
};


export default combineReducers({
  items: itemsReducers,
  receivedItems: receivedItemsReducer,
  currencyIndex: currencyReducer,
  rate: rateReducer
})