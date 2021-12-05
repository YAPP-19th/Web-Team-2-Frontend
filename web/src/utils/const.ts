export enum LOCAL_STORAGE_KEY {
  USER_INFO = 'userInfo',
}

export enum QueryKey {
  BOOKMARK_CONTENTS = 'bookmarkContents',
}

export const ReactQueryKey = {
  bookmarkContents: (page: number) =>
    [QueryKey.BOOKMARK_CONTENTS, page] as const,
};
