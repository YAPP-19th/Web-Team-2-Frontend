import React, { ReactElement } from 'react';
import { useResetRecoilState } from 'recoil';
import { folderMenuState } from 'recoil/atoms/folderState';
import styled from 'styled-components';

interface FolderMenuProps {
  top: number;
  left: number;
  onToggleDeleteModal: () => void;
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
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.color.white0};
  position: fixed;
  z-index: 9999;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left + 20}px;
`;

const MenuItem = styled.div`
  width: 62px;
  height: 29px;
  padding: 7px 2px 7px 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:hover {
    background-color: #f3f2ef;
    cursor: pointer;
  }
`;

const MenuItemButton = styled.div`
  font-size: 10px;
`;

function FolderMenu({
  top,
  left,
  onToggleDeleteModal,
}: FolderMenuProps): ReactElement {
  const onReset = useResetRecoilState(folderMenuState);

  return (
    <>
      <FolderMenuWrapper onClick={onReset}>
        <MenuInner top={top} left={left} onClick={(e) => e.stopPropagation()}>
          <MenuItem>
            <MenuItemButton>이름 변경</MenuItemButton>
          </MenuItem>
          <MenuItem>
            <MenuItemButton>이동</MenuItemButton>
          </MenuItem>
          <MenuItem
            onClick={() => {
              onToggleDeleteModal();
              onReset();
            }}
          >
            <MenuItemButton>삭제</MenuItemButton>
          </MenuItem>
        </MenuInner>
      </FolderMenuWrapper>
    </>
  );
}

export default FolderMenu;
