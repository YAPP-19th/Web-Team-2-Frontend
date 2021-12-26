import { atom } from 'recoil';

import { auth } from '../../models/auth';

export interface IUserInfo
  extends Pick<auth.IAuthUserInfo, 'name' | 'email' | 'image'>,
    auth.IUserRemindInfo {}

const initialState: IUserInfo = {
  name: '',
  email: '',
  image: '',
  remindCycle: '',
  remindToggle: false,
};

export const userState = atom<IUserInfo>({
  key: 'userState',
  default: initialState,
});
