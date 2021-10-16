import { PlusWhiteIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import FolderList from './FolderList';

const SideBarWrapper = styled.div`
  width: 240px; // 정확한 값을 추후에 서정님에게 물어봐야 할 거 같음
  padding: 20px 0;
  position: relative;
  background-color: #fff;
  overflow: auto;
`;

const StorageBox = styled.div`
  margin-bottom: 40px;
`;

const StorageButton = styled.button`
  width: 166px;
  height: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.primary};
  svg {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
  }
  span {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }
`;

function SideBar(): ReactElement {
  return (
    <SideBarWrapper>
      <FolderList />

      <StorageBox>
        <StorageButton type="button">
          <PlusWhiteIcon />
          <span>보관함 추가</span>
        </StorageButton>
      </StorageBox>
    </SideBarWrapper>
  );
}

export default SideBar;
