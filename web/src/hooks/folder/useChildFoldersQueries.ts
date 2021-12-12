import { getChildFolders } from 'api/folderAPI';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ReactQueryKey } from 'utils/const';

interface FolderIdParams {
  folderId: string;
}

export default function useChildFoldersEffect(): typeof query {
  const { folderId } = useParams<keyof FolderIdParams>() as FolderIdParams; // Note(dohyun) react-router v6 부터는 useParams의 타입 지정이 불가능 해서 이런식으로 하라고 함 -> https://stackoverflow.com/questions/69992370/why-react-router-v6-useparams-returns-object-with-properties-possibly-undefined

  const query = useQuery(
    ReactQueryKey.subFolderContents(folderId),
    () => getChildFolders(folderId),
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      retry: false,
    },
  );
  return query;
}
