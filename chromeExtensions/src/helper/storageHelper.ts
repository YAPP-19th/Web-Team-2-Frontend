import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/auth';

export const getStorageTokens = (): {
  accessToken: string | null;
  refreshToken: string | null;
} => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN) || '';
  const refreshToken = localStorage.getItem(REFRESH_TOKEN) || '';
  return {
    accessToken,
    refreshToken,
  };
};
