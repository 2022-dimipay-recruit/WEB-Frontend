import { AuthTokens } from '@/constants/types';
import { APIResource, api } from '.';
import { cookieJar } from '../storage';
import sha256 from 'sha256';
import { toast } from 'react-toastify';
import { COOKIE_JAR_KEY } from '@/constants/cookieJarKeys';
import { fetchMyData } from './user';

export const getAccessToken = (): string | undefined => cookieJar.get(COOKIE_JAR_KEY.ACCESS_TOKEN);

export const setTokens = (tokens: AuthTokens) => {
  cookieJar.set(COOKIE_JAR_KEY.ACCESS_TOKEN, tokens.accessToken);
};

export const clearToken = () => {
  cookieJar.remove(COOKIE_JAR_KEY.ACCESS_TOKEN);
};

export const loginWithInfo = async ({
  email,
  password
}: APIResource['loginWithInfo']['req']) => {
  try {
    const res = await api<'loginWithInfo'>('POST', '/auth/signin', {
      email,
      password: sha256(password),
    });
    setTokens(res);
    return await fetchMyData();
  } catch (e) {
    return false;
  }
};

export const refetchToken = async () => {
  const token = getAccessToken();
  if(!token) {
    toast.error('계정 상태가 올바르지 않아요');
    return;
  }

  const res = await api<'loginWithToken'>('POST', '/auth/refresh');
  setTokens(res);
  return true;
};