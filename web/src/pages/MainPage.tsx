import Bookmark from 'components/bookmark';
import Reminder from 'components/reminder';
import SideBar from 'components/sidebar';
import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import Path from 'routes/path';
import styled from 'styled-components';

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

  return (
    <MainWrapper>
      <SideBar />
      <ContentLayout>
        <ContentInner>
          {location.pathname === Path.Home && <Reminder />}
          <Bookmark />
        </ContentInner>
      </ContentLayout>
    </MainWrapper>
  );
}

export default MainPage;
