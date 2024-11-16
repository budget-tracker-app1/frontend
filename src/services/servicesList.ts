const BASE_URL = 'http://localhost:8081';

export const API_VERSION = '/api/v1';

export const ENDPOINTS = {
  LOGIN: () => `${BASE_URL + API_VERSION}/login`,
  REGISTER: () => `${BASE_URL + API_VERSION}/register`,
  CATEGORIES: {
    getAll: () => `${BASE_URL + API_VERSION}/categories`,
    post: () => `${BASE_URL + API_VERSION}/categories`,
    put: (id: number) => `${BASE_URL + API_VERSION}/categories/${id}`,
  }
};
