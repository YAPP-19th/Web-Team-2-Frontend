import { ItemId } from '@atlaskit/tree';

export namespace folder {
  export interface IChildFolderItem {
    folderId: ItemId;
    name: string;
    emoji: string;
  }

  export type IChildFoldersGetResponse = IChildFolderItem[];
}
