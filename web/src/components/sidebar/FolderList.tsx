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
import { FolderIcon } from 'assets/icons';
import atlassianTree from './data/atlassianTreeMock.json';

const FolderListWrapper = styled.div``;

const FolderItemBlock = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  padding: 5px 2px 5px 8px;
`;

function FolderList(): ReactElement {
  const [tree, setTree] = useState<TreeData>(atlassianTree);

  const onCheckFirstNode = (itemId: ItemId) => {
    const firstNode = tree.items.userId.children; // 나중에 유저 구현되면 userId를 실제 유저Id 들어오게 설정
    return firstNode.includes(itemId);
  };

  const getIcon = (
    item: TreeItem,
    onExpand: (itemId: ItemId) => void,
    onCollapse: (itemId: ItemId) => void,
  ) => {
    if (onCheckFirstNode(item.id)) {
      return item.isExpanded ? (
        <button type="button" onClick={() => onCollapse(item.id)}>
          <FolderIcon />
        </button>
      ) : (
        <button type="button" onClick={() => onExpand(item.id)}>
          <FolderIcon />
        </button>
      );
    }

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
          <FolderItemBlock
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
          </FolderItemBlock>
        ) : (
          <FolderItemBlock>
            <span>{getIcon(item, onExpand, onCollapse)}</span>
            <span>{item.data ? item.data.title : ''}</span>
          </FolderItemBlock>
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
