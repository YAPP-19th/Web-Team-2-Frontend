import Header from 'components/header';
import Footer from 'components/footer';
import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import MainPage from 'pages/MainPage';
import MyPage from 'pages/MyPage';
import LoginPage from 'pages/LoginPage';
import GlobalStyle from './assets/styles/globalStyle';
import { theme } from './assets/styles/theme';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const AppLayout = styled.div`
  width: ${(props) => props.theme.basicWidth};
  margin: 0 auto;
  overflow: hidden;
  flex: 1 auto;
`;

function App(): ReactElement {
  return (
    <AppWrapper>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <AppLayout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AppLayout>
        <Footer />
      </ThemeProvider>
    </AppWrapper>
  );
}

export default App;
