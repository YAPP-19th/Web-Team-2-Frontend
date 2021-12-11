import FolderListInModal from 'components/common/FolderListInModal';
import ModalTemplate from 'components/common/ModalTemplate';
import SimpleButton from 'components/common/SimpleButton';
import React, { ReactElement, useState } from 'react';
import { ArrowSide16Icon } from 'assets/icons';
import styled from 'styled-components';
import AllFolder from './AllFolder';

interface FolderMoveModalProps {
  isModal: boolean;
  onToggleModal: () => void;
  prevFoldeName?: string;
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

const FolderPath = styled.div`
  display: flex;
  margin-bottom: 9px;
  font-size: 12px;
  color: ${(props) => props.theme.color.gray};
`;

const FolderListBox = styled.div`
  width: 408px;
  height: 303px;
  overflow-y: scroll;
  border: 0.031rem solid ${(props) => props.theme.color.gray};
  border-radius: 6px;
  padding: 9.5px 0 0 10px;
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
  prevFoldeName,
}: FolderMoveModalProps): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [folderPath, setFolderPath] = useState([prevFoldeName, '테스트']);

  return (
    <ModalTemplate
      isModal={isModal}
      onToggleModal={onToggleModal}
      width="456px"
      height="440px"
    >
      <ModalInner>
        <ModalTitle>위치 선택</ModalTitle>
        <FolderPath>
          {folderPath.map((path, index) => (
            <React.Fragment key={index}>
              {index === 0 ? '' : <ArrowSide16Icon />}
              {path}
            </React.Fragment>
          ))}
        </FolderPath>
        <FolderListBox>
          <AllFolder />
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
          />
        </ButtonGroup>
      </ModalInner>
    </ModalTemplate>
  );
}

export default FolderMoveModal;
