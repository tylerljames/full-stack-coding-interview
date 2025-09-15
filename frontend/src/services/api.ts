import type { LoginResponse, Photo, PhotoLikeResponse, User } from '@/types';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status == 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (
    email: string,
    password: string
  ): Promise<AxiosResponse<LoginResponse>> => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    return api.post('auth/token', formData);
  },
  getCurrentUser: (): Promise<AxiosResponse<User>> => api.get('/auth/me'),
};

export const photosAPI = {
  getPhotos: (): Promise<AxiosResponse<Photo[]>> => api.get('/photos'),
  likePhoto: (photoId: number): Promise<AxiosResponse<PhotoLikeResponse>> =>
    api.post(`/photos/${photoId}/like`),
};
