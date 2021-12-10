import { MutableSnapshot } from 'recoil';
import { LOCAL_STORAGE_KEY } from 'utils/const';
import { userState } from './userState';

export const getInitialUserInfo = ({ set }: MutableSnapshot): void => {
  const localStorageBaseInfo = localStorage.getItem(
    LOCAL_STORAGE_KEY.USER_BASE_INFO,
  );
  const localStorageRemindInfo = localStorage.getItem(
    LOCAL_STORAGE_KEY.USER_REMIND_INFO,
  );
  if (localStorageBaseInfo && localStorageRemindInfo) {
    const userBaseInfo = JSON.parse(localStorageBaseInfo);
    const userRemindInfo = JSON.parse(localStorageRemindInfo);
    const initialUserState = {
      name: userBaseInfo.name,
      email: userBaseInfo.email,
      imageUrl: userBaseInfo.image,
      remindCycle: userRemindInfo.remindCycle,
      remindToggle: userRemindInfo.remindToggle,
    };
    set(userState, initialUserState);
    return;
  }
  set(userState, {
    name: '',
    email: '',
    imageUrl: '',
    remindCycle: '7',
    remindToggle: false,
  });
};
