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
      const data = await getFolders();
      // eslint-disable-next-line no-console
      console.log(data);
      setFolders(data);
    };
    getFolderData();
  }, []);

  return {
    folders,
    setFolders,
  };
}
