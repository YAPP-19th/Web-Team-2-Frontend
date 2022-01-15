/* eslint-disable */
import React, { ReactElement, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { getDotoriList } from './apies';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

import { useMetaData } from './contexts/ContextMetaData';
import { getMetaDataByUrl } from './helper/metaHelper';
import { PageMain } from './page/PageMain';
import { getStorageTokens } from './helper';

function executeScript(msg: any, callback: any) {
  if(chrome?.tabs?.query) {
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
}

export default function Popup(): ReactElement {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { updateMetaData } = useMetaData();
  
  useEffect(() => {
    const fetch = () => {
      const {
        refreshToken: userRefreshToken,
        accessToken: userAccessToken,
      } = getStorageTokens();
      executeScript({ what: 'get', type: 'L' }, async function(response: any) {
        const accessToken = response.accessToken;
        const refreshToken = response.refreshToken
        let checkIsLogin = accessToken ? !!accessToken : !!userAccessToken;
        localStorage.setItem(REFRESH_TOKEN, refreshToken ? refreshToken : userRefreshToken);
        localStorage.setItem(ACCESS_TOKEN, accessToken ? accessToken : userAccessToken);
        console.log(accessToken, refreshToken, userAccessToken, userRefreshToken);
        try {
          if(accessToken) {
            await getDotoriList();
          }
        } catch (e) {
          if ((e as AxiosError)?.request.status === 401) {
            checkIsLogin = false;
          }
        } finally {
          setIsLogin(checkIsLogin);
        }
      });
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
    };
    fetch();
  }, []);

  return <PageMain isLogin={isLogin} />;
}
