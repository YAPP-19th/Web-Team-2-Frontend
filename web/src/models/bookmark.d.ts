import { ItemId } from '@atlaskit/tree';

/* eslint-disable @typescript-eslint/no-empty-interface */
export namespace bookmarks {
  export interface IBookmark {
    clickCount: number;
    deleteTime: string;
    deleted: boolean;
    description: null | string;
    nickname?: string;
    folder?: string;
    folderId?: ItemId;
    id: string;
    link: string;
    remindTime: null | LocalDateTime;
    saveTime: string;
    title: string;
    userId: number;
    image: string;
    checked: boolean;
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

  export interface IBookmarkDeleteRequest {
    idList: string[];
  }

  export interface IBookmarkDeleteResponse {}

  export interface IBookmarkMoveRequest {
    bookmarkIdList: string[];
    nextFolderId: ItemId;
  }

  export interface IBookmarkMoveResponse {}

  export interface IBookmarkUpdateRequest {
    title: string;
    remind: boolean;
  }

  export interface IBookmarkUpdateResponse {}

  export type BookmarkFilterType =
    | 'saveTime,desc'
    | 'saveTime,asc'
    | 'clickCount,desc'
    | 'clickCount,asc';
}
