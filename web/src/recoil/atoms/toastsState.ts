import { atom } from 'recoil';

interface IToastsState {
  size: 'big' | 'small' | null;
  message: string | null;
  emojiType: 'smile' | 'clock' | 'sad' | null;
}

const initialState: IToastsState = {
  size: null,
  message: null,
  emojiType: null,
};

export const toastsState = atom({
  key: 'toastsState',
  default: initialState,
});
