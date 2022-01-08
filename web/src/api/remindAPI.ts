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

export const getRemindList = (): Promise<remind.IRemindListResponse> => {
  return Client.getAxios<remind.IRemindListResponse>(`api/v1/page/today`);
};

export const deleteRemind = (
  bookmarkId: string,
): Promise<remind.IRemindDeleteResponse> => {
  return Client.deleteAxios<remind.IRemindDeleteResponse>(
    `api/v1/remind/${bookmarkId}`,
  );
};

export const getNewRemindAlarmList =
  (): Promise<remind.INewRemindAlarmListResponse> => {
    return Client.getAxios<remind.INewRemindAlarmListResponse>(`api/v1/remind`);
  };

export const postReadRemindAlarmList = (
  requestData: remind.IReadRemindAlarmListRequest,
): Promise<remind.IReadRemindAlarmListResponse> => {
  return Client.postAxios<
    remind.IReadRemindAlarmListRequest,
    remind.IReadRemindAlarmListResponse
  >(`api/v1/remind`, requestData);
};
