import useBookmarksEffect from 'hooks/bookmark/useBookmarksEffect';
import React, { ReactElement, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { bookmarksState } from 'recoil/atoms/bookmarkState';
import styled from 'styled-components';
import BookmarkItem from './BookmarkItem';

const BookmarkListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function BookmarkList(): ReactElement {
  useBookmarksEffect(); // @TODO(dohyun): 나중에 실제 데이터 받을때는 이 훅스를 mainPage로 뺄꺼임 (이 컴포넌트를 재활용 하기 위해)
  const bookmarks = useRecoilValue(bookmarksState);
  const [isOpenMenuId, setIsOpenMenuId] = useState('');

  const onToggleOpenMenu = (id: string) => {
    setIsOpenMenuId(id);
  };

  return (
    <BookmarkListWrapper>
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
