import React, { ReactElement, useState } from 'react';
import Navigation, { AkNavigationItem } from '@atlaskit/navigation';
import Button from '@atlaskit/button';
import Tree, {
  mutateTree,
  moveItemOnTree,
  TreeData,
  TreeSourcePosition,
  TreeDestinationPosition,
  ItemId,
  RenderItemParams,
  TreeItem,
} from '@atlaskit/tree';
import { FaCaretRight, FaCaretDown } from 'react-icons/fa';
import styled from 'styled-components';
import atlassianTree from './data/atlassianTreeMock.json';

const FolderListWrapper = styled.div``;

function FolderList(): ReactElement {
  const [tree, setTree] = useState<TreeData>(atlassianTree);

  const getIcon = (
    item: TreeItem,
    onExpand: (itemId: ItemId) => void,
    onCollapse: (itemId: ItemId) => void,
  ) => {
    if (item.children && item.children.length > 0) {
      return item.isExpanded ? (
        <Button
          spacing="none"
          appearance="subtle-link"
          onClick={() => onCollapse(item.id)}
        >
          <FaCaretDown />
        </Button>
      ) : (
        <Button
          spacing="none"
          appearance="subtle-link"
          onClick={() => onExpand(item.id)}
        >
          <FaCaretRight />
        </Button>
      );
    }
    return null;
  };

  const renderItem = ({
    item,
    onExpand,
    onCollapse,
    provided,
    snapshot,
  }: RenderItemParams) => {
    return (
      <div ref={provided.innerRef} {...provided.draggableProps}>
        <AkNavigationItem
          isDragging={snapshot.isDragging}
          text={item.data ? item.data.title : ''}
          icon={getIcon(item, onExpand, onCollapse)}
          dnd={{ dragHandleProps: provided.dragHandleProps }}
        />
      </div>
    );
  };

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
    if (!destination) {
      return;
    }
    const test = moveItemOnTree(tree, source, destination);
    setTree(test);
  };

  return (
    <FolderListWrapper>
      <Navigation>
        <Tree
          tree={tree}
          renderItem={renderItem}
          onExpand={onExpand}
          onCollapse={onCollapse}
          onDragEnd={onDragEnd}
          isDragEnabled
        />
      </Navigation>
    </FolderListWrapper>
  );
}

export default FolderList;
