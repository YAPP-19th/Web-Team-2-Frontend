import { Client } from 'api/http';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getBookmarks = (): any => {
  // 여기 any 부분 수정해야함 (급하게 만드느라 타입 지정 생략 했습니다 ㅠ)
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
