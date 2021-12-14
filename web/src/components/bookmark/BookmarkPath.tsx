import { ArrowSide16Icon, FolderIcon } from 'assets/icons';
import { FolderIdParams } from 'components/subFolders';
import usePagePathEffect from 'hooks/common/usePagePathEffect';
import usePagePathQueries from 'hooks/common/usePagePathQueries';
import { folder } from 'models/folder';
import React, { ReactElement, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Emoji } from 'react-twemoji-picker';
import styled, { css } from 'styled-components';
import { checkFolderPage } from 'utils/checkFolderPage';

interface PathTextStyled {
  pathType: 'normal' | 'folder';
}

const BookmarkPathWrapper = styled.div`
  margin-bottom: 28px;
`;

const FolderPathList = styled.div`
  display: flex;
`;

const PathText = styled.span<PathTextStyled>`
  ${(props) =>
    props.pathType === 'normal'
      ? css`
          font-size: 16px;
          font-weight: normal;
          color: ${props.theme.color.grayDarkest};
        `
      : css`
          font-size: 12px;
          font-weight: 500;
          color: ${props.theme.color.black};
        `}
  line-height: 1.5;
  display: flex;
  align-items: center;
`;

const FolderIconStyled = styled(FolderIcon)`
  margin-right: 4px;
`;

const EmojiIcon = styled(Emoji)`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

const SubFolderName = styled(Link)`
  margin-right: 4px;
  font-size: 12px;
  display: block;
  height: 16px;
  line-height: 15px;
  &:hover {
    text-decoration: underline;
  }
`;

const FolderPathEllipsis = styled.span`
  display: flex;
  align-items: center;
`;

function NormalPath(): ReactElement {
  const location = useLocation();
  const { getPath } = usePagePathEffect();
  const pathName = getPath(location.pathname);
  return (
    <BookmarkPathWrapper>
      <PathText pathType="normal">{pathName}</PathText>
    </BookmarkPathWrapper>
  );
}

function FolderPath({
  folderIdParams,
}: {
  folderIdParams: string;
}): ReactElement | null {
  const { data } = usePagePathQueries(folderIdParams);
  const [folderPathList, setFolderPathList] =
    useState<folder.IParentFoldersGetResponse>([]);

  useEffect(() => {
    if (data) {
      setFolderPathList([...data.reverse()]);
    }
  }, [data]);

  if (!data) return null;

  return (
    <BookmarkPathWrapper>
      <FolderPathList>
        {folderPathList.map((item, index) => {
          const { name, folderId, emoji } = item;
          return (
            <>
              {index === 0 || index === folderPathList.length - 1 ? (
                <PathText pathType="folder" key={folderId}>
                  {emoji ? (
                    <EmojiIcon emoji={{ name: 'emoji', unicode: emoji }} />
                  ) : (
                    <FolderIconStyled />
                  )}

                  <SubFolderName to={`/${folderId}`}>{name}</SubFolderName>
                  {folderPathList.length - 1 !== index && <ArrowSide16Icon />}
                </PathText>
              ) : (
                <FolderPathEllipsis>
                  ...
                  <ArrowSide16Icon />
                </FolderPathEllipsis>
              )}
            </>
          );
        })}
      </FolderPathList>
    </BookmarkPathWrapper>
  );
}

function BookmarkPath(): ReactElement | null {
  const { folderId } = useParams<keyof FolderIdParams>() as FolderIdParams;

  return (
    <>
      {checkFolderPage(folderId) ? (
        <FolderPath folderIdParams={folderId} />
      ) : (
        <NormalPath />
      )}
    </>
  );
}

export default BookmarkPath;
