import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from '../apies/http';
import { getStorageTokens } from '../helper';
import { auth } from '../models/auth';

export const login = (
  request: auth.ILoginRequest,
): Promise<AxiosResponse<auth.ILoginResponse>> => {
  return axios.post(`${BASE_URL}/api/v1/user/oauth2Login`, request);
};

export const getAccessToken = (): Promise<AxiosResponse> => {
  const { accessToken, refreshToken } = getStorageTokens();
  const header = {
    accessToken: `Bearer ${accessToken}`,
    refreshToken: `Bearer ${refreshToken}`,
  };
  return axios.get(`${BASE_URL}/api/v1/user/reIssuanceAccessToken`, {
    headers: header,
  });
};
