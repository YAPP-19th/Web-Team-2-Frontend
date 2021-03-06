/* eslint-disable no-console */
import { ItemId } from '@atlaskit/tree';
import {
  deleteBookmark,
  moveBookmark,
  restoreBookmark,
  truncateBookmark,
  updateBookmark,
} from 'api/bookmarkAPI';
import { useQueryClient } from 'react-query';
import { QueryKey } from 'utils/const';

interface IUseHandleBookmark {
  onEditBookmark: (
    bookmarkId: string,
    title: string,
    remind: boolean,
  ) => Promise<void>;
  onDeleteBookmark: (bookmarkIdList: string[]) => Promise<void>;
  onMoveBookmark: (
    bookmarkIdList: string[],
    nextFolderId: ItemId,
  ) => Promise<void>;
  onRestoreBookmark: (bookmarkIdList: string[]) => Promise<void>;
  onTruncateBookmark: (bookmarkIdList: string[]) => Promise<void>;
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
      queryClient.invalidateQueries(QueryKey.REMIND_CONTENTS);
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

  const onMoveBookmark = async (
    bookmarkIdList: string[],
    nextFolderId: ItemId,
  ) => {
    console.log(bookmarkIdList, nextFolderId);
    try {
      const requestData = {
        bookmarkIdList,
        nextFolderId,
      };
      await moveBookmark(requestData);
      queryClient.invalidateQueries(QueryKey.BOOKMARK_CONTENTS);
    } catch (e) {
      console.log(e);
    }
  };

  const onRestoreBookmark = async (bookmarkIdList: string[]) => {
    console.log(bookmarkIdList);
    try {
      const requestData = {
        bookmarkIdList,
      };
      await restoreBookmark(requestData);
      queryClient.invalidateQueries(QueryKey.BOOKMARK_CONTENTS);
    } catch (e) {
      console.log(e);
    }
  };

  const onTruncateBookmark = async (bookmarkIdList: string[]) => {
    console.log(bookmarkIdList);
    try {
      const requestData = {
        bookmarkIdList,
      };
      await truncateBookmark(requestData);
      queryClient.invalidateQueries(QueryKey.BOOKMARK_CONTENTS);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    onEditBookmark,
    onDeleteBookmark,
    onMoveBookmark,
    onRestoreBookmark,
    onTruncateBookmark,
  };
}
