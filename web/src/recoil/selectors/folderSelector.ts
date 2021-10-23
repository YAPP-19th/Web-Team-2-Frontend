import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { folderState } from 'recoil/atoms/folderState';

interface CabinetActionReturnTypes {
  create: () => void;
}

export function useCabinetAction(): CabinetActionReturnTypes {
  const set = useSetRecoilState(folderState);

  const create = useCallback(() => {
    const newCabinetId = Math.random().toString();
    const cabinet = {
      id: newCabinetId,
      children: [],
      data: {
        title: '임시보관함',
      },
    };

    set((prev) => ({
      ...prev,
      items: { ...prev.items, [newCabinetId]: cabinet },
    }));

    set((prev) => ({
      ...prev,
      items: {
        ...prev.items,
        userId: {
          ...prev.items.userId,
          children: [...prev.items.userId.children, newCabinetId],
        },
      },
    }));
  }, [set]);

  return {
    create,
  };
}
