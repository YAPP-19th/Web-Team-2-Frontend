import BlankSlate from 'components/common/BlankSlate';
import useToggle from 'hooks/common/useToggle';
import { bookmarks } from 'models/bookmark';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import BookmarkItem from './BookmarkItem';

interface Props {
  bookmarkList: bookmarks.IBookmark[];
}

export interface IBookmarkMenu {
  onToggleOpenMenu: (id: string) => void;
  onToggleDeleteModal: () => void;
  onToggleEditModal: () => void;
  onToggleMoveModal: () => void;
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
  const { bookmarkList } = props;
  const [isOpenMenuId, setIsOpenMenuId] = useState<string>();
  const [isDeleteModal, onToggleDeleteModal] = useToggle();
  const [isEditModal, onToggleEditModal] = useToggle();
  const [isMoveModal, onToggleMoveModal] = useToggle();

  const onToggleOpenMenu = (id: string) => {
    setIsOpenMenuId(id);
  };

  const onToggleModal: IBookmarkMenu = {
    onToggleOpenMenu,
    onToggleDeleteModal,
    onToggleEditModal,
    onToggleMoveModal,
  };
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
          isOpenMenuId={isOpenMenuId}
          onToggleModal={onToggleModal}
        />
      ))}
    </BookmarkListWrapper>
  );
}

export default BookmarkList;
