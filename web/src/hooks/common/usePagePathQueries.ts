import { getParentFolders } from 'api/folderAPI';
import { useQuery } from 'react-query';
import { ReactQueryKey } from 'utils/const';

export default function usePagePathQueries(folderId: string): typeof query {
  const query = useQuery(
    ReactQueryKey.pagePathContents(folderId),
    () => getParentFolders(folderId),
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      retry: false,
    },
  );
  return query;
}
