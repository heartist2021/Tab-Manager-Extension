// background.js
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.query({}, function (tabs) {
      const tabList = tabs.map(tab => {
        return { id: tab.id, title: tab.title, url: tab.url };
      });
  
      chrome.tabs.create({ url: 'popup.html' }, function (tab) {
        chrome.runtime.onConnect.addListener(function (port) {
          port.postMessage({ type: 'UPDATE_TABS', tabs: tabList });
        });
      });
    });
  });
  