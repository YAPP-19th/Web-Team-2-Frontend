import useLayerClose from 'hooks/common/useLayerClose';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { IBookmarkMenu } from './BookmarkList';

interface BookmarkMenuProps {
  isOpen: boolean;
  onToggleModal: IBookmarkMenu;
}

const BookmarkMenuWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 24px;
  z-index: 102;
`;

const BookmarkMenuInner = styled.div`
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.color.white};
  z-index: 9999;
`;

const BookmarkMenuItem = styled.div`
  width: 62px;
  height: 29px;
  padding: 7px 2px 9px 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:hover {
    background-color: ${(props) => props.theme.color.grayLightest};
    cursor: pointer;
  }
`;

function BookmarkMenu({
  isOpen,
  onToggleModal,
}: BookmarkMenuProps): ReactElement {
  const {
    onToggleOpenMenu,
    onToggleDeleteModal,
    onToggleEditModal,
    onToggleMoveModal,
  } = onToggleModal;

  const BookmarkMenuItems = [
    {
      name: '이동',
      onClick: onToggleMoveModal,
    },
    {
      name: '편집',
      onClick: onToggleEditModal,
    },
    {
      name: '삭제',
      onClick: onToggleDeleteModal,
    },
  ];

  const onClose = () => {
    onToggleOpenMenu('', '');
  };

  const { targetEl } = useLayerClose(isOpen, onClose);

  return (
    <BookmarkMenuWrapper ref={targetEl}>
      <BookmarkMenuInner>
        {BookmarkMenuItems.map((item) => (
          <BookmarkMenuItem key={item.name} onClick={item.onClick}>
            {item.name}
          </BookmarkMenuItem>
        ))}
      </BookmarkMenuInner>
    </BookmarkMenuWrapper>
  );
}

export default BookmarkMenu;
