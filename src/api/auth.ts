import { AuthTokens, UserInfo } from '@/constants/types';
import { APIResource, api } from '.';
import { cookieJar } from '../storage';
import sha256 from 'sha256';
import { COOKIE_JAR_KEY } from '@/constants/cookieJarKeys';
import { fetchMyData } from './user';
import { makeAlert } from '@/funtions';

export const getAccessToken = (): string | undefined => cookieJar.get(COOKIE_JAR_KEY.ACCESS_TOKEN);
export const getRefreshToken = (): string | undefined => cookieJar.get(COOKIE_JAR_KEY.REFRESH_TOKEN);

export const setTokens = (tokens: AuthTokens) => {
  cookieJar.set(COOKIE_JAR_KEY.ACCESS_TOKEN, tokens.accessToken);
  cookieJar.set(COOKIE_JAR_KEY.REFRESH_TOKEN, tokens.refreshToken);
};

export const clearToken = () => {
  cookieJar.remove(COOKIE_JAR_KEY.ACCESS_TOKEN);
  cookieJar.remove(COOKIE_JAR_KEY.REFRESH_TOKEN);
};

export const loginWithInfo = async ({
  email,
  password
}: APIResource['loginWithInfo']['req']): Promise<UserInfo | boolean> => {
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

export const loginWithRefreshToken = async (refreshToken: string) => {
  try {
    const res = await api<'loginWithRefreshToken'>(
      'POST',
      '/auth/refresh',
      {
        withoutAuth: true,
      },
      {
        Authorization: `Bearer ${refreshToken}`,
      },
    );
    return res;
  } catch (e) {
    return false;
  }
};

export const refetchToken = async () => {
  const refreshToken = getRefreshToken();
  if(!refreshToken) {
    makeAlert.error("계정 상태가 올바르지 않아요");
    return false;
  }

  const tokens = await loginWithRefreshToken(refreshToken);
  if(!tokens) {
    makeAlert.error("계정 정보를 불러올 수 없어요");
    return false;
  }
  setTokens(tokens);

  return true;
};