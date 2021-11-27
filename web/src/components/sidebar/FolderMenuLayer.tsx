import { folder } from 'models/folder';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface FolderMenuLayerProps {
  positionStyle: folder.ILayerPosition;
  onToggleModal: {
    onToggleMenuLayer: () => void;
    onToggleDeleteModal: () => void;
    onToggleRenameModal: () => void;
    onToggleMoveModal: () => void;
  };
}

const FolderMenuLayerWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  width: 100%;
  height: 100%;
`;

const MenuInner = styled.div<folder.ILayerPosition>`
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.color.white};
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
    background-color: ${(props) => props.theme.color.grayLightest};
    cursor: pointer;
  }
`;

function FolderMenuLayer({
  positionStyle,
  onToggleModal,
}: FolderMenuLayerProps): ReactElement {
  const { left, top } = positionStyle;
  const {
    onToggleDeleteModal,
    onToggleMenuLayer,
    onToggleMoveModal,
    onToggleRenameModal,
  } = onToggleModal;

  const onMenuClick = (onTogglefunc: () => void) => {
    onTogglefunc();
    onToggleMenuLayer();
  };

  const folderMenus = [
    {
      name: '이름 변경',
      onClick: onToggleRenameModal,
    },
    {
      name: '이동',
      onClick: onToggleMoveModal,
    },
    {
      name: '삭제',
      onClick: onToggleDeleteModal,
    },
  ];

  return (
    <FolderMenuLayerWrapper onClick={onToggleMenuLayer}>
      <MenuInner top={top} left={left} onClick={(e) => e.stopPropagation()}>
        {folderMenus.map((menu) => {
          const { name, onClick } = menu;
          return (
            <MenuItem key={name} onClick={() => onMenuClick(onClick)}>
              {name}
            </MenuItem>
          );
        })}
      </MenuInner>
    </FolderMenuLayerWrapper>
  );
}

export default FolderMenuLayer;
