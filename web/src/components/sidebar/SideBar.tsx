import React, { ReactElement } from 'react';
import styled from 'styled-components';
import FolderList from './FolderList';

const SideBarWrapper = styled.div`
  width: 240px;
  padding: 20px 0;
  position: relative;
  background-color: #e7e7e7;
`;

function SideBar(): ReactElement {
  return (
    <SideBarWrapper>
      <FolderList />
    </SideBarWrapper>
  );
}

export default SideBar;
