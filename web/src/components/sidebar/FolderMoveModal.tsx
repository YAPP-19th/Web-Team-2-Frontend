import FolderListInModal from 'components/common/FolderListInModal';
import ModalTemplate from 'components/common/ModalTemplate';
import SimpleButton from 'components/common/SimpleButton';
import React, { ReactElement, useRef } from 'react';
import PagePath from 'components/pagePath';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { selectedFolderState } from 'recoil/atoms/folderState';
import useFoldersHandle from 'hooks/folder/useFoldersHandle';

interface FolderMoveModalProps {
  isModal: boolean;
  onToggleModal: () => void;
  onMoveBookmark?: () => void;
}

const ModalInner = styled.div`
  padding: 16px 28px 22px 20px;
`;

const ModalTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.color.grayDarkest};
  line-height: 1.5;
  margin-bottom: 8px;
`;

const PathBox = styled.div`
  height: 16px;
`;

const FolderListBox = styled.div`
  width: 408px;
  height: 303px;
  overflow-y: scroll;
  border: 0.031rem solid ${(props) => props.theme.color.gray};
  border-radius: 6px;
  padding: 9.5px 0 0 10px;
  margin-top: 8px;
  margin-bottom: 18px;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.color.white};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.color.grayLight};
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CancelButton = styled(SimpleButton)`
  margin-right: 12px;
  font-size: 12px;
`;

const MoveButton = styled(SimpleButton)`
  font-size: 12px;
  font-weight: 400;
`;

function FolderMoveModal({
  isModal,
  onToggleModal,
  onMoveBookmark,
}: FolderMoveModalProps): ReactElement {
  const selectedFolder = useRecoilValue(selectedFolderState);
  const prevFolderId = useRef(selectedFolder.id);
  const { onMoveFolder } = useFoldersHandle();

  const onMove = () => {
    if (onMoveBookmark) {
      onMoveBookmark();
    } else {
      onMoveFolder(prevFolderId.current, selectedFolder.id);
    }
    onToggleModal();
  };

  return (
    <ModalTemplate
      isModal={isModal}
      onToggleModal={onToggleModal}
      width="456px"
      height="440px"
    >
      <ModalInner>
        <ModalTitle>위치 선택</ModalTitle>
        <PathBox>
          <PagePath folderId={selectedFolder.id as string} />
        </PathBox>
        <FolderListBox>
          <FolderListInModal />
        </FolderListBox>
        <ButtonGroup>
          <CancelButton
            variant="tertiary"
            width="63px"
            height="26px"
            label="취소"
            onClick={onToggleModal}
          />

          <MoveButton
            variant="primary"
            width="63px"
            height="26px"
            label="확인"
            onClick={onMove}
          />
        </ButtonGroup>
      </ModalInner>
    </ModalTemplate>
  );
}

export default FolderMoveModal;
