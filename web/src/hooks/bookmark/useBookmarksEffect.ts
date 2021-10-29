import mockData from 'components/bookmark/data/bookmarkMock.json';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { bookmarksState } from 'recoil/atoms/bookmarkState';

export default function useBookmarksEffect(): void {
  const setBookmarks = useSetRecoilState(bookmarksState);

  useEffect(() => {
    setBookmarks(mockData.bookmarks);
  }, []);
}
