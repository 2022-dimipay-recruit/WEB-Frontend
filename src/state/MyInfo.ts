import { atom } from 'recoil';
import { UserInfo } from '@/constants/types';

export default atom<UserInfo | undefined>({
  key: 'MyInfo',
  default: undefined
});