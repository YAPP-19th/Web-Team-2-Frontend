export interface IDtoDotori {
  url: string;
  title: string;
  remind: boolean;
  image: string;
  description: string;
  folderId: string;
}

export class DtoDotori implements IDtoDotori {
  url: string;

  title: string;

  remind: boolean;

  image: string;

  folderId: string;

  description: string;

  constructor({
    url,
    title,
    remind,
    image,
    folderId,
    description,
  }: IDtoDotori) {
    this.url = url;
    this.title = title;
    this.remind = remind;
    this.image = image;
    this.folderId = folderId;
    this.description = description;
  }
}
