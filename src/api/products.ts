import axiosClient from './axiosClient';

// GET all
export const fetchProductsApi = async (offset: number, limit: number) => {
  const response = await axiosClient.get(
    `/products/?offset=${offset}&limit=${limit}`,
  );
  return response.data;
};

// GET by id
export const fetchProductByIdApi = async (id: number) => {
  const response = await axiosClient.get(`/products/${id}`);
  return response.data;
};
