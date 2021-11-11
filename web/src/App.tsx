import Footer from 'components/footer';
import Header from 'components/header';
import MyPage from 'pages/MyPage';
import React, { ReactElement } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './assets/styles/globalStyle';
import { theme } from './assets/styles/theme';
import ErrorFallback from './pages/ErrorPage';
import MainPage from './pages/MainPage';

const AppLayout = styled.div`
  width: ${(props) => props.theme.basicWidth};
  margin: 0 auto;
`;

function App(): ReactElement {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <AppLayout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </AppLayout>
        <Footer />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
