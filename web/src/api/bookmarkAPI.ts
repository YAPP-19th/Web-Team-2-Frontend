import { Client } from 'api/http';
import { AxiosResponse } from 'axios';

export const getBookmarks = (): Promise<AxiosResponse> => {
  const folderId = '1';
  const page = 0; // 몇번째 페이지
  const size = 9; // 한페이지당 보여줄 갯수
  const sort:
    | 'saveTime,desc'
    | 'saveTime,asc'
    | 'clickCount,desc'
    | 'clickCount,asc' = 'saveTime,desc';
  const remind = true;
  return Client.getAxios(
    `api/v1/bookmark/${folderId}?page=${page}&size=${size}&sort=${sort}&remind=${remind}`,
  );
};
