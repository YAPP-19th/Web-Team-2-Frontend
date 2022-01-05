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
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { selectedFolderState } from 'recoil/atoms/folderState';
import styled, { css } from 'styled-components';
import { isFolderPage } from 'utils/checkFolderPage';
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
}: FolderListProps): ReactElement {
  // route
  const navigate = useNavigate();
  const params = useParams();
  const parmasFolderId = useMemo(() => params.folderId, [params]);

  // state
  const [selectedFolder, setSelectedFolder] =
    useRecoilState(selectedFolderState);
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

  useEffect(() => {
    if (
      params.folderId &&
      folders.rootId === 'root' &&
      isFolderPage(params.folderId)
    ) {
      if (!folders.items[params.folderId]) {
        navigate('/');
      }
    }
  }, [folders]);

  // function
  const onToggleMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: TreeItem,
  ) => {
    setSelectedFolder({
      id: item.id,
      name: item.data.name,
      emoji: item.data.emoji,
    });
    onToggleMenuLayer();
    setPositionStyle({
      top: e.currentTarget.getBoundingClientRect().top,
      left: e.currentTarget.getBoundingClientRect().left,
    });
  };

  // 폴더 클릭시 해당 폴더 활성화 후 라우트로 이동
  const onActiveFolder = (folderId: ItemId) => {
    navigate(`/${folderId}`);
  };

  // 각 폴더 아이템
  const renderFolderItem = ({
    item,
    onExpand,
    onCollapse,
    provided,
  }: RenderItemParams): ReactElement => {
    return (
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
            <FolderTitle
              active={Number(parmasFolderId) === item.id}
              onClick={() => onActiveFolder(item.id)}
            >
              {item.data.name}
            </FolderTitle>
          </FolderLeftBox>
          <FolderRightBox onMouseDown={(e) => e.stopPropagation()}>
            <FolderETCButton onClick={() => onCreateFolder(item.id)}>
              <PlusIcon />
            </FolderETCButton>
            <FolderETCButton onClick={(e) => onToggleMenu(e, item)}>
              <More16Icon />
            </FolderETCButton>
          </FolderRightBox>
        </FolderItemBlock>
      </FolderItemWrapper>
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
        isDragEnabled
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
          onClick={() => onDeleteFolder(selectedFolder.id)}
        />
      )}

      {isRenameModal && (
        <FolderRenameModal
          positionStyle={positionStyle}
          onToggleModal={onToggleRenameModal}
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
