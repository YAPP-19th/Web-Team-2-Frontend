import React, { ReactElement } from 'react';
import Tree from '@atlaskit/tree';
import styled from 'styled-components';
import useFoldersEffect from 'hooks/sidebar/useFoldersEffect';
import useFolderHandle from 'hooks/sidebar/useFolderHandle';
import FolderItem from './FolderItem';

const FolderListWrapper = styled.div`
  height: 100%;
  overflow: auto;
`;

function FolderList(): ReactElement {
  useFoldersEffect();
  const { folders, onCollapse, onDragEnd, onExpand } = useFolderHandle();

  return (
    <FolderListWrapper>
      <Tree
        tree={folders}
        renderItem={FolderItem}
        onExpand={onExpand}
        onCollapse={onCollapse}
        onDragEnd={onDragEnd}
        isDragEnabled
        isNestingEnabled
      />
    </FolderListWrapper>
  );
}

export default FolderList;
