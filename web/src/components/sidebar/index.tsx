import React, { ReactElement } from 'react';
import styled from 'styled-components';
import AllFolder from './AllFolder';
import CabinetBox from './CabinetBox';
import FolderList from './FolderList';
import QuestionButton from './QuestionButton';
import TrashBox from './TrashBox';

const SideBarWrapper = styled.div`
  width: 170px;
  padding: 20px 0;
  position: relative;
  background-color: ${(props) => props.theme.color.white};
  overflow: auto;
`;

const FolderBox = styled.div`
  max-height: 541px;
  overflow: scroll;
  margin-bottom: 24px;
`;

function SideBar(): ReactElement {
  return (
    <SideBarWrapper>
      <FolderBox>
        <AllFolder />
        <FolderList />
      </FolderBox>

      <CabinetBox />
      <TrashBox />
      <QuestionButton />
    </SideBarWrapper>
  );
}

export default SideBar;
