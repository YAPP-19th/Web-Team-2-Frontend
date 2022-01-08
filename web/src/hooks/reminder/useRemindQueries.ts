import { getNewRemindAlarmList, getRemindList } from 'api/remindAPI';
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

export function useNewRemindAlarmQuery(): typeof query {
  const query = useQuery(
    ReactQueryKey.newRemindAlarmContents(),
    () => getNewRemindAlarmList(),
    {
      retry: false,
    },
  );

  return query;
}
