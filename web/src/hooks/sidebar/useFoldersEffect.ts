import { TreeData } from '@atlaskit/tree';
import tempData from 'components/sidebar/data/atlassianTreeMock.json';
import useAPITest from 'hooks/common/useAPITest';
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
  const { getFolders } = useAPITest();
  useEffect(() => {
    // 현재는 임시데이터 사용 / 나중에 api 생기면 asnyc await으로 데이터 처리
    const getData = async () => {
      const response = await getFolders();
      console.log(response);
      setFolders(response);
    };
    getData();
  }, []);

  return {
    folders,
    setFolders,
  };
}
