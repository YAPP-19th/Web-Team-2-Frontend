import BlankSlate from 'components/common/BlankSlate';
import React, { ReactElement, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { bookmarksState } from 'recoil/atoms/bookmarkState';
import styled from 'styled-components';
import BookmarkItem from './BookmarkItem';

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

function BookmarkList(): ReactElement {
  const bookmarks = useRecoilValue(bookmarksState);
  const [isOpenMenuId, setIsOpenMenuId] = useState('');

  const onToggleOpenMenu = (id: string) => {
    setIsOpenMenuId(id);
  };

  return (
    <BookmarkListWrapper>
      {bookmarks.length === 0 && (
        <BlankBox>
          <BlankSlate text="아직 저장한 도토리가 없어요!" />
        </BlankBox>
      )}

      {/* @TODO(dohyun) 실제 데이터 불러올때 북마크 디비 고유id 값을 key 값으로 전달 */}
      {bookmarks.map((bookmark, index) => (
        <BookmarkItem
          bookmark={bookmark}
          key={index}
          isOpenMenuId={isOpenMenuId}
          onToggleOpenMenu={onToggleOpenMenu}
        />
      ))}
    </BookmarkListWrapper>
  );
}

export default BookmarkList;
