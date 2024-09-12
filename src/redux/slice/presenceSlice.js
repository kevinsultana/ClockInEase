import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  presence: '',
};

export const presenceSlice = createSlice({
  name: 'presence',
  initialState,
  reducers: {
    setPresence: (state, action) => {
      state.presence = action.payload;
    },
  },
});

export const {setPresence} = presenceSlice.actions;

export default presenceSlice.reducer;
