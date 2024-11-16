import axios, { AxiosError } from 'axios';
import { EStorage, EStorageKeys } from "../models";
import { STORAGE } from "../utils/storage";

interface ErrorResponse {
  error: string;
}

const getToken = () => STORAGE({ type: EStorage.SESSION, key: EStorageKeys.BUDGET_APP_CREDS }).get()?.access_token;

// Utility function to check token expiration
const isTokenExpired = (token: any) => {
  const tokenParts = token.split('.');
  if (tokenParts.length === 3) {
    const payload = JSON.parse(atob(tokenParts[1]));
    const exp = payload.exp * 1000;
    return Date.now() > exp;
  }
  return true;
};

// Refresh the access token if it has expired
const refreshAccessToken = async () => {
  try {
    const refreshToken = STORAGE({ type: EStorage.SESSION, key: EStorageKeys.BUDGET_APP_CREDS }).get()?.refresh_token;
    const response = await axios.post(
      'http://localhost:8081/api/v1/refresh',
      refreshToken
    );
    
    const { access_token } = response.data;

    // Update the storage with the new access token
    const storedData = STORAGE({ type: EStorage.SESSION, key: EStorageKeys.BUDGET_APP_CREDS }).get();
    STORAGE({ type: EStorage.SESSION, key: EStorageKeys.BUDGET_APP_CREDS }).set({
      ...storedData,
      access_token,
    });
    
    return access_token;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response?.data?.error === 'Refresh token expired') {
      STORAGE({ type: EStorage.SESSION, key: EStorageKeys.BUDGET_APP_CREDS }).clear();
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      console.error('Failed to refresh access token:', error);
    }
    return null;
  }
};

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptor to include the token only if it exists
instance.interceptors.request.use(async (config) => {
  let token = getToken();
  
  // If the token exists and it's expired, refresh it
  if (token && isTokenExpired(token)) {
    token = await refreshAccessToken();
    if (!token) {
      return Promise.reject(new Error('Authentication required'));
    }
  }
  
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export const REQUEST = {
  get(url: string) {
    return instance.get(url).then((res) => res.data);
  },
  post(url: string, data?: any, config = {}) {
    return instance.post(url, data, config);
  },
  delete(url: string) {
    return instance.delete(url);
  },
  patch(url: string, data: any) {
    return instance.patch(url, data);
  },
  put(url: string, data: any) {
    return instance.put(url, data);
  }
};
