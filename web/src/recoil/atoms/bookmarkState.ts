import { atom } from 'recoil';

export interface IBookmark {
  id: number;
  title: string;
  url: string;
  description: string;
  remind: boolean;
  nickname?: string;
  folder?: string;
}

export const bookmarksState = atom<IBookmark[]>({
  key: 'bookmarksState',
  default: [],
});
