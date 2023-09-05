// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';  // make sure this path is correct

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
