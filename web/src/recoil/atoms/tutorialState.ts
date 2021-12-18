import { atom } from 'recoil';

export const tutorialModalState = atom<boolean>({
  key: 'tutorialModalState',
  default: false,
});
