/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BellSelectedIcon,
  BellUnSelectedIcon,
  Copy24Icon,
  More24Icon,
  Symbol36Icon,
} from 'assets/icons';
import { ellipsis } from 'assets/styles/utilStyles';
import CheckBox from 'components/common/CheckBox';
import Toasts from 'components/common/Toasts';
import { useBookmarkMutationQuery } from 'hooks/bookmark/useBookmarkQueries';
import useToasts from 'hooks/common/useToasts';
import { bookmarks } from 'models/bookmark';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedBookmarksState } from 'recoil/atoms/bookmarkState';
import styled from 'styled-components';
import { IBookmarkMenu, IBookmarkOpenMenu } from './BookmarkList';
import BookmarkMenu from './BookmarkMenu';

interface BookmarkItemProps {
  bookmark: bookmarks.IBookmark;
  isOpenMenu: IBookmarkOpenMenu;
  onToggleModal: IBookmarkMenu;
}

const BookmarkItemWrapper = styled.div`
  margin: 0 24px 40px 0px;
  &:nth-child(3n) {
    margin-right: 0px;
  }
  box-shadow: 0 1px 4px 0 ${(props) => props.theme.color.shadow0};
  border-radius: 8px;
  position: relative;
`;

const BookmarkThumbnail = styled.div`
  width: 273px;
  height: 168px;
  background-color: ${(props) => props.theme.color.grayLightest};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const SelectButton = styled(CheckBox)`
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 100;
`;

const SymbolIcon = styled(Symbol36Icon)`
  width: 60px;
  height: 60px;
`;

const BookmarkContent = styled.div`
  padding: 14px 20px 15px;
  width: 273px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  width: 233px;
  color: ${(props) => props.theme.color.black};
  margin-bottom: 8px;
  ${ellipsis};
`;

const Description = styled.div`
  font-size: 12px;
  font-weight: normal;
  line-height: 1.42;
  width: 233px;
  color: ${(props) => props.theme.color.grayDarkest};
  margin-bottom: 23.5px;
  ${ellipsis};
`;

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: 13.5px;
  background-color: ${(props) => props.theme.color.grayLightest};
`;

const BookmarkInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BookmarkLinkBox = styled.div`
  display: flex;
  align-items: center;
`;

const BookmarkFavicon = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  background-color: ${(props) => props.theme.color.grayLightest};
`;

const BookmarkLink = styled.a`
  width: 110px;
  font-size: 12px;
  font-weight: normal;
  line-height: 1.42;
  text-decoration: none;
  color: #aaa;
  ${ellipsis}
`;

const BookmarkOption = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90px;
`;

const OptionButton = styled.button`
  position: relative;
`;

const SelectedStyled = styled.div`
  width: 100%;
  height: 100%;
  border: solid 1px ${(props) => props.theme.color.primary};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.color.shadow1};
  border-radius: 8px;
`;

const UrlTextArea = styled.textarea`
  display: none;
`;

function BookmarkItem({
  bookmark,
  isOpenMenu,
  onToggleModal,
}: BookmarkItemProps): ReactElement {
  const { id, title, description, link, remindTime, folderId } = bookmark;
  const [selectedBookmarks, setSelectedBookmarks] = useRecoilState(
    selectedBookmarksState,
  );
  const [isChecked, setIsChecked] = useState(false);
  const [isOpenCopyToast, onCopyToast] = useToasts();
  const [isOpenRemindToast, onRemindToast] = useToasts();

  const copyUrlRef = useRef<HTMLTextAreaElement>(null);

  const { onToggleOpenMenu } = onToggleModal;

  // const { mutateBookmarkDelete, mutateBookmarkMove, mutateBookmarkUpdate } =
  //   useBookmarkMutationQuery(id);

  // // mutateBookmarkDelete();

  // const updateRequestData: bookmarks.IBookmarkUpdateRequest = {
  //   title,
  //   remind: false,
  // };
  // mutateBookmarkUpdate(updateRequestData);

  // // const moveRequestData: bookmarks.IBookmarkMoveRequest = {
  // //   prevFolderId: 'prev',
  // //   nextFolderId: 'next',
  // // };
  // // mutateBookmarkMove(moveRequestData);

  useEffect(() => {
    setIsChecked(
      selectedBookmarks.some((selectedBookmark) => selectedBookmark.id === id),
    );
  }, [selectedBookmarks]);

  const onToggleCheckBox = () => {
    const isExist = selectedBookmarks.some(
      (selectedBookmark) => selectedBookmark.id === id,
    );

    if (isExist) {
      setSelectedBookmarks(
        selectedBookmarks.filter(
          (selectedBookmark) => selectedBookmark.id !== id,
        ),
      );
    } else {
      setSelectedBookmarks([...selectedBookmarks, bookmark]);
    }
  };

  const onCopyUrl = async () => {
    copyUrlRef.current?.select();
    await navigator.clipboard.writeText(link);
    onCopyToast();
  };

  return (
    <BookmarkItemWrapper>
      <BookmarkThumbnail>
        {/* @TODO(dohyun) 만약에 썸네일이 있으면 img 보여주고 없으면 기본 로고 보여주기 */}
        <SymbolIcon />
        {selectedBookmarks.length > 0 && (
          <SelectButton
            onClick={onToggleCheckBox}
            variant="primary"
            isChecked={isChecked}
          />
        )}
      </BookmarkThumbnail>

      <BookmarkContent>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <DividerLine />
        <BookmarkInfo>
          <BookmarkLinkBox>
            <BookmarkFavicon />
            <BookmarkLink href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </BookmarkLink>
          </BookmarkLinkBox>

          <BookmarkOption>
            <OptionButton onClick={onRemindToast} disabled={isOpenRemindToast}>
              {remindTime ? <BellSelectedIcon /> : <BellUnSelectedIcon />}
            </OptionButton>

            <OptionButton onClick={onCopyUrl} disabled={isOpenCopyToast}>
              <Copy24Icon />
            </OptionButton>

            <OptionButton
              onClick={(e) => {
                onToggleOpenMenu(id, title, true, remindTime, folderId);
                e.stopPropagation();
              }}
            >
              <More24Icon />
              {isOpenMenu.id === id && isOpenMenu.isOpen && (
                <BookmarkMenu
                  isOpen={isOpenMenu.id === id}
                  isOpenMenu={isOpenMenu}
                  onToggleModal={onToggleModal}
                />
              )}
            </OptionButton>
          </BookmarkOption>
        </BookmarkInfo>
      </BookmarkContent>

      <UrlTextArea readOnly ref={copyUrlRef} value={link} />

      {isChecked && <SelectedStyled />}

      <Toasts isOpen={isOpenCopyToast} type="copyLink" />
      <Toasts
        isOpen={isOpenRemindToast}
        type={remindTime ? 'remindDisabled' : 'remindSetting'}
      />
    </BookmarkItemWrapper>
  );
}

export default BookmarkItem;
