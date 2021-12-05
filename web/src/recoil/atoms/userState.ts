import { auth } from 'models/auth';
import { atom } from 'recoil';
import { LOCAL_STORAGE_KEY } from 'utils/const';

type IUserInfo = Pick<auth.IAuthUserInfo, 'name' | 'email' | 'imageUrl'>;

const getInitialUserInfo = (): IUserInfo => {
  const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO);
  if (localStorageData) {
    const userInfo = JSON.parse(localStorageData);
    const initialUserState = {
      name: userInfo.name,
      email: userInfo.email,
      imageUrl: userInfo.imageUrl,
    };
    return initialUserState;
  }
  return { name: '', email: '', imageUrl: '' };
};

const initialState: IUserInfo = getInitialUserInfo();

export const userState = atom<IUserInfo>({
  key: 'userState',
  default: initialState,
});
