import { atom } from 'recoil';

interface IAuthState {
  email: boolean;
  password: boolean;
  isAgree: boolean;
}

const initialState: IAuthState = {
  email: false,
  password: false,
  isAgree: false,
};

export const authState = atom<IAuthState>({
  key: 'authState',
  default: initialState,
});
