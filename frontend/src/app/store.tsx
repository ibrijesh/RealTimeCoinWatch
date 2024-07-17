import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

// Define the root reducer
const rootReducer = combineReducers({
  counter: counterReducer,
});

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Functions to save and load state from localStorage
const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.error('Could not save state', e);
  }
};

const loadState = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem('state');
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

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;

export default store;
