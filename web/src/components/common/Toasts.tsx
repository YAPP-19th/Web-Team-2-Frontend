import React, { ReactElement } from 'react';
import styled from 'styled-components';

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

interface ToastsProps {
  type: ToastsTypes;
}

interface IToasts {
  [key: string]: {
    text: string;
    size: 'small' | 'big';
  };
}

const ToastsStyled = styled.div<{ size: 'big' | 'small' }>`
  width: ${(props) => (props.size === 'big' ? '471px' : '273px')};
  height: 42px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  position: fixed;
  bottom: 140px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.theme.color.white};
`;

function Toasts({ type }: ToastsProps): ReactElement {
  const toasts: IToasts = {
    remindSetting: {
      text: '리마인드 알림이 설정됐어요!',
      size: 'small',
    },
    remindDisabled: {
      text: '리마인드 알림이 해제됐어요!',
      size: 'small',
    },
    remindRecommendation: {
      text: '마이페이지에서 알람을 ON으로 설정해주세요!',
      size: 'big',
    },
    copyLink: {
      text: '링크를 복사했어요!',
      size: 'small',
    },
    createFolderError: {
      text: '만들 수 있는 폴더 개수를 초과했어요!',
      size: 'big',
    },
    cabinetIsFull: {
      text: '이 보관함은 이미 가득 찼어요!',
      size: 'small',
    },
    folderIsFull: {
      text: '이 폴더는 이미 가득 찼어요!',
      size: 'small',
    },
    editProfile: {
      text: '프로필 정보를 수정했어요!',
      size: 'small',
    },
    changePassword: {
      text: '비밀번호를 변경했어요!',
      size: 'small',
    },
  };

  const { text, size } = toasts[type];

  return <ToastsStyled size={size}>{text}</ToastsStyled>;
}

export default Toasts;
