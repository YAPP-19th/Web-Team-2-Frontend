import { DtoFolder } from './DtoFolder';

export interface DtoFolderList {
  rootId: string;
  items: {
    [key in string]:
      | DtoFolder
      | {
          id: 'root';
          rootFolders: Array<string>;
        };
  };
}
