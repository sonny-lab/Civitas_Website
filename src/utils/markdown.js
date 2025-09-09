// This file is no longer actively used for parsing markdown as the logic has been moved to App.jsx
// However, it's kept here for historical context or if you wish to refactor.

import { marked } from 'marked';
import DOMPurify from 'dompurify';

export const parseMarkdown = (markdown) => {
  // Extract frontmatter (if any) and then parse the rest of the content
  const frontmatterEnd = markdown.indexOf(
    `---\n`,
    markdown.indexOf(`---\n`) + 3
  );
  const content = markdown.substring(frontmatterEnd + 4).trim();
  return DOMPurify.sanitize(marked.parse(content));
};

export const extractFrontmatter = (markdown) => {
  const frontmatterMatch = markdown.match(/---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return {};

  const frontmatter = frontmatterMatch[1];
  const lines = frontmatter.split("\n");
  const data = {};
  lines.forEach((line) => {
    const [key, ...value] = line.split(":");
    if (key && value.length > 0) {
      data[key.trim()] = value.join(":").trim().replace(/^"|"$/g, "");
    }
  });
  return data;
};
