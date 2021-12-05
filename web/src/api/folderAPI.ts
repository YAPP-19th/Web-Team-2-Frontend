import { TreeData } from '@atlaskit/tree';
import { Client } from 'api/http';
import { AxiosResponse } from 'axios';

// sample API
export const getFolderList = (
  userId: string,
  keyWord: string,
  page: number,
  size: number,
  sort: string,
  remind: boolean,
): Promise<AxiosResponse> => {
  return Client.getAxios(
    `api/v1/${userId}/${keyWord}?page=${page}&size=${size}&sort=${sort}&remind=${remind}`,
  );
};

export const getFolders = async (): Promise<TreeData> => {
  return Client.getAxios(`/api/v1/folder`);
};
