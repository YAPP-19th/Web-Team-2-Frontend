import React, { ReactElement, useState } from 'react';
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
        <button type="button" onClick={() => onCollapse(item.id)}>
          -
        </button>
      ) : (
        <button type="button" onClick={() => onExpand(item.id)}>
          +
        </button>
      );
    }
    return null;
  };

  const renderItem = ({
    item,
    onExpand,
    onCollapse,
    provided,
  }: RenderItemParams) => {
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {item.children && item.children.length > 0 ? (
          <div
            role="button"
            tabIndex={0}
            onKeyDown={
              item.isExpanded
                ? () => onCollapse(item.id)
                : () => onExpand(item.id)
            }
            onClick={
              item.isExpanded
                ? () => onCollapse(item.id)
                : () => onExpand(item.id)
            }
          >
            <span>{getIcon(item, onExpand, onCollapse)}</span>
            <span>{item.data ? item.data.title : ''}</span>
          </div>
        ) : (
          <>
            <span>{getIcon(item, onExpand, onCollapse)}</span>
            <span>{item.data ? item.data.title : ''}</span>
          </>
        )}
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
    if (!destination) return;

    const newTree = moveItemOnTree(tree, source, destination);
    setTree(newTree);
  };

  return (
    <FolderListWrapper style={{ height: '100%', overflow: 'auto' }}>
      <Tree
        tree={tree}
        renderItem={renderItem}
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
