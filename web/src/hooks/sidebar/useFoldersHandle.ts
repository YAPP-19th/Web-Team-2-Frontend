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
  deleteFolder,
  moveFolder,
  renameFolder,
  updateFolderEmoji,
} from 'api/folderAPI';
import useToasts from 'hooks/common/useToasts';
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
  isOpenFolderIsFullToast: boolean;
}

export default function useFoldersHandle(): IFoldersHandle {
  const { folders, setFolders } = useFoldersEffect();
  const [moveFolderId, setMoveFolderId] = useState<ItemId | null>(null);
  const [isOpenFolderIsFullToast, onFolderIsFullToast] = useToasts();

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

  const createNewFolderData = (folderId: ItemId, name: string) => {
    return {
      id: folderId,
      children: [],
      data: {
        name,
      },
    };
  };

  // 폴더 생성
  const onCreateFolder = useCallback(
    async (parentId: ItemId) => {
      if (findChildrenLength(folders, parentId) >= 8) {
        onFolderIsFullToast();
        return;
      }

      const folderName = '제목없음';
      try {
        const { folderId } = await createFolder(parentId, folderName, 0);
        const newFolder = createNewFolderData(folderId, folderName);
        setFolders((prev) =>
          produce(prev, (draft) => {
            const newObj = draft;
            newObj.items[folderId] = newFolder;
            newObj.items[parentId].children.push(folderId);
            newObj.items[parentId].isExpanded = true;
          }),
        );
      } catch (e) {
        console.log(e);
      }
    },
    [folders],
  );

  // 보관함 생성
  const onCreateCabinet = useCallback(
    async (cabinetLength: number) => {
      const cabinetName = `보관함${cabinetLength + 1}`;

      try {
        const { folderId } = await createFolder(0, cabinetName, 0);
        const newCabinet = createNewFolderData(folderId, cabinetName);
        setFolders((prev) =>
          produce(prev, (draft) => {
            const newObj = draft;
            newObj.items[folderId] = newCabinet;
            newObj.items.root.children.push(folderId);
          }),
        );
      } catch (e) {
        console.log(e);
      }
    },
    [folders],
  );

  // 폴더 삭제
  const onDeleteFolder = async (itemId: ItemId) => {
    console.log('나', itemId);
    console.log('부모', findParentId(folders, itemId));
    await deleteFolder(itemId).catch((e) => console.log(e));
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
    isOpenFolderIsFullToast,
  };
}
