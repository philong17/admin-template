import { REFRESH_TOKEN } from '@/utils/constants/common.constant';
import CookieService from '@/utils/services/cookie.service';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  isRefreshing: boolean;
}

interface AuthActions {
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  setIsRefreshing: (isRefreshing: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      accessToken: null,
      isRefreshing: false,
      setIsRefreshing: (isRefreshing) => set({ isRefreshing }),
      setAccessToken: (token) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
      logout: () => {
        CookieService.remove(REFRESH_TOKEN);
        return set({ accessToken: null, isRefreshing: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ accessToken: state.accessToken }),
    },
  ),
);
