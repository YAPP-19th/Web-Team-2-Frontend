import { getRemindList } from 'api/remindAPI';
import { useQuery } from 'react-query';
import { ReactQueryKey } from 'utils/const';

export function useRemindQuery(): typeof query {
  const query = useQuery(
    ReactQueryKey.remindContents(),
    () => getRemindList(),
    {
      retry: false,
    },
  );

  return query;
}
