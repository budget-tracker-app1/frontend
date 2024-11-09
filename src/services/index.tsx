import axios from 'axios';
import { EStorage, EStorageKeys } from "../models";
import { STORAGE } from "../utils/storage";

const getToken = () => STORAGE({ type: EStorage.SESSION, key: EStorageKeys.BUDGET_APP_CREDS }).get()?.access_token;

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptor to include the token only if it exists
instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const REQUEST = {
  get(url: string) {
    return instance.get(url).then((res) => res.data);
  },
  post(url: string, data?, config = {}) {
    return instance.post(url, data, config);
  },
  delete(url: string) {
    return instance.delete(url);
  },
  patch(url: string, data) {
    return instance.patch(url, data);
  },
  put(url: string, data) {
    return instance.put(url, data);
  }
};
