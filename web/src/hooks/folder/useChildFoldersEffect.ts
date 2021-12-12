import { getChildFolders } from 'api/folderAPI';
import { folder } from 'models/folder';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { checkFolderPage } from 'utils/checkFolderPage';

interface IUseChildFoldersEffect {
  childFolders: folder.IChildFoldersGetResponse;
}

export default function useChildFoldersEffect(): IUseChildFoldersEffect {
  const { folderId } = useParams();
  const [childFolders, setChildFolders] =
    useState<folder.IChildFoldersGetResponse>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getChildFolders(folderId as string);
        setChildFolders(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('자식 폴더를 불러오는데 실패했습니다.');
      }
    };
    if (checkFolderPage(folderId)) getData();
  }, [folderId]);

  return { childFolders };
}
