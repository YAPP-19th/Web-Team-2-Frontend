import {
  BellSelectedIcon,
  BellUnSelectedIcon,
  CheckBox36Icon,
  CheckBoxSelected36Icon,
  Copy24Icon,
  More24Icon,
  Symbol36Icon,
} from 'assets/icons';
import { ellipsis } from 'assets/styles/utilStyles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { IBookmark, selectedBookmarksState } from 'recoil/atoms/bookmarkState';
import styled from 'styled-components';

interface BookmarkItemProps {
  bookmark: IBookmark;
}

const BookmarkItemWrapper = styled.div`
  margin: 0 24px 40px 0px;
  &:nth-child(3n) {
    margin-right: 0px;
  }
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  position: relative;
`;

const BookmarkThumbnail = styled.div`
  width: 273px;
  height: 168px;
  background-color: #f3f2ef;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CheckBox = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
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
  color: ${(props) => props.theme.color.black0};
  margin-bottom: 8px;
  ${ellipsis};
`;

const Description = styled.div`
  font-size: 12px;
  font-weight: normal;
  line-height: 1.42;
  width: 233px;
  color: ${(props) => props.theme.color.black1};
  margin-bottom: 23.5px;
  ${ellipsis};
`;

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: 13.5px;
  background-color: ${(props) => props.theme.color.lightGray0};
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
  background-color: ${(props) => props.theme.color.lightGray0};
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

const OptionButton = styled.button``;

const SelectedStyled = styled.div`
  width: 100%;
  height: 100%;
  border: solid 1px #48bf91;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 174, 199, 0.1);
  border-radius: 8px;
`;

function BookmarkItem({ bookmark }: BookmarkItemProps): ReactElement {
  const { id, title, description, url, remind } = bookmark;
  const [selectedBookmarks, setSelectedBookmarks] = useRecoilState(
    selectedBookmarksState,
  );
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (selectedBookmarks.length > 0) {
      setIsChecked(selectedBookmarks.some((b) => b.id === id));
    }
  }, []);

  return (
    <BookmarkItemWrapper>
      <BookmarkThumbnail>
        {/* @TODO(dohyun) 만약에 썸네일이 있으면 img 보여주고 없으면 기본 로고 보여주기 */}
        <SymbolIcon />
        <CheckBox>
          {isChecked ? <CheckBoxSelected36Icon /> : <CheckBox36Icon />}
        </CheckBox>
      </BookmarkThumbnail>

      <BookmarkContent>
        <Title>{title}</Title>

        <Description>{description}</Description>

        <DividerLine />
        <BookmarkInfo>
          <BookmarkLinkBox>
            <BookmarkFavicon />
            <BookmarkLink href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </BookmarkLink>
          </BookmarkLinkBox>

          <BookmarkOption>
            <OptionButton>
              {remind ? <BellSelectedIcon /> : <BellUnSelectedIcon />}
            </OptionButton>
            <OptionButton>
              <Copy24Icon />
            </OptionButton>
            <OptionButton>
              <More24Icon />
            </OptionButton>
          </BookmarkOption>
        </BookmarkInfo>
      </BookmarkContent>

      {isChecked && <SelectedStyled />}
    </BookmarkItemWrapper>
  );
}

export default BookmarkItem;
