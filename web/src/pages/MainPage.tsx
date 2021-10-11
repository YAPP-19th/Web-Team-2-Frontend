import React, { ReactElement } from 'react';
import styled from 'styled-components';

const MainWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  height: 48px;
  background-color: ${(props) => props.theme.color.test1};
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainLayout = styled.div`
  width: 1200px; // 아직 확정된 값이 없어서 임의로 줌
  margin: 0 auto;
  display: flex;
  flex: 1 1 0;
`;

const Aside = styled.aside`
  width: 240px;
  background-color: ${(props) => props.theme.color.test2};
`;

const ContentLayout = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
`;

const Remainder = styled.div`
  height: 200px;
  background-color: ${(props) => props.theme.color.test3};
`;

const Bookmark = styled.div`
  flex: 1 1 0;
  background-color: ${(props) => props.theme.color.test4};
`;

function MainPage(): ReactElement {
  return (
    <MainWrapper>
      <Header>헤더 영역</Header>
      <MainLayout>
        <Aside>사이드 영역</Aside>
        <ContentLayout>
          <Remainder>리마인더영역</Remainder>
          <Bookmark>북마크영역</Bookmark>
        </ContentLayout>
      </MainLayout>
    </MainWrapper>
  );
}

export default MainPage;
