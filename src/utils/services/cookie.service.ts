import Cookies from 'js-cookie';
import { REFRESH_TOKEN } from '../constants/common.constant';

const CookieService = {
  get: (key: string): string | undefined => {
    return Cookies.get(key);
  },

  set: (key: string, value: string, options?: Cookies.CookieAttributes): void => {
    Cookies.set(key, value, {
      expires: 7, // default 7 days
      path: '/',
      ...options,
    });
  },

  setRefreshToken: (value: string, options?: Cookies.CookieAttributes): void => {
    Cookies.set(REFRESH_TOKEN, value, {
      expires: 7, // default 7 days
      path: '/',
      secure: import.meta.env.PROD,
      sameSite: 'strict',
      ...options,
    });
  },

  remove: (key: string): void => {
    Cookies.remove(key, { path: '/' });
  },

  has: (key: string): boolean => {
    return !!Cookies.get(key);
  },
};

export default CookieService;
