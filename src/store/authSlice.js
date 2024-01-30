// store/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'currentCamper',
  initialState: {
    isAuthenticated: false,
    camper: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.camper = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.camper = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
