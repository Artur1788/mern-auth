import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  const accessToken = JSON.parse(localStorage.getItem('accessToken') as string);

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const config = error.config;
    if (error.response.status === 401 && !config.isTryingRefresh) {
      config.isTryingRefresh = true;
      try {
        const response = await axios(
          `${import.meta.env.VITE_BASE_URL}/refresh`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem(
          'accessToken',
          JSON.stringify(response.data.accessToken)
        );
        return api.request(config);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message, {
            autoClose: 1000,
            hideProgressBar: true,
          });
          localStorage.removeItem('accessToken');
          await new Promise((resolve) => setTimeout(resolve, 500));
          window.location.replace('/login');
        }
      }
    }
    throw error;
  }
);
