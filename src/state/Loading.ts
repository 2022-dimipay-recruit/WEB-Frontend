import { atom } from 'recoil';

export default atom<boolean>({
  key: 'loadingStatus',
  default: false,
});