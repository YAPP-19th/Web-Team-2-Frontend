import { X16Icon } from 'assets/icons';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import Picker, { IEmojiData } from 'emoji-picker-react';
import useToggle from 'hooks/common/useToggle';

interface FolderRenameModalProps {
  position: {
    top: number;
    left: number;
  };
  onToggleModal: () => void;
}

const FolderRenameModalWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  width: 100%;
  height: 100%;
`;

const RenameModalInner = styled.div<{ top: number; left: number }>`
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.color.white};
  position: fixed;
  z-index: 9999;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left + 20}px;
  height: 66px;
  width: 316px;
  padding: 4px 8px;
`;

const CloseBlock = styled.div`
  overflow: hidden;
`;

const CloseButton = styled.button`
  float: right;
`;

const FormBlock = styled.div`
  display: flex;
  align-items: center;
`;

const EmojiPicker = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.color.grayLight};
  cursor: pointer;
  margin-right: 4px;
`;

const EmojiIcon = styled.span`
  font-size: 18px;
`;

const FolderNameInput = styled.input``;

const RenameButton = styled.button``;

function FolderRenameModal({
  position,
  onToggleModal,
}: FolderRenameModalProps): ReactElement {
  const { top, left } = position;
  const [emojiPickerVisible, onEmojiPickerToggle] = useToggle();
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null);

  const onEmojiClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData,
  ) => {
    setChosenEmoji(emojiObject);
    onEmojiPickerToggle();
  };

  return (
    <FolderRenameModalWrapper onClick={onToggleModal}>
      <RenameModalInner
        top={top}
        left={left}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseBlock>
          <CloseButton onClick={onToggleModal}>
            <X16Icon />
          </CloseButton>
        </CloseBlock>

        <FormBlock>
          <EmojiPicker onClick={onEmojiPickerToggle}>
            <EmojiIcon>{chosenEmoji ? chosenEmoji.emoji : ''}</EmojiIcon>
          </EmojiPicker>
        </FormBlock>

        {emojiPickerVisible && <Picker onEmojiClick={onEmojiClick} />}
      </RenameModalInner>
    </FolderRenameModalWrapper>
  );
}

export default FolderRenameModal;
