import React, { ReactElement } from 'react';
import styled from 'styled-components';
import tempData from './data/tempFolderData.json';
import MainFolderListItem from './MainFolderListItem';

const FolderListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function MainFolderList(): ReactElement {
  return (
    <FolderListWrapper>
      {tempData.folders.map((folder) => (
        <MainFolderListItem key={folder.id} name={folder.name} />
      ))}
    </FolderListWrapper>
  );
}

export default MainFolderList;
