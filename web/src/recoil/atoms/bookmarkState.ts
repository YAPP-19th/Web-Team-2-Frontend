import { bookmarks } from 'models/bookmark';
import { atom } from 'recoil';

export const bookmarksState = atom<bookmarks.IBookmark[]>({
  key: 'bookmarksState',
  default: [],
});

export const selectedBookmarksState = atom<bookmarks.IBookmark[]>({
  key: 'selectedBookmarksState',
  default: [],
});
