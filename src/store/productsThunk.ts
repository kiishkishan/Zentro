import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsApi } from '../api/products';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (
    { offset, limit }: { offset: number; limit: number },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetchProductsApi(offset, limit);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);
