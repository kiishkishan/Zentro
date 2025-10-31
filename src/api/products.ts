import axiosClient from './axiosClient';

export const fetchProductsApi = async () => {
  const response = await axiosClient.get('/products?offset=0&limit=20');
  return response.data;
};

export const fetchProductByIdApi = async (id: number) => {
  const response = await axiosClient.get(`/products/${id}`);
  return response.data;
};
