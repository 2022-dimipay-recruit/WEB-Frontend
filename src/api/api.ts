import axios from 'axios';
import { makeAlert } from '@/funtions';
import { APIResource, clearToken, getAccessToken } from '.';
import { toast } from 'react-toastify';

if(!import.meta.env.VITE_API_URI)
  makeAlert.error('서버 정보를 불러오는데 실패했어요');

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
});

export const api = async <T extends keyof APIResource>(
  method: APIResource[T]['method'],
  endpoint: APIResource[T]['endpoint'] | string,
  param?: APIResource[T]['req'],
  headers?: any,
): Promise<APIResource[T]['res']> => {
  try {
    const token = getAccessToken();
    const res = (
      await request(endpoint, {
        data: param,
        method,
        headers: {
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
          ...headers,
        },
      })
    ).data.data as APIResource[T]['res'];
    return res;
  } catch (error: any) {
    const errorMessage = error.response?.data?.data.message || '서버에 연결할 수 없어요';

    switch(errorMessage) {
      case 'wrong token':
        clearToken();
        break;
      case 'login fail':
        makeAlert.error('이메일 또는 비밀번호가 일치하지 않아요');
        break;
      case 'user not found':
        makeAlert.error('유저를 찾을 수 없어요');
        break;
      case 'bad request':
        makeAlert.error('요청이 잘못되었어요');
        break;
      default:
        toast(errorMessage, {
          type: 'error'
        });
        break;
    }

    throw error;
  }
};
