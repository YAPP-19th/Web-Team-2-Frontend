import { TreeData } from '@atlaskit/tree';

import { request } from '.';

export async function getDotoriList(): Promise<TreeData> {
  const res = await request<TreeData, unknown>('get', 'api/v1/folder');
  return res;
}
