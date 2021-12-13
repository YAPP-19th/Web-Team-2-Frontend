import { FolderIdParams } from 'components/subFolders';
import usePagePathEffect from 'hooks/common/usePagePathEffect';
import usePagePathQueries from 'hooks/common/usePagePathQueries';
import React, { ReactElement } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { checkFolderPage } from 'utils/checkFolderPage';

const BookmarkPathWrapper = styled.div`
  margin-bottom: 28px;
`;

const PathText = styled.span`
  font-size: 14px;
  line-height: 1.5;
  font-weight: normal;
  color: ${(props) => props.theme.color.grayDarkest};
`;

function NormalPath(): ReactElement {
  const location = useLocation();
  const { getPath } = usePagePathEffect();
  const pathName = getPath(location.pathname);
  return (
    <BookmarkPathWrapper>
      <PathText> {pathName} </PathText>
    </BookmarkPathWrapper>
  );
}

function FolderPath({ folderId }: { folderId: string }): ReactElement | null {
  const { data } = usePagePathQueries(folderId);
  if (!data) return null;
  return (
    <BookmarkPathWrapper>
      {data.map((item) => (
        <PathText key={item.folderId}>{item.name}</PathText>
      ))}
    </BookmarkPathWrapper>
  );
}

function BookmarkPath(): ReactElement | null {
  const { folderId } = useParams<keyof FolderIdParams>() as FolderIdParams;

  return (
    <>
      {checkFolderPage(folderId) ? (
        <FolderPath folderId={folderId} />
      ) : (
        <NormalPath />
      )}
    </>
  );
}

export default BookmarkPath;
