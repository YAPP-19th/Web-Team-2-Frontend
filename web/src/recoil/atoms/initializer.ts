import { MutableSnapshot } from 'recoil';
import { LOCAL_STORAGE_KEY } from 'utils/const';
import { userState } from './userState';

export const getInitialUserInfo = ({ set }: MutableSnapshot): void => {
  const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO);
  if (localStorageData) {
    const userInfo = JSON.parse(localStorageData);
    const initialUserState = {
      name: userInfo.name,
      email: userInfo.email,
      imageUrl: userInfo.imageUrl,
    };
    set(userState, initialUserState);
    return;
  }
  set(userState, { name: '', email: '', imageUrl: '' });
};
