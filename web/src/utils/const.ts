import { bookmarks } from 'models/bookmark';

export enum LOCAL_STORAGE_KEY {
  USER_TOKEN = 'userToken',
  USER_BASE_INFO = 'userBaseInfo',
  USER_REMIND_INFO = 'userRemindInfo',
}

export enum QueryKey {
  BOOKMARK_CONTENTS = 'bookmarkContents',
  REMIND_CONTENTS = 'remindContents',
  SUBFOLDER_CONTENTS = 'subfolderContents',
  PAGE_PATH_CONTENTS = 'pagePathContents',
  FOLDER_CONTENTS = 'folderContents',
  NEW_REMIND_ALARM_CONTENTS = 'newRemindAlarmContents',
}

export const ReactQueryKey = {
  bookmarkContents: (
    kind: string,
    detailInfo: string | number,
    page: number,
    remind: boolean,
    filter: bookmarks.BookmarkFilterType,
  ) =>
    [
      QueryKey.BOOKMARK_CONTENTS,
      kind,
      detailInfo,
      page,
      remind,
      filter,
    ] as const,
  remindContents: () => [QueryKey.REMIND_CONTENTS] as const,
  subFolderContents: (detailInfo: string | number) =>
    [QueryKey.SUBFOLDER_CONTENTS, detailInfo] as const,
  pagePathContents: (detailInfo: string | number) =>
    [QueryKey.PAGE_PATH_CONTENTS, detailInfo] as const,
  folderContents: () => [QueryKey.FOLDER_CONTENTS] as const,
  newRemindAlarmContents: () => [QueryKey.NEW_REMIND_ALARM_CONTENTS] as const,
};

export enum NumOfBookmarkPerPage {
  TRASH_BIN = 12,
  SEARCH = 12,
  ALL_DOTORI = 9,
  FOLDER_DOTORI = 9,
}

export const BOOKMARK_KINDS = {
  TRASH_BIN: { kind: 'trash', numOfPage: 12 } as const,
  SEARCH: { kind: 'search', numOfPage: 12 } as const,
  ALL_DOTORI: { kind: 'allDotori', numOfPage: 9 } as const,
  FOLDER_DOTORI: { kind: 'folderDotori', numOfPage: 9 } as const,
};

export enum BookmarkFilterTypes {
  LATEST_ORDER = 'saveTime,desc',
  OLDEST_ORDER = 'saveTime,asc',
  FREQUENTLY_VISITED = 'clickCount,desc',
  LESS_VISITED = 'clickCount,asc',
}

export const DEFAULT_IMAGE_FILE_NAME = '선택된 파일 없음';

export const MAX_FOLDERS_LENGTH = 8;
