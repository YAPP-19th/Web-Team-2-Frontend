import tempData from 'components/sidebar/data/atlassianTreeMock.json';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { folderState } from 'recoil/atoms/folderState';

export default function useFoldersEffect(): void {
  const setFolders = useSetRecoilState(folderState);
  useEffect(() => {
    // 현재는 임시데이터 사용 / 나중에 api 생기면 asnyc await으로 데이터 처리
    setFolders(tempData);
  }, []);
}
