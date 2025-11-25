export enum ROUTE_NAME {
  AUTH = '/auth',
  DASHBOARD = '/dashboard',
  // Add your route names here
}

export const MY_ROUTE = {
  HOME: '/',
  AUTH: {
    LOGIN: `${ROUTE_NAME.AUTH}/login`,
    REGISTER: `${ROUTE_NAME.AUTH}/register`,
  },
  DASHBOARD: ROUTE_NAME.DASHBOARD,
  // Add your routes here
};

export const DEFAULT_ROUTE = MY_ROUTE.HOME;
