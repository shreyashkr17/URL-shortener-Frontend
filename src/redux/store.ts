import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'; // Import your reducer
import apiReducer from './apiToken/apiToken'

export const store = configureStore({
  reducer: {
    user: userReducer,
    apiToken: apiReducer, // Add your slice reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
