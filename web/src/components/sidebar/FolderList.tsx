import Tree, { ItemId, RenderItemParams } from '@atlaskit/tree';
import { More16Icon, PlusIcon } from 'assets/icons';
import SmallModal from 'components/common/SmallModal';
import useToggle from 'hooks/common/useToggle';
import useFolderHandle from 'hooks/sidebar/useFolderHandle';
import useFoldersEffect from 'hooks/sidebar/useFoldersEffect';
import React, { ReactElement, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { selectedFolderState } from 'recoil/atoms/folderState';
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
`;

const FolderTitle = styled.span<{ isFirst: boolean }>`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  ${(props) => props.isFirst && `font-weight: 500`}
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
  const setSelectedFolder = useSetRecoilState(selectedFolderState);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  // modal state
  const [isMenuModal, onToggleMenuModal] = useToggle();
  const [isDeleteModal, onToggleDeleteModal] = useToggle();

  // logic hooks
  useFoldersEffect();
  const { onCheckFirstNode } = useFolderHandle();
  const { create } = useFolderAction();

  const onToggleMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    itemId: ItemId,
  ) => {
    setSelectedFolder(itemId);
    onToggleMenuModal();
    setPosition({
      top: e.currentTarget.getBoundingClientRect().top,
      left: e.currentTarget.getBoundingClientRect().left,
    });
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
              <FolderTitle isFirst={onCheckFirstNode(item.id)}>
                {item.data.title}
              </FolderTitle>
            </FolderLeftBox>

            <FolderRightBox onMouseDown={(e) => e.stopPropagation()}>
              <FolderETCButton onClick={() => create(item.id)}>
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

  const { folders, onCollapse, onDragEnd, onExpand } = useFolderHandle();
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

      {isMenuModal && (
        <FolderMenu
          position={position}
          onToggleMenuModal={onToggleMenuModal}
          onToggleDeleteModal={onToggleDeleteModal}
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
          onClick={() => console.log('API생성되면 추가하겠음!')}
        />
      )}
    </FolderListWrapper>
  );
}

export default FolderList;
