import { ItemId } from '@atlaskit/tree';
import { folder } from 'models/folder';
import { useCallback } from 'react';
import {
  DefaultValue,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { subFolderState } from 'recoil/atoms/folderState';

type useSubFoldersSettingType = (subFolders: folder.ISubFolderState) => void;

interface IUseSubFoldersToggle {
  onSingleToggle: (subFolderId: ItemId) => void;
  onAllToggle: (checked: boolean) => void;
}

interface IUseSubFoldersAction {
  onDelete: () => void;
}

export const subFoldersToggle = selectorFamily<folder.ISubFolderState, ItemId>({
  key: 'subFolders/toggle',
  get:
    () =>
    ({ get }) =>
      get(subFolderState),
  set:
    (subFolderId) =>
    ({ set }, newValue) => {
      set(subFolderState, (prevValue) => {
        if (newValue instanceof DefaultValue) return newValue;
        return prevValue.map((item) =>
          item.folderId === subFolderId
            ? { ...item, checked: !item.checked }
            : item,
        );
      });
    },
});

export const checkedSubFoldersIds = selector<ItemId[]>({
  key: 'subFolders/checkedIds',
  get: ({ get }) => {
    const subFolders = get(subFolderState);
    return subFolders
      .filter((subFolder) => subFolder.checked)
      .map((subFolder) => subFolder.folderId);
  },
});

export function useCheckedSubFoldersIds(): ItemId[] {
  return useRecoilValue(checkedSubFoldersIds);
}

export function useSubFoldersAction(): IUseSubFoldersAction {
  const [subFolders, setSubFolders] = useRecoilState(subFolderState);

  const onDelete = useCallback(() => {
    setSubFolders(subFolders.filter((subFolder) => !subFolder.checked));
  }, [setSubFolders, subFolders]);

  // @TODO(dohyun) onMove (이동) 함수 추가 예정
  return {
    onDelete,
  };
}

export function useSubFoldersToggle(): IUseSubFoldersToggle {
  const [subFolders, setSubFolders] = useRecoilState(subFolderState);

  const onSingleToggle = useCallback(
    (subFolderId: ItemId) => {
      setSubFolders(
        subFolders.map((subFolder) =>
          subFolder.folderId === subFolderId
            ? { ...subFolder, checked: !subFolder.checked }
            : subFolder,
        ),
      );
    },
    [setSubFolders, subFolders],
  );

  const onAllToggle = useCallback(
    (checked: boolean) => {
      setSubFolders(
        subFolders.map((subFolder) => ({
          ...subFolder,
          checked,
        })),
      );
    },
    [setSubFolders, subFolders],
  );

  return {
    onSingleToggle,
    onAllToggle,
  };
}

// subFolders 초기 값 설정
export function useSubFoldersSetting(): useSubFoldersSettingType {
  const setSubFolders = useSetRecoilState(subFolderState);

  const setting = useCallback(
    (subFolders: folder.ISubFolderState) => {
      setSubFolders(subFolders);
    },
    [setSubFolders],
  );

  return setting;
}
