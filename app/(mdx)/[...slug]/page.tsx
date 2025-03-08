import { Metadata } from "next";
import PostLayout from "./post-layout";
import "../../syntax.css"
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }: {
    params: Promise<{ slug: string[] }>
}): Promise<Metadata> {

    const allParams = await params;

    const slug = allParams.slug.join('/');

    let heading;

    console.log(slug);

    const content = await import(`../../_content/${slug}.mdx`);

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
};

export default async function Page({ params }: {
    params: Promise<{ slug: string[] }>
}) {
    try {
        const allParams = await params;

        const slug = allParams.slug.join('/');
        console.log(slug);
        const content = await import(`../../_content/${slug}.mdx`);

        return (
            <PostLayout frontmatter={content.frontmatter}>
                <content.default />
            </PostLayout>
        );
    } catch {
        return notFound();
    }


}