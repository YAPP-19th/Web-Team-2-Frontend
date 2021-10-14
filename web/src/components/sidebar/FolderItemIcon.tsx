import { ItemId, TreeItem } from '@atlaskit/tree';
import { ArrowDownIcon, ArrowSideIcon, FolderIcon } from 'assets/icons';
import useFolderHandle from 'hooks/sidebar/useFolderHandle';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface FolderItemIconProps {
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
  item,
  onExpand,
  onCollapse,
}: FolderItemIconProps): ReactElement | null {
  const { onCheckFirstNode } = useFolderHandle();

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
