import usePagePathEffect from 'hooks/common/usePagePathEffect';
import usePagePathQueries from 'hooks/common/usePagePathQueries';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import Path from 'routes/path';
import styled from 'styled-components';
import { checkFolderPage } from 'utils/checkFolderPage';

interface BookmarkPathProps {
  path: string;
}

interface FolderIdParams {
  folderId: string;
}

const BookmarkPathWrapper = styled.div`
  margin-bottom: 28px;
`;

const PathText = styled.span`
  font-size: 14px;
  line-height: 1.5;
  font-weight: normal;
  color: ${(props) => props.theme.color.grayDarkest};
`;

function BookmarkPath({ path }: BookmarkPathProps): ReactElement | null {
  const { getPathName } = usePagePathEffect();
  const pathName = getPathName(path);

  const { folderId } = useParams<keyof FolderIdParams>() as FolderIdParams;
  if (!checkFolderPage(folderId)) return null;

  const { data } = usePagePathQueries(folderId);
  console.log('data', data);
  return (
    <BookmarkPathWrapper>
      <PathText>{pathName}</PathText>
    </BookmarkPathWrapper>
  );
}

export default BookmarkPath;
