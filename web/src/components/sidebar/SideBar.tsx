import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Example from './FolderList';

const SideBarWrapper = styled.div`
  width: 240px;
  padding: 20px 0;
  background-color: #e7e7e7;
`;

function SideBar(): ReactElement {
  return (
    <SideBarWrapper>
      <Example />
    </SideBarWrapper>
  );
}

export default SideBar;
