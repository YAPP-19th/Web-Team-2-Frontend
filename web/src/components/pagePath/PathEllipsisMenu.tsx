import { ellipsis } from 'assets/styles/utilStyles';
import { folder } from 'models/folder';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { EmojiIcon, FolderIconStyled } from './FolderPath';

interface PathEllipsisMenuProps {
  folderPathList: folder.IParentFoldersGetResponse;
  onToggleEllipsisMenu: () => void;
}

const EllipsisMenuBackGround = styled.div`
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

function PathEllipsisMenu({
  folderPathList,
  onToggleEllipsisMenu,
}: PathEllipsisMenuProps): ReactElement {
  return (
    <>
      <EllipsisMenuBackGround onClick={onToggleEllipsisMenu} />
      <EllipsisMenu>
        {folderPathList.slice(1, folderPathList.length - 1).map((item) => (
          <EllipsisMenuItem
            to={`/${item.folderId}`}
            key={item.folderId}
            onClick={onToggleEllipsisMenu}
          >
            {item.emoji ? (
              <EmojiIcon emoji={{ name: 'emoji', unicode: item.emoji }} />
            ) : (
              <FolderIconStyled />
            )}
            <EllipsisMenuItemName>{item.name}</EllipsisMenuItemName>
          </EllipsisMenuItem>
        ))}
      </EllipsisMenu>
    </>
  );
}

export default PathEllipsisMenu;
