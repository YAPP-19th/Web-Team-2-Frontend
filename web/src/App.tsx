import Footer from 'components/footer';
import Header from 'components/header';
import React, { ReactElement } from 'react';
import Routing from 'routes/Routing';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './assets/styles/globalStyle';
import { theme } from './assets/styles/theme';

const AppLayout = styled.div`
  width: ${(props) => props.theme.basicWidth};
  margin: 0 auto;
`;

function App(): ReactElement {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <AppLayout>
          <Routing />
        </AppLayout>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
