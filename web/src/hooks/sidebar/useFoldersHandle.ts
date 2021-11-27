import {
  ItemId,
  moveItemOnTree,
  mutateTree,
  TreeData,
  TreeDestinationPosition,
  TreeSourcePosition,
} from '@atlaskit/tree';
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
  createFolder: (parentId: ItemId) => void;
  createCabinet: () => void;
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

  const createFolder = useCallback(
    (parentId: ItemId) => {
      const newFolderId = Math.random().toString();
      const newFolder = {
        id: newFolderId,
        children: [],
        data: {
          title: '제목없음',
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

  const createCabinet = useCallback(() => {
    const newCabinetId = Math.random().toString();
    const newCabinet = {
      id: newCabinetId,
      children: [],
      data: {
        title: '임시보관함',
      },
    };

    setFolders((prev) =>
      produce(prev, (draft) => {
        const newObj = draft;
        newObj.items[newCabinetId] = newCabinet;
        newObj.items.userId.children.push(newCabinetId); // userId 부분은 나중에 login 구현되면 실제 유저 아이디 넣는곳임 newObj.items[userId].children.push(newCabinetId);
      }),
    );
  }, []);

  return {
    folders,
    onExpandFolder,
    onCollapseFolder,
    onDragStartFolder,
    onDragEndFolder,
    createFolder,
    createCabinet,
  };
}
