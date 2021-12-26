import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { Emoji } from 'react-twemoji-picker';

import { FolderIcon } from '../assets';

interface FolderEmojiProps {
  emoji?: string;
}

const FolderIconStyled = styled(FolderIcon)`
  margin-right: 4px;
`;

const EmojiIcon = styled(Emoji)`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

function FolderEmoji({ emoji }: FolderEmojiProps): ReactElement {
  return (
    <>
      {emoji ? (
        <EmojiIcon emoji={{ name: 'emoji', unicode: emoji }} />
      ) : (
        <FolderIconStyled />
      )}
    </>
  );
}

export default FolderEmoji;
