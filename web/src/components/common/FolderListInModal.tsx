import React, { ReactElement, useCallback, useEffect, useState } from 'react';
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
import { getParentFolders } from 'api/folderAPI';
import produce from 'immer';

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
  const { data } = useFoldersQueries();
  const [folders, setFolders] = useState<TreeData>(initialFolderState);
  const [selectedFolder, setSelectedFolder] =
    useRecoilState(selectedFolderState);

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

  const onExpandParentFolder = useCallback(async () => {
    try {
      const parentFolderIdList = await getParentFolders(selectedFolder.id);
      setFolders((prev) =>
        produce(prev, (draft) => {
          const newObj = draft;
          parentFolderIdList.forEach((parentFolderItem) => {
            if (String(parentFolderItem.folderId) !== selectedFolder.id) {
              newObj.items[parentFolderItem.folderId].isExpanded = true;
            }
          });
        }),
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('부모 폴더 id 조회 실패');
    }
  }, [selectedFolder]);

  useEffect(() => {
    if (selectedFolder.id && data?.rootId === 'root') onExpandParentFolder();
  }, [selectedFolder.id, data]);

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
