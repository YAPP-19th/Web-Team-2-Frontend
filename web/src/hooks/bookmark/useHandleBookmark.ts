/* eslint-disable no-console */
import { deleteBookmark, updateBookmark } from 'api/bookmarkAPI';
import { useQueryClient } from 'react-query';
import { QueryKey } from 'utils/const';

interface IUseHandleBookmark {
  onEditBookmark: (
    bookmarkId: string,
    title: string,
    remind: boolean,
  ) => Promise<void>;
  onDeleteBookmark: (bookmarkIdList: string[]) => Promise<void>;
}

export default function useHandleBookmark(): IUseHandleBookmark {
  // try catch -> query로 수정 예정
  const queryClient = useQueryClient();

  const onEditBookmark = async (
    bookmarkId: string,
    title: string,
    remind: boolean,
  ) => {
    try {
      await updateBookmark(bookmarkId, {
        title,
        remind,
      });
      queryClient.invalidateQueries(QueryKey.BOOKMARK_CONTENTS);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteBookmark = async (bookmarkIdList: string[]) => {
    console.log(bookmarkIdList);
    try {
      await deleteBookmark(bookmarkIdList);
      queryClient.invalidateQueries(QueryKey.BOOKMARK_CONTENTS);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    onEditBookmark,
    onDeleteBookmark,
  };
}
