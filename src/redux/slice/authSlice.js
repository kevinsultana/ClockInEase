import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
};

export const authSlice = createSlice({
  name: 'credential',
  initialState,
  reducers: {
    refreshToken: (state, action) => {
      state.value == action.payload;
    },
  },
});

export const {refreshToken} = authSlice.actions;

export default authSlice.reducer;
