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
  hasMore?: boolean;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  page: 0,
  hasMore: true,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts(state) {
      state.items = [];
      state.page = 0;
      state.error = null;
      state.hasMore = true;
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

          const existingIds = new Set(state.items.map(p => p.id));
          const newProducts = action.payload.filter(
            p => !existingIds.has(p.id),
          );

          if (newProducts.length > 0) {
            state.items.push(...newProducts);
            state.page += newProducts.length; // update page based on items fetched && only count newly added products
          }

          // If API returned no new products, mark hasMore false
          if (newProducts.length === 0) {
            state.hasMore = false;
          }
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
