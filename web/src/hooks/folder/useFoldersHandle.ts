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
  getParentFolders,
  moveFolder,
  renameFolder,
  updateFolderEmoji,
} from 'api/folderAPI';
import useToasts from 'hooks/common/useToasts';
import produce from 'immer';
import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { activeFolderIdState } from 'recoil/atoms/folderState';
import { findChildrenLength, findParentId } from 'utils/atlaskitTreeFinder';
import { MAX_FOLDERS_LENGTH, QueryKey } from 'utils/const';
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

interface IFolderItem {
  id: ItemId;
  children: ItemId[];
  data: {
    name: string;
  };
}

export default function useFoldersHandle(): IFoldersHandle {
  const { folders, setFolders, getFolderLoading } = useFoldersEffect();
  const [moveFolderId, setMoveFolderId] = useState<ItemId | null>(null);
  const [isOpenFolderIsFullToast, onFolderIsFullToast] = useToasts();
  const activeFolderId = useRecoilValue(activeFolderIdState);

  const queryClient = useQueryClient();

  // 해당 폴더 id 활성화 되면 해당 폴더를 가지고 있는 부모 폴더 모두 열기
  const onExpandParentFolder = useCallback(async () => {
    try {
      const parentFolderIdList = await getParentFolders(activeFolderId);
      setFolders((prev) =>
        produce(prev, (draft) => {
          const newObj = draft;
          parentFolderIdList.forEach((parentFolderItem) => {
            if (String(parentFolderItem.folderId) !== activeFolderId) {
              newObj.items[parentFolderItem.folderId].isExpanded = true;
            }
          });
        }),
      );
    } catch (e) {
      console.log('부모 폴더 id 조회 실패');
    }
  }, [activeFolderId]);

  useEffect(() => {
    // folderId가 활성화가되고, folders 데이터가 들어온 이후에 onExpandParentFolder 호출
    if (activeFolderId && folders.rootId === 'root') onExpandParentFolder();
  }, [activeFolderId, getFolderLoading]);

  // 폴더 열기
  const onExpandFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: true }));
    console.log(folders);
  };

  // 폴더 접기
  const onCollapseFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: false }));
  };

  // 드래그앤 드롭 시작
  const onDragStartFolder = (itemId: ItemId) => {
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

  // 새로운 폴더 데이터 생성
  const createNewFolderData = (folderId: ItemId, name: string) => {
    return {
      id: folderId,
      children: [],
      data: {
        name,
      },
    };
  };

  // 새로운 폴더 데이터를 현재 폴더 리스트에 추가
  const addNewDataInFolders = (
    folderId: ItemId,
    parentId: ItemId | 'root',
    newData: IFolderItem,
  ) => {
    setFolders((prev) =>
      produce(prev, (draft) => {
        const newObj = draft;
        newObj.items[folderId] = newData;
        newObj.items[parentId].children.push(folderId);
        if (parentId !== 'root') {
          newObj.items[parentId].isExpanded = true;
        }
      }),
    );
  };

  // 현재 폴더 리스트에서 해당 폴더 삭제, 부모 폴더의 children 에서 삭제
  const deleteDataInFolders = (folderId: ItemId) => {
    setFolders((prev) =>
      produce(prev, (draft) => {
        const newObj = draft;
        const parentId = findParentId(newObj, folderId);
        if (!parentId) return;
        newObj.items[parentId].children = newObj.items[
          parentId
        ].children.filter((id) => id !== folderId);
        delete newObj.items[folderId];
      }),
    );
  };

  //  폴더 생성 API 작동하는 action 함수
  const onCreateFolderAction = async (parentId: ItemId, folderName: string) => {
    const ParentFolderChildrenLength = findChildrenLength(folders, parentId);

    try {
      const { folderId } = await createFolder(
        parentId === 'root' ? 0 : parentId,
        folderName,
        ParentFolderChildrenLength,
      );
      const newFolder = createNewFolderData(folderId, folderName);
      addNewDataInFolders(folderId, parentId, newFolder);
    } catch (e) {
      console.log('폴더 생성에 실패했습니다.');
    }
  };

  // 폴더 생성 (폴더 길이가 8개 이상되면 토스트 알림)
  const onCreateFolder = useCallback(
    async (parentId: ItemId) => {
      if (findChildrenLength(folders, parentId) >= MAX_FOLDERS_LENGTH) {
        onFolderIsFullToast();
        return;
      }
      await onCreateFolderAction(parentId, '제목없음');
      queryClient.invalidateQueries(QueryKey.SUBFOLDER_CONTENTS);
    },
    [folders],
  );

  // 보관함 생성
  const onCreateCabinet = useCallback(
    async (cabinetLength: number) => {
      await onCreateFolderAction('root', `보관함${cabinetLength + 1}`);
    },
    [folders],
  );

  // 폴더 삭제
  const onDeleteFolder = async (itemId: ItemId) => {
    try {
      await deleteFolder(itemId);
      deleteDataInFolders(itemId);
      queryClient.invalidateQueries(QueryKey.SUBFOLDER_CONTENTS);
    } catch (e) {
      console.log('폴더 삭제에 실패했습니다');
    }
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
      queryClient.invalidateQueries(QueryKey.SUBFOLDER_CONTENTS);
    } catch (e) {
      console.log('폴더 이름, 이모지 수정에 실패했습니다');
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
