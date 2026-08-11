# ChatScribe

ChatScribe is a Chrome extension designed to export and organize conversations from WhatsApp Web.

## Current Status

🚧 Early development

### Implemented

- Chrome Manifest V3 extension structure
- Popup interface
- WhatsApp Web content script
- Popup-to-content-script communication
- Detection of visible WhatsApp messages
- GitHub-based development using Codespaces

### Planned Features

- Chat message extraction
- Sender and timestamp parsing
- Media/reference handling
- Multiple export formats
- Chat filtering
- Search and organization
- Clean, structured exports

## Project Structure

```text
ChatScribe/
├── manifest.json
├── README.md
├── LICENSE
└── src/
    ├── background.js
    ├── content.js
    ├── popup.html
    ├── popup.js
    └── style.css
