import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

type NavItem = {
    slug: string;
    title: string;
    children?: NavItem[];
};



export async function GET() {
    const appBaseDir = path.join(process.cwd(), 'app', '_content', 'learn');
    const buildBaseDir = path.join(process.cwd(), 'app', '_content', 'build');

    const readMetaJson = async (dir: string): Promise<NavItem[]> => {
        try {
            console.log('Processing directory:', dir);

            const metaPath = path.join(dir, '_meta.json');

            try {
                await fs.access(metaPath);
            } catch {
                console.log(`No _meta.json found in ${dir}`);
                return [];
            }

            const metaContent = await fs.readFile(metaPath, 'utf-8');
            console.log('Meta content:', metaContent);

            const meta = JSON.parse(metaContent);
            const items: NavItem[] = [];

            for (const [slug, title] of Object.entries(meta)) {
                const itemPath = path.join(dir, slug);
                const navItem: NavItem = {
                    slug,
                    title: title as string,
                };

                // Try to check if it's a directory, but don't fail if it isn't
                try {
                    const stats = await fs.stat(itemPath);
                    if (stats.isDirectory()) {
                        const children = await readMetaJson(itemPath);
                        if (children.length > 0) {
                            navItem.children = children;
                        }
                    }
                } catch {
                    // If path doesn't exist, assume it's a file
                    console.log(`${itemPath} is not a directory, treating as a file`);
                }

                items.push(navItem);
            }

            return items;
        } catch (error) {
            console.error('Error reading meta file:', error);
            console.error('Directory attempted:', dir);
            return [];
        }
    };

    try {
        let appNavigation: NavItem[] = [];
        let buildNavigation: NavItem[] = [];

        try {
            await fs.access(appBaseDir);
            console.log('App directory exists:', appBaseDir);
            appNavigation = await readMetaJson(appBaseDir);
        } catch {
            console.log('App directory not found:', appBaseDir);
        }

        try {
            await fs.access(buildBaseDir);
            console.log('Build directory exists:', buildBaseDir);
            buildNavigation = await readMetaJson(buildBaseDir);
        } catch {
            console.log('Build directory not found:', buildBaseDir);
        }

        const navigationStructure = {
            learn: appNavigation,
            build: buildNavigation
        };

        console.log('Final navigation structure:', JSON.stringify(navigationStructure));
        return NextResponse.json(navigationStructure);
    } catch (error) {
        console.error('Error processing navigation:', error);
        return NextResponse.json({ error: 'Failed to load navigation' }, { status: 500 });
    }
} 