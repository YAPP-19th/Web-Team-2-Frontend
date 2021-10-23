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

const FolderItemIconWrapper = styled.div``;

const ArrowButton = styled.button<{ isShow: boolean }>`
  padding: 0;
  width: 16px;
  height: 16px;
  visibility: ${(props) => !props.isShow && 'hidden'};
  svg {
    margin-right: 2px;
  }
`;

const FolderIconStyled = styled(FolderIcon)`
  margin-right: 4px;
`;

function FolderItemIcon({
  item,
  onExpand,
  onCollapse,
}: FolderItemIconProps): ReactElement {
  const { onCheckFirstNode } = useFolderHandle();

  return (
    <FolderItemIconWrapper>
      <ArrowButton
        isShow={item.children.length > 0}
        type="button"
        onClick={() =>
          item.isExpanded ? onCollapse(item.id) : onExpand(item.id)
        }
      >
        {item.isExpanded ? <ArrowDownIcon /> : <ArrowSideIcon />}
      </ArrowButton>

      {onCheckFirstNode(item.id) && <FolderIconStyled />}
    </FolderItemIconWrapper>
  );
}

export default FolderItemIcon;
