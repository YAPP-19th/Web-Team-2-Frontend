import { DtoDotori } from '../domain/DtoDotori';
import { request } from './request';

export async function createDotori(dotori: DtoDotori): Promise<void> {
  const { folderId, url, title, remind, image, description } = dotori;
  await request('post', `api/v1/bookmark/${folderId}`, {
    url,
    title,
    remind,
    image,
    description,
  });
}
