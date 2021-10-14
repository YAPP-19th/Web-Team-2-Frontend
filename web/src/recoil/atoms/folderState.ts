import { TreeData } from '@atlaskit/tree';
import tempData from 'components/sidebar/data/atlassianTreeMock.json';
import { atom } from 'recoil';

export const folderState = atom<TreeData>({
  key: 'folderState',
  default: tempData,
});
