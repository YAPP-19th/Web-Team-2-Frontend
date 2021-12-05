import { getTrashBookmark } from 'api/bookmarkAPI';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { bookmarksState } from 'recoil/atoms/bookmarkState';
import { ReactQueryKey } from 'utils/const';

export default function useBookmarksEffect(path: string): void {
  const setBookmarks = useSetRecoilState(bookmarksState);

  const { data, isLoading } = useQuery(
    ReactQueryKey.bookmarkContents(1),
    () => getTrashBookmark(1),
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  );

  useEffect(() => {
    // path === "main"  이면 전체 도토리
    // path === "trash" 이면 휴지통
    // path === "123123" 이면 특정 폴더
    async function temp() {
      // eslint-disable-next-line no-console
      console.log(path);
      // const data = await getTrashBookmark();

      console.log(data);

      setBookmarks(data?.content || []);
    }
    if (path) temp();
  }, [path, data]);
}
