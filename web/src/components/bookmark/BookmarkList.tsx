/* eslint-disable @typescript-eslint/no-unused-vars */
import { ItemId } from '@atlaskit/tree';
import BlankSlate from 'components/common/BlankSlate';
import SmallModal from 'components/common/SmallModal';
import FolderMoveModal from 'components/sidebar/FolderMoveModal';
import useHandleBookmark from 'hooks/bookmark/useHandleBookmark';
import useToggle from 'hooks/common/useToggle';
import { bookmarks } from 'models/bookmark';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import BookmarkEditModal from './BookmarkEditModal';
import BookmarkItem from './BookmarkItem';

interface Props {
  bookmarkList: bookmarks.IBookmark[];
  onToggleSingleChecked: (bookmarkId: string) => void;
  IsActiveSelectBox: boolean;
}

export interface IBookmarkMenu {
  onToggleOpenMenu: (
    id: string,
    title: string,
    isOpen: boolean,
    remindTime: null | string,
    folderId?: ItemId,
  ) => void;
  onToggleDeleteModal: () => void;
  onToggleEditModal: () => void;
  onToggleMoveModal: () => void;
}

export interface IBookmarkOpenMenu {
  id: string;
  title: string;
  remindTime: null | string;
  isOpen: boolean;
  folderId?: ItemId;
}

const BookmarkListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const BlankBox = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function BookmarkList(props: Props): ReactElement {
  const { bookmarkList, onToggleSingleChecked, IsActiveSelectBox } = props;
  const [isOpenMenu, setIsOpenMenu] = useState<IBookmarkOpenMenu>({
    id: '',
    title: '',
    remindTime: null,
    isOpen: false,
    folderId: '',
  });
  const [isDeleteModal, onToggleDeleteModal] = useToggle();
  const [isEditModal, onToggleEditModal] = useToggle();
  const [isMoveModal, onToggleMoveModal] = useToggle();

  const onToggleOpenMenu = (
    id: string,
    title: string,
    isOpen: boolean,
    remindTime: null | string,
    folderId?: ItemId,
  ) => {
    setIsOpenMenu({ ...isOpenMenu, id, title, isOpen, remindTime, folderId });
  };

  const onToggleModal: IBookmarkMenu = {
    onToggleOpenMenu,
    onToggleDeleteModal,
    onToggleEditModal,
    onToggleMoveModal,
  };

  const { onDeleteBookmark } = useHandleBookmark();

  return (
    <BookmarkListWrapper>
      {bookmarkList.length === 0 && (
        <BlankBox>
          <BlankSlate text="아직 저장한 도토리가 없어요!" />
        </BlankBox>
      )}

      {/* @TODO(dohyun) 실제 데이터 불러올때 북마크 디비 고유id 값을 key 값으로 전달 */}
      {bookmarkList.map((bookmark, index) => (
        <BookmarkItem
          bookmark={bookmark}
          key={index}
          isOpenMenu={isOpenMenu}
          onToggleModal={onToggleModal}
          onToggleSingleChecked={onToggleSingleChecked}
          IsActiveSelectBox={IsActiveSelectBox}
        />
      ))}

      {isEditModal && (
        <BookmarkEditModal
          isModal={isEditModal}
          onToggleModal={onToggleEditModal}
          isOpenMenu={isOpenMenu}
        />
      )}

      {isDeleteModal && (
        <SmallModal
          isModal={isDeleteModal}
          onToggleModal={onToggleDeleteModal}
          title="선택한 도토리를 삭제할까요?"
          content="삭제된 도토리는 완전히 사라져요!"
          buttonName="삭제"
          isOneLine
          onClick={() => onDeleteBookmark([isOpenMenu.id])}
        />
      )}

      {isMoveModal && (
        <FolderMoveModal
          isModal={isMoveModal}
          onToggleModal={onToggleMoveModal}
        />
      )}
    </BookmarkListWrapper>
  );
}

export default BookmarkList;
