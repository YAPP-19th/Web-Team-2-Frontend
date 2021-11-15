import Tree, { ItemId, RenderItemParams } from '@atlaskit/tree';
import { More16Icon, PlusIcon } from 'assets/icons';
import SmallModal from 'components/common/SmallModal';
import useToggle from 'hooks/common/useToggle';
import useFolderHandle from 'hooks/sidebar/useFolderHandle';
import useFoldersEffect from 'hooks/sidebar/useFoldersEffect';
import React, { ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';
import { folderMenuState, selectedFolderState } from 'recoil/atoms/folderState';
import { useFolderAction } from 'recoil/selectors/folderSelector';
import styled from 'styled-components';
import FolderItemIcon from './FolderItemIcon';
import FolderMenu from './FolderMenu';

const FolderListWrapper = styled.div`
  position: relative;
  margin-bottom: 28px;
  /* overflow: auto; */
`;
const FolderItemWrapper = styled.div`
  width: 166px;
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
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });
  const [isDeleteModal, onToggleDeleteModal] = useToggle();

  const { onCheckFirstNode } = useFolderHandle();
  const { create } = useFolderAction();

  const onToggleMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    itemId: ItemId,
  ) => {
    setIsOpen(itemId);
    setSelectedFolder(itemId);
    setPosition({
      top: e.currentTarget.getBoundingClientRect().top,
      left: e.currentTarget.getBoundingClientRect().left,
    });
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
          <FolderItemBlock
            onMouseDown={() =>
              item.isExpanded && item.children.length > 0
                ? onCollapse(item.id)
                : onExpand(item.id)
            }
          >
            <FolderLeftBox>
              <span>
                <FolderItemIcon
                  item={item}
                  onCollapse={onCollapse}
                  onExpand={onExpand}
                />
              </span>
              <FolderTitle isFirst={onCheckFirstNode(item.id)}>
                {item.data ? item.data.title : ''}
              </FolderTitle>
            </FolderLeftBox>
            <FolderRightBox
              className="right"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <FolderETCButton type="button" onClick={() => create(item.id)}>
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
            position={position}
            onToggleDeleteModal={onToggleDeleteModal}
          />
        )}

        {selectedFolder === item.id && isDeleteModal && (
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
