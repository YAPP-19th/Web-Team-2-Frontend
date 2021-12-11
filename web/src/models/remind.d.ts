/* eslint-disable @typescript-eslint/no-empty-interface */
export namespace remind {
  export interface IRemindSetCycleRequest {
    remindCycle: string;
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
    fcmToken: string[];
    image: string;
    saveTime: string;
  }
  export interface IRemindListResponse {
    remindBookmarkList: IRemindInfo[];
  }

  export interface IRemindDeleteResponse {}
}
