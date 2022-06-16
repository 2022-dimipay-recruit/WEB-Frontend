import { UserInfoType } from '@/constants/types';
import { api, getAccessToken } from '.';

export const fetchMyData = async (): Promise<UserInfoType> => {
  const token = getAccessToken();
  const res = await api<'myInfo'>('GET', '/user/me', {}, {
    Authorization: `Bearer ${token}`,
  });
  return res;
};

export const fetchUserData = async (name: string): Promise<UserInfoType> => {
  const res = await api<'userInfo'>('GET', `/user?name=${name}`);
  return res;
};