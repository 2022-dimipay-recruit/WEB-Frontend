import { AuthTokens } from '@/constants/types';

export interface Signup {
  method: 'POST';
  endpoint: '/auth/signup';
  req: {
    email: string;
    password: string;
    name: string;
    userName: string;
  };
  res: AuthTokens;
};
export interface LoginWithInfo {
  method: 'POST';
  endpoint: '/auth/signin';
  req: {
    email: string;
    password: string;
  };
  res: AuthTokens;
};

export interface LoginWithRefreshToken {
  method: 'POST';
  endpoint: '/auth/refresh';
  req: {};
  res: AuthTokens;
};
