import { atom } from 'recoil';

export const bellState = atom<boolean>({
  key: 'bellState',
  default: false,
});
