import { atom } from 'recoil';
import { UserInfoType } from '@/constants/types';

export default atom<UserInfoType | undefined | null>({
  key: 'MyInfo',
  default: undefined
});