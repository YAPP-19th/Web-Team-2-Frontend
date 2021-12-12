import Footer from 'components/footer';
import Header from 'components/header';
import useLoggedInUserReplace from 'hooks/auth/useLoggedInUserReplace';
import React, { ReactElement } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { PublicRouting, Routing } from 'routes/Routing';
import styled, { ThemeProvider } from 'styled-components';
import { isLogin } from 'utils/auth';
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
  flex: 1 auto;
  display: flex;
  flex-direction: column;
`;

const queryClient = new QueryClient();

function App(): ReactElement {
  useLoggedInUserReplace();
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Header />
            <AppLayout>{isLogin() ? <Routing /> : <PublicRouting />}</AppLayout>
            <Footer />
          </ThemeProvider>
        </ErrorBoundary>
      </AppWrapper>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
