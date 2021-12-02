import { IEmojis, ToastSizeTypes, ToastsTypes } from 'components/common/Toasts';
import { RequiredKeys } from 'utility-types';

interface ToastsListProperty {
  readonly text: string;
  readonly size: ToastSizeTypes;
  readonly emoji: RequiredKeys<IEmojis>;
}

type ToastListType = {
  [key in ToastsTypes]: ToastsListProperty;
};

export const toasts: ToastListType = {
  remindSetting: {
    text: '리마인드 알림이 설정됐어요!',
    size: 'small',
    emoji: 'clock',
  },
  remindDisabled: {
    text: '리마인드 알림이 해제됐어요!',
    size: 'small',
    emoji: 'clock',
  },
  remindRecommendation: {
    text: '마이페이지에서 알람을 ON으로 설정해주세요!',
    size: 'big',
    emoji: 'clock',
  },
  copyLink: {
    text: '링크를 복사했어요!',
    size: 'small',
    emoji: 'smile',
  },
  createFolderError: {
    text: '만들 수 있는 폴더 개수를 초과했어요!',
    size: 'big',
    emoji: 'sad',
  },
  cabinetIsFull: {
    text: '이 보관함은 이미 가득 찼어요!',
    size: 'small',
    emoji: 'sad',
  },
  folderIsFull: {
    text: '이 폴더는 이미 가득 찼어요!',
    size: 'small',
    emoji: 'sad',
  },
  editProfile: {
    text: '프로필 정보를 수정했어요!',
    size: 'small',
    emoji: 'smile',
  },
  changePassword: {
    text: '비밀번호를 변경했어요!',
    size: 'small',
    emoji: 'smile',
  },
};
