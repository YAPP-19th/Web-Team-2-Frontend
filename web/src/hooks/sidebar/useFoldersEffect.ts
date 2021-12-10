/* eslint-disable no-console */
import { TreeData } from '@atlaskit/tree';
import { getFolders } from 'api/folderAPI';
import { useEffect, useState } from 'react';

export default function useFoldersEffect(): {
  folders: TreeData;
  setFolders: React.Dispatch<React.SetStateAction<TreeData>>;
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
  useEffect(() => {
    const getFolderData = async () => {
      try {
        const data = await getFolders();
        console.log(data);
        setFolders(data);
      } catch (e) {
        console.log(e);
      }
    };
    getFolderData();
  }, []);

  return {
    folders,
    setFolders,
  };
}
