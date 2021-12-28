import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { getInitialUserInfo } from 'recoil/atoms/initializer';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>도토리함 | 기억하고 공유하는 북마크 보관함</title>
        <meta
          name="description"
          content="흩어진 북마크를 보관하고 공유하고 알림을 받아보세요"
        />
        <meta
          property="og:title"
          content="도토리함 | 기억하고 공유하는 북마크 보관함"
        />
        <meta
          property="og:description"
          content="흩어진 북마크를 보관하고 공유하고 알림을 받아보세요"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/t8sxXnv/og-image.png"
        />
      </Helmet>
      <RecoilRoot initializeState={getInitialUserInfo}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
