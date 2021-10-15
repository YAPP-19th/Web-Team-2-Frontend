import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface FolderMenuProps {
  top: number;
  left: number;
}

const FolderMenuWrapper = styled.div<{ top: number; left: number }>`
  position: fixed;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left + 20}px;
  z-index: 100;
`;

const MenuInner = styled.div`
  background-color: red;
  width: 80px;
  height: 116px;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
`;

function FolderMenu({ top, left }: FolderMenuProps): ReactElement {
  return (
    <FolderMenuWrapper top={top} left={left}>
      <MenuInner>FolderMenu</MenuInner>
    </FolderMenuWrapper>
  );
}

export default FolderMenu;
