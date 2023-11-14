// popup.js
const app = document.getElementById('app');

const updateTabs = (tabs) => {
  app.innerHTML = '';

  tabs.forEach(tab => {
    const tabElement = document.createElement('div');
    tabElement.innerHTML = `
      <div class="tab-item">
        <strong>${tab.title}</strong>
        <a href="${tab.url}" target="_blank">Open</a>
        <button class="close-button" data-tab-id="${tab.id}">Close</button>
      </div>
    `;
    app.appendChild(tabElement);
  });

  // Add event listeners to close buttons
  document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', function () {
      const tabId = parseInt(this.getAttribute('data-tab-id'), 10);
      closeTab(tabId);
    });
  });
};

const closeTab = (tabId) => {
  chrome.tabs.remove(tabId, function () {
    // Refresh the list of tabs after closing one
    chrome.tabs.query({}, function (tabs) {
      updateTabs(tabs);
    });
  });
};

// Connect to the background script
const port = chrome.runtime.connect({ name: 'popup' });

// Listen for messages from the background script
port.onMessage.addListener(function (message) {
  if (message.type === 'UPDATE_TABS') {
    updateTabs(message.tabs);
  }
});
