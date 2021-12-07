import { getTrashBookmark } from 'api/bookmarkAPI';
import { bookmarks } from 'models/bookmark';
import { useQuery } from 'react-query';
import { BOOKMARK_KINDS, ReactQueryKey } from 'utils/const';

const { TRASH_BIN, SEARCH, FOLDER_DOTORI, ALL_DOTORI } = BOOKMARK_KINDS;

export function useBookmarkQuery(
  bookmarkItem: bookmarks.bookmarkKindItem,
  page: number,
  filter: string,
  remind: boolean,
): typeof query {
  function getBookmarkAPI(bookmarkKind: bookmarks.bookmarkKindItem) {
    switch (bookmarkKind.kind) {
      case TRASH_BIN.kind:
        return getTrashBookmark(page, bookmarkKind.numOfPage, filter, remind);
      case SEARCH.kind:
        return undefined;
      case FOLDER_DOTORI.kind:
        return undefined;
      case ALL_DOTORI.kind:
        return undefined;
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
