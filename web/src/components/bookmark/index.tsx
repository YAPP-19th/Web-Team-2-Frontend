import React, { ReactElement } from 'react';
import styled from 'styled-components';
import BookmarkPath from 'components/bookmark/BookmarkPath';

const BookmarkWrapper = styled.div``;

function Bookmark(): ReactElement {
  return (
    <BookmarkWrapper>
      <BookmarkPath />
    </BookmarkWrapper>
  );
}

export default Bookmark;
