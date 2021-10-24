import { PlusWhiteIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import AllFolder from './AllFolder';
import FolderList from './FolderList';
import TrashBox from './TrashBox';

const SideBarWrapper = styled.div`
  width: 170px; // 정확한 값을 추후에 서정님에게 물어봐야 할 거 같음
  padding: 20px 0;
  position: relative;
  background-color: ${(props) => props.theme.color.white0};
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
    color: ${(props) => props.theme.color.white0};
  }
`;

function SideBar(): ReactElement {
  return (
    <SideBarWrapper>
      <AllFolder />
      <FolderList />

      <StorageBox>
        <StorageButton type="button">
          <PlusWhiteIcon />
          <span>보관함 추가</span>
        </StorageButton>
      </StorageBox>
      <TrashBox />
    </SideBarWrapper>
  );
}

export default SideBar;
