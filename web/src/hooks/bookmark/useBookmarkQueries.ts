/* eslint-disable no-console */
import { ItemId } from '@atlaskit/tree';
import {
  deleteBookmark,
  getAllBookmark,
  getFolderBookmark,
  getSearchBookmark,
  getTrashBookmark,
  moveBookmark,
  updateBookmark,
} from 'api/bookmarkAPI';
import { bookmarks } from 'models/bookmark';
import { useMutation, useQuery } from 'react-query';
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
  filter: string,
  remind: boolean,
  keyword?: string,
  folderId?: ItemId,
): typeof query {
  function getBookmarkAPI(bookmarkKind: bookmarks.bookmarkKindItem) {
    const searchKeyword = keyword || '';
    const folderIdKey = folderId || '';
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
    ReactQueryKey.bookmarkContents(bookmarkItem.kind, page),
    () => getBookmarkAPI(bookmarkItem),
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  );

  return query;
}

export function useBookmarkMutationQuery(bookmarkId: string): typeof mutations {
  const { mutate: mutateBookmarkDelete } = useMutation(
    () => deleteBookmark(bookmarkId),
    {
      onSuccess: () => {
        console.log('success');
      },
      onError: () => {
        console.log('error');
      },
      onSettled: () => {
        console.log('settle');
      },
    },
  );

  const { mutate: mutateBookmarkMove } = useMutation(
    (requestData: bookmarks.IBookmarkMoveRequest) =>
      moveBookmark(bookmarkId, requestData),
    {
      onSuccess: () => {
        console.log('success');
      },
      onError: () => {
        console.log('error');
      },
      onSettled: () => {
        console.log('settle');
      },
    },
  );

  const { mutate: mutateBookmarkUpdate } = useMutation(
    (requestData: bookmarks.IBookmarkUpdateRequest) =>
      updateBookmark(bookmarkId, requestData),
    {
      onSuccess: () => {
        console.log('success');
      },
      onError: () => {
        console.log('error');
      },
      onSettled: () => {
        console.log('settle');
      },
    },
  );

  const mutations = {
    mutateBookmarkDelete,
    mutateBookmarkMove,
    mutateBookmarkUpdate,
  };

  return mutations;
}
