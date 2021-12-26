import { useQuery } from 'react-query';

import { getFolders } from '../apies/folderAPI';
import { ReactQueryKey } from '../utils/const';

export function useFoldersQueries(): typeof query {
  const query = useQuery(ReactQueryKey.folderContents(), () => getFolders(), {
    cacheTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return query;
}
