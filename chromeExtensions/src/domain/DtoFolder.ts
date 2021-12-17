export interface DtoFolder {
  id: string;
  children: Array<string>;
  data: {
    name: string;
    emoji: string;
  };
  isExpanded: boolean;
}
