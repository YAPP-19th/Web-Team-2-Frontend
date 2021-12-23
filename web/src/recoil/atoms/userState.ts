import { auth } from 'models/auth';
import { atom } from 'recoil';

export interface IUserInfo
  extends Pick<auth.IAuthUserInfo, 'name' | 'email' | 'image'>,
    auth.IUserRemindInfo {}

const initialState: IUserInfo = {
  name: '',
  email: '',
  image: '',
  remindCycle: 7,
  remindToggle: false,
};

export const userState = atom<IUserInfo>({
  key: 'userState',
  default: initialState,
});
