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
  const [path, setPath] = useState<string>();
  const [isFolderPage, setIsFolderPage] = useState<boolean>(false);
  const abs = folderId && folderId !== 'trash' && folderId !== 'search';
  useEffect(() => {
    setPath(location.pathname);
    if (folderId && folderId !== 'trash' && folderId !== 'search') {
      setIsFolderPage(true);
    } else {
      setIsFolderPage(false);
    }
  }, [location.pathname]);

  // 쿼리스트링 추출
  const query = useMemo(() => {
    const parsed = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as { q: string };
    return parsed;
  }, [location.search]);

  return (
    <MainWrapper>
      <SideBar />
      <ContentLayout>
        <ContentInner>
          {location.pathname === Path.Home && <Reminder />}
          <BookmarkPath />
          {isFolderPage && <SubFolders />}
          {path && <Bookmark path={path} keyword={query.q} />}
        </ContentInner>
      </ContentLayout>
    </MainWrapper>
  );
}

export default MainPage;
