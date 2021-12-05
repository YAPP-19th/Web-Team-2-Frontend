import { auth } from 'models/auth';
import { atom } from 'recoil';

export type IUserInfo = Pick<auth.IAuthUserInfo, 'name' | 'email' | 'imageUrl'>;

const initialState: IUserInfo = { name: '', email: '', imageUrl: '' };

export const userState = atom<IUserInfo>({
  key: 'userState',
  default: initialState,
});
