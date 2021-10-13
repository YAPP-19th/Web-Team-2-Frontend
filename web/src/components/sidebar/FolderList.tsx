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
import {
  ArrowDownIcon,
  ArrowSideIcon,
  FolderIcon,
  MoreIcon,
  PlusIcon,
} from 'assets/icons';
import atlassianTree from './data/atlassianTreeMock.json';

const FolderListWrapper = styled.div``;

const FolderItemBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 166px;
  height: 28px;
  font-size: 12px;
  padding: 5px 2px 5px 8px;
  border-radius: 4px;
  &:hover {
    background-color: #f3f2ef;
    .right {
      display: flex;
    }
  }
  .title {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ArrowButton = styled.button`
  padding: 0;
  svg {
    margin-right: 2px;
  }
`;
const FolderLeftBox = styled.div`
  display: flex;
  align-items: center;
`;

const FolderRightBox = styled.div`
  display: none;
  align-items: center;
`;

const FolderETCButton = styled.button`
  margin-right: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:last-child {
    margin-right: 1px;
  }
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
        <ArrowButton type="button" onClick={() => onCollapse(item.id)}>
          <ArrowDownIcon />
        </ArrowButton>
      ) : (
        <ArrowButton type="button" onClick={() => onExpand(item.id)}>
          <ArrowSideIcon />
        </ArrowButton>
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
          <FolderItemBlock>
            <FolderLeftBox>
              <span>{getIcon(item, onExpand, onCollapse)}</span>
              <span
                className="title"
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
                {item.data ? item.data.title : ''}
              </span>
            </FolderLeftBox>
            <FolderRightBox className="right">
              <FolderETCButton type="button">
                <PlusIcon />
              </FolderETCButton>
              <FolderETCButton type="button">
                <MoreIcon />
              </FolderETCButton>
            </FolderRightBox>
          </FolderItemBlock>
        ) : (
          <FolderItemBlock>
            <FolderLeftBox>
              <span>{getIcon(item, onExpand, onCollapse)}</span>
              <span className="title">{item.data ? item.data.title : ''}</span>
            </FolderLeftBox>
            <FolderRightBox className="right">
              <FolderETCButton type="button">
                <PlusIcon />
              </FolderETCButton>
              <FolderETCButton type="button">
                <MoreIcon />
              </FolderETCButton>
            </FolderRightBox>
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
