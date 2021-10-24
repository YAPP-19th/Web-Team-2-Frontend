import Header from 'components/header';
import Reminder from 'components/reminder';
import SideBar from 'components/sidebar/SideBar';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const MainWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainLayout = styled.div`
  width: 1100px; // 아직 확정된 값이 없어서 임의로 줌
  margin: 0 auto;
  display: flex;
  flex: 1 1 0;
`;

const ContentLayout = styled.div`
  flex: 1 1 0;
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
`;

const ContentInner = styled.div`
  width: 867px;
  height: 100%;
`;

const Bookmark = styled.div`
  background-color: ${(props) => props.theme.color.test4};
`;

function MainPage(): ReactElement {
  return (
    <MainWrapper>
      <Header />
      <MainLayout>
        <SideBar />
        <ContentLayout>
          <ContentInner>
            <Reminder />
            <Bookmark>북마크영역</Bookmark>
          </ContentInner>
        </ContentLayout>
      </MainLayout>
    </MainWrapper>
  );
}

export default MainPage;
