import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { folder } from 'models/folder';
import MainFolderListItem from './SubFolderListItem';

interface SubFolderListProps {
  subFolders: folder.ICheckedChildFolderItem[];
}

const FolderListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function SubFolderList({ subFolders }: SubFolderListProps): ReactElement {
  return (
    <FolderListWrapper>
      {subFolders.map((subFolder) => (
        <MainFolderListItem key={subFolder.folderId} name={subFolder.name} />
      ))}
    </FolderListWrapper>
  );
}

export default SubFolderList;
