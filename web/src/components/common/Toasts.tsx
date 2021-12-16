import transitions from 'assets/styles/transitions';
import React, { ReactElement, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { RequiredKeys } from 'utility-types';
import { EMOJI_URL } from 'utils/config';
import { toasts } from 'utils/toasts';

export interface IEmojis {
  smile: string;
  sad: string;
  clock: string;
}

interface ToastsProps {
  type?: ToastsTypes;
  isOpen: boolean;
  customMessage?: string;
  customEmoji?: RequiredKeys<IEmojis>;
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

export type ToastSizeTypes = 'small' | 'big';

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

function Toasts({
  type,
  isOpen,
  customEmoji,
  customMessage,
}: ToastsProps): ReactElement | null {
  const emojis: IEmojis = {
    smile: `${EMOJI_URL}/1f600.svg`,
    sad: `${EMOJI_URL}/1f625.svg`,
    clock: `${EMOJI_URL}/23f0.svg`,
  };

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
    <>
      {customMessage && customEmoji && (
        <ToastsStyled size="big" isOpen={isOpen}>
          <EmojiIcon src={emojis[customEmoji]} alt={customMessage} />
          <ToastsMessage>{customMessage}</ToastsMessage>
          <EmojiIcon src={emojis[customEmoji]} alt={customMessage} />
        </ToastsStyled>
      )}
      {type && (
        <ToastsStyled size={toasts[type].size} isOpen={isOpen}>
          <EmojiIcon src={emojis[toasts[type].emoji]} alt={toasts[type].text} />
          <ToastsMessage>{toasts[type].text}</ToastsMessage>
          <EmojiIcon src={emojis[toasts[type].emoji]} alt={toasts[type].text} />
        </ToastsStyled>
      )}
    </>
  );
}

export default Toasts;
