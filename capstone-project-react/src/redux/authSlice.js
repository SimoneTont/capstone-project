import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateUserName(state, action) {
      if (state.user) {
        state.user.name = action.payload.name;
      }
    },
    updateUserEmail(state, action) {
      if (state.user) {
        state.user.email = action.payload.email;
      }
    },
  },
});

export const { loginSuccess, logout, updateUserName, updateUserEmail } = authSlice.actions;
export default authSlice.reducer;
