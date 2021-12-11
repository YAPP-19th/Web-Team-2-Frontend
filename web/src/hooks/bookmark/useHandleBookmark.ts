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
  onDeleteBookmark: (id: string) => Promise<void>;
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

  const onDeleteBookmark = async (id: string) => {
    console.log(id);
    try {
      await deleteBookmark(id);
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
