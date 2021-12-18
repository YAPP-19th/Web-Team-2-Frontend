/* eslint-disable no-console */
import { ItemId } from '@atlaskit/tree';
import {
  getAllBookmark,
  getFolderBookmark,
  getSearchBookmark,
  getTrashBookmark,
} from 'api/bookmarkAPI';
import { bookmarks } from 'models/bookmark';
import { useQuery } from 'react-query';
import { BOOKMARK_KINDS, ReactQueryKey } from 'utils/const';

const { TRASH_BIN, SEARCH, FOLDER_DOTORI, ALL_DOTORI } = BOOKMARK_KINDS;

export function getCategoryOfBookmark(
  path: string,
): bookmarks.bookmarkKindItem {
  switch (path) {
    case 'main':
      return ALL_DOTORI;
    case 'trash':
      return TRASH_BIN;
    case 'search':
      return SEARCH;
    default:
      return FOLDER_DOTORI;
  }
}

export function useBookmarkQuery(
  bookmarkItem: bookmarks.bookmarkKindItem,
  page: number,
  filter: bookmarks.BookmarkFilterType,
  remind: boolean,
  keyword?: string,
  folderId?: ItemId,
): typeof query {
  const searchKeyword = keyword || '';
  const folderIdKey = folderId || '';
  const detailInfo = searchKeyword || folderIdKey || 'normal';

  function getBookmarkAPI(bookmarkKind: bookmarks.bookmarkKindItem) {
    switch (bookmarkKind.kind) {
      case TRASH_BIN.kind:
        return getTrashBookmark(page, bookmarkKind.numOfPage, filter, remind);
      case SEARCH.kind:
        return getSearchBookmark(
          searchKeyword,
          page,
          bookmarkKind.numOfPage,
          filter,
          remind,
        );
      case FOLDER_DOTORI.kind:
        return getFolderBookmark(
          folderIdKey,
          page,
          bookmarkKind.numOfPage,
          filter,
          remind,
        );
      case ALL_DOTORI.kind:
        return getAllBookmark(page, bookmarkKind.numOfPage, filter, remind);
      default:
        return undefined;
    }
  }

  const query = useQuery(
    ReactQueryKey.bookmarkContents(
      bookmarkItem.kind,
      detailInfo,
      page,
      remind,
      filter,
    ),
    () => getBookmarkAPI(bookmarkItem),
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      retry: false,
    },
  );

  return query;
}
