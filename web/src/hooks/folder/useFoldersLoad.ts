/* eslint-disable no-console */
import { getParentFolders } from 'api/folderAPI';
import produce from 'immer';
import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeFolderIdState, folderState } from 'recoil/atoms/folderState';
import useFoldersQueries from './useFoldersQueries';

export default function useFoldersLoad(): void {
  const setFolders = useSetRecoilState(folderState);
  const activeFolderId = useRecoilValue(activeFolderIdState);
  const { data } = useFoldersQueries();

  useEffect(() => {
    if (!data) return;
    setFolders(data);
  }, [data]);

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
    console.log('data', data);
    if (activeFolderId && data?.rootId === 'root') onExpandParentFolder();
  }, [activeFolderId, data]);
}
