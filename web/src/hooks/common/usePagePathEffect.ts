import Path from 'routes/path';

export default function usePagePathEffect() {
  const getPathName = (path: string) => {
    switch (path) {
      case Path.Home:
        return ['모든 도토리'];
      case Path.TrashPage:
        return ['휴지통'];
      default:
        return ['default'];
    }
  };

  return {
    getPathName,
  };
}
