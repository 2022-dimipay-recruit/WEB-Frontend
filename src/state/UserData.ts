import { api } from '@/api';
import { selectorFamily } from 'recoil';

export default selectorFamily({
  key: 'fetchUserData',
  get: (username) => async () => {
    try {
      return await api<'userInfo'>('GET', `/user?name=${username as string}`);
    } catch {
      return undefined;
    }
  },
});
