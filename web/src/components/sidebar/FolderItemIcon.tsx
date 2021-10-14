import { ItemId, TreeData, TreeItem } from '@atlaskit/tree';
import { ArrowDownIcon, ArrowSideIcon, FolderIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface FolderItemIconProps {
  tree: TreeData;
  item: TreeItem;
  onExpand: (itemId: ItemId) => void;
  onCollapse: (itemId: ItemId) => void;
}

const FolderButton = styled.button`
  margin-right: 8px;
`;

const ArrowButton = styled.button`
  padding: 0;
  svg {
    margin-right: 2px;
  }
`;

function FolderItemIcon({
  tree,
  item,
  onExpand,
  onCollapse,
}: FolderItemIconProps): ReactElement | null {
  const onCheckFirstNode = (itemId: ItemId) => {
    const firstNode = tree.items.userId.children; // 나중에 유저 구현되면 userId를 실제 유저Id 들어오게 설정
    return firstNode.includes(itemId);
  };

  if (onCheckFirstNode(item.id)) {
    return (
      <FolderButton
        type="button"
        onClick={() =>
          item.isExpanded ? onCollapse(item.id) : onExpand(item.id)
        }
      >
        <FolderIcon />
      </FolderButton>
    );
  }

  if (item.children && item.children.length > 0) {
    return (
      <ArrowButton
        type="button"
        onClick={() =>
          item.isExpanded ? onCollapse(item.id) : onExpand(item.id)
        }
      >
        {item.isExpanded ? <ArrowDownIcon /> : <ArrowSideIcon />}
      </ArrowButton>
    );
  }
  return null;
}

export default FolderItemIcon;
