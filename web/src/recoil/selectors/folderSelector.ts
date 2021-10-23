import { ItemId } from '@atlaskit/tree';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { folderState } from 'recoil/atoms/folderState';

interface CabinetActionReturnTypes {
  create: () => void;
}

interface FolderActionReturnTypes {
  create: (parentId: ItemId) => void;
}

// 액션 훅스
export function useCabinetAction(): CabinetActionReturnTypes {
  const set = useSetRecoilState(folderState);

  // 아래 함수들은 리듀서들
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

export function useFolderAction(): FolderActionReturnTypes {
  const set = useSetRecoilState(folderState);

  const create = useCallback(
    (parentId: ItemId) => {
      const newFolderId = Math.random().toString();
      const folder = {
        id: newFolderId,
        children: [],
        data: {
          title: '제목없음',
        },
      };
      set((prev) => ({
        ...prev,
        items: { ...prev.items, [newFolderId]: folder },
      }));

      set((prev) => ({
        ...prev,
        items: {
          ...prev.items,
          [parentId]: {
            ...prev.items[parentId],
            children: [...prev.items[parentId].children, newFolderId],
            isExpanded: true,
          },
        },
      }));
    },
    [set],
  );

  return {
    create,
  };
}
