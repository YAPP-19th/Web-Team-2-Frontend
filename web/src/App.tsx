import Footer from 'components/footer';
import Header from 'components/header';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
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
  // console.log(initializeApp(firebaseConfig));

  const firebaseConfig = {
    apiKey: 'AIzaSyBQ2hhmKBy2S00dMIl1XTnGQbzKasSbVwY',
    authDomain: 'dotoriham-dfee3.firebaseapp.com',
    projectId: 'dotoriham-dfee3',
    storageBucket: 'dotoriham-dfee3.appspot.com',
    messagingSenderId: '1055811077974',
    appId: '1:1055811077974:web:08286bc1990346256cb8f7',
    measurementId: 'G-BZE4CWPKM3',
  };

  initializeApp(firebaseConfig);

  const messaging = getMessaging();
  getToken(messaging, {
    vapidKey:
      'AAAA9dM-h1Y:APA91bFTatFAP7g_sRQsCX8bQtRHe6FAZHU16DLq7n5fAWbgicgiORoWwsY4ex8fHotfBVIe20Tt-XmaJo91POFmgt2OHPBtAL0izrFZP1PmZ9PdEjAftnfrI1YKUmZaP5Uual4bZ7qK',
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log(
          'No registration token available. Request permission to generate one.',
        );
        // ...
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

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
