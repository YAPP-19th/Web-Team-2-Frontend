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

function SideBar(): ReactElement {
  return (
    <SideBarWrapper>
      <FolderList />
    </SideBarWrapper>
  );
}

export default SideBar;
