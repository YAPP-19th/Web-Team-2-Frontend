import Tree, { ItemId, RenderItemParams } from '@atlaskit/tree';
import { More16Icon, PlusIcon } from 'assets/icons';
import Modal from 'components/common/Modal';
import useToggle from 'hooks/common/useToggle';
import useFolderHandle from 'hooks/sidebar/useFolderHandle';
import useFoldersEffect from 'hooks/sidebar/useFoldersEffect';
import React, { ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';
import { folderMenuState, selectedFolderState } from 'recoil/atoms/folderState';
import styled from 'styled-components';
import FolderDeleteModal from './FolderDeleteModal';
import FolderItemIcon from './FolderItemIcon';
import FolderMenu from './FolderMenu';

const FolderListWrapper = styled.div`
  /* height: 100%; */
  /* overflow: auto; */
  position: relative;
  margin-bottom: 28px;
`;
const FolderItemWrapper = styled.div`
  width: 166px;
`;

const FolderItemBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 166px;
  height: 28px;
  font-size: 12px;
  padding: 5px 2px;
  border-radius: 4px;
  &:hover {
    background-color: #f3f2ef;
    .right {
      display: flex;
    }
  }
`;

const FolderLeftBox = styled.div`
  display: flex;
  align-items: center;
`;

const FolderTitle = styled.span<{ isFirst: boolean }>`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  ${(props) => props.isFirst && `font-weight: 500`}
`;

const FolderRightBox = styled.div`
  display: none;
  align-items: center;
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

function FolderList(): ReactElement {
  const [isOpen, setIsOpen] = useRecoilState(folderMenuState);
  const [selectedFolder, setSelectedFolder] =
    useRecoilState(selectedFolderState);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [isDeleteModal, onToggleDeleteModal] = useToggle();

  const { onCheckFirstNode } = useFolderHandle();

  const onToggleMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    itemId: ItemId,
  ) => {
    setIsOpen(itemId);
    setSelectedFolder(itemId);
    setTop(e.currentTarget.getBoundingClientRect().top);
    setLeft(e.currentTarget.getBoundingClientRect().left);
  };

  const FolderItem = ({
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
          <FolderItemBlock>
            <FolderLeftBox>
              <span>
                <FolderItemIcon
                  item={item}
                  onCollapse={onCollapse}
                  onExpand={onExpand}
                />
              </span>
              {item.children && item.children.length > 0 ? (
                <FolderTitle
                  isFirst={onCheckFirstNode(item.id)}
                  onClick={() =>
                    item.isExpanded ? onCollapse(item.id) : onExpand(item.id)
                  }
                >
                  {item.data ? item.data.title : ''}
                </FolderTitle>
              ) : (
                <FolderTitle isFirst={onCheckFirstNode(item.id)}>
                  {item.data ? item.data.title : ''}
                </FolderTitle>
              )}
            </FolderLeftBox>
            <FolderRightBox className="right">
              <FolderETCButton type="button">
                <PlusIcon />
              </FolderETCButton>
              <FolderETCButton
                type="button"
                onClick={(e) => onToggleMenu(e, item.id)}
              >
                <More16Icon />
              </FolderETCButton>
            </FolderRightBox>
          </FolderItemBlock>
        </FolderItemWrapper>
        {isOpen === item.id && (
          <FolderMenu
            top={top}
            left={left}
            onToggleDeleteModal={onToggleDeleteModal}
          />
        )}
        {selectedFolder === item.id && isDeleteModal && (
          <Modal
            width={400}
            height={180}
            isModal={isDeleteModal}
            onToggleModal={onToggleDeleteModal}
          >
            <FolderDeleteModal selectedFolder={selectedFolder} />
          </Modal>
        )}
      </>
    );
  };

  useFoldersEffect();
  const { folders, onCollapse, onDragEnd, onExpand } = useFolderHandle();

  return (
    <FolderListWrapper>
      <Tree
        tree={folders}
        renderItem={FolderItem}
        onExpand={onExpand}
        onCollapse={onCollapse}
        // eslint-disable-next-line no-console
        onDragStart={(itemId) => console.log('이동하는 애', { id: itemId })}
        onDragEnd={onDragEnd}
        offsetPerLevel={16} // 한 깊이당 padding 값
        isDragEnabled
        isNestingEnabled
      />
    </FolderListWrapper>
  );
}

export default FolderList;
