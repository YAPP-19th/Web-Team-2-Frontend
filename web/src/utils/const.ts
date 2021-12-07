export enum LOCAL_STORAGE_KEY {
  USER_INFO = 'userInfo',
}

export enum QueryKey {
  BOOKMARK_CONTENTS = 'bookmarkContents',
}

export const ReactQueryKey = {
  bookmarkContents: (kind: string, page: number) =>
    [QueryKey.BOOKMARK_CONTENTS, kind, page] as const,
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
