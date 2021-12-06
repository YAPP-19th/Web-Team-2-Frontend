/* eslint-disable no-console */
import {
  ItemId,
  moveItemOnTree,
  mutateTree,
  TreeData,
  TreeDestinationPosition,
  TreeSourcePosition,
} from '@atlaskit/tree';
import { createFolder, moveFolder } from 'api/folderAPI';
import produce from 'immer';
import { useCallback, useState } from 'react';
import useFoldersEffect from './useFoldersEffect';

interface FoldersHandleType {
  folders: TreeData;
  onExpandFolder: (itemId: ItemId) => void;
  onCollapseFolder: (itemId: ItemId) => void;
  onDragStartFolder: (itemId: ItemId) => void;
  onDragEndFolder: (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition,
  ) => void;
  onCreateFolder: (parentId: ItemId) => void;
  onCreateCabinet: (cabinetLength: number) => void;
  onDeleteFolder: (itemId: ItemId) => void;
  onRenameFolder: (itemId: ItemId, newName: string) => void;
  onChangeFolderEmoji: (itemId: ItemId, newEmoji: string) => void;
}

export default function useFoldersHandle(): FoldersHandleType {
  const { folders, setFolders } = useFoldersEffect();
  const [moveFolderId, setMoveFolderId] = useState<ItemId | null>(null);

  // 폴더 열기
  const onExpandFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: true }));
  };

  // 폴더 접기
  const onCollapseFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: false }));
  };

  // 드래그앤 드롭 시작
  const onDragStartFolder = (itemId: ItemId) => {
    console.log(itemId);
    setMoveFolderId(itemId);
  };

  // 드래그앤 드롭 종료
  const onDragEndFolder = async (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition,
  ) => {
    if (!destination) return;
    if (!moveFolderId) return;
    const newTree = moveItemOnTree(folders, source, destination);
    console.log('새로운 부모Id', destination);
    console.log('기존 부모Id', source);
    console.log(moveFolderId);
    const prevParentId = source.parentId;
    const nextParentId = destination.parentId;
    const prevIndex = source.index;
    const nextIndex = destination.index || 0;
    setFolders(newTree);
    try {
      await moveFolder(
        moveFolderId,
        prevParentId,
        nextParentId,
        prevIndex,
        nextIndex,
      );
    } catch (e) {
      console.log(e);
    }
  };

  // 폴더 생성
  const onCreateFolder = useCallback(
    async (parentId: ItemId) => {
      const newFolderId = Math.random().toString(); // 이쪽 newFolderId를 백앤드에서 response로 담아서 보내줘야함
      const folderName = '제목없음';
      const newFolder = {
        id: newFolderId, // 이쪽 newFolderId를 백앤드에서 response로 담아서 보내줘야함
        children: [],
        data: {
          name: folderName,
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
      try {
        await createFolder(parentId, folderName, 0);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
    [setFolders],
  );

  // 보관함 생성
  const onCreateCabinet = useCallback(
    async (cabinetLength: number) => {
      const newCabinetId = Math.random().toString(); // 이쪽 newFolderId를 백앤드에서 response로 담아서 보내줘야함
      const cabinetName = `보관함${cabinetLength + 1}`;
      const newCabinet = {
        id: newCabinetId, // 이쪽 newFolderId를 백앤드에서 response로 담아서 보내줘야함
        children: [],
        data: {
          name: cabinetName,
        },
      };

      try {
        await createFolder(0, cabinetName, 0);
        setFolders((prev) =>
          produce(prev, (draft) => {
            const newObj = draft;
            newObj.items[newCabinetId] = newCabinet;
            newObj.items.root.children.push(newCabinetId);
          }),
        );
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
    [setFolders],
  );

  // 자식id (itemId) 로 부모 id 찾기
  const onFindParentId = (itemId: ItemId) => {
    const folderItems = Object.keys(folders.items);
    for (let item = 0; item < folderItems.length; item += 1) {
      if (folders.items[folderItems[item]].children.includes(itemId)) {
        return folderItems[item];
      }
    }
    return null;
  };

  // 폴더 삭제
  const onDeleteFolder = async (itemId: ItemId) => {
    console.log('나', itemId);
    console.log('부모', onFindParentId(itemId));
  };

  // 폴더 이름 수정
  const onRenameFolder = async (itemId: ItemId, newName: string) => {
    console.log('이름 수정');
  };

  // 폴더 이모지 수정
  const onChangeFolderEmoji = async (itemId: ItemId, newEmoji: string) => {
    console.log('이모지 수정');
  };

  return {
    folders,
    onExpandFolder,
    onCollapseFolder,
    onDragStartFolder,
    onDragEndFolder,
    onCreateFolder,
    onCreateCabinet,
    onDeleteFolder,
    onRenameFolder,
    onChangeFolderEmoji,
  };
}
