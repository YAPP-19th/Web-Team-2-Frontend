import Toasts from 'components/common/Toasts';
import Footer from 'components/footer';
import Header from 'components/header';
import React, { ReactElement } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Routing from 'routes/Routing';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './assets/styles/globalStyle';
import { theme } from './assets/styles/theme';
import ErrorFallback from './pages/ErrorPage';

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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Header />
          <AppLayout>
            <Routing />
          </AppLayout>
          <Footer />
          <Toasts type="folderIsFull" />
        </ThemeProvider>
      </ErrorBoundary>
    </AppWrapper>
  );
}

export default App;
