export function formatMessage(text: string): string {
  let formatted = text;

  // Headings
  formatted = formatted.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  formatted = formatted.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  formatted = formatted.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  formatted = formatted.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g, 
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  formatted = formatted.replace(
    /(?<!["'])((https?:\/\/[^\s<]+)(?![<"]))/g, 
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // List items
  const listItems: string[] = [];
  
  formatted = formatted.replace(/^[\s]*[-\*\+]\s+(.+)$/gm, (match, itemContent) => {
    listItems.push(`<li>${itemContent}</li>`);
    return `__LIST_ITEM_${listItems.length - 1}__`;
  });
  
  formatted = formatted.replace(/^[\s]*\d+\.\s+(.+)$/gm, (match, itemContent) => {
    listItems.push(`<li>${itemContent}</li>`);
    return `__LIST_ITEM_${listItems.length - 1}__`;
  });

  // Line breaks
  formatted = formatted.replace(/\n/g, '<br>');

  // Replace list item placeholders
  listItems.forEach((itemHtml, index) => {
    const placeholder = `__LIST_ITEM_${index}__`;
    formatted = formatted.replace(placeholder, itemHtml);
  });

  // Wrap consecutive list items in ul tags
  formatted = formatted.replace(/(<li>.+<\/li>)+/g, '<ul>$&</ul>');
  formatted = formatted.replace(/<\/ul>\s*<ul>/g, '');

  return formatted;
}