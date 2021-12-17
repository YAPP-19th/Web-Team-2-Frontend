import {
  getCategoryOfBookmark,
  useBookmarkQuery,
} from 'hooks/bookmark/useBookmarkQueries';
import useToggle from 'hooks/common/useToggle';
import { bookmarks } from 'models/bookmark';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { BookmarkFilterTypes, BOOKMARK_KINDS } from 'utils/const';
import BookmarkList from './BookmarkList';
import FilterBox from './FilterBox';
import Pagination from './Pagination';
import SelectBox from './SelectBox';

interface Props {
  path: string;
  keyword?: string;
}

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
  const { path, keyword } = props;
  const [page, setPage] = useState<number>(0);
  const [isRemind, onRemindToggle] = useToggle();
  const [filter, setFilter] =
    useState<bookmarks.BookmarkFilterType>('saveTime,desc');
  const [isOpenFilterMenu, onToggleFilterMenu] = useToggle(false);
  const [menuText, setMenuText] = useState<string>('최신순');

  const onChangeMenuText = (text: string) => {
    setMenuText(text);
  };

  const onFiltering = (filterType: bookmarks.BookmarkFilterType) => {
    setFilter(filterType);
  };

  const lastPath = path.split('/').pop() || 'main';
  const bookmarkCategory = getCategoryOfBookmark(lastPath);
  const folderId =
    bookmarkCategory.kind === BOOKMARK_KINDS.FOLDER_DOTORI.kind
      ? lastPath
      : undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, isFetching, isError } = useBookmarkQuery(
    bookmarkCategory,
    page,
    filter,
    isRemind,
    keyword,
    folderId,
  );

  return (
    <>
      {data && (
        <>
          <BookmarkNav>
            <SelectBox bookmarkList={data.content} />
            <FilterBox
              onRemindToggle={onRemindToggle}
              isRemind={isRemind}
              onFiltering={onFiltering}
              isOpenFilterMenu={isOpenFilterMenu}
              onToggleFilterMenu={onToggleFilterMenu}
              onChangeMenuText={onChangeMenuText}
              menuText={menuText}
            />
          </BookmarkNav>

          <BookmarkList bookmarkList={data.content} />
          <Pagination
            page={page}
            setPage={setPage}
            totalElements={data.totalElements}
            size={bookmarkCategory.numOfPage}
          />
        </>
      )}
    </>
  );
}

export default Bookmark;
