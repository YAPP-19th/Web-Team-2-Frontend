import React, { ReactElement } from 'react';
import styled from 'styled-components';

const BookmarkPathWrapper = styled.div`
  margin-bottom: 28px;
`;

const PathText = styled.span`
  font-size: 14px;
  line-height: 1.5;
  font-weight: normal;
  color: ${(props) => props.theme.color.grayDarkest};
`;

function BookmarkPath(): ReactElement {
  return (
    <BookmarkPathWrapper>
      <PathText>모든 도토리</PathText>
    </BookmarkPathWrapper>
  );
}

export default BookmarkPath;
