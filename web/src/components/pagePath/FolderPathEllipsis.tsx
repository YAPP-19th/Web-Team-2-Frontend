import useToggle from 'hooks/common/useToggle';
import { folder } from 'models/folder';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import PathEllipsisMenu from './PathEllipsisMenu';

interface FolderPathEllipsisProps {
  folderPathList: folder.IParentFoldersGetResponse;
}

const FolderPathEllipsisStyled = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const Ellipsis = styled.span``;

function FolderPathEllipsis({
  folderPathList,
}: FolderPathEllipsisProps): ReactElement {
  const [isOpenEllipsisMenu, onToggleEllipsisMenu] = useToggle();

  return (
    <FolderPathEllipsisStyled>
      <Ellipsis onClick={onToggleEllipsisMenu}>...</Ellipsis>
      {isOpenEllipsisMenu && (
        <PathEllipsisMenu
          folderPathList={folderPathList}
          onToggleEllipsisMenu={onToggleEllipsisMenu}
        />
      )}
    </FolderPathEllipsisStyled>
  );
}

export default FolderPathEllipsis;
