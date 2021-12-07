import { getBookmarks } from 'api/bookmarkAPI';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { bookmarksState } from 'recoil/atoms/bookmarkState';

export default function useBookmarksEffect(path: string): void {
  const setBookmarks = useSetRecoilState(bookmarksState);

  useEffect(() => {
    // path === "main"  이면 전체 도토리
    // path === "trash" 이면 휴지통
    // path === "123123" 이면 특정 폴더
    // async function temp() {
    //   // eslint-disable-next-line no-console
    //   console.log(path);
    //   const data = await getBookmarks();
    //   setBookmarks(data.content);
    // }
    // if (path) temp();
  }, [path]);
}
