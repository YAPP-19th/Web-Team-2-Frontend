import { FolderIdParams } from 'components/subFolders';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSubFoldersSetting } from 'recoil/selectors/folderSelector';
import useChildFoldersQueries from './useChildFoldersQueries';

export default function useChildFoldersLoad(): void {
  const { folderId } = useParams<keyof FolderIdParams>() as FolderIdParams; // Note(dohyun) react-router v6 부터는 useParams의 타입 지정이 불가능 해서 이런식으로 하라고 함 -> https://stackoverflow.com/questions/69992370/why-react-router-v6-useparams-returns-object-with-properties-possibly-undefined
  const { data } = useChildFoldersQueries(folderId);
  const setting = useSubFoldersSetting();

  useEffect(() => {
    if (!data) return;
    setting(data.map((subFolder) => ({ ...subFolder, checked: false })));
  }, [data, setting]);
}
