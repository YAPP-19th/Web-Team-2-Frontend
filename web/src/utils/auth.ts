import { auth } from 'models/auth';
import Path from 'routes/path';

export const isLogin = (): boolean =>
  Boolean(localStorage.getItem('accessToken'));

export const logout = (): void => {
  localStorage.clear();
  window.location.href = Path.LoginPage;
};

export const getTokens = (): auth.IAuthToken => {
  const accessToken = localStorage.getItem('accessToken') || null;
  const refreshToken = localStorage.getItem('refreshToken') || null;
  return {
    accessToken,
    refreshToken,
  };
};

export const setTokens = (tokens: auth.IAuthToken): void => {
  const { accessToken, refreshToken } = tokens;
  if (accessToken) localStorage.setItem('accessToken', accessToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
};
