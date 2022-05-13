import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

export const getAxiosInstance = (url: string, apiToken?: string): AxiosInstance => {
  const API = axios.create({
    baseURL: url,
  });

  const axiosConfig = (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (apiToken) {
      config.headers = {
        Authorization: `Bearer ${apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    return config;
  };

  API.interceptors.request.use(axiosConfig);

  return API;
};
