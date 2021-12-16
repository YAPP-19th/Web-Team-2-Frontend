import { ItemId, mutateTree, TreeData } from '@atlaskit/tree';
import produce from 'immer';
import { useRecoilState } from 'recoil';
import { folderState } from 'recoil/atoms/folderState';
import { findParentId } from 'utils/atlaskitTreeFinder';

interface IUseFolderAction {
  expandAndCollapseFolder: (itemId: ItemId, isExpand: boolean) => void;
  changeFolderState: (newFolders: TreeData) => void;
  addNewDataInFolders: (
    folderId: ItemId,
    parentId: ItemId | 'root',
    newData: IFolderItem,
  ) => void;
  deleteDataInFolders: (folderId: ItemId) => void;
  deleteDatasInFolders: (folderIdList: ItemId[]) => Promise<void>;
}

interface IFolderItem {
  id: ItemId;
  children: ItemId[];
  data: {
    name: string;
  };
}

// @NOTE recoil의 상태를 변경하는 action 함수 모음
export default function useFolderAction(): IUseFolderAction {
  const [folders, setFolders] = useRecoilState(folderState);

  // 폴더 열고 접기
  const expandAndCollapseFolder = (itemId: ItemId, isExpand: boolean) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: isExpand }));
  };

  // 폴더  상태 변경
  const changeFolderState = (newFolders: TreeData) => {
    setFolders(newFolders);
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

  // 현재 폴더 리스트에서 해당 폴더 리스트 삭제, 부모 폴더의 children 에서 삭제
  const deleteDatasInFolders = async (folderIdList: ItemId[]) => {
    setFolders((prev) =>
      produce(prev, (draft) => {
        const newObj = draft;
        folderIdList.forEach((folderId) => {
          const parentId = findParentId(newObj, folderId);
          if (!parentId) return;
          newObj.items[parentId].children = newObj.items[
            parentId
          ].children.filter((id) => id !== folderId);
          delete newObj.items[folderId];
        });
      }),
    );
  };

  return {
    expandAndCollapseFolder,
    changeFolderState,
    addNewDataInFolders,
    deleteDataInFolders,
    deleteDatasInFolders,
  };
}
