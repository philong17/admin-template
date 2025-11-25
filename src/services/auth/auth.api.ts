import axiosCllient, { BASE_URL } from '@/config/axios';
import { API_ENDPOINTS } from '@/utils/constants/api.constant';
import { REFRESH_TOKEN } from '@/utils/constants/common.constant';
import CookieService from '@/utils/services/cookie.service';
import { BaseResponse } from '@/utils/types/response.type';
import axios from 'axios';
import { LoginREQ, LogoutREQ } from './auth.request';
import { AdminInfoRESP, LoginRESP, RefreshTokenRESP } from './auth.response';

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = CookieService.get(REFRESH_TOKEN);
    if (!refreshToken) return null;

    const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
      refresh_token: refreshToken,
    });

    return response.data?.data?.access_token || null;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    return null;
  }
};

export const loginAPI = async (data: LoginREQ): Promise<BaseResponse<LoginRESP>> =>
  axiosCllient.post(API_ENDPOINTS.AUTH.LOGIN, data);

export const getAdminInfoAPI = async (): Promise<BaseResponse<AdminInfoRESP>> => axiosCllient.get(API_ENDPOINTS.AUTH.ACCOUNT);

export const refreshTokenAPI = async (): Promise<BaseResponse<RefreshTokenRESP>> => {
  const res = await axios.post(
    BASE_URL + API_ENDPOINTS.AUTH.REFRESH_TOKEN,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${CookieService.get(REFRESH_TOKEN)}`,
      },
    },
  );
  return res.data;
};

export const logoutAPI = async (data: LogoutREQ): Promise<void> => axiosCllient.post(API_ENDPOINTS.AUTH.LOGOUT, data);
