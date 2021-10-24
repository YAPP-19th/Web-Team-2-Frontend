import mockData from 'components/reminder/data/remindMock.json';
import { useEffect, useState } from 'react';

export interface ImockData {
  id: number;
  title: string;
}

export default function useRemindEffect(): { reminds: ImockData[] } {
  const [reminds, setRemindes] = useState<ImockData[]>([]);
  useEffect(() => {
    // 현재는 임시데이터 사용 / 나중에 api 생기면 asnyc await으로 데이터 처리
    setRemindes(mockData.reminds);
  }, []);

  return {
    reminds,
  };
}
