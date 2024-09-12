import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
  profile: {name: 'Nama User', email: 'email@user.com'},
};

export const authSlice = createSlice({
  name: 'credential',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const {setToken, setProfile} = authSlice.actions;

export default authSlice.reducer;
