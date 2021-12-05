import { auth } from 'models/auth';
import Path from 'routes/path';
import { LOCAL_STORAGE_KEY } from 'utils/const';

export const isLogin = (): boolean => {
  const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO);
  if (localStorageData) {
    return Boolean(JSON.parse(localStorageData)?.accessToken);
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.USER_INFO);
  window.location.href = Path.LoginPage;
};

export const getTokens = (): auth.IAuthToken => {
  const localStorageData =
    localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO) || '';
  const accessToken = JSON.parse(localStorageData).accessToken || null;
  const refreshToken = JSON.parse(localStorageData).refreshToken || null;
  return {
    accessToken,
    refreshToken,
  };
};

export const setTokens = (tokens: auth.IAuthToken): void => {
  const { accessToken, refreshToken } = tokens;
  if (accessToken && refreshToken) {
    const originLocalStorageData = localStorage.getItem(
      LOCAL_STORAGE_KEY.USER_INFO,
    );
    if (originLocalStorageData) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY.USER_INFO,
        JSON.stringify({
          ...JSON.parse(originLocalStorageData),
          accessToken,
          refreshToken,
        }),
      );
    }
  }
};
