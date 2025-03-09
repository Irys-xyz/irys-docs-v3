// disable eslint for this file
/* eslint-disable */

const fs = require('fs').promises;
const path = require('path');

const removeMarkdown = (markdown) => {
    let output = markdown.trim()

    // remove imports
    output = output.replace(/import .*? from ".*?"/g, '')

    // Remove horizontal rules, setext-style headers, atx-style headers, fenced code blocks
    output = output
        .replace(/^(-\s*?|\*\s*?|_\s*?){3,}\s*$/gm, '')
        .replace(/\n={2,}/g, '\n')
        .replace(/~{3}.*\n/g, '')
        .replace(/`{3}.*\n/g, '')
        .replace(/^[=\-]{2,}\s*$/g, '')
        .replace(/^(\n)?\s{0,}#{1,6}\s+|(\s{0,}#{1,6}\s+)?(\n)?\s{0,}$/gm, '')

    // Remove HTML tags
    output = output.replace(/<[^>]*>/g, '')

    // Remove list leaders
    output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, '$1')

    // Remove strikethrough, inline links, images, blockquotes
    output = output
        .replace(/~~/g, '')
        .replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, '')
        .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, '$1')
        .replace(/^\s{0,3}>\s?/g, '')
        .replace(/(^|\n)\s{0,3}>\s?/g, '\n\n')

    // Remove emphasis, code blocks, inline code
    output = output
        .replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, '$2')
        .replace(/(`{3,})(.*?)\1/gm, '$2')
        .replace(/`(.+?)`/g, '$1')

    // Remove extra spaces
    output = output.replace(/\s\s+/g, '')

    // Replace multiple newlines with exactly two and remove extra empty lines
    output = output.replace(/\n{2,}/g, '\n\n').replace(/\n{3,}/g, '\n\n')

    // Remove {" "} and {' '}
    output = output.replace(/\{" "\}/g, '').replace(/\{' '\}/g, '')

    output = output.replace(/\n+/g, ' ')

    // Remove "description: "
    output = output.replace(/description: /g, '')

    // Remove "title: "
    output = output.replace(/title: /g, '')

    return output
}


async function getAllMarkdownFiles(dirPath) {
    const files = await fs.readdir(dirPath);
    let markdownFiles = [];

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            const subDirFiles = await getAllMarkdownFiles(filePath);
            markdownFiles = [...markdownFiles, ...subDirFiles];
        } else if (file.endsWith('.mdx')) {
            const content = await fs.readFile(filePath, 'utf-8');
            markdownFiles.push({
                path: filePath.replace(process.cwd(), '').replace('/app/_content', '').replace('.mdx', ''),
                content: removeMarkdown(content)
            });
        }
    }

    return markdownFiles;
}

async function cacheMarkdownFiles() {
    try {
        const contentDir = path.join(process.cwd(), 'app/_content');

        try {
            await fs.access(contentDir);
        } catch (error) {
            return;
        }

        const markdownFiles = await getAllMarkdownFiles(contentDir);

        const cache = {
            lastUpdated: new Date().toISOString(),
            files: markdownFiles
        };

        await fs.writeFile(
            path.join(process.cwd(), 'actions/cache.json'),
            JSON.stringify(cache, null, 2)
        );
    } catch (error) {
        console.error('Erro ao gerar cache:', error);
    }
}

// Executa a função principal
cacheMarkdownFiles();

module.exports = { getAllMarkdownFiles, cacheMarkdownFiles };
