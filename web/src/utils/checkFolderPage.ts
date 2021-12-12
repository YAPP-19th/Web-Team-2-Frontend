// 현재 페이지가 폴더 페이지 인지 체크
export const checkFolderPage = (folderId: string | undefined): boolean => {
  if (folderId && folderId !== 'trash' && folderId !== 'search') {
    return true;
  }
  return false;
};
