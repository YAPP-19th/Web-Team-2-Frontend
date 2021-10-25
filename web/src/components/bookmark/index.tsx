import React, { ReactElement } from 'react';
import styled from 'styled-components';
import BookmarkPath from './BookmarkPath';
import SelectBox from './SelectBox';
import FilterBox from './FilterBox';

const BookmarkWrapper = styled.div``;

const BookmarkNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin-bottom: 28px;
  font-size: 12px;
`;

function Bookmark(): ReactElement {
  return (
    <BookmarkWrapper>
      <BookmarkPath />
      <BookmarkNav>
        <SelectBox />
        <FilterBox />
      </BookmarkNav>
    </BookmarkWrapper>
  );
}

export default Bookmark;
