import { ArrowSide16Icon, FolderIcon } from 'assets/icons';
import { FolderIdParams } from 'components/subFolders';
import usePagePathEffect from 'hooks/common/usePagePathEffect';
import usePagePathQueries from 'hooks/common/usePagePathQueries';
import React, { ReactElement, useState } from 'react';
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
  cursor: pointer;
  position: relative;
`;

const Ellipsis = styled.span``;

const EllipsisMenu = styled.div`
  position: absolute;
  padding: 5px 0;
  top: 20px;
  left: 0;
  width: 180px;
  z-index: 150;
  box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
`;

const EllipsisMenuItem = styled(PathText)`
  width: 100%;
  height: 28px;
  padding: 0 5px;
  &:hover {
    background-color: ${(props) => props.theme.color.grayLightest};
  }
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
  const [isOpenEllipsis, setIsOpenEllipsis] = useState(false);
  const onToggleEllipsis = () => setIsOpenEllipsis(!isOpenEllipsis);

  if (!data) return null;

  return (
    <BookmarkPathWrapper>
      <FolderPathList>
        {data.length <= 2 ? (
          <>
            {data.map((item, index) => {
              const { name, folderId, emoji } = item;
              return (
                <PathText pathType="folder" key={folderId}>
                  {emoji ? (
                    <EmojiIcon emoji={{ name: 'emoji', unicode: emoji }} />
                  ) : (
                    <FolderIconStyled />
                  )}

                  <SubFolderName to={`/${folderId}`}>{name}</SubFolderName>
                  {data.length - 1 !== index && <ArrowSide16Icon />}
                </PathText>
              );
            })}
          </>
        ) : (
          <>
            <PathText pathType="folder">
              {data[0].emoji ? (
                <EmojiIcon emoji={{ name: 'emoji', unicode: data[0].emoji }} />
              ) : (
                <FolderIconStyled />
              )}

              <SubFolderName to={`/${data[0].folderId}`}>
                {data[0].name}
              </SubFolderName>
            </PathText>
            <ArrowSide16Icon />
            <FolderPathEllipsis>
              <Ellipsis onClick={onToggleEllipsis}>...</Ellipsis>
              {isOpenEllipsis && (
                <EllipsisMenu>
                  {data.slice(1, data.length - 1).map((item) => (
                    <EllipsisMenuItem pathType="folder" key={item.folderId}>
                      {item.name}
                    </EllipsisMenuItem>
                  ))}
                </EllipsisMenu>
              )}
            </FolderPathEllipsis>
            <ArrowSide16Icon />
            <PathText pathType="folder">
              {data[data.length - 1].emoji ? (
                <EmojiIcon
                  emoji={{
                    name: 'emoji',
                    unicode: data[data.length - 1].emoji,
                  }}
                />
              ) : (
                <FolderIconStyled />
              )}

              <SubFolderName to={`/${data[data.length - 1].folderId}`}>
                {data[data.length - 1].name}
              </SubFolderName>
            </PathText>
          </>
        )}
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
