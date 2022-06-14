import { UserInfo } from '@/constants/types';
import { api } from '.';

export const fetchMyData = async (): Promise<UserInfo> => {
  const res = await api<'myInfo'>('GET', '/user/me');
  return res;
};