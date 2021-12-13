import { FolderIdParams } from 'components/subFolders/SubFolderList';
import usePagePathEffect from 'hooks/common/usePagePathEffect';
import usePagePathQueries from 'hooks/common/usePagePathQueries';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { checkFolderPage } from 'utils/checkFolderPage';

interface BookmarkPathProps {
  path: string;
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
  const { folderId } = useParams<keyof FolderIdParams>() as FolderIdParams;
  const { data } = usePagePathQueries(folderId);
  const { getPath } = usePagePathEffect();
  const pathName = getPath(path);

  const foldersPath = () => {
    return (
      <>
        {data?.map((item) => (
          <PathText key={item.name}>{item.name}</PathText>
        ))}
      </>
    );
  };

  return (
    <BookmarkPathWrapper>
      {checkFolderPage(folderId) ? (
        foldersPath()
      ) : (
        <PathText> {pathName} </PathText>
      )}
    </BookmarkPathWrapper>
  );
}

export default BookmarkPath;
