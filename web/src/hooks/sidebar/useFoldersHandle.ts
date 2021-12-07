/* eslint-disable no-console */
import {
  ItemId,
  moveItemOnTree,
  mutateTree,
  TreeData,
  TreeDestinationPosition,
  TreeSourcePosition,
} from '@atlaskit/tree';
import {
  createFolder,
  moveFolder,
  renameFolder,
  updateFolderEmoji,
} from 'api/folderAPI';
import produce from 'immer';
import { useCallback, useState } from 'react';
import { findChildrenLength, findParentId } from 'utils/atlaskitTreeFinder';
import useFoldersEffect from './useFoldersEffect';

export interface IFoldersHandle {
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
  onChangeFolderInfo: (itemId: ItemId, name: string, emoji: string) => void;
}

export default function useFoldersHandle(): IFoldersHandle {
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

    const prevParentId = source.parentId;
    const nextParentId = destination.parentId;
    const prevIndex = source.index;
    const nextIndex =
      destination.index === undefined
        ? findChildrenLength(folders, nextParentId)
        : destination.index;

    console.log('나', moveFolderId);
    console.log('이전: ', prevParentId, prevIndex);
    console.log('다음: ', nextParentId, nextIndex);
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
        console.log(e);
      }
    },
    [setFolders],
  );

  // 폴더 삭제
  const onDeleteFolder = async (itemId: ItemId) => {
    console.log('나', itemId);
    console.log('부모', findParentId(folders, itemId));
  };

  // 폴더 이름,이모지 수정
  const onChangeFolderInfo = async (
    itemId: ItemId,
    name: string,
    emoji: string,
  ) => {
    try {
      await renameFolder(itemId, name);
      await updateFolderEmoji(itemId, emoji);
      setFolders(mutateTree(folders, itemId, { data: { name, emoji } }));
    } catch (e) {
      console.log(e);
    }
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
    onChangeFolderInfo,
  };
}
