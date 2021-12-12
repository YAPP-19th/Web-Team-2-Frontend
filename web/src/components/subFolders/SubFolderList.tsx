import React, { ReactElement } from 'react';
import styled from 'styled-components';
import useChildFoldersEffect from 'hooks/folder/useChildFoldersQueries';
import MainFolderListItem from './SubFolderListItem';

const FolderListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function SubFolderList(): ReactElement {
  const { data } = useChildFoldersEffect();

  return (
    <FolderListWrapper>
      {data?.map((folder) => (
        <MainFolderListItem key={folder.folderId} name={folder.name} />
      ))}
    </FolderListWrapper>
  );
}

export default SubFolderList;
