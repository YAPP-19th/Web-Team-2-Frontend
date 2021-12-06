import { ItemId, TreeData } from '@atlaskit/tree';
import { Client } from 'api/http';
import { AxiosResponse } from 'axios';

// 폴더 리스트 조회
export const getFolders = async (): Promise<TreeData> => {
  return Client.getAxios(`/api/v1/folder`);
};

// 폴더 추가
export const createFolder = async (
  parentId: ItemId,
  name: string,
  index: number,
): Promise<AxiosResponse> => {
  const body = {
    parentId,
    name,
    index,
  };
  return Client.postAxios(`/api/v1/folder`, body);
};

// 폴더 이동
export const moveFolder = async (
  folderId: ItemId,
  prevParentId: ItemId,
  nextParentId: ItemId,
  prevIndex: ItemId,
  nextIndex: ItemId,
): Promise<AxiosResponse> => {
  const body = {
    prevParentId,
    nextParentId,
    prevIndex,
    nextIndex,
  };
  console.log('body', body);
  return Client.patchAxios(`/api/v1/folder/${folderId}`, body);
};
