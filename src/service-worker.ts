/**
 * Adopted from https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples
 */


chrome.runtime.onInstalled.addListener((): void => {
  chrome.contextMenus.create({
    id: 'openSidePanel',
    title: 'Gemini Yes-And',
    contexts: ['all'],
  });
  chrome.tabs.create({ url: 'index.html' });
});

chrome.contextMenus.onClicked.addListener((info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab): void => {
  if (info.menuItemId === 'openSidePanel' && tab?.windowId !== undefined) {
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'text_change') {
    console.log('Text changed:', message.text);
  }
});
