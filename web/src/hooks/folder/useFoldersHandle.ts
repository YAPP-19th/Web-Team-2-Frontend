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
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import useFolderAction from 'recoil/actions/folderAction';
import { folderState } from 'recoil/atoms/folderState';
import { findChildrenLength } from 'utils/atlaskitTreeFinder';
import { MAX_FOLDERS_LENGTH, QueryKey } from 'utils/const';

interface IToasts {
  isOpenFolderIsFullToast: boolean;
}

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
  toasts: IToasts;
  deleteDatasInFolders: (folderIdList: ItemId[]) => Promise<void>;
}

export default function useFoldersHandle(): IFoldersHandle {
  const [moveFolderId, setMoveFolderId] = useState<ItemId | null>(null);
  const [isOpenFolderIsFullToast, onFolderIsFullToast] = useToasts();

  const toasts = {
    isOpenFolderIsFullToast,
  };

  const folders = useRecoilValue(folderState);
  const {
    expandAndCollapseFolder,
    changeFolderState,
    addNewDataInFolders,
    deleteDataInFolders,
    deleteDatasInFolders,
  } = useFolderAction();
  const queryClient = useQueryClient();

  // 폴더 열기
  const onExpandFolder = (itemId: ItemId) => {
    expandAndCollapseFolder(itemId, true);
  };

  // 폴더 접기
  const onCollapseFolder = (itemId: ItemId) => {
    expandAndCollapseFolder(itemId, false);
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

    changeFolderState(newTree);
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

  //  폴더 생성 API 작동  함수
  const createFolderAndCabinet = async (
    parentId: ItemId,
    folderName: string,
  ) => {
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
      await createFolderAndCabinet(parentId, '제목없음');
      queryClient.invalidateQueries(QueryKey.SUBFOLDER_CONTENTS);
    },
    [folders],
  );

  // 보관함 생성
  const onCreateCabinet = useCallback(
    async (cabinetLength: number) => {
      await createFolderAndCabinet('root', `보관함${cabinetLength + 1}`);
    },
    [folders],
  );

  // 폴더 삭제
  const { mutate: onDeleteFolder } = useMutation(
    (itemId: ItemId) => deleteFolder(itemId),
    {
      onSuccess: (_, itemId: ItemId) => {
        deleteDataInFolders(itemId);
        queryClient.invalidateQueries(QueryKey.SUBFOLDER_CONTENTS);
      },
      onError: () => {
        console.log('폴더 삭제를 실패했습니다.');
      },
    },
  );

  // 폴더 이름,이모지 수정
  const onChangeFolderInfo = async (
    itemId: ItemId,
    name: string,
    emoji: string,
  ) => {
    try {
      await renameFolder(itemId, name);
      await updateFolderEmoji(itemId, emoji);
      changeFolderState(mutateTree(folders, itemId, { data: { name, emoji } }));
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
    toasts,
    deleteDatasInFolders,
  };
}
