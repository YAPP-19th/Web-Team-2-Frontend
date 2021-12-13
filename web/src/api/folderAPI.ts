import { ItemId, TreeData } from '@atlaskit/tree';
import { Client } from 'api/http';
import { AxiosResponse } from 'axios';
import { folder } from 'models/folder';

// 폴더 리스트 조회
export const getFolders = (): Promise<TreeData> => {
  return Client.getAxios(`/api/v1/folder`);
};

// 폴더 추가
export const createFolder = (
  parentId: ItemId,
  name: string,
  index: number,
): Promise<{ folderId: ItemId }> => {
  const body = {
    parentId,
    name,
    index,
  };
  return Client.postAxios(`/api/v1/folder`, body);
};

// 폴더 이동
export const moveFolder = (
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
  return Client.patchAxios(`/api/v1/folder/${folderId}/move`, body);
};

// 폴더 이름 수정
export const renameFolder = (
  folderId: ItemId,
  name: string,
): Promise<AxiosResponse> => {
  return Client.patchAxios(`/api/v1/folder/${folderId}/name`, { name });
};

// 폴더 이모지 수정
export const updateFolderEmoji = (
  folderId: ItemId,
  emoji: string,
): Promise<AxiosResponse> => {
  return Client.patchAxios(`/api/v1/folder/${folderId}/emoji`, { emoji });
};

// 폴더 삭제
export const deleteFolder = (folderId: ItemId): Promise<AxiosResponse> => {
  return Client.deleteAxios(`/api/v1/folder/${folderId}`);
};

// 자식 폴더 리스트 조회
export const getChildFolders = (
  folderId: ItemId,
): Promise<folder.IChildFoldersGetResponse> => {
  return Client.getAxios(`/api/v1/folder/${folderId}/children`);
};

// 부모 폴더 리스트 조회
export const getParentFolders = (
  folderId: ItemId,
): Promise<folder.IParentFoldersGetResponse> => {
  return Client.getAxios(`/api/v1/folder/${folderId}/parent`);
};
