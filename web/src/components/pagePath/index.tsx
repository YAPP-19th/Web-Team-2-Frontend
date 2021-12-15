import { ArrowSide16Icon, FolderIcon } from 'assets/icons';
import { ellipsis } from 'assets/styles/utilStyles';
import { FolderIdParams } from 'components/subFolders';
import usePagePathQueries from 'hooks/common/usePagePathQueries';
import React, { ReactElement, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Emoji } from 'react-twemoji-picker';
import styled, { css } from 'styled-components';
import { checkFolderPage } from 'utils/checkFolderPage';
import GlobalPath from './GlobalPath';

interface PathTextStyled {
  pathType: 'global' | 'folder';
}

const BookmarkPathWrapper = styled.div`
  margin-bottom: 28px;
`;

const FolderPathList = styled.div`
  display: flex;
`;

const PathText = styled.span<PathTextStyled>`
  ${(props) =>
    props.pathType === 'global'
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
  height: 16px;
  line-height: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  max-width: 135px;
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

const EllipsisMenuTemplate = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const EllipsisMenu = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  width: 150px;
  background-color: ${(props) => props.theme.color.white};
  z-index: 150;
  box-shadow: rgba(15 15 15 / 5%) 0px 0px 0px 1px,
    rgba(15 15 15 / 10%) 0px 3px 6px, rgba(15 15 15 / 20%) 0px 9px 24px;
  display: flex;
  flex-direction: column;
`;

const EllipsisMenuItem = styled(Link)`
  font-size: 12px;
  width: 100%;
  height: 28px;
  line-height: 28px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${(props) => props.theme.color.grayLightest};
  }
`;

const EllipsisMenuItemName = styled.span`
  ${ellipsis}
  display: inline-block;
  width: 100px;
`;

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
                <>
                  <EllipsisMenuTemplate onClick={onToggleEllipsis} />
                  <EllipsisMenu>
                    {data.slice(1, data.length - 1).map((item) => (
                      <EllipsisMenuItem
                        to={`/${item.folderId}`}
                        key={item.folderId}
                        onClick={onToggleEllipsis}
                      >
                        {item.emoji ? (
                          <EmojiIcon
                            emoji={{ name: 'emoji', unicode: item.emoji }}
                          />
                        ) : (
                          <FolderIconStyled />
                        )}
                        <EllipsisMenuItemName>{item.name}</EllipsisMenuItemName>
                      </EllipsisMenuItem>
                    ))}
                  </EllipsisMenu>
                </>
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

function PagePath(): ReactElement | null {
  const { folderId } = useParams<keyof FolderIdParams>() as FolderIdParams;

  return (
    <>
      {checkFolderPage(folderId) ? (
        <FolderPath folderIdParams={folderId} />
      ) : (
        <GlobalPath />
      )}
    </>
  );
}

export default PagePath;
