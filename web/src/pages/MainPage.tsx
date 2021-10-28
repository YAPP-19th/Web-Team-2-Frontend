import Reminder from 'components/reminder';
import SideBar from 'components/sidebar';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Bookmark from 'components/bookmark';

const MainWrapper = styled.div`
  width: 1100px; // 아직 확정된 값이 없어서 임의로 줌
  margin: 0 auto;
  display: flex;
`;

const ContentLayout = styled.div`
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
`;

const ContentInner = styled.div`
  width: 874px;
  height: 100%;
`;

function MainPage(): ReactElement {
  return (
    <MainWrapper>
      <SideBar />
      <ContentLayout>
        <ContentInner>
          <Reminder />
          <Bookmark />
        </ContentInner>
      </ContentLayout>
    </MainWrapper>
  );
}

export default MainPage;
