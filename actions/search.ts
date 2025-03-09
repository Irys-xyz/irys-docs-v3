'use server'

import FlexSearch from 'flexsearch'
import { findSnippetsAroundKeywords } from '@/lib/snippets-around-keywords'
import cache from './cache.json'

const index = new FlexSearch.Index({
    tokenize: 'forward',
    resolution: 9,
})

cache.files.forEach((doc, id) => {
    const content = `${doc.path} ${doc.content}`
    index.add(id, content)
})

function unslugify(text: string): string {
    return text
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export async function search(query: string) {
    if (!query) {
        throw new Error('Query parameter is required')
    }

    const results = index.search(query, { limit: 10 })

    return results.map((id: any) => {
        const path = cache.files[id].path;
        const lastSegment = path.split('/').pop() || '';
        const title = unslugify(lastSegment.replace(/\.[^/.]+$/, '')); // Remove file extension

        return {
            path,
            title,
            preview: findSnippetsAroundKeywords(cache.files[id].content, query),
        };
    });
}
