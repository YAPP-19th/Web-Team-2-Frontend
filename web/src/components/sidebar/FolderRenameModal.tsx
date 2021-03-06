import { FolderIcon, X16Icon } from 'assets/icons';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { EmojiPicker, EmojiObject, Emoji } from 'react-twemoji-picker';
import EmojiData from 'react-twemoji-picker/data/twemoji.json';
import 'react-twemoji-picker/dist/EmojiPicker.css';
import { ISelectedFolder } from 'recoil/atoms/folderState';
import { ItemId } from '@atlaskit/tree';
import SimpleInput from 'components/common/SimpleInput';
import SimpleButton from 'components/common/SimpleButton';
import { IPositionStyle } from './FolderList';

interface FolderRenameModalProps {
  positionStyle: IPositionStyle;
  onToggleModal: () => void;
  onChangeFolderInfo: (ItemId: ItemId, name: string, emoji: string) => void;
  selectedFolder: ISelectedFolder;
}

const FolderRenameModalWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  width: 100%;
  height: 100%;
  .emoji-picker {
    // 이모지 라이브러리 스타일 수정
    .emoji-picker-scroll .emoji-picker-category-title {
      font-size: 12px;
    }
    .emoji-picker-emoji {
      height: 25px;
    }
  }
`;

const RenameModalInner = styled.div<IPositionStyle>`
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
  margin-bottom: 3px;
`;

const CloseButton = styled.button`
  float: right;
`;

const FormBlock = styled.div`
  display: flex;
  align-items: center;
`;

const EmojiBox = styled.div`
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

const EmojiIcon = styled(Emoji)`
  width: 18px;
  height: 18px;
`;

const FolderNameInput = styled(SimpleInput)`
  font-size: 12px;
  line-height: 1.42;
  color: ${(props) => props.theme.color.grayDarkest};
  margin-right: 4px;
`;

const RenameButton = styled(SimpleButton)`
  font-size: 12px;
`;

const FolderIconStyled = styled(FolderIcon)`
  width: 18px;
  height: 18px;
`;

function FolderRenameModal({
  positionStyle,
  onToggleModal,
  onChangeFolderInfo,
  selectedFolder,
}: FolderRenameModalProps): ReactElement {
  const { top, left } = positionStyle;
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState(selectedFolder.name);
  const [chosenEmoji, setChosenEmoji] = useState<EmojiObject>({
    unicode: selectedFolder.emoji, // api 연동되면 이 부분을 설정된 폴더 이모지로 설정
    name: 'emoji',
  });

  const emojiData = Object.freeze(EmojiData);

  const onEmojiSelect = (emoji: EmojiObject) => {
    setEmojiPickerVisible(!emojiPickerVisible);
    setChosenEmoji(emoji);
  };

  const onToggleEmojiPicker = (
    e: React.MouseEvent<HTMLDivElement>,
    isEmojiPickerVisible: boolean,
  ) => {
    e.stopPropagation();
    setEmojiPickerVisible(isEmojiPickerVisible);
  };

  const onChangeFolderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(e.target.value);
  };

  const onSubmitFolderInfo = () => {
    onChangeFolderInfo(selectedFolder.id, newFolderName, chosenEmoji.unicode);
    onToggleModal();
  };

  return (
    <FolderRenameModalWrapper onClick={onToggleModal}>
      <RenameModalInner
        top={top}
        left={left}
        onClick={(e) => onToggleEmojiPicker(e, false)}
      >
        <CloseBlock>
          <CloseButton onClick={onToggleModal}>
            <X16Icon />
          </CloseButton>
        </CloseBlock>

        <FormBlock>
          <EmojiBox
            onClick={(e) => onToggleEmojiPicker(e, !emojiPickerVisible)}
          >
            {chosenEmoji.unicode ? (
              <EmojiIcon
                emoji={{ name: chosenEmoji.name, unicode: chosenEmoji.unicode }}
              />
            ) : (
              <FolderIconStyled />
            )}
          </EmojiBox>

          <FolderNameInput
            type="text"
            width="192px"
            height="28px"
            value={newFolderName}
            onChange={onChangeFolderName}
          />

          <RenameButton
            variant="primary"
            width="72px"
            height="28px"
            label="변경"
            onClick={onSubmitFolderInfo}
          />
        </FormBlock>

        {emojiPickerVisible && (
          <EmojiPicker emojiData={emojiData} onEmojiSelect={onEmojiSelect} />
        )}
      </RenameModalInner>
    </FolderRenameModalWrapper>
  );
}

export default FolderRenameModal;
