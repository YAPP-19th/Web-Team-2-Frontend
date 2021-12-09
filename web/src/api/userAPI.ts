import { AxiosResponse } from 'axios';
import { Client } from './http';

export const nicknameCheck = (nickName: string): Promise<AxiosResponse> => {
  return Client.postAxios('api/v1/user/nickNameCheck', {
    nickName: { nickName },
  });
};
