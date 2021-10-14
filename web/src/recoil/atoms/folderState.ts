import { TreeData } from '@atlaskit/tree';
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
