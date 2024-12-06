# Notion Format Helper

A tool for formatting and uploading markdown content to Notion, available as both a browser extension and API integration.

## Features

- **Browser Extension**:
  - Auto-formatting of ChatGPT and markdown content
  - Real-time conversion while pasting
  - Supports headers, code blocks, lists, tables, and more

- **API Integration**:
  - Direct upload to Notion pages
  - Markdown parsing and conversion
  - CLI tool for easy usage
  - Programmatic API access

## Installation

### Browser Extension
1. Clone this repository
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `/extension` directory

### API Integration
1. Create a Notion integration at [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Install the package:
```bash
npm install notion-format-helper
bun install notion-format-helper
```
3. Set up your environment:
```bash
echo "NOTION_TOKEN=your_token_here" > .env
```

## Usage

### Browser Extension
Simply copy text from ChatGPT or markdown content and paste it into Notion. The extension handles the formatting automatically.

### API Integration
```bash
# Using CLI
notion-formatter input.md your_page_id

# Using API
const formatter = new NotionFormatter(process.env.NOTION_TOKEN);
await formatter.formatAndUpload(content, pageId);
```

## Project Structure
```
notion-format-helper/
├── extension/           # Browser extension
│   ├── manifest.json    # Extension config
│   ├── content.js      # Formatting logic
│   └── styles.css      # Styling
│
└── api-integration/    # Notion API integration
    ├── index.js       # Main API code
    ├── cli.js         # CLI tool
    └── package.json   # Dependencies
```

## Supported Formats
- Headers (H1-H6)
- Code blocks with syntax highlighting
- Bold and italic text
- Bulleted and numbered lists
- Links and images
- Tables
- Math equations
- Inline code

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
[MIT License](LICENSE)


# chatgpt-notion-markdown-integration
