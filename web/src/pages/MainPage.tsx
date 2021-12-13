import Bookmark from 'components/bookmark';
import SubFolders from 'components/subFolders';
import Reminder from 'components/reminder';
import SideBar from 'components/sidebar';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Path from 'routes/path';
import styled from 'styled-components';
import qs from 'qs';
import BookmarkPath from 'components/bookmark/BookmarkPath';
import { checkFolderPage } from 'utils/checkFolderPage';

const MainWrapper = styled.div`
  display: flex;
  flex: 1 auto;
`;

const ContentLayout = styled.div`
  padding: 20px 0 0 28px;
  display: flex;
  flex-direction: column;
`;

const ContentInner = styled.div`
  width: 867px;
  height: 100%;
`;

function MainPage(): ReactElement {
  const location = useLocation();
  const params = useParams();
  const { folderId } = params;
  const [path, setPath] = useState<string>('');
  const [isFolderPage, setIsFolderPage] = useState<boolean>(false);

  useEffect(() => {
    setPath(location.pathname);
    setIsFolderPage(checkFolderPage(folderId));
  }, [location.pathname]);

  // 쿼리스트링 추출
  const query = useMemo(() => {
    const parsed = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as { q: string };
    return parsed;
  }, [location.search]);

  /* @NOTE 
  - '모든 도토리' 일 경우에만 Reminder 를 보여주기
  - '검색 페이지 일 경우에만 BookmarkPath 를 보여주지 말기
  - '각 보관함 or 폴더 페이지에만  SubFolders 를 보여주기
   */

  return (
    <MainWrapper>
      <SideBar />
      <ContentLayout>
        <ContentInner>
          {path === Path.Home && <Reminder />}
          {path !== Path.SearchPage && <BookmarkPath path={path} />}
          {isFolderPage && <SubFolders />}
          {path && <Bookmark path={path} keyword={query.q} />}
        </ContentInner>
      </ContentLayout>
    </MainWrapper>
  );
}

export default MainPage;
