import { RenderItemParams } from '@atlaskit/tree';
import { MoreIcon, PlusIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import FolderItemIcon from './FolderItemIcon';

const FolderItemWrapper = styled.div``;

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

function FolderItem({
  item,
  onExpand,
  onCollapse,
  provided,
}: RenderItemParams): ReactElement {
  return (
    <FolderItemWrapper
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <FolderItemBlock>
        <FolderLeftBox>
          <span>
            <FolderItemIcon
              item={item}
              onCollapse={onCollapse}
              onExpand={onExpand}
            />
          </span>
          {item.children && item.children.length > 0 ? (
            <span
              className="title"
              role="button"
              tabIndex={0}
              onKeyDown={() =>
                item.isExpanded ? onCollapse(item.id) : onExpand(item.id)
              }
              onClick={() =>
                item.isExpanded ? onCollapse(item.id) : onExpand(item.id)
              }
            >
              {item.data ? item.data.title : ''}
            </span>
          ) : (
            <span className="title">{item.data ? item.data.title : ''}</span>
          )}
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
    </FolderItemWrapper>
  );
}

export default FolderItem;
