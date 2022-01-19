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

ReactGA.initialize('G-0D65J5TYYD');

function sendToAnalytics({
  id,
  name,
  value,
}: {
  id: string;
  name: string;
  value: number;
}) {
  ReactGA.ga('send', 'event', {
    eventCategory: 'web-vitals',
    eventAction: name,
    eventValue: Math.round(name === 'CLS' ? value * 1000 : value),
    eventLabel: id,
    nonInteraction: true,
  });
}

reportWebVitals(sendToAnalytics);
