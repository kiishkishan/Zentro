import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';

interface wishlistState {
  items: Product[];
}

const initialState: wishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<Product>) => {
      const wishListExist = state.items.find(p => p.id === action.payload.id);
      if (!wishListExist) {
        state.items.push(action.payload);
      }
    },
    removeFromWishList: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter(p => p.id !== action.payload.id);
    },
  },
});

export const { addToWishList, removeFromWishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;
