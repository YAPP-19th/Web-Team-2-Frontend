import Path from 'routes/path';

interface IUsePagePathEffect {
  getPath: (path: string) => '모든도토리' | '휴지통' | undefined;
}
export default function usePagePathEffect(): IUsePagePathEffect {
  function getPath(path: string) {
    switch (path) {
      case Path.Home:
        return '모든도토리';
      case Path.TrashPage:
        return '휴지통';
      default:
        return undefined;
    }
  }
  return {
    getPath,
  };
}
