import type { MDXComponents } from 'mdx/types'
import { Table } from './components/table'
import { Code } from './components/code'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        table: Table,
        td: Table.Td,
        th: Table.Th,
        tr: Table.Tr,
        code: Code,
        ...components
    };

}

export function getMDXFrontmatter(source: string) {
    const match = source.match(/---\r?\n([\s\S]+?)\r?\n---/)
    if (!match) return {}

    const frontmatter = match[1]
    const data: Record<string, string> = {}

    frontmatter.split('\n').forEach(line => {
        const [key, ...valueArr] = line.split(':')
        if (key && valueArr.length) {
            data[key.trim()] = valueArr.join(':').trim()
        }
    })

    return data
}