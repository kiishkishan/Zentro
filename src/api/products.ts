import axiosClient from './axiosClient';

export const fetchProductsApi = async (offset: number, limit: number) => {
  const response = await axiosClient.get(
    `/products?offset=${offset}&limit=${limit}`,
  );
  return response.data;
};

export const fetchProductByIdApi = async (id: number) => {
  const response = await axiosClient.get(`/products/${id}`);
  return response.data;
};
