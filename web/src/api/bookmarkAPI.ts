import { Client } from 'api/http';
import { bookmarks } from 'models/bookmark';

export const getTrashBookmark = (): Promise<bookmarks.IBookmarkGetResponse> => {
  const page = 0; // 몇번째 페이지
  const size = 12; // 한페이지당 보여줄 갯수
  const sort:
    | 'saveTime,desc'
    | 'saveTime,asc'
    | 'clickCount,desc'
    | 'clickCount,asc' = 'saveTime,desc';
  const remind = false;
  return Client.getAxios<bookmarks.IBookmarkGetResponse>(
    `api/v1/trash?page=${page}&size=${size}&sort=${sort}&remind=${remind}`,
  );
};
