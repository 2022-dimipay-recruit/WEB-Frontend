import { fetchUserData } from '@/api';
import { selectorFamily } from 'recoil';

export default selectorFamily({
  key: 'fetchUserData',
  get: (username) => async () => {
    try {
      return await fetchUserData(username as string);
    } catch {
      return undefined;
    }
  },
});
