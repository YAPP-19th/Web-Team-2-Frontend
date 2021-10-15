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
  /* width: 62px;
  height: 90px; */
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
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
  span {
    font-size: 10px;
  }
`;

function FolderMenu({ top, left }: FolderMenuProps): ReactElement {
  const onReset = useResetRecoilState(folderMenuState);

  return (
    <FolderMenuWrapper onClick={onReset}>
      <MenuInner top={top} left={left} onClick={(e) => e.stopPropagation()}>
        <MenuItem>
          <span>이름 변경</span>
        </MenuItem>
        <MenuItem>
          <span>이동</span>
        </MenuItem>
        <MenuItem>
          <span>삭제</span>
        </MenuItem>
      </MenuInner>
    </FolderMenuWrapper>
  );
}

export default FolderMenu;
