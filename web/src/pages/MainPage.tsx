import Reminder from 'components/reminder';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import SideBar from 'components/sidebar';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  height: 48px;
  background-color: ${(props) => props.theme.color.test1};
  color: ${(props) => props.theme.color.black0};
  display: flex;
  align-items: center;
  justify-content: center;
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
      <Header>헤더 영역</Header>
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
