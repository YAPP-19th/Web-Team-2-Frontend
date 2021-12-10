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
}
