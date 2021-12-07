import { useBookmarkQuery } from 'hooks/bookmark/useBookmarkQueries';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { BookmarkFilterTypes, BOOKMARK_KINDS } from 'utils/const';
import BookmarkList from './BookmarkList';
import BookmarkPath from './BookmarkPath';
import FilterBox from './FilterBox';
import Pagination from './Pagination';
import SelectBox from './SelectBox';

const BookmarkWrapper = styled.div``;

const BookmarkNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin-bottom: 28px;
  font-size: 12px;
  color: ${(props) => props.theme.color.grayDarkest};
`;

function Bookmark(): ReactElement {
  const [page, setPage] = useState<number>(1);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, isError } = useBookmarkQuery(
    BOOKMARK_KINDS.TRASH_BIN,
    page,
    BookmarkFilterTypes.LATEST_ORDER,
    false,
  );

  return (
    <BookmarkWrapper>
      <BookmarkPath />
      <BookmarkNav>
        <SelectBox />
        <FilterBox />
      </BookmarkNav>
      {data && (
        <>
          <BookmarkList bookmarkList={data.content} />
          <Pagination
            page={page}
            setPage={setPage}
            totalElements={data.totalElements}
            size={12}
          />
        </>
      )}
    </BookmarkWrapper>
  );
}

export default Bookmark;
