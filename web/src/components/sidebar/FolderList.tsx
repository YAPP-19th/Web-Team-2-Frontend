import Tree, {
  ItemId,
  RenderItemParams,
  TreeData,
  TreeDestinationPosition,
  TreeItem,
  TreeSourcePosition,
} from '@atlaskit/tree';
import { More16Icon, PlusIcon } from 'assets/icons';
import SmallModal from 'components/common/SmallModal';
import useToggle from 'hooks/common/useToggle';
import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Path from 'routes/path';
import { useRecoilState } from 'recoil';
import {
  activeFolderState,
  selectedFolderState,
} from 'recoil/atoms/folderState';
import styled from 'styled-components';
import FolderItemIcon from './FolderItemIcon';
import FolderMenuLayer from './FolderMenuLayer';
import FolderMoveModal from './FolderMoveModal';
import FolderRenameModal from './FolderRenameModal';

interface FolderListProps {
  folders: TreeData;
  onExpandFolder: (itemId: ItemId) => void;
  onCollapseFolder: (itemId: ItemId) => void;
  onDragStartFolder: (itemId: ItemId) => void;
  onDragEndFolder: (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition,
  ) => void;
  onCreateFolder: (parentId: ItemId) => void;
  onDeleteFolder: (itemId: ItemId) => void;
  onChangeFolderInfo: (itemId: ItemId, name: string, emoji: string) => void;
  isDrag: boolean;
}

export interface IPositionStyle {
  top: number;
  left: number;
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

function FolderList({
  folders,
  onCreateFolder,
  onExpandFolder,
  onDragStartFolder,
  onDragEndFolder,
  onCollapseFolder,
  onDeleteFolder,
  onChangeFolderInfo,
  isDrag,
}: FolderListProps): ReactElement {
  const navigate = useNavigate();
  // state
  const [selectedFolder, setSelectedFolder] =
    useRecoilState(selectedFolderState);
  const [activeFolder, setActiveFolder] = useRecoilState(activeFolderState);
  const [selectedFolderName, setSelectedFolderName] = useState('');
  const [positionStyle, setPositionStyle] = useState<IPositionStyle>({
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
    item: TreeItem,
  ) => {
    setSelectedFolder(item.id);
    setSelectedFolderName(item.data.name);
    onToggleMenuLayer();
    setPositionStyle({
      top: e.currentTarget.getBoundingClientRect().top,
      left: e.currentTarget.getBoundingClientRect().left,
    });
  };

  const onActiveFolder = (folderId: ItemId, name: string) => {
    setActiveFolder({
      ...activeFolder,
      id: folderId,
      name,
    });
    navigate(`${Path.MainPage}/${folderId}`);
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
        >
          <FolderItemBlock
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
              {/* eslint-disable-next-line no-console */}
              <FolderTitle
                onClick={() => onActiveFolder(item.id, item.data.name)}
              >
                {item.data.name}
              </FolderTitle>
            </FolderLeftBox>
            {isDrag && (
              <FolderRightBox onMouseDown={(e) => e.stopPropagation()}>
                <FolderETCButton onClick={() => onCreateFolder(item.id)}>
                  <PlusIcon />
                </FolderETCButton>
                <FolderETCButton onClick={(e) => onToggleMenu(e, item)}>
                  <More16Icon />
                </FolderETCButton>
              </FolderRightBox>
            )}
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
        onDragStart={onDragStartFolder}
        onDragEnd={onDragEndFolder}
        offsetPerLevel={16} // 한 깊이당 padding 값
        isDragEnabled={isDrag}
        isNestingEnabled
      />

      {isMenuLayer && (
        <FolderMenuLayer
          positionStyle={positionStyle}
          onToggleModal={onToggleModal}
        />
      )}

      {isDeleteModal && (
        <SmallModal
          isModal={isDeleteModal}
          onToggleModal={onToggleDeleteModal}
          title="이 폴더를 삭제할까요?"
          content="폴더에 있는 모든 내용들이 <br/> 휴지통으로 들어가요!"
          buttonName="삭제"
          // eslint-disable-next-line no-console
          onClick={() => onDeleteFolder(selectedFolder)}
        />
      )}

      {isRenameModal && (
        <FolderRenameModal
          positionStyle={positionStyle}
          onToggleModal={onToggleRenameModal}
          folderName={selectedFolderName}
          onChangeFolderInfo={onChangeFolderInfo}
          selectedFolder={selectedFolder}
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
