import { UserInfo } from '@/constants/types';
import { api, getAccessToken } from '.';

export const fetchMyData = async (): Promise<UserInfo> => {
  const token = getAccessToken();
  const res = await api<'myInfo'>('GET', '/user', {}, {
    Authorization: `Bearer ${token}`,
  });
  return res;
};