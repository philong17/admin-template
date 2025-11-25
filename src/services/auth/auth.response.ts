export enum USER_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export enum USER_ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

export interface AdminInfoRESP {
  user_id: string;
  fullname: string;
  phone: string;
  email: string;
  role: USER_ROLE;
  status: USER_STATUS;
}

export interface LoginRESP {
  admin_user: AdminInfoRESP;
  access_token: string;
  refresh_token: string;
}

export interface RefreshTokenRESP {
  access_token: string;
  refresh_token: string;
}
