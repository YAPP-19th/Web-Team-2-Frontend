import Path from 'routes/path';

export const getGlobalPagePath = (
  path: string,
): '모든도토리' | '휴지통' | undefined => {
  switch (path) {
    case Path.Home:
      return '모든도토리';
    case Path.TrashPage:
      return '휴지통';
    default:
      return undefined;
  }
};
