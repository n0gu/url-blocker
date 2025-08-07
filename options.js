const DEFAULT_FILTER = '';

// Restore the saved URL filter on page load
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({ urlFilter: DEFAULT_FILTER }, (data) => {
    const input = document.getElementById('urlFilter');
    if (input) input.value = data.urlFilter;
  });
  // Save button handler
  const saveBtn = document.getElementById('save');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const input = document.getElementById('urlFilter');
      const filter = input ? input.value.trim() : '';
      chrome.storage.sync.set({ urlFilter: filter }, () => {
        const status = document.getElementById('status');
        if (status) {
          status.textContent = 'Options saved.';
          setTimeout(() => { status.textContent = ''; }, 2000);
        }
      });
    });
  }
});