const { Client } = require('@notionhq/client');
const marked = require('marked');

class NotionFormatter {
  constructor(authToken) {
    this.notion = new Client({ auth: authToken });
  }

  async formatAndUpload(content, pageId) {
    try {
      const blocks = await this.convertToNotionBlocks(content);
      
      await this.notion.blocks.children.append({
        block_id: pageId,
        children: blocks
      });

      return true;
    } catch (error) {
      console.error('Error uploading to Notion:', error);
      return false;
    }
  }

  async convertToNotionBlocks(content) {
    const tokens = marked.lexer(content);
    return this.tokensToNotionBlocks(tokens);
  }

  tokensToNotionBlocks(tokens) {
    return tokens.map(token => {
      switch (token.type) {
        case 'heading':
          return {
            object: 'block',
            type: 'heading_' + token.depth,
            ['heading_' + token.depth]: {
              rich_text: [{ type: 'text', text: { content: token.text } }]
            }
          };

        case 'paragraph':
          return {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ type: 'text', text: { content: token.text } }]
            }
          };

        case 'code':
          return {
            object: 'block',
            type: 'code',
            code: {
              language: token.lang || 'plain text',
              rich_text: [{ type: 'text', text: { content: token.text } }]
            }
          };

        case 'list':
          return {
            object: 'block',
            type: 'bulleted_list_item',
            bulleted_list_item: {
              rich_text: [{ type: 'text', text: { content: token.text } }]
            }
          };

        case 'equation':
          return {
            object: 'block',
            type: 'equation',
            equation: {
              expression: token.text
            }
          };

        default:
          return {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ type: 'text', text: { content: token.raw } }]
            }
          };
      }
    });
  }
}

module.exports = NotionFormatter; 