import {
  ItemId,
  moveItemOnTree,
  mutateTree,
  TreeData,
  TreeDestinationPosition,
  TreeSourcePosition,
} from '@atlaskit/tree';
import { useRecoilState } from 'recoil';
import { folderState } from 'recoil/atoms/folderState';

interface ReturnType {
  folders: TreeData;
  onExpand: (itemId: ItemId) => void;
  onCollapse: (itemId: ItemId) => void;
  onDragEnd: (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition | undefined,
  ) => void;
  onCheckFirstNode: (itemId: ItemId) => boolean;
}

export default function useFolderHandle(): ReturnType {
  const [folders, setFolders] = useRecoilState(folderState);

  const onExpand = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: true }));
  };

  const onCollapse = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: false }));
  };

  const onDragEnd = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition,
  ) => {
    if (!destination) return;
    const newTree = moveItemOnTree(folders, source, destination);
    console.log('새로운 부모Id', destination);
    console.log('기존 부모Id', source);
    setFolders(newTree);
  };

  const onCheckFirstNode = (itemId: ItemId) => {
    const firstNode = folders.items.userId.children; // 나중에 유저 구현되면 userId를 실제 유저Id 들어오게 설정
    return firstNode.includes(itemId);
  };

  return {
    folders,
    onExpand,
    onCollapse,
    onDragEnd,
    onCheckFirstNode,
  };
}
