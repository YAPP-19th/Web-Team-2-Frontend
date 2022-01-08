/* eslint-disable @typescript-eslint/no-empty-interface */
export namespace remind {
  export interface IRemindSetCycleRequest {
    remindCycle: number;
  }

  export interface IRemindSetCycleResponse {}

  export interface IRemindPatchToggleRequest {
    remindToggle: boolean;
  }

  export interface IRemindPatchToggleResponse {}

  export interface IRemindListRequest {}

  export interface IRemindInfo {
    userId: number;
    folderId: number;
    link: stringl;
    id: string;
    title: string;
    remindTime: null | string;
    clickCount: number;
    deleteTime: null | string;
    delete: false;
    description: string;
    image: string;
    saveTime: string;
  }
  export interface IRemindListResponse {
    remindBookmarkList: IRemindInfo[];
  }

  export interface NewRemindAlarm {
    id: string;
    title: string;
    pushTime: string;
  }

  export interface INewRemindAlarmListResponse {
    contents: NewRemindAlarm[];
  }

  export interface IRemindDeleteResponse {}

  export interface IReadRemindAlarmListRequest {
    bookmarkIdList: string[];
  }

  export interface IReadRemindAlarmListResponse {}
}
