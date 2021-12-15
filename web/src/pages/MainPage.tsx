import Bookmark from 'components/bookmark';
import SubFolders, { FolderIdParams } from 'components/subFolders';
import Reminder from 'components/reminder';
import SideBar from 'components/sidebar';
import React, { ReactElement, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Path from 'routes/path';
import styled from 'styled-components';
import qs from 'qs';
import PagePath from 'components/pagePath';
import { checkFolderPage } from 'utils/checkFolderPage';
import { useSetRecoilState } from 'recoil';
import { activeFolderIdState } from 'recoil/atoms/folderState';

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
  const { folderId } = useParams<keyof FolderIdParams>() as FolderIdParams;
  const setActiveFolderId = useSetRecoilState(activeFolderIdState);

  // 로딩 시 현재 페이지가 폴더id 를 가진 페이지이면 activeFolderId 에 id값 설정
  useEffect(() => {
    if (checkFolderPage(folderId)) setActiveFolderId(folderId);
  }, [folderId]);

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
          <PagePath />
          {checkFolderPage(folderId) && <SubFolders />}
          <Bookmark path={location.pathname} keyword={query.q} />
        </ContentInner>
      </ContentLayout>
    </MainWrapper>
  );
}

export default MainPage;
