import { DtoDotori } from '../domain/DtoDotori';

const mock: Array<DtoDotori> = [
  {
    url: 'https:/asdjfaklsjdflsdjf',
    title: 'asdjfklasjflkasjd',
    remind: false,
    image: 'sdhfahfkljas',
    folderId: 'asdfjf3j23kj4',
    description: 'sfasdf',
  },
  {
    url: 'https:/asdjfaklsjdflsdjf',
    title: 'asdjfklasjflkasjd',
    remind: false,
    image: 'sdhfahfkljas',
    folderId: 'asdfjf3j23kj4',
    description: 'sfasdf',
  },
  {
    url: 'https:/asdjfaklsjdflsdjf',
    title: 'asdjfklasjflkasjd',
    remind: false,
    image: 'sdhfahfkljas',
    folderId: 'asdfjf3j23kj4',
    description: 'sfasdf',
  },
  {
    url: 'https:/asdjfaklsjdflsdjf',
    title: 'asdjfklasjflkasjd',
    remind: false,
    image: 'sdhfahfkljas',
    folderId: 'asdfjf3j23kj4',
    description: 'sfasdf',
  },
];

export async function getDotoriList(): Promise<Array<DtoDotori>> {
  return mock;
}
