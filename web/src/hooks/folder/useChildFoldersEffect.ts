import { getChildFolders } from 'api/folderAPI';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function useChildFoldersEffect() {
  const { folderId } = useParams();
  const [childFolders, setChildFolders] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        // const data = await getChildFolders(folderId);
        console.log(folderId);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('자식 폴더를 불러오는데 실패했습니다.');
      }
    };
    if (folderId) getData();
  }, [folderId]);
}
