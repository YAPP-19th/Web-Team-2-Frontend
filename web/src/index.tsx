import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga4';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { getInitialUserInfo } from 'recoil/atoms/initializer';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot initializeState={getInitialUserInfo}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

function sendToAnalytics() {
  ReactGA.ga('send', 'event', {
    eventCategory: 'Web Vitals',
    eventAction: 'temp',
    eventValue: Math.round(1),
    eventLabel: 'G-0D65J5TYYD',
    nonInteraction: true,
  });
}

reportWebVitals(sendToAnalytics);
