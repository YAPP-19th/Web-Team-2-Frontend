/* eslint-disable no-console */
import { TreeData } from '@atlaskit/tree';
import { getFolders } from 'api/folderAPI';
import { useEffect, useState } from 'react';

export default function useFoldersEffect(): {
  folders: TreeData;
  setFolders: React.Dispatch<React.SetStateAction<TreeData>>;
  getFolderLoading: boolean;
} {
  const [folders, setFolders] = useState<TreeData>({
    rootId: '',
    items: {
      '': {
        id: '',
        children: [],
        data: '',
      },
    },
  });
  const [getFolderLoading, setGetFolderLoading] = useState<boolean>(false);
  useEffect(() => {
    const getFolderData = async () => {
      setGetFolderLoading(true);
      try {
        const data = await getFolders();
        console.log(data);
        setFolders(data);
      } catch (e) {
        console.log(e);
      } finally {
        setGetFolderLoading(false);
      }
    };
    getFolderData();
  }, []);

  return {
    folders,
    setFolders,
    getFolderLoading,
  };
}
