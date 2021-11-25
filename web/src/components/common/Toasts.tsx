import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { RequiredKeys } from 'utility-types';

interface IEmojis {
  smile: string;
  sad: string;
  clock: string;
}

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

type IToasts = {
  [key in ToastsTypes]: {
    text: string;
    size: 'small' | 'big';
    emoji: RequiredKeys<IEmojis>;
  };
};

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

const Emoji = styled.img`
  width: 18px;
`;

const ToastsMessage = styled.span`
  margin: 0 6px;
`;

function Toasts({ type }: { type: ToastsTypes }): ReactElement {
  const toasts: IToasts = {
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

  const emojis: IEmojis = {
    smile: 'https://abs-0.twimg.com/emoji/v2/svg/1f600.svg',
    sad: 'https://abs-0.twimg.com/emoji/v2/svg/1f61e.svg',
    clock: 'https://abs-0.twimg.com/emoji/v2/svg/1f552.svg',
  };

  const { text, size, emoji } = toasts[type];

  return (
    <ToastsStyled size={size}>
      <Emoji src={emojis[emoji]} alt={text} />
      <ToastsMessage>{text}</ToastsMessage>
      <Emoji src={emojis[emoji]} alt={text} />
    </ToastsStyled>
  );
}

export default Toasts;
