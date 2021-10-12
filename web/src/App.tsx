import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './assets/styles/globalStyle';
import { theme } from './assets/styles/theme';
import MainView from './pages/MainPage';

function App(): ReactElement {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={MainView} />
        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;
