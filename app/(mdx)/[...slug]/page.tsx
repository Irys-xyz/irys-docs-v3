import { Metadata } from "next";
import PostLayout from "./post-layout";
import "../../syntax.css"
import { notFound } from "next/navigation";
import React from "react";
import path from "path";
import { readdir } from "fs/promises";

export async function generateStaticParams() {
    async function getAllMdxFiles(dir: string): Promise<string[]> {
        const entries = await readdir(dir, { withFileTypes: true });
        const files = await Promise.all(
            entries.map(async (entry) => {
                const fullPath = path.join(dir, entry.name);
                if (entry.isDirectory()) {
                    return getAllMdxFiles(fullPath);
                } else if (entry.name.endsWith('.mdx')) {
                    return [fullPath];
                }
                return [];
            })
        );
        return files.flat();
    }

    const contentDir = path.join(process.cwd(), 'app/_content');
    const allFiles = await getAllMdxFiles(contentDir);

    const slugs = allFiles.map(file => ([
        file
            .replace(contentDir + path.sep, '')
            .replace('.mdx', '')
            .split(path.sep).join('/')
    ])).flat();

    console.log("slugs", slugs);

    return slugs.map(slug => ({
        slug: slug.split('/')
    }));
}


export async function generateMetadata({ params }: {
    params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
    try {
        let { slug } = await params;

        if (typeof slug === 'string') {
            slug = slug.split('/');
        }

        slug = slug.join('/');

        if (!slug) {
            return {
                title: 'Irys | Learn more about Irys'
            };
        }

        const content = await import(`../../_content/${slug}.mdx`).catch(() => null);

        if (!content) {
            return {
                title: 'Irys | Learn more about Irys'
            };
        }

        let heading;

        if (!content.frontmatter || !content.frontmatter?.title) {
            const children = React.Children.toArray(content.default().props.children);
            const firstH1 = children.find((child: any) => child.type === "h1");
            heading = (firstH1 as any)?.props?.children?.props?.children;

            if (typeof heading === 'object') {
                heading = heading.props.children;
            }
        } else {
            heading = content.frontmatter.title;
        }

        return {
            title: `Irys | ${heading || "Learn more about Irys"}`
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Irys | Learn more about Irys'
        };
    }
}

export default async function Page({ params }: {
    params: Promise<{ slug: string[] }>
}) {
    try {
        let { slug } = await params;

        console.log("slug", slug);

        if (typeof slug === 'string') {
            slug = slug.split('/');
        }

        slug = slug.join('/');

        if (!slug) {
            return notFound();
        }

        const content = await import(`../../_content/${slug}.mdx`).catch(() => null);

        if (!content) {
            return notFound();
        }

        return (
            <PostLayout frontmatter={content.frontmatter}>
                <content.default />
            </PostLayout>
        );
    } catch (error) {
        console.error('Error rendering page:', error);
        return notFound();
    }
}