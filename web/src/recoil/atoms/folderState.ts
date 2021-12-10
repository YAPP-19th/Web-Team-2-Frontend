import { ItemId, TreeData } from '@atlaskit/tree';
import { atom } from 'recoil';

interface IActiveFolder {
  id: ItemId;
  name: string;
}

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

export const activeFolderState = atom<IActiveFolder>({
  key: 'activeFolderState',
  default: {
    id: '',
    name: '',
  },
});
