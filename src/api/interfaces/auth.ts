import { AuthTokens } from '@/constants/types';

export interface LoginWithInfo {
  method: 'POST';
  endpoint: '/auth/signin';
  req: {
    email: string;
    password: string;
  };
  res: AuthTokens;
};

export interface LoginWithToken {
  method: 'POST';
  endpoint: '/auth/refresh';
  req: {};
  res: AuthTokens;
};
