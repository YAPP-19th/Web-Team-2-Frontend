import { getStorageTokens } from '../helper/storageHelper';
import { request } from './request';

export const getToken = () => {
  const { accessToken, refreshToken } = getStorageTokens();
  const header = {
    accessToken: `Bearer ${accessToken}`,
    refreshToken: `Bearer ${refreshToken}`,
  };
  return request('get', '/api/v1/user/reIssuanceAccessToken', {}, header);
};
