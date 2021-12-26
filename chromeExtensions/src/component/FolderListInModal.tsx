import React, { ReactElement, useEffect, useState } from 'react';

import Tree, {
  ItemId,
  mutateTree,
  RenderItemParams,
  TreeData,
} from '@atlaskit/tree';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useFoldersQueries } from '../hooks';
import { initialFolderState } from '../recoil/atoms/folderState';
import FolderItemIcon from './FolderItemIcon';

const FolderListWrapper = styled.div`
  position: relative;
`;

const FolderItemWrapper = styled.div`
  width: 166px;
`;

const FolderRightBox = styled.div`
  display: none;
  align-items: center;
`;

const FolderItemBlock = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  min-width: 105px;
  max-width: 166px;
  height: 28px;
  font-size: 12px;
  padding: 5px 2px;
  border-radius: 4px;
  ${(props) =>
    props.active &&
    css`
      background-color: rgba(72, 191, 145, 0.1);
      font-weight: 500;
      ${FolderRightBox} {
        display: flex;
      }
    `}
  &:hover {
    background-color: rgba(72, 191, 145, 0.1);
    font-weight: 500;
    ${FolderRightBox} {
      display: flex;
    }
  }
`;

const FolderLeftBox = styled.div`
  display: flex;
  align-items: center;
  min-width: 65px;
`;

const FolderTitle = styled.span<{ active: boolean }>`
  cursor: pointer;
  height: 28px;
  line-height: 25px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
  ${(props: any) =>
    props.active &&
    css`
      font-weight: 500;
      color: ${props.theme.color.primary};
    `}
`;

export function FolderListInModal({
  onClick,
  activeId,
}: {
  onClick: (id: string) => void;
  activeId: string;
}): ReactElement {
  const { data } = useFoldersQueries();

  const [folders, setFolders] = useState<TreeData>(initialFolderState);

  useEffect(() => {
    if (!data) return;
    setFolders(data);
  }, [data]);

  const onExpandFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: true }));
  };

  const onCollapseFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: false }));
  };

  const renderFolderItem = ({
    item,
    onExpand,
    onCollapse,
    provided,
  }: RenderItemParams): ReactElement => {
    return (
      <>
        <FolderItemWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick(String(item.id))}
        >
          <FolderItemBlock
            active={activeId === String(item.id)}
            onMouseDown={() =>
              item.isExpanded && item.children.length > 0 && onCollapse(item.id)
            }
          >
            <FolderLeftBox>
              <FolderItemIcon
                item={item}
                onCollapse={onCollapse}
                onExpand={onExpand}
              />
              <FolderTitle active={false}>{item.data.name}</FolderTitle>
            </FolderLeftBox>
          </FolderItemBlock>
        </FolderItemWrapper>
      </>
    );
  };

  return (
    <FolderListWrapper>
      <Tree
        tree={folders}
        renderItem={renderFolderItem}
        onExpand={onExpandFolder}
        onCollapse={onCollapseFolder}
        offsetPerLevel={16} // 한 깊이당 padding 값
        isNestingEnabled
      />
    </FolderListWrapper>
  );
}
