import { ItemId } from '@atlaskit/tree';
import SmallModal from 'components/common/SmallModal';
import FolderMoveModal from 'components/sidebar/FolderMoveModal';
import {
  getCategoryOfBookmark,
  useBookmarkQuery,
} from 'hooks/bookmark/useBookmarkQueries';
import useHandleBookmark from 'hooks/bookmark/useHandleBookmark';
import useToggle from 'hooks/common/useToggle';
import { bookmarks } from 'models/bookmark';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedFolderState } from 'recoil/atoms/folderState';
import styled from 'styled-components';
import { BOOKMARK_KINDS } from 'utils/const';
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

function Bookmark(props: Props): ReactElement | null {
  const { path, keyword } = props;
  const [page, setPage] = useState<number>(1);
  const [bookmarkList, setBookmarkList] = useState<bookmarks.IBookmark[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isRemind, onRemindToggle] = useToggle();
  const [filter, setFilter] =
    useState<bookmarks.BookmarkFilterType>('saveTime,desc');
  const [isOpenFilterMenu, onToggleFilterMenu] = useToggle(false);
  const [menuText, setMenuText] = useState<string>('최신순');
  const [isDeleteModal, onToggleDeleteModal] = useToggle();
  const [isMoveModal, onToggleMoveModal] = useToggle();
  const { onDeleteBookmark, onMoveBookmark } = useHandleBookmark();
  const selectedFolder = useRecoilValue(selectedFolderState);

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

  console.log('folderId', folderId);

  const { data } = useBookmarkQuery(
    bookmarkCategory,
    page - 1, // @Note 페이지네이션 라이브러리에서 기본 값이 1인데, 서버쪽에서 기본 값을 0으로 해둬서 -1을 해줘야 함
    filter,
    isRemind,
    keyword,
    folderId,
  );

  useEffect(() => {
    if (!data) return;
    setBookmarkList(
      data.content.map((bookmark) => ({ ...bookmark, checked: false })),
    );
  }, [data]);

  useEffect(() => {
    if (bookmarkList.length === 0) return;
    setIsAllChecked(bookmarkList.every((bookmark) => bookmark.checked));
  }, [bookmarkList]);

  const IsActiveSelectBox = useMemo(() => {
    return bookmarkList.some((bookmark) => bookmark.checked);
  }, [bookmarkList]);

  const onToggleAllChecked = () => {
    setIsAllChecked(!isAllChecked);
    setBookmarkList(
      bookmarkList.map((bookmark) => ({
        ...bookmark,
        checked: !isAllChecked,
      })),
    );
  };

  const onToggleSingleChecked = (bookmarkId: string) => {
    setBookmarkList(
      bookmarkList.map((bookmark) =>
        bookmark.id === bookmarkId
          ? { ...bookmark, checked: !bookmark.checked }
          : bookmark,
      ),
    );
  };

  const onDeleteBookmarkList = async () => {
    const checkedBookmarkList = bookmarkList
      .filter((bookmark) => bookmark.checked)
      .map((bookmark) => bookmark.id);
    if (checkedBookmarkList.length === 0) return;
    onDeleteBookmark(checkedBookmarkList);
    onToggleDeleteModal();
  };

  const onMoveBookmarkList = async () => {
    const checkedBookmarkList = bookmarkList
      .filter((bookmark) => bookmark.checked)
      .map((bookmark) => bookmark.id);
    if (checkedBookmarkList.length === 0) return;
    onMoveBookmark(checkedBookmarkList, selectedFolder.id);
    onToggleDeleteModal();
  };

  if (!data) return null;

  console.log('data', data);

  return (
    <>
      <BookmarkNav>
        <SelectBox
          IsActiveSelectBox={IsActiveSelectBox}
          isAllChecked={isAllChecked}
          onToggleAllChecked={onToggleAllChecked}
          onToggleDeleteModal={onToggleDeleteModal}
          onToggleMoveModal={onToggleMoveModal}
        />
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

      <BookmarkList
        bookmarkList={bookmarkList}
        onToggleSingleChecked={onToggleSingleChecked}
        IsActiveSelectBox={IsActiveSelectBox}
      />
      {bookmarkList.length !== 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalElements={data.totalElements}
          size={bookmarkCategory.numOfPage}
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
          onClick={onDeleteBookmarkList}
        />
      )}

      {isMoveModal && (
        <FolderMoveModal
          isModal={isMoveModal}
          onToggleModal={onToggleMoveModal}
        />
      )}
    </>
  );
}

export default Bookmark;
