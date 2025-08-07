const DEFAULT_FILTER = '';

function updateRules(urlFilter) {
    if (urlFilter && urlFilter.trim()) {
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1],
            addRules: [{
                id: 1,
                priority: 1,
                action: { type: 'block' },
                condition: { urlFilter: urlFilter, resourceTypes: ['script'] }
            }]
        });
    } else {
        chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [1], addRules: [] });
    }
}

function loadAndUpdateRules() {
    chrome.storage.sync.get({ urlFilter: DEFAULT_FILTER }, (data) => {
        updateRules(data.urlFilter);
    });
}

chrome.runtime.onInstalled.addListener(loadAndUpdateRules);
chrome.runtime.onStartup.addListener(loadAndUpdateRules);
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.urlFilter) {
        updateRules(changes.urlFilter.newValue);
    }
});
