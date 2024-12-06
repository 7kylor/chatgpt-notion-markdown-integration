#!/usr/bin/env node
const NotionFormatter = require('./index');
const fs = require('fs');
require('dotenv').config();

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const formatter = new NotionFormatter(NOTION_TOKEN);

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: notion-formatter <input-file> <page-id>');
    process.exit(1);
  }

  const [inputFile, pageId] = args;

  try {
    const content = fs.readFileSync(inputFile, 'utf8');
    const success = await formatter.formatAndUpload(content, pageId);
    
    if (success) {
      console.log('Content successfully uploaded to Notion!');
    } else {
      console.log('Failed to upload content.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main(); 