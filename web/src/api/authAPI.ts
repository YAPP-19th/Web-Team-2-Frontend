import { BASE_URL } from 'api/http';
import axios, { AxiosResponse } from 'axios';
import { auth } from 'models/auth';
import { getTokens } from 'utils/auth';

export const login = (
  request: auth.ILoginRequest,
): Promise<AxiosResponse<auth.ILoginResponse>> => {
  return axios.post(`${BASE_URL}/api/v1/user/oauth2Login`, request);
};

export const getAccessToken = (): Promise<AxiosResponse> => {
  const { accessToken, refreshToken } = getTokens();
  const header = {
    accessToken: `Bearer ${accessToken}`,
    refreshToken: `Bearer ${refreshToken}`,
  };
  return axios.get(`${BASE_URL}/api/v1/user/reIssuanceAccessToken`, {
    headers: header,
  });
};
