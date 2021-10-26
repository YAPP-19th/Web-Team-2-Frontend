import { atom } from 'recoil';

interface IBookmark {
  id: number;
  title: string;
  url: string;
  description: string;
}

export const bookmarksState = atom<IBookmark[]>({
  key: 'bookmarks',
  default: [],
});
