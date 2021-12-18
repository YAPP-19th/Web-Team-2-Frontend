import FolderListInModal from 'components/common/FolderListInModal';
import ModalTemplate from 'components/common/ModalTemplate';
import SimpleButton from 'components/common/SimpleButton';
import React, { ReactElement } from 'react';
import PagePath from 'components/pagePath';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { selectedFolderState } from 'recoil/atoms/folderState';

interface FolderMoveModalProps {
  isModal: boolean;
  onToggleModal: () => void;
  onClick: () => void;
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
`;

function FolderMoveModal({
  isModal,
  onToggleModal,
  onClick,
}: FolderMoveModalProps): ReactElement {
  const selectedFolder = useRecoilValue(selectedFolderState);

  return (
    <ModalTemplate
      isModal={isModal}
      onToggleModal={onToggleModal}
      width="456px"
      height="440px"
    >
      <ModalInner>
        <ModalTitle>위치 선택</ModalTitle>

        <PagePath folderId={selectedFolder.id as string} />
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

          <SimpleButton
            variant="tertiary"
            width="63px"
            height="26px"
            label="확인"
            onClick={onClick}
          />
        </ButtonGroup>
      </ModalInner>
    </ModalTemplate>
  );
}

export default FolderMoveModal;
