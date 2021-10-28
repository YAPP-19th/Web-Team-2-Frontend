import Header from 'components/header';
import MyPage from 'pages/MyPage';
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
        <Header />
        <Switch>
          <Route path="/" exact component={MainView} />
          <Route path="/mypage" exact component={MyPage} />
        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;
