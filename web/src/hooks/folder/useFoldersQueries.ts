import { getFolders } from 'api/folderAPI';
import { useQuery } from 'react-query';
import { ReactQueryKey } from 'utils/const';

export default function useFoldersQueries(): typeof query {
  const query = useQuery(ReactQueryKey.folderContents(), () => getFolders());
  return query;
}
