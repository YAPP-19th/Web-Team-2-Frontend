import React, { ReactElement } from 'react';
import { useResetRecoilState } from 'recoil';
import { folderMenuState } from 'recoil/atoms/folderState';
import styled from 'styled-components';

interface FolderMenuProps {
  top: number;
  left: number;
}

const FolderMenuWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  width: 100%;
  height: 100%;
`;

const MenuInner = styled.div<{ top: number; left: number }>`
  background-color: red;
  width: 80px;
  height: 116px;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 9999;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left + 20}px;
`;

function FolderMenu({ top, left }: FolderMenuProps): ReactElement {
  const onReset = useResetRecoilState(folderMenuState);

  return (
    <FolderMenuWrapper onClick={onReset}>
      <MenuInner top={top} left={left} onClick={(e) => e.stopPropagation()}>
        FolderMenu
      </MenuInner>
    </FolderMenuWrapper>
  );
}

export default FolderMenu;
