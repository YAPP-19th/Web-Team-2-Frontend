import { ItemId } from '@atlaskit/tree';
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
    `api/v1/page/trash?page=${page}&size=${size}&sort=str${sort}&remind=${remind}`,
  );
};

/**
 * @param {string} keyword 검색내용
 * @param {number} page 몇번째 페이지
 * @param {number} size 페이지당 아이템 개수
 * @param {string} sort 필터링
 * @param {boolean} remind 리마인드 여부
 * @returns Promise<bookmarks.IBookmarkGetResponse>
 */
export const getSearchBookmark = (
  keyword: string,
  page: number,
  size: number,
  sort: string,
  remind: boolean,
): Promise<bookmarks.IBookmarkGetResponse> => {
  return Client.getAxios<bookmarks.IBookmarkGetResponse>(
    `api/v1/page/search/${keyword}?page=${page}&size=${size}&sort=${sort}&remind=${remind}`,
  );
};

/**
 * @param {number} page 몇번째 페이지
 * @param {number} size 페이지당 아이템 개수
 * @param {string} sort 필터링
 * @param {boolean} remind 리마인드 여부
 * @returns Promise<bookmarks.IBookmarkGetResponse>
 */
export const getAllBookmark = (
  page: number,
  size: number,
  sort: string,
  remind: boolean,
): Promise<bookmarks.IBookmarkGetResponse> => {
  return Client.getAxios<bookmarks.IBookmarkGetResponse>(
    `api/v1/page/main?page=${page}&size=${size}&sort=${sort}&remind=${remind}`,
  );
};

export const getFolderBookmark = (
  folderId: ItemId,
  page: number,
  size: number,
  sort: string,
  remind: boolean,
): Promise<bookmarks.IBookmarkGetResponse> => {
  return Client.getAxios<bookmarks.IBookmarkGetResponse>(
    `api/v1/page/${folderId}?page=${page}&size=${size}&sort=${sort}&remind=${remind}`,
  );
};

/**
 * @param {string} bookmarkId 삭제할 북마크 아이디
 * @returns Promise<bookmarks.IBookmarkDeleteResponse>
 */
export const deleteBookmark = (
  bookmarkIdList: string[],
): Promise<bookmarks.IBookmarkDeleteResponse> => {
  return Client.postAxios<
    bookmarks.IBookmarkDeleteRequest,
    bookmarks.IBookmarkDeleteResponse
  >(`api/v1/bookmark/delete`, { idList: bookmarkIdList });
};

/**
 * @param {string} bookmarkId 이동할 북마크 아이디
 * @param {object} requestData {prevFolderId: string, nextFolderId: string}
 * @returns Promise<bookmarks.IBookmarkMoveResponse>
 */
export const moveBookmark = (
  requestData: bookmarks.IBookmarkMoveRequest,
): Promise<bookmarks.IBookmarkMoveResponse> => {
  return Client.patchAxios<
    bookmarks.IBookmarkMoveRequest,
    bookmarks.IBookmarkMoveResponse
  >(`api/v1/bookmark/moveList`, requestData);
};

/**
 * @param {string} bookmarkId 수정할 북마크 아이디
 * @param {object} requestData {title: string, remind: boolean}
 * @returns Promise<bookmarks.IBookmarkUpdateResponse>
 */
export const updateBookmark = (
  bookmarkId: string,
  requestData: bookmarks.IBookmarkUpdateRequest,
): Promise<bookmarks.IBookmarkUpdateResponse> => {
  return Client.patchAxios<
    bookmarks.IBookmarkUpdateRequest,
    bookmarks.IBookmarkUpdateResponse
  >(`api/v1/bookmark/${bookmarkId}`, requestData);
};
