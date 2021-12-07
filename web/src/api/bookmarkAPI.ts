import { Client } from 'api/http';
import { bookmarks } from 'models/bookmark';

/**
 * @param {number} page 몇번째 페이지
 * @param {number} size 페이지당 아이템 개수
 * @param {string} sort 필터링
 * @param {boolean} remind 리마인드 여부
 * @returns Promise<bookmarks.IBookmarkGetResponse>
 */
export const getTrashBookmark = (
  page: number,
  size: number,
  sort: string,
  remind: boolean,
): Promise<bookmarks.IBookmarkGetResponse> => {
  return Client.getAxios<bookmarks.IBookmarkGetResponse>(
    `api/v1/page/trash?page=${page}&size=${size}&sort=${sort}&remind=${remind}`,
  );
};
