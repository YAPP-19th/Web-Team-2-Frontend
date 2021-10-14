import React, { ReactElement } from 'react';
import Tree, { ItemId, RenderItemParams } from '@atlaskit/tree';
import styled from 'styled-components';
import useFoldersEffect from 'hooks/sidebar/useFoldersEffect';
import useFolderHandle from 'hooks/sidebar/useFolderHandle';
import { MoreIcon, PlusIcon } from 'assets/icons';
import { useRecoilState } from 'recoil';
import { folderMenuState } from 'recoil/atoms/folderState';
import FolderItemIcon from './FolderItemIcon';
import FolderMenu from './FolderMenu';

const FolderListWrapper = styled.div`
  height: 100%;
  /* overflow: auto; */
`;
const FolderItemWrapper = styled.div``;

const FolderItemBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 166px;
  height: 28px;
  font-size: 12px;
  padding: 5px 2px 5px 8px;
  border-radius: 4px;
  &:hover {
    background-color: #f3f2ef;
    .right {
      display: flex;
    }
  }
  .title {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FolderLeftBox = styled.div`
  display: flex;
  align-items: center;
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

  const onToggleMenu = (itemId: ItemId) => {
    setIsOpen(itemId);
  };

  const FolderItem = ({
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
              <span
                className="title"
                role="button"
                tabIndex={0}
                onKeyDown={() =>
                  item.isExpanded ? onCollapse(item.id) : onExpand(item.id)
                }
                onClick={() =>
                  item.isExpanded ? onCollapse(item.id) : onExpand(item.id)
                }
              >
                {item.data ? item.data.title : ''}
              </span>
            ) : (
              <span className="title">{item.data ? item.data.title : ''}</span>
            )}
          </FolderLeftBox>
          <FolderRightBox className="right">
            <FolderETCButton type="button">
              <PlusIcon />
            </FolderETCButton>
            <FolderETCButton
              type="button"
              onClick={() => onToggleMenu(item.id)}
            >
              <MoreIcon />
            </FolderETCButton>
          </FolderRightBox>
          {isOpen === item.id && <FolderMenu />}
        </FolderItemBlock>
      </FolderItemWrapper>
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
