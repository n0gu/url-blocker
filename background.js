const DEFAULT_FILTER = '';

function updateRules(filterString) {
    const patterns = filterString.trim().split(/[\r\n]+/).map(s => s.trim()).filter(Boolean);
    chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
        const removeRuleIds = existingRules.map(rule => rule.id);
        const addRules = patterns.map((pattern, index) => {
            const rule = {
                id: index + 1,
                priority: 1,
                action: { type: 'block' },
                condition: { resourceTypes: ['script'] }
            };
            if (pattern.startsWith('/') && pattern.endsWith('/') && pattern.length > 1) {
                rule.condition.regexFilter = pattern.slice(1, -1);
            } else {
                rule.condition.urlFilter = pattern;
            }
            return rule;
        });
        chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds, addRules });
    });
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
