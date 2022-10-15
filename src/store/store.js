import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import sortSlice from './slices/sortSlice';

export const store = configureStore({
  reducer: { cartSlice, sortSlice },
});
