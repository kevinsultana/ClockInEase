import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import presenceSlice from './slice/presenceSlice';

export const store = configureStore({
  reducer: {
    credential: authSlice,
    presence: presenceSlice,
  },
});
