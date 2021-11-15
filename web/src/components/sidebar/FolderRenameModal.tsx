import React, { ReactElement } from 'react';
import styled from 'styled-components';

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
`;

const RenameForm = styled.div`
  height: 66px;
  width: 316px;
`;

function FolderRenameModal({
  position,
  onToggleModal,
}: FolderRenameModalProps): ReactElement {
  const { top, left } = position;
  return (
    <FolderRenameModalWrapper onClick={onToggleModal}>
      <RenameModalInner top={top} left={left}>
        <RenameForm>asd</RenameForm>
      </RenameModalInner>
    </FolderRenameModalWrapper>
  );
}

export default FolderRenameModal;
