import axios, { AxiosResponse } from 'axios';
import { getTokens } from 'utils/auth';
import { BASE_URL, Client } from './http';

export const nicknameCheck = (nickName: string): Promise<AxiosResponse> => {
  return Client.postAxios('api/v1/user/nickNameCheck', {
    nickName,
  });
};

export const uploadProfileImage = (image: FormData): Promise<AxiosResponse> => {
  const { accessToken, refreshToken } = getTokens();
  return axios.post(`${BASE_URL}/api/v1/user/uploadProfileImage`, image, {
    headers: {
      'Content-Type': 'multipart/form-data',
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    },
  });
};

export const changeProfile = (
  profileImageUrl: string,
  name: string,
): Promise<AxiosResponse> => {
  const body = { profileImageUrl, name };
  return Client.postAxios('api/v1/user/changeProfile', body);
};
