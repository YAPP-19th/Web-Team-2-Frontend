import { auth } from 'models/auth';
import { atom } from 'recoil';

export interface IUserInfo
  extends Pick<auth.IAuthUserInfo, 'name' | 'email' | 'imageUrl'>,
    auth.IUserRemindInfo {}

const initialState: IUserInfo = {
  name: '',
  email: '',
  imageUrl: '',
  remindCycle: '',
  remindToggle: false,
};

export const userState = atom<IUserInfo>({
  key: 'userState',
  default: initialState,
});
