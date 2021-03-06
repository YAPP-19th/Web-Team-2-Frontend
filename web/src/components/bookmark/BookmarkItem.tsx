/* eslint-disable no-console */
import { clickCountBookmark } from 'api/bookmarkAPI';
import {
  BellSelectedIcon,
  BellUnSelectedIcon,
  Copy24Icon,
  More24Icon,
  Symbol36Icon,
} from 'assets/icons';
import { ellipsis } from 'assets/styles/utilStyles';
import CheckBox from 'components/common/CheckBox';
import FolderEmoji from 'components/common/FolderEmoji';
import Toasts from 'components/common/Toasts';
import useHandleBookmark from 'hooks/bookmark/useHandleBookmark';
import useToasts from 'hooks/common/useToasts';
import { bookmarks } from 'models/bookmark';
import React, { ReactElement, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/atoms/userState';
import styled from 'styled-components';
import { isFolderPage } from 'utils/checkFolderPage';
import { IBookmarkMenu, IBookmarkOpenMenu } from './BookmarkList';
import BookmarkMenu from './BookmarkMenu';

interface BookmarkItemProps {
  bookmark: bookmarks.IBookmark;
  isOpenMenu: IBookmarkOpenMenu;
  onToggleModal: IBookmarkMenu;
  onToggleSingleChecked: (bookmarkId: string) => void;
  onActiveSelectFolder: () => void;
  IsActiveSelectBox: boolean;
}

const BookmarkItemWrapper = styled.div`
  margin: 0 24px 40px 0px;
  &:nth-child(3n) {
    margin-right: 0px;
  }
  display: flex;
  flex-direction: column;
`;

const ItemInner = styled.div`
  flex: 1 auto;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  position: relative;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  box-shadow: 0 1px 4px 0 ${(props) => props.theme.color.shadow0};
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 20px 0 ${(props) => props.theme.color.shadow3};
    z-index: 9999;
  }
`;

const BookmarkThumbnail = styled.a`
  width: 273px;
  height: 152px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BookmarkDefaultImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BookmarkImage = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
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
  display: flex;
  flex-direction: column;
  flex: 1 auto;
`;

const InnerContent = styled.a`
  flex: 1 auto;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  width: 233px;
  color: ${(props) => props.theme.color.black};
  margin-bottom: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Description = styled.div`
  font-size: 14px;
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

const FolderInfo = styled.div`
  margin-bottom: 11px;
  display: flex;
  align-items: center;
`;

const FolderName = styled(Link)`
  margin-right: 4px;
  font-size: 10px;
  color: ${(props) => props.theme.color.gray};
  height: 16px;
  line-height: 16px;
  ${ellipsis}
  display: inline-block;
  max-width: 135px;
  &:hover {
    text-decoration: underline;
  }
`;

function BookmarkItem({
  bookmark,
  isOpenMenu,
  onToggleModal,
  onToggleSingleChecked,
  onActiveSelectFolder,
  IsActiveSelectBox,
}: BookmarkItemProps): ReactElement {
  const {
    id,
    title,
    description,
    link,
    remindTime,
    folderId,
    image,
    checked,
    folderName,
    folderEmoji,
  } = bookmark;

  const path = useParams();
  const user = useRecoilValue(userState);

  const [isOpenCopyToast, onCopyToast] = useToasts();
  const [isOpenRemindToast, onRemindToast] = useToasts();
  const [isOpenRemindRecomenToast, onRemindRecoToast] = useToasts();

  const { onEditBookmark } = useHandleBookmark();
  const copyUrlRef = useRef<HTMLTextAreaElement>(null);

  const { onToggleOpenMenu } = onToggleModal;

  const onCopyUrl = async () => {
    copyUrlRef.current?.select();
    await navigator.clipboard.writeText(link);
    onCopyToast();
  };

  const onClickCountBookmark = async () => {
    try {
      await clickCountBookmark(id);
    } catch (e) {
      console.log(e);
    }
  };

  const onRemindToggleButton = () => {
    if (!remindTime && !user.remindToggle) {
      onRemindRecoToast();
      return;
    }
    onRemindToast();
    onEditBookmark(id, title, !remindTime);
  };

  return (
    <BookmarkItemWrapper>
      <ItemInner>
        <BookmarkThumbnail
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClickCountBookmark}
        >
          {image ? (
            <BookmarkImage src={image} alt="thumbnail" />
          ) : (
            <BookmarkDefaultImage>
              <SymbolIcon />
            </BookmarkDefaultImage>
          )}

          {IsActiveSelectBox && (
            <SelectButton
              onClick={(e) => {
                e.preventDefault();
                onToggleSingleChecked(id);
              }}
              variant="primary"
              isChecked={checked}
            />
          )}
        </BookmarkThumbnail>

        <BookmarkContent>
          <InnerContent
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClickCountBookmark}
          >
            <Title>{title}</Title>
            <Description>{description}</Description>
          </InnerContent>
          {!isFolderPage(path.folderId) && folderId && (
            <FolderInfo>
              <FolderEmoji emoji={folderEmoji} />
              <FolderName to={`/${folderId}`}>{folderName}</FolderName>
            </FolderInfo>
          )}
          <DividerLine />
          <BookmarkInfo>
            <BookmarkLinkBox>
              <BookmarkLink
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClickCountBookmark}
              >
                {link}
              </BookmarkLink>
            </BookmarkLinkBox>

            {path.folderId !== 'trash' && (
              <BookmarkOption>
                <OptionButton
                  onClick={onRemindToggleButton}
                  disabled={isOpenRemindToast}
                >
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
                      onActiveSelectFolder={onActiveSelectFolder}
                    />
                  )}
                </OptionButton>
              </BookmarkOption>
            )}
          </BookmarkInfo>
        </BookmarkContent>

        <UrlTextArea readOnly ref={copyUrlRef} value={link} />
        {checked && <SelectedStyled />}
      </ItemInner>
      <Toasts isOpen={isOpenCopyToast} type="copyLink" />
      <Toasts
        isOpen={isOpenRemindToast}
        type={remindTime ? 'remindSetting' : 'remindDisabled'}
      />
      <Toasts isOpen={isOpenRemindRecomenToast} type="remindRecommendation" />
    </BookmarkItemWrapper>
  );
}

export default BookmarkItem;
