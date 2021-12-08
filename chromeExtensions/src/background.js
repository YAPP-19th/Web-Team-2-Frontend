/* eslint-disable */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.cmd === 'openTab') {
    chrome.tabs.create({ url: msg.url }, (createdTab) => {
      chrome.tabs.onUpdated.addListener(function _(tabId, info, tab) {
        if (tabId === createdTab.id && info.url) {
          chrome.tabs.onUpdated.removeListener(_);
          chrome.tabs.executeScript(tabId, { file: msg.script });
        }
      });
    });
  }
});
