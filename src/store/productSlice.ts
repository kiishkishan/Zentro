// src/store/slices/productsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from './productsThunk';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  page: number;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  page: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts(state) {
      state.items = [];
      state.page = 0;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          // Immer lets us mutate state directly
          state.items.push(...action.payload);
          state.page += action.payload.length; // update page based on items fetched
        },
      )
      .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      });
  },
});

export const { resetProducts } = productsSlice.actions;
export default productsSlice.reducer;
