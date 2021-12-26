import { ItemId, TreeData } from '@atlaskit/tree';
import { atom } from 'recoil';

import { folder } from '../../models/folder';

export interface ISelectedFolder {
  id: ItemId;
  name: string;
  emoji: string;
}

export const initialFolderState: TreeData = {
  rootId: '',
  items: {
    '': {
      id: '',
      children: [],
      data: '',
    },
  },
};

export const folderState = atom<TreeData>({
  key: 'folderState',
  default: initialFolderState,
});

export const selectedFolderState = atom<ISelectedFolder>({
  key: 'selectedFolderState',
  default: {
    id: '',
    name: '',
    emoji: '',
  },
});

export const activeFolderIdState = atom<ItemId>({
  key: 'activeFolderIdState',
  default: '',
});

export const subFolderState = atom<folder.ISubFolderState>({
  key: 'subFolderState',
  default: [],
});
