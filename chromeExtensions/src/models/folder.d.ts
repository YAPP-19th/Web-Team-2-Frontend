import { ItemId } from '@atlaskit/tree';

export namespace folder {
  export interface IChildFolderItem {
    folderId: ItemId;
    name: string;
    emoji: string;
  }

  export interface ISubFolderItem extends IChildFolderItem {
    checked: boolean;
  }

  export type ISubFolderState = ISubFolderItem[];

  export interface ICheckedChildFolderItem extends IChildFolderItem {
    checked: boolean;
  }

  export type IChildFoldersGetResponse = IChildFolderItem[];
  export type IParentFoldersGetResponse = IChildFolderItem[];

  export interface ISubFoldersDeleteRequest {
    deleteFolderIdList: ItemId[];
  }
}
