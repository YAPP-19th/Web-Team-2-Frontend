import React, { ReactElement, useEffect, useState } from 'react';
import Tree, {
  ItemId,
  mutateTree,
  RenderItemParams,
  TreeData,
} from '@atlaskit/tree';
import styled, { css } from 'styled-components';
import FolderItemIcon from 'components/sidebar/FolderItemIcon';
import useFoldersQueries from 'hooks/folder/useFoldersQueries';
import {
  initialFolderState,
  selectedFolderState,
} from 'recoil/atoms/folderState';
import { useRecoilState } from 'recoil';

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

const FolderItemBlock = styled.div`
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
  &:hover {
    background-color: ${(props) => props.theme.color.hover0};
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
  ${(props) =>
    props.active &&
    css`
      font-weight: 500;
      color: ${props.theme.color.primary};
    `}
`;

function FolderListInModal(): ReactElement {
  const { data } = useFoldersQueries(); // 폴더 목록 react-query로 가져왔음
  const [folders, setFolders] = useState<TreeData>(initialFolderState); // 폴더 상태
  const [selectedFolder, setSelectedFolder] =
    useRecoilState(selectedFolderState); // 클릭해서 선택된 폴더들

  // react-query로 가져온 폴더목록을 폴더 상태에 넣어줌
  useEffect(() => {
    if (!data) return;
    setFolders(data);
  }, [data]);

  // 폴더 확장
  const onExpandFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: true }));
  };

  // 폴더 접기
  const onCollapseFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: false }));
  };

  // 각 폴더 아이템
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
        >
          <FolderItemBlock
            onClick={() =>
              item.children.length > 0 && item.isExpanded
                ? onCollapse(item.id)
                : onExpand(item.id)
            }
          >
            <FolderLeftBox>
              <FolderItemIcon
                item={item}
                onCollapse={onCollapse}
                onExpand={onExpand}
              />
              <FolderTitle
                active={selectedFolder.id === item.id}
                onClick={() => {
                  setSelectedFolder({
                    id: item.id,
                    name: item.data.name,
                    emoji: item.data.emoji,
                  });
                }}
              >
                {item.data.name}
              </FolderTitle>
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

export default FolderListInModal;
