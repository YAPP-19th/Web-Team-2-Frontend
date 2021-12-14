import React, { ReactElement } from 'react';
import { ItemId } from '@atlaskit/tree';
import styled from 'styled-components';
import { folder } from 'models/folder';
import MainFolderListItem from './SubFolderListItem';

interface SubFolderListProps {
  subFolders: folder.ICheckedChildFolderItem[];
  onToggleChecked: (subFolderId: ItemId) => void;
  IsActiveSubFolder: boolean;
}

const FolderListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function SubFolderList({
  subFolders,
  onToggleChecked,
  IsActiveSubFolder,
}: SubFolderListProps): ReactElement {
  return (
    <FolderListWrapper>
      {subFolders.map((subFolder) => (
        <MainFolderListItem
          key={subFolder.folderId}
          subFolder={subFolder}
          onToggleChecked={onToggleChecked}
          IsActiveSubFolder={IsActiveSubFolder}
        />
      ))}
    </FolderListWrapper>
  );
}

export default SubFolderList;
