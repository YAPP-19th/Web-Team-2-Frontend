import {
  ItemId,
  moveItemOnTree,
  mutateTree,
  TreeData,
  TreeDestinationPosition,
  TreeSourcePosition,
} from '@atlaskit/tree';
import { createFolder } from 'api/folderAPI';
import produce from 'immer';
import { useCallback } from 'react';
import useFoldersEffect from './useFoldersEffect';

interface FoldersHandleType {
  folders: TreeData;
  onExpandFolder: (itemId: ItemId) => void;
  onCollapseFolder: (itemId: ItemId) => void;
  onDragStartFolder: (itemId: ItemId) => void;
  onDragEndFolder: (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition | undefined,
  ) => void;
  onCreateFolder: (parentId: ItemId) => void;
  onCreateCabinet: (cabinetLength: number) => void;
}

export default function useFoldersHandle(): FoldersHandleType {
  const { folders, setFolders } = useFoldersEffect();

  const onExpandFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: true }));
  };

  const onCollapseFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: false }));
  };

  const onDragStartFolder = (itemId: ItemId) => {
    // eslint-disable-next-line no-console
    console.log(itemId);
  };

  const onDragEndFolder = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition,
  ) => {
    if (!destination) return;
    const newTree = moveItemOnTree(folders, source, destination);
    // console.log('새로운 부모Id', destination);
    // console.log('기존 부모Id', source);
    setFolders(newTree);
  };

  const onCreateFolder = useCallback(
    (parentId: ItemId) => {
      const newFolderId = Math.random().toString(); // @TODO(dohyun) uuidv4 사용 예정
      const newFolder = {
        id: newFolderId,
        children: [],
        data: {
          name: '제목없음',
        },
      };

      setFolders((prev) =>
        produce(prev, (draft) => {
          const newObj = draft;
          newObj.items[newFolderId] = newFolder;
          newObj.items[parentId].children.push(newFolderId);
          newObj.items[parentId].isExpanded = true;
        }),
      );
    },
    [setFolders],
  );

  const onCreateCabinet = useCallback(async (cabinetLength: number) => {
    const newCabinetId = Math.random().toString(); // @TODO(dohyun) uuidv4 사용 예정
    const cabinetName = `보관함${cabinetLength + 1}`;
    const newCabinet = {
      id: newCabinetId,
      children: [],
      data: {
        name: cabinetName,
      },
    };

    setFolders((prev) =>
      produce(prev, (draft) => {
        const newObj = draft;
        newObj.items[newCabinetId] = newCabinet;
        newObj.items.root.children.push(newCabinetId);
      }),
    );

    try {
      await createFolder(0, cabinetName, 0);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, []);

  return {
    folders,
    onExpandFolder,
    onCollapseFolder,
    onDragStartFolder,
    onDragEndFolder,
    onCreateFolder,
    onCreateCabinet,
  };
}
