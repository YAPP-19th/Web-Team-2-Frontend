/* eslint-disable */
import React, { ReactElement, useEffect } from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

import { useMetaData } from './contexts/ContextMetaData';
import { getMetaDataByUrl } from './helper/metaHelper';
import { PageMain } from './page/PageMain';

function executeScript(msg: any, callback: any) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    const tabId: any = tab[0].id;
    const exec = chrome.tabs.executeScript;

    exec(tabId, { code: `var msg = ${JSON.stringify(msg)}` }, function () {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
        callback && callback(undefined);
        return;
      }

      exec(tabId, { file: 'inject.js' }, function (response) {
        callback && callback(response[0]);
      });
    });
  });
}

export default function Popup(): ReactElement {
  const { updateMetaData } = useMetaData();
  useEffect(() => {
    const fetch = () => {
      if (chrome?.tabs?.query) {
        chrome.tabs.query(
          {
            active: true,
            currentWindow: true,
          },
          async (tabs) => {
            const { url = '' } = tabs[0];
            const metaData = await getMetaDataByUrl(url);
            updateMetaData(metaData);
          },
        );
      }
      executeScript({ what: 'get', type: 'L' }, function(response: any) {
        const {refreshToken, accessToken} = JSON.parse(response.userToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
        localStorage.setItem(ACCESS_TOKEN, accessToken);
      });
    };
    fetch();
    
  }, []);
  return <PageMain />;
}
