import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    // Log errors or handle them as needed
  }
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers as needed
  },
  // Other middleware and configuration can be added here
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
