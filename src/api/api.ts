import axios from 'axios';
import makeAlert from '@/funtions/makeAlert';
import { APIResource, clearToken, getAccessToken } from '.';
import { toast } from 'react-toastify';

if(!import.meta.env.VITE_API_URI)
  makeAlert.error('서버 정보를 불러오는데 실패했습니다.');

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
      default:
        toast(errorMessage, {
          type: 'error'
        });
        break;
    }

    throw error;
  }
};