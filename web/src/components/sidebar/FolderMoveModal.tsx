import ModalTemplate from 'components/common/ModalTemplate';
import SimpleButton from 'components/common/SimpleButton';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import FolderList from './FolderList';

interface FolderMoveModalProps {
  isModal: boolean;
  onToggleModal: () => void;
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
  margin-bottom: 9px;
  font-size: 12px;
  color: ${(props) => props.theme.color.gray};
`;

const FolderListBox = styled.div`
  width: 408px;
  height: 303px;
  overflow-y: scroll;
  border: 0.5px solid ${(props) => props.theme.color.gray};
  border-radius: 6px;
  padding: 9.5px 0 0 10px;
  margin-bottom: 18px;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function FolderMoveModal({
  isModal,
  onToggleModal,
}: FolderMoveModalProps): ReactElement {
  return (
    <ModalTemplate
      isModal={isModal}
      onToggleModal={onToggleModal}
      width="456px"
      height="440px"
    >
      <ModalInner>
        <ModalTitle>위치 선택</ModalTitle>
        <FolderPath>모든 도토리 {'>'}</FolderPath>
        <FolderListBox>
          <FolderList />
        </FolderListBox>
        <ButtonGroup>
          <SimpleButton
            variant="tertiary"
            width="63px"
            height="26px"
            label="취소"
            onClick={onToggleModal}
            style={{ marginRight: '12px' }}
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
