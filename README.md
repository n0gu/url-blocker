 # URL Blocker

 A simple Chrome extension to block specific resources based on URL.

 ## Installation

 1. Clone this repository.
 2. Open `chrome://extensions` in Chrome.
 3. Enable **Developer mode**.
 4. Click **Load unpacked** and select the project folder.

 ## Usage

 1. Go to the extension’s **Options** page.
 2. Enter one pattern per line:
    - Exact URL (e.g., `https://example.com/script.js`)
    - Substring (e.g., `cdn.example.com/lib`)
    - Regex wrapped in slashes (e.g., `/https?:\/\/.*\.min\.js$/`)
 3. Click **Save**.
 4. Reload pages to apply the new blocking rules.
