import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: localStorage.getItem('token'),
  },
  reducers: {
    setLoginState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoginState } = loginSlice.actions;

export default loginSlice.reducer;
