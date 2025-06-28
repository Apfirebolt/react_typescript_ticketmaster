import axios, { AxiosResponse, AxiosError } from 'axios';
import { toast } from "react-toastify";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = 'https://app.ticketmaster.com/discovery/v2/';

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // if the error is 404, display toast message
    if (error.response && error.response.status === 404) {
      toast.error('404 error');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;