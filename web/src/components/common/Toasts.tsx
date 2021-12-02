import transitions from 'assets/styles/transitions';
import React, { ReactElement, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { RequiredKeys } from 'utility-types';
import { EMOJI_URL } from 'utils/config';

interface IEmojis {
  smile: string;
  sad: string;
  clock: string;
}

interface ToastsProps {
  type: ToastsTypes;
  isOpen: boolean;
}

export type ToastsTypes =
  | 'remindSetting'
  | 'remindDisabled'
  | 'remindRecommendation'
  | 'copyLink'
  | 'createFolderError'
  | 'cabinetIsFull'
  | 'folderIsFull'
  | 'editProfile'
  | 'changePassword';

type ToastSizeTypes = 'small' | 'big';

interface ToastsListProperty {
  readonly text: string;
  readonly size: ToastSizeTypes;
  readonly emoji: RequiredKeys<IEmojis>;
}

type ToastListType = {
  [key in ToastsTypes]: ToastsListProperty;
};

interface IToastsStyledProps {
  size: ToastSizeTypes;
  isOpen: boolean;
}

const ToastsStyled = styled.div<IToastsStyledProps>`
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
  z-index: 9999;
  color: ${(props) => props.theme.color.white};

  ${(props) =>
    props.isOpen
      ? css`
          animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
        `
      : css`
          animation: ${transitions.popOutToBottom} 0.2s forwards ease-in-out;
        `}
`;

const EmojiIcon = styled.img`
  width: 18px;
`;

const ToastsMessage = styled.span`
  margin: 0 6px;
`;

function Toasts({ type, isOpen }: ToastsProps): ReactElement | null {
  const toasts: ToastListType = {
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
    smile: `${EMOJI_URL}/1f600.svg`,
    sad: `${EMOJI_URL}/1f625.svg`,
    clock: `${EMOJI_URL}/23f0.svg`,
  };

  const { text, size, emoji } = toasts[type];
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (isOpen) {
      setClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true);
      }, 200);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId); // 이미 timeoutId가 작동하고 있으면 함수 실행안되게 방지
    };
  }, [isOpen]);

  if (!isOpen && closed) return null;

  return (
    <ToastsStyled size={size} isOpen={isOpen}>
      <EmojiIcon src={emojis[emoji]} alt={text} />
      <ToastsMessage>{text}</ToastsMessage>
      <EmojiIcon src={emojis[emoji]} alt={text} />
    </ToastsStyled>
  );
}

export default Toasts;
