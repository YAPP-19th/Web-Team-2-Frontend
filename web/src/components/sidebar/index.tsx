import React, { ReactElement } from 'react';
import styled from 'styled-components';
import AllFolder from './AllFolder';
import CabinetBox from './CabinetBox';
import FolderList from './FolderList';
import TrashBox from './TrashBox';

const SideBarWrapper = styled.div`
  width: 170px;
  padding: 20px 0;
  position: relative;
  background-color: ${(props) => props.theme.color.white0};
  overflow: auto;
`;

function SideBar(): ReactElement {
  return (
    <SideBarWrapper>
      <AllFolder />
      <FolderList />
      <CabinetBox />
      <TrashBox />
    </SideBarWrapper>
  );
}

export default SideBar;
