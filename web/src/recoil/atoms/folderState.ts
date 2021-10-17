import { ItemId, TreeData } from '@atlaskit/tree';
import { atom } from 'recoil';

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

export const folderMenuState = atom<ItemId>({
  key: 'folderMenuState',
  default: '' as ItemId,
});

export const selectedFolderState = atom<ItemId>({
  key: 'selectedFolderState',
  default: '' as ItemId,
});
