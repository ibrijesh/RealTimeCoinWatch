import { configureStore, combineReducers } from '@reduxjs/toolkit';
import stockReducer from '../features/stock/stockSlice';

// Define the root reducer
const rootReducer = combineReducers({
  stock: stockReducer,
});

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Functions to save and load state from localStorage
const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('store', serializedState);
  } catch (e) {
    console.error('Could not save state', e);
  }
};

const loadState = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem('store');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as RootState;
  } catch (e) {
    console.error('Could not load state', e);
    return undefined;
  }
};

// Load preloaded state from localStorage
const preloadedState = loadState();

const stockStore = configureStore({
  reducer: rootReducer,
  preloadedState,
});

stockStore.subscribe(() => {
  saveState(stockStore.getState());
});

export type AppDispatch = typeof stockStore.dispatch;

export default stockStore;
