import useFoldersHandle from 'hooks/sidebar/useFoldersHandle';
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
  overflow: hidden auto; // hidden auto => overflow가 없을땐 안보이고 있을땐 스크롤
  overflow-x: auto;

  margin-bottom: 24px;
  &::-webkit-scrollbar {
    width: 10px; // 세로 스크롤바 가로 길이
    height: 10px; // 가로 스크롤바 세로 길이
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.color.white};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.color.grayLight};
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
`;

function SideBar(): ReactElement {
  const {
    createCabinet,
    createFolder,
    folders,
    onCollapseFolder,
    onDragEndFolder,
    onDragStartFolder,
    onExpandFolder,
  } = useFoldersHandle();

  return (
    <SideBarWrapper>
      <FolderBox>
        <AllFolder />
        <FolderList
          folders={folders}
          createFolder={createFolder}
          onCollapseFolder={onCollapseFolder}
          onDragEndFolder={onDragEndFolder}
          onDragStartFolder={onDragStartFolder}
          onExpandFolder={onExpandFolder}
        />
      </FolderBox>

      <CabinetBox createCabinet={createCabinet} />
      <TrashBox />

      <QuestionButton />
    </SideBarWrapper>
  );
}

export default SideBar;
