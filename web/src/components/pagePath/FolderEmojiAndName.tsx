import { ellipsis } from 'assets/styles/utilStyles';
import FolderEmoji from 'components/common/FolderEmoji';
import { folder } from 'models/folder';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PathText from './PathText';

interface FolderEmojiAndNameProps {
  folderInfo: folder.IChildFolderItem;
}

const FolderName = styled(Link)`
  margin-right: 4px;
  font-size: 12px;
  height: 16px;
  line-height: 15px;
  ${ellipsis}
  display: inline-block;
  max-width: 135px;
  &:hover {
    text-decoration: underline;
  }
`;

function FolderEmojiAndName({
  folderInfo,
}: FolderEmojiAndNameProps): ReactElement {
  const { emoji, folderId, name } = folderInfo;
  return (
    <PathText pathType="folder">
      <FolderEmoji emoji={emoji} />
      <FolderName to={`/${folderId}`}>{name}</FolderName>
    </PathText>
  );
}

export default FolderEmojiAndName;
