import {
  getCategoryOfBookmark,
  useBookmarkQuery,
} from 'hooks/bookmark/useBookmarkQueries';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { BookmarkFilterTypes } from 'utils/const';
import BookmarkList from './BookmarkList';
import FilterBox from './FilterBox';
import Pagination from './Pagination';
import SelectBox from './SelectBox';

interface Props {
  path: string;
}

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

function Bookmark(props: Props): ReactElement {
  const { path } = props;
  const [page, setPage] = useState<number>(1);

  const lastPath = path.split('/').pop() || 'main';

  const bookmarkCategory = getCategoryOfBookmark(lastPath);

  /** NOTE
   *  Pagination 을 위한 useQueryHook
   *  북마크 카테고리(휴지통, 전체, ...), 요청 페이지, 필터링, 리마인드
   *  4가지의 값으로 가져옴
   *  카테고리는 path를 통해 구분하고, search, filter, remind 등의 값은 recoil or props 로 가져옴
   * */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, isFetching, isError } = useBookmarkQuery(
    bookmarkCategory,
    page,
    BookmarkFilterTypes.LATEST_ORDER,
    false,
    'naver',
  );

  return (
    <BookmarkWrapper>
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
            size={bookmarkCategory.numOfPage}
          />
        </>
      )}
    </BookmarkWrapper>
  );
}

export default Bookmark;
