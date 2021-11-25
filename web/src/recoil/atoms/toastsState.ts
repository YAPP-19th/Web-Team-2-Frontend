import { atom } from 'recoil';

type ToastsTypes =
  | 'remindSetting'
  | 'remindDisabled'
  | 'remindRecommendation'
  | 'copyLink'
  | 'createFolderError'
  | 'cabinetIsFull'
  | 'folderIsFull'
  | 'editProfile'
  | 'changePassword';

interface IToastsState {
  isOpen: boolean;
  type: ToastsTypes;
}

const initialState: IToastsState = {
  isOpen: false,
  type: 'remindSetting',
};

export const toastsState = atom({
  key: 'toastsState',
  default: initialState,
});
