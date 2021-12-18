import { ItemId, TreeData } from '@atlaskit/tree';

// id로 children legnth 구하기
export const findChildrenLength = (
  folders: TreeData,
  itemId: ItemId,
): number => {
  return folders.items[itemId].children.length;
};

// id로 parent id 찾기
export const findParentId = (
  folders: TreeData,
  itemId: ItemId,
): ItemId | null => {
  const folderItems = Object.keys(folders.items);
  for (let item = 0; item < folderItems.length; item += 1) {
    if (folders.items[folderItems[item]].children.includes(itemId)) {
      return folderItems[item];
    }
  }
  return null;
};

// parentId가 보관함 인지 확인
export const isCabinet = (folders: TreeData, parentId: ItemId): boolean => {
  return folders.items.root.children.includes(parentId);
};
