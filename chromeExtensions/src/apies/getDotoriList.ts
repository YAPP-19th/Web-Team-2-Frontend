import { DtoFolderList } from '../domain';

import { request } from '.';

export async function getDotoriList(): Promise<DtoFolderList> {
  const res = await request<DtoFolderList, unknown>('get', 'api/v1/folder');
  return res;
}
