import { atom } from 'recoil';

export const profileEditToastState = atom<boolean>({
  key: 'profileEditToastState',
  default: false,
});
