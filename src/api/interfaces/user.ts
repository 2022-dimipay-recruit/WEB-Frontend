import { UserInfo } from '@/constants/types';

export interface MyInfo {
  method: 'GET';
  endpoint: '/auth/me';
  req: {};
  res: UserInfo;
};