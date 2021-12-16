import { ItemId, TreeData } from '@atlaskit/tree';
import { folder } from 'models/folder';
import { atom } from 'recoil';

export interface ISelectedFolder {
  id: ItemId;
  name: string;
  emoji: string;
}

const initialState: TreeData = {
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
  default: initialState,
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
