import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';

export const store = configureStore({
  reducer: {
    credential: authSlice,
  },
});
