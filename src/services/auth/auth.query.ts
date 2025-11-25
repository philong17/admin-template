import { useAuthStore } from '@/stores/auth.store';
import CookieService from '@/utils/services/cookie.service';
import { BaseResponse, MutationArgs } from '@/utils/types/response.type';
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getAdminInfoAPI, loginAPI, logoutAPI, refreshTokenAPI } from './auth.api';
import { LoginRESP, RefreshTokenRESP } from './auth.response';

const AUTH_QUERY_KEY = {
  ACCOUNT_INFO: 'auth-account-info',
};

export const useLoginMutation = ({ _onSuccess, _onError }: MutationArgs<BaseResponse<LoginRESP>>) =>
  useMutation({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      _onSuccess?.(data);
    },
    onError: (error) => {
      _onError?.(error);
    },
  });

export const useAdminInfoQuery = (authenticated: boolean) =>
  useQuery({
    queryKey: [AUTH_QUERY_KEY.ACCOUNT_INFO],
    queryFn: getAdminInfoAPI,
    select: (data) => data.data,
    enabled: authenticated,
  });

export const useRefreshTokenMutation = ({ _onSuccess, _onError }: MutationArgs<BaseResponse<RefreshTokenRESP>>) =>
  useMutation({
    mutationFn: refreshTokenAPI,
    onSuccess: (data) => {
      _onSuccess?.(data);
    },
    onError: (error) => {
      _onError?.(error);
    },
  });

export const useCheckAuth = () =>
  useSuspenseQuery({
    queryKey: ['check-auth'],
    queryFn: async () => {
      try {
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) return { authenticated: true };

        if (!accessToken) {
          const { data } = await refreshTokenAPI();

          useAuthStore.getState().setAccessToken(data.access_token);
          CookieService.setRefreshToken(data.refresh_token);
        }
        return { authenticated: true };
      } catch {
        return { authenticated: false };
      }
    },

    retry: false,
  });

export const useLogoutMutation = ({ _onSuccess, _onError }: MutationArgs<{}>) =>
  useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      _onSuccess?.({});
    },
    onError: (error) => {
      _onError?.(error);
    },
  });
