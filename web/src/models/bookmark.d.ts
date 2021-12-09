/* eslint-disable @typescript-eslint/no-empty-interface */
export namespace bookmarks {
  export interface IBookmark {
    clickCount: number;
    deleteTime: string;
    deleted: boolean;
    description: null | string;
    nickname?: string;
    folder?: string;
    folderId?: number;
    id: string;
    link: string;
    remindTime: null | LocalDateTime;
    saveTime: string;
    title: string;
    userId: number;
  }

  export type bookmarkSortType = {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };

  export type bookmarkPageableType = {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: bookmarkSortType;
    unpaged: boolean;
  };

  export interface IBookmarkGetResponse {
    content: IBookmark[];
    empty: boolean;
    first: true;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: bookmarkPageableType;
    size: number;
    sort: bookmarkSortType;
    totalElements: number;
    totalPages: number;
  }

  export type bookmarkKindItem = {
    kind: string;
    numOfPage: number;
  };

  export interface IBookmarkDeleteResponse {}

  export interface IBookmarkMoveRequest {
    prevFolderId: string;
    nextFolderId: string;
  }

  export interface IBookmarkMoveResponse {}

  export interface IBookmarkUpdateRequest {
    title: string;
    remind: boolean;
  }

  export interface IBookmarkUpdateResponse {}
}
