/* eslint-disable @typescript-eslint/no-unused-vars */
import { ItemId } from '@atlaskit/tree';
import BlankSlate from 'components/common/BlankSlate';
import SmallModal from 'components/common/SmallModal';
import FolderMoveModal from 'components/sidebar/FolderMoveModal';
import useHandleBookmark from 'hooks/bookmark/useHandleBookmark';
import useToggle from 'hooks/common/useToggle';
import { bookmarks } from 'models/bookmark';
import React, { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { selectedFolderState } from 'recoil/atoms/folderState';
import styled from 'styled-components';
import BookmarkEditModal from './BookmarkEditModal';
import BookmarkItem from './BookmarkItem';

interface Props {
  bookmarkList: bookmarks.IBookmark[];
  onToggleSingleChecked: (bookmarkId: string) => void;
  onActiveSelectFolder: () => void;
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
  const {
    bookmarkList,
    onToggleSingleChecked,
    onActiveSelectFolder,
    IsActiveSelectBox,
  } = props;
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
  const [selectedFolder, setSelectedFolder] =
    useRecoilState(selectedFolderState);

  const path = useParams();

  const onToggleOpenMenu = (
    id: string,
    title: string,
    isOpen: boolean,
    remindTime: null | string,
    folderId?: ItemId,
  ) => {
    setIsOpenMenu({ ...isOpenMenu, id, title, isOpen, remindTime, folderId });
    setSelectedFolder({
      id: folderId as ItemId,
      name: '이동',
      emoji: '이동',
    });
  };

  const onToggleModal: IBookmarkMenu = {
    onToggleOpenMenu,
    onToggleDeleteModal,
    onToggleEditModal,
    onToggleMoveModal,
  };

  const { onDeleteBookmark, onMoveBookmark } = useHandleBookmark();

  const onMoveBookmarkList = async () => {
    onMoveBookmark([isOpenMenu.id], selectedFolder.id);
    onToggleMoveModal();
  };

  const blackSlateType = () => {
    switch (path.folderId) {
      case 'search':
        return '찾으시는 도토리가 없어요!';
      case 'trash':
        return '휴지통이 비어있어요!';
      default:
        return '아직 저장한 도토리가 없어요!';
    }
  };

  const blackSlateText = blackSlateType();

  return (
    <BookmarkListWrapper>
      {bookmarkList.length === 0 && (
        <BlankBox>
          <BlankSlate text={blackSlateText} />
        </BlankBox>
      )}

      {bookmarkList.map((bookmark) => (
        <BookmarkItem
          bookmark={bookmark}
          key={bookmark.id}
          isOpenMenu={isOpenMenu}
          onToggleModal={onToggleModal}
          onToggleSingleChecked={onToggleSingleChecked}
          onActiveSelectFolder={onActiveSelectFolder}
          IsActiveSelectBox={IsActiveSelectBox}
        />
      ))}

      {isEditModal && (
        <BookmarkEditModal
          onToggleModal={onToggleEditModal}
          isOpenMenu={isOpenMenu}
        />
      )}

      {isDeleteModal && (
        <SmallModal
          isModal={isDeleteModal}
          onToggleModal={onToggleDeleteModal}
          title="선택한 도토리를 삭제할까요?"
          content="삭제된 도토리는 모두 <br/> 휴지통으로 들어가요!"
          buttonName="삭제"
          onClick={() => onDeleteBookmark([isOpenMenu.id])}
        />
      )}

      {isMoveModal && (
        <FolderMoveModal
          isModal={isMoveModal}
          onToggleModal={onToggleMoveModal}
          onMoveBookmark={onMoveBookmarkList}
        />
      )}
    </BookmarkListWrapper>
  );
}

export default BookmarkList;
