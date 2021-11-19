import Tree, {
  ItemId,
  moveItemOnTree,
  mutateTree,
  RenderItemParams,
  TreeData,
  TreeDestinationPosition,
  TreeSourcePosition,
} from '@atlaskit/tree';
import { More16Icon, PlusIcon } from 'assets/icons';
import SmallModal from 'components/common/SmallModal';
import useToggle from 'hooks/common/useToggle';
import produce from 'immer';
import { folder } from 'models/folder';
import React, { ReactElement, useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { selectedFolderState } from 'recoil/atoms/folderState';
import styled from 'styled-components';
import FolderItemIcon from './FolderItemIcon';
import FolderMenuLayer from './FolderMenuLayer';
import FolderMoveModal from './FolderMoveModal';
import FolderRenameModal from './FolderRenameModal';

interface FolderListProps {
  folders: TreeData;
  setFolders: React.Dispatch<React.SetStateAction<TreeData>>;
}

const FolderListWrapper = styled.div`
  position: relative;
  /* overflow: auto; */
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
    background-color: #f3f2ef;
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

const FolderTitle = styled.span`
  cursor: pointer;
  height: 28px;
  line-height: 25px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
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

function FolderList({ folders, setFolders }: FolderListProps): ReactElement {
  // state
  const setSelectedFolder = useSetRecoilState(selectedFolderState);
  const [position, setPosition] = useState<folder.ILayerPosition>({
    top: 0,
    left: 0,
  });

  // modal
  const [isMenuLayer, onToggleMenuLayer] = useToggle();
  const [isDeleteModal, onToggleDeleteModal] = useToggle();
  const [isRenameModal, onToggleRenameModal] = useToggle();
  const [isMoveModal, onToggleMoveModal] = useToggle();

  const onToggleModal = {
    onToggleMenuLayer,
    onToggleDeleteModal,
    onToggleRenameModal,
    onToggleMoveModal,
  };

  // function
  const onToggleMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    itemId: ItemId,
  ) => {
    setSelectedFolder(itemId);
    onToggleMenuLayer();
    setPosition({
      top: e.currentTarget.getBoundingClientRect().top,
      left: e.currentTarget.getBoundingClientRect().left,
    });
  };

  const createFolder = useCallback((parentId: ItemId) => {
    const newFolderId = Math.random().toString();
    const newFolder = {
      id: newFolderId,
      children: [],
      data: {
        title: '제목없음',
      },
    };

    setFolders((prev) =>
      produce(prev, (draft) => {
        const newObj = draft;
        newObj.items[newFolderId] = newFolder;
        newObj.items[parentId].children.push(newFolderId);
        newObj.items[parentId].isExpanded = true;
      }),
    );
  }, []);

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
            onMouseDown={() =>
              item.isExpanded && item.children.length > 0
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
              <FolderTitle>{item.data.title}</FolderTitle>
            </FolderLeftBox>

            <FolderRightBox onMouseDown={(e) => e.stopPropagation()}>
              <FolderETCButton onClick={() => createFolder(item.id)}>
                <PlusIcon />
              </FolderETCButton>
              <FolderETCButton onClick={(e) => onToggleMenu(e, item.id)}>
                <More16Icon />
              </FolderETCButton>
            </FolderRightBox>
          </FolderItemBlock>
        </FolderItemWrapper>
      </>
    );
  };

  const onExpand = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: true }));
  };

  const onCollapse = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: false }));
  };

  const onDragEnd = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition,
  ) => {
    if (!destination) return;
    const newTree = moveItemOnTree(folders, source, destination);
    // console.log('새로운 부모Id', destination);
    // console.log('기존 부모Id', source);
    setFolders(newTree);
  };
  return (
    <FolderListWrapper>
      <Tree
        tree={folders}
        renderItem={renderFolderItem}
        onExpand={onExpand}
        onCollapse={onCollapse}
        // eslint-disable-next-line no-console
        onDragStart={(itemId) => console.log('이동하는 애', { id: itemId })}
        onDragEnd={onDragEnd}
        offsetPerLevel={16} // 한 깊이당 padding 값
        isDragEnabled
        isNestingEnabled
      />

      {isMenuLayer && (
        <FolderMenuLayer position={position} onToggleModal={onToggleModal} />
      )}

      {isDeleteModal && (
        <SmallModal
          isModal={isDeleteModal}
          onToggleModal={onToggleDeleteModal}
          title="이 폴더를 삭제할까요?"
          content="폴더에 있는 모든 내용들이 <br/> 휴지통으로 들어가요!"
          buttonName="삭제"
          // eslint-disable-next-line no-console
          onClick={() => console.log('API생성되면 추가하겠음!')}
        />
      )}

      {isRenameModal && (
        <FolderRenameModal
          position={position}
          onToggleModal={onToggleRenameModal}
        />
      )}

      {isMoveModal && (
        <FolderMoveModal
          isModal={isMoveModal}
          onToggleModal={onToggleMoveModal}
        />
      )}
    </FolderListWrapper>
  );
}

export default FolderList;
