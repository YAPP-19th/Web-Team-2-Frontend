import { getChildFolders } from 'api/folderAPI';
import { useQuery } from 'react-query';
import { ReactQueryKey } from 'utils/const';

export default function useChildFoldersEffect(folderId: string): typeof query {
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
