import React, { ReactElement } from 'react';
import styled from 'styled-components';
import useChildFoldersEffect from 'hooks/folder/useChildFoldersEffect';
import MainFolderListItem from './SubFolderListItem';

const FolderListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function SubFolderList(): ReactElement {
  const { childFolders } = useChildFoldersEffect();

  return (
    <FolderListWrapper>
      {childFolders.map((folder) => (
        <MainFolderListItem key={folder.folderId} name={folder.name} />
      ))}
    </FolderListWrapper>
  );
}

export default SubFolderList;
