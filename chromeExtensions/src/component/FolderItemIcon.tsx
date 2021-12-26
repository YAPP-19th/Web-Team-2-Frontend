import React, { ReactElement } from 'react';

import { ItemId, TreeItem } from '@atlaskit/tree';
import styled from '@emotion/styled';

import { ArrowDownIcon, ArrowSideIcon } from '../assets';
import FolderEmoji from './FolderEmoji';

interface FolderItemIconProps {
  item: TreeItem;
  onExpand: (itemId: ItemId) => void;
  onCollapse: (itemId: ItemId) => void;
}

const FolderItemIconWrapper = styled.div`
  display: flex;
`;

const ArrowButton = styled.button<{ isShow: boolean }>`
  padding: 0;
  width: 16px;
  height: 16px;
  visibility: ${(props) => !props.isShow && 'hidden'};
  border: 0px none;
  background-color: transparent;
  cursor: pointer;
  svg {
    margin-right: 2px;
  }
`;

function FolderItemIcon({
  item,
  onExpand,
  onCollapse,
}: FolderItemIconProps): ReactElement {
  return (
    <FolderItemIconWrapper onMouseDown={(e) => e.stopPropagation()}>
      <ArrowButton
        isShow={item.children.length > 0}
        type="button"
        onClick={() =>
          item.isExpanded ? onCollapse(item.id) : onExpand(item.id)
        }
      >
        {item.isExpanded ? <ArrowDownIcon /> : <ArrowSideIcon />}
      </ArrowButton>
      <FolderEmoji emoji={item.data.emoji} />
    </FolderItemIconWrapper>
  );
}

export default FolderItemIcon;
