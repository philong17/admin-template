import { refreshTokenAPI } from '@/services/auth/auth.api';
import { useAuthStore } from '@/stores/auth.store';
import { REFRESH_TOKEN } from '@/utils/constants/common.constant';
import { MY_ROUTE } from '@/utils/constants/route.constant';
import CookieService from '@/utils/services/cookie.service';
import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL + '/admin';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true', // Skip ngrok browser warning
  },
  withCredentials: false,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    // Keep unwrapping for backward compatibility
    // But ensure response.data has the expected format
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Don't retry auth endpoints to avoid infinite loops
    if (originalRequest.url?.includes('/auth/')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = CookieService.get(REFRESH_TOKEN);

      if (!refreshToken) {
        useAuthStore.getState().logout();
        window.location.href = MY_ROUTE.AUTH.LOGIN;
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await refreshTokenAPI();
        const newAccessToken = data.access_token;
        useAuthStore.getState().setAccessToken(newAccessToken);
        CookieService.setRefreshToken(data.refresh_token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        return apiClient(originalRequest);
      } catch (e) {
        useAuthStore.getState().logout();
        processQueue(e, null);
        window.location.href = MY_ROUTE.AUTH.LOGIN;
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
export default apiClient;
