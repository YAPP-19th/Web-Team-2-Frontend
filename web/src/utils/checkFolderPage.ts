// 현재 페이지가 폴더 페이지 인지 체크

export const isFolderPage = (params?: string): boolean => {
  const isNumReg = /^(\s|\d)+$/;
  if (params && isNumReg.test(params)) {
    return true;
  }
  return false;
};
