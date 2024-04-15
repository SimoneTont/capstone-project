import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.role = action.payload.role;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.role = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
