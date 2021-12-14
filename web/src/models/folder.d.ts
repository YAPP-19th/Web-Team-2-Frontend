import { ItemId } from '@atlaskit/tree';

export namespace folder {
  export interface IChildFolderItem {
    folderId: ItemId;
    name: string;
    emoji: string;
  }

  export interface ICheckedChildFolderItem extends IChildFolderItem {
    checked: boolean;
  }

  export type IChildFoldersGetResponse = IChildFolderItem[];
  export type IParentFoldersGetResponse = IChildFolderItem[];
}
