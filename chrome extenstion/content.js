// Listen for paste events in Notion
document.addEventListener('paste', async (e) => {
  // Get clipboard content
  const clipboardData = e.clipboardData || window.clipboardData;
  const pastedText = clipboardData.getData('text/plain');

  // Check if the text contains markdown or appears to be from ChatGPT
  if (containsMarkdown(pastedText) || isFromChatGPT(pastedText)) {
    e.preventDefault();
    
    // Format the text
    const formattedText = formatForNotion(pastedText);
    
    // Insert the formatted text
    insertFormattedText(formattedText);
  }
});

function containsMarkdown(text) {
  // Check for common markdown patterns
  const markdownPatterns = [
    /#{1,6}\s.+/,          // Headers
    /\*\*.+\*\*/,          // Bold
    /\*.+\*/,              // Italic
    /```[\s\S]*?```/,      // Code blocks
    /\[.+\]\(.+\)/,        // Links
    /\|\s*(.+\s*\|)+/,     // Tables
    /^\s*[-*+]\s/m,        // Lists
    /^\s*\d+\.\s/m         // Numbered lists
  ];

  return markdownPatterns.some(pattern => pattern.test(text));
}

function isFromChatGPT(text) {
  // Check for common ChatGPT patterns
  return text.includes('```') || 
         text.includes('ChatGPT') || 
         /^(Human|Assistant):/.test(text);
}

function formatForNotion(text) {
  let formatted = text;

  // Convert markdown headers to Notion headers
  formatted = formatted.replace(/^#{1,6}\s(.+)$/gm, (match, content) => {
    const level = match.trim().split('#').length - 1;
    return `ℹ️ ${content}`; // Notion uses different heading styles
  });

  // Convert code blocks
  formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `\`\`\`\n${code.trim()}\n\`\`\``;
  });

  // Convert inline code
  formatted = formatted.replace(/`([^`]+)`/g, '`$1`');

  // Convert bold
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '**$1**');

  // Convert italic
  formatted = formatted.replace(/\*(.+?)\*/g, '_$1_');

  // Convert lists
  formatted = formatted.replace(/^\s*[-*+]\s(.+)$/gm, '• $1');

  // Convert numbered lists
  formatted = formatted.replace(/^\s*(\d+)\.\s(.+)$/gm, '$1. $2');

  // Convert equations (assuming LaTeX format)
  formatted = formatted.replace(/\$\$(.+?)\$\$/g, '⚡$1⚡');

  // Convert links
  formatted = formatted.replace(/\[(.+?)\]\((.+?)\)/g, '[$1]($2)');

  return formatted;
}

function insertFormattedText(text) {
  // Create a new DOM event
  const event = new InputEvent('input', {
    bubbles: true,
    cancelable: true,
    inputType: 'insertText',
    data: text
  });

  // Get the active element (should be the Notion editor)
  const activeElement = document.activeElement;
  
  // Insert the text
  if (activeElement.classList.contains('notion-page-content')) {
    activeElement.textContent = text;
    activeElement.dispatchEvent(event);
  }
} 