import { atom } from 'recoil';

export interface IBookmark {
  id: string;
  title: string;
  description: string;
  nickname?: string;
  folder?: string;
  link: string;
  remindTime: string | null;
}

export const bookmarksState = atom<IBookmark[]>({
  key: 'bookmarksState',
  default: [],
});

export const selectedBookmarksState = atom<IBookmark[]>({
  key: 'selectedBookmarksState',
  default: [],
});
