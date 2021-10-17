import { ItemId } from '@atlaskit/tree';
import React, { ReactElement } from 'react';

interface FolderDeleteModalProps {
  selectedFolder: ItemId;
}

function FolderDeleteModal({
  selectedFolder,
}: FolderDeleteModalProps): ReactElement {
  return <div>{selectedFolder}</div>;
}

export default FolderDeleteModal;
