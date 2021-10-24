import { ItemId } from '@atlaskit/tree';
import produce from 'immer';
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

    set((prev) =>
      produce(prev, (draft) => {
        const newObj = draft; // eslint로 인해서 매개변수를 직접 변경하지 못하여 새롭게 할당
        newObj.items[newCabinetId] = cabinet;
        newObj.items.userId.children.push(newCabinetId); // userId 부분은 나중에 login 구현되면 실제 유저 아이디 넣는곳임 newObj.items[userId].children.push(newCabinetId);
      }),
    );
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

      set((prev) =>
        produce(prev, (draft) => {
          const newObj = draft;
          newObj.items[newFolderId] = folder;
          newObj.items[parentId].children.push(newFolderId);
          newObj.items[parentId].isExpanded = true;
        }),
      );
    },
    [set],
  );

  return {
    create,
  };
}
