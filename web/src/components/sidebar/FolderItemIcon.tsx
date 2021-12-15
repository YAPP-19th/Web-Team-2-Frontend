import { ItemId, TreeItem } from '@atlaskit/tree';
import { ArrowDownIcon, ArrowSideIcon } from 'assets/icons';
import FolderEmoji from 'components/common/FolderEmoji';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

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
