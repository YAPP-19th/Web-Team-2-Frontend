import { ItemId, TreeItem } from '@atlaskit/tree';
import { ArrowDownIcon, ArrowSideIcon, FolderIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import { Emoji } from 'react-twemoji-picker';
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

const FolderIconStyled = styled(FolderIcon)`
  margin-right: 4px;
`;

const EmojiIcon = styled(Emoji)`
  width: 16px;
  height: 16px;
  margin-right: 4px;
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
      {item.data.emoji ? (
        <EmojiIcon emoji={{ name: 'emoji', unicode: item.data.emoji }} />
      ) : (
        <FolderIconStyled />
      )}
    </FolderItemIconWrapper>
  );
}

export default FolderItemIcon;
