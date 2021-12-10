import { auth } from 'models/auth';
import Path from 'routes/path';
import { LOCAL_STORAGE_KEY } from 'utils/const';

export const isLogin = (): boolean => {
  const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY.USER_TOKEN);
  if (localStorageData) {
    return Boolean(JSON.parse(localStorageData)?.accessToken);
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.USER_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_KEY.USER_BASE_INFO);
  localStorage.removeItem(LOCAL_STORAGE_KEY.USER_REMIND_INFO);
  window.location.href = Path.LoginPage;
};

export const getTokens = (): auth.IAuthToken => {
  const localStorageData =
    localStorage.getItem(LOCAL_STORAGE_KEY.USER_TOKEN) || '';
  const accessToken = JSON.parse(localStorageData).accessToken || null;
  const refreshToken = JSON.parse(localStorageData).refreshToken || null;
  return {
    accessToken,
    refreshToken,
  };
};

export const setLoginData = (userData: auth.ILoginResponse): void => {
  const {
    accessToken,
    refreshToken,
    email,
    name,
    image,
    socialType,
    remindCycle,
    remindToggle,
  } = userData;

  const userToken = {
    accessToken,
    refreshToken,
  };

  const userBaseInfo = {
    email,
    name,
    image,
    socialType,
  };

  const userRemindInfo = {
    remindCycle,
    remindToggle,
  };

  localStorage.setItem(LOCAL_STORAGE_KEY.USER_TOKEN, JSON.stringify(userToken));

  localStorage.setItem(
    LOCAL_STORAGE_KEY.USER_BASE_INFO,
    JSON.stringify(userBaseInfo),
  );

  localStorage.setItem(
    LOCAL_STORAGE_KEY.USER_REMIND_INFO,
    JSON.stringify(userRemindInfo),
  );
};

export const setTokens = (tokens: auth.IAuthToken): void => {
  const { accessToken, refreshToken } = tokens;
  if (accessToken && refreshToken) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.USER_TOKEN,
      JSON.stringify({
        accessToken,
        refreshToken,
      }),
    );
  }
};
