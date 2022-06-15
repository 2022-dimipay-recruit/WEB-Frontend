import { UserInfoType } from '@/constants/types';

export interface MyInfo {
  method: 'GET';
  endpoint: '/user';
  req: {};
  res: UserInfoType;
};
export interface UserInfo {
  method: 'GET';
  endpoint: '/user/:name';
  req: {};
  res: UserInfoType;
};