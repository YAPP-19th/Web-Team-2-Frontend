import { Client } from 'api/http';
import { remind } from 'models/remind';

export const setRemindCycle = (
  requestData: remind.IRemindSetCycleRequest,
): Promise<remind.IRemindSetCycleResponse> => {
  return Client.postAxios<
    remind.IRemindSetCycleRequest,
    remind.IRemindSetCycleResponse
  >(`api/v1/mypage/remind/cycle`, requestData);
};

export const patchRemindToggle = (
  requestData: remind.IRemindPatchToggleRequest,
): Promise<remind.IRemindPatchToggleResponse> => {
  return Client.patchAxios<
    remind.IRemindPatchToggleRequest,
    remind.IRemindPatchToggleResponse
  >(`api/v1/mypage/remind/toggle`, requestData);
};
