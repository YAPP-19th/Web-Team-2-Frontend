import React, { ReactElement } from 'react';
import Tree, {
  mutateTree,
  moveItemOnTree,
  TreeSourcePosition,
  TreeDestinationPosition,
  ItemId,
} from '@atlaskit/tree';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { folderState } from 'recoil/atoms/folderState';
import FolderItem from './FolderItem';

const FolderListWrapper = styled.div`
  height: 100%;
  overflow: auto;
`;

function FolderList(): ReactElement {
  const [tree, setTree] = useRecoilState(folderState);

  const onExpand = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: true }));
  };

  const onCollapse = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: false }));
  };

  const onDragEnd = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition,
  ) => {
    if (!destination) return;
    const newTree = moveItemOnTree(tree, source, destination);
    setTree(newTree);
  };

  return (
    <FolderListWrapper>
      <Tree
        tree={tree}
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
