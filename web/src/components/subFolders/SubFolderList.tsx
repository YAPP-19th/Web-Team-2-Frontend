import React, { ReactElement } from 'react';
import styled from 'styled-components';
import useChildFoldersEffect from 'hooks/folder/useChildFoldersEffect';
import tempData from './data/tempFolderData.json';
import MainFolderListItem from './SubFolderListItem';

const FolderListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function SubFolderList(): ReactElement {
  useChildFoldersEffect();

  return (
    <FolderListWrapper>
      {tempData.folders.map((folder) => (
        <MainFolderListItem key={folder.id} name={folder.name} />
      ))}
    </FolderListWrapper>
  );
}

export default SubFolderList;
