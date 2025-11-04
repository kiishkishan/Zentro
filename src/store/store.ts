import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import wishlistSlice from './wishlistSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistSlice,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
