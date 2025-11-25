export interface LoginREQ {
  email: string;
  password: string;
}

export interface LogoutREQ {
  refreshToken: string;
}
