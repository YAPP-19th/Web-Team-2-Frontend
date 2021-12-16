import { ItemId } from '@atlaskit/tree';
import { getChildFolders } from 'api/folderAPI';
import { folder } from 'models/folder';
import { selectorFamily } from 'recoil';
import { subFolderState } from 'recoil/atoms/folderState';

export const getSubFoldersSelector = selectorFamily<
  folder.ISubFolderState,
  ItemId
>({
  key: 'subFolders/get',
  get: (folderId) => async () => {
    if (!folderId) return [];
    const data = await getChildFolders(folderId);
    return data.map((item) => ({ ...item, checked: false }));
  },
  set:
    () =>
    ({ set }, newValue) => {
      set(subFolderState, newValue);
    },
});
