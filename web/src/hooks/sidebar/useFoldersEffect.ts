import { TreeData } from '@atlaskit/tree';
import tempData from 'components/sidebar/data/atlassianTreeMock.json';
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
    // 현재는 임시데이터 사용 / 나중에 api 생기면 asnyc await으로 데이터 처리
    setFolders(tempData);
  }, []);

  return {
    folders,
    setFolders,
  };
}
