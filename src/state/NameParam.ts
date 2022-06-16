import { atom } from 'recoil';

export default atom<string | undefined>({
  key: 'nameParam',
  default: undefined,
});