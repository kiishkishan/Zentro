import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1/',
  timeout: 8000,
});

// request interceptor
axiosClient.interceptors.request.use(
  config => {
    console.log('[API REQUEST]', config.url);
    return config;
  },
  error => Promise.reject(error),
);

// response / fullfilment interceptor
axiosClient.interceptors.response.use(
  response => response,
  error => {
    console.log('[API ERROR]', error?.response?.status, error?.message);
    return Promise.reject(error);
  },
);

export default axiosClient;
