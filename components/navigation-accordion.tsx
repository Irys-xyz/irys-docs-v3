'use client';

import { usePathname } from "next/navigation";
import { useEffect, useCallback, useRef } from "react";
import Link from 'next/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Paragraph from "@/components/typing/paragraph";
import { Title } from "./typing/title";
import {
    IconBento,
    IconBonsai,
    IconCloudNimbus,
    IconFlower,
    IconGraph, IconLantern,
    IconManeki,
    IconNoodles, IconOniMask,
    IconOnigiri,
    IconPaperCrane,
    IconProof,
    IconScale,
    IconSensu, IconShield,
    IconShuriken,
    IconSpiritGate,
    IconSwirl, IconTriangleShapes,
    IconVortex
} from "@/components/svg/icons";
import { useNavigation } from "@/components/providers/navigation-provider";

type NavItem = {
    slug: string;
    title: string | { display: string; };
    children?: NavItem[];
};

export type NavigationStructure = {
    learn: NavItem[];
    build: NavItem[];
};

export const iconMapping = {
    "what-irys-is": IconManeki,        // Lucky cat - matches ICON_FORTUNE intent
    "what-irys-isnt": IconOniMask,     // Demon mask - matches ICON_PROXY intent
    "what-a-datachain-is": IconGraph,   // Matches specification
    "why-irys-exists": IconSwirl,       // Spiral - matches ICON_UNITY intent
    "how-irys-solves-these-problems": IconProof,  // Document check - matches ICON_VALIDATE intent
    "why-programmable-data": IconBento, // Stacked blocks - matches ICON_PACKAGE intent
    "programmable-data": IconScale,     // Matches specification
    "why-verifiability": IconShield,    // Protection - matches ICON_VERIFY intent
    "why-irysvm": IconVortex,          // Flow shape - matches ICON_FLOW intent
    "running-a-node": IconCloudNimbus,  // Cloud - matches ICON_FLOAT intent
    "matrix-packaging-overview": IconBonsai, // Plant - matches ICON_REFINE intent
    "efficient-sampling-overview": IconShuriken, // Matches specification
    "bundling-transactions": IconTriangleShapes, // Triangles - matches ICON_CONNECTION intent
    "irys-gateway": IconSpiritGate,    // Gate - matches ICON_PORTAL intent
    "becoming-a-miner-on-irys": IconOnigiri, // Using gate icon as placeholder - should ideally be tent/mining camp
    "partitions-overview": IconSensu,   // Fan - matches ICON_DISTRIBUTE intent
    "ledgers-overview": IconLantern,    // Matches specification
    "transactions-overview": IconNoodles, // Container - somewhat matches ICON_INSTANT intent
    "irys-consensus-overview": IconVortex, // Matches specification
    "irys-in-the-browser": IconNoodles, // Matches specification
    "quickstart": IconSensu,           // Fan symbol - matches ICON_DISTRIBUTE
    "Mainnet / Devnet": IconProof,    // Using shuriken as placeholder for ICON_LOCATE
    "features": IconBento,             // Stacked blocks - matches ICON_PACKAGE
    "sdk": IconSwirl,                  // Using swirl as placeholder for ICON_STREAM
    "storage-cli": IconOnigiri,        // Using onigiri as placeholder for ICON_STORE
    "rest-api": IconPaperCrane,        // Origami bird - matches ICON_DELIVER
    "guides": IconLantern,             // Lantern - matches ICON_ILLUMINATE
    "downloading": IconVortex,         // Using vortex for flowing data - matches ICON_FLOW
    "graphql": IconGraph,             // Graph - matches ICON_GRAPH
    "explorer": IconFlower,            // Flower - matches ICON_GROWTH
    "troubleshooting": IconShuriken,   // Throwing star - matches ICON_SHURIKEN
    "migrating": IconCloudNimbus,      // Cloud - matches ICON_FLOAT
    "introduction": IconSwirl,         // Spiral - matches ICON_UNITY
    "connecting-to-testnet": IconTriangleShapes, // Triangles - matches ICON_CONNECTION
    "@irys/js": IconVortex,         // Spiral - matches ICON_VORTEX
};

export default function NavigationAccordion({
    initialNavigation
}: {
    initialNavigation: NavigationStructure;
}) {
    const pathname = usePathname();
    const { activeAccordionItems, setActiveAccordionItems, scrollContainerRef, scrollPosition, setScrollPosition } = useNavigation();

    const isLinkActive = (path: string) => {
        const pathWithoutLeadingSlash = pathname.startsWith('/') ? pathname.slice(1) : pathname;
        const [, ...rest] = pathWithoutLeadingSlash.split('/');
        const pathWithoutSection = rest.join('/');
        return pathWithoutSection === path;
    };

    const getIcon = (slug: string, title?: string) => {
        const Icon = iconMapping[slug as keyof typeof iconMapping] ||
            (title && iconMapping[title as keyof typeof iconMapping]);
        return Icon ? <Icon className="w-6 h-6" /> : null;
    };

    // Track scroll position with throttling
    const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
        const scrollTop = event.currentTarget.scrollTop;

        // Throttle scroll position updates
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
            setScrollPosition(scrollTop);
        }, 100);
    }, [setScrollPosition]);

    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    // Restore scroll position after accordion items are set and DOM is updated
    useEffect(() => {
        if (scrollContainerRef.current && scrollPosition > 0) {
            // Use a small delay to ensure accordion animations are complete
            // const timer = setTimeout(() => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = scrollPosition;
            }
            // }, 0);

            // return () => clearTimeout(timer);
        }
    }, [activeAccordionItems, scrollPosition, scrollContainerRef]);

    return (
        <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="overflow-y-auto h-full w-full !scrollbar-thin scrollbar-track-grey4 scrollbar-thumb-grey5 pb-8"
        >
            <Accordion
                type="multiple"
                className="text-grey2"
                value={activeAccordionItems}
                onValueChange={setActiveAccordionItems}
            >
                {Object.entries(initialNavigation).map(([section, items], sectionIndex) => (
                    <div key={section}>
                        {sectionIndex === 0 && (
                            <div className="flex flex-col h-full border-r border-grey4 sticky top-0 bg-grey4 z-10">
                                <div className="p-5 w-full border-b border-grey5 flex-shrink-0">
                                    <Title className="!text-[32px] !leading-none">
                                        Learn
                                    </Title>
                                </div>
                            </div>
                        )}
                        {sectionIndex === 1 && (
                            <div className="flex flex-col h-full border-r border-grey4 sticky top-0 bg-grey4 z-10">
                                <div className="p-5 w-full border-b border-grey5 flex-shrink-0">
                                    <Title className="!text-[32px] !leading-none">
                                        Build
                                    </Title>
                                </div>

                            </div>
                        )}
                        {items.map((item) => {
                            if (typeof item.title === 'object' && item.title.display === 'hidden') return null;

                            const itemPath = `${item.slug}`;
                            const isActive = isLinkActive(itemPath);

                            return (
                                <AccordionItem
                                    key={itemPath}
                                    value={itemPath}
                                    className="border-b border-grey5 border-solid"
                                >
                                    <AccordionTrigger className={`pl-4 pr-3 w-full h-12 ${isActive ? 'text-white' : ''}`}>
                                        {getIcon(item.slug, typeof item.title === 'string' ? item.title : undefined) && (
                                            <div className="mr-2">
                                                {getIcon(item.slug, typeof item.title === 'string' ? item.title : undefined)}
                                            </div>
                                        )}
                                        <Paragraph size="caps" className="text-start">
                                            {typeof item.title === 'string' ? item.title : ''}
                                        </Paragraph>
                                    </AccordionTrigger>
                                    {item && item?.children && item?.children?.length > 0 && (
                                        <AccordionContent className="bg-[#32363D] w-full p-0 border-t border-grey5 border-solid">
                                            {item.children.map((child) => {
                                                if (typeof child.title === 'object' && child.title.display === 'hidden') return null;

                                                const childPath = `${itemPath}/${child.slug}`;
                                                const isChildActive = isLinkActive(childPath);

                                                if (child && child?.children && child?.children?.length > 0) {
                                                    return (
                                                        <AccordionItem
                                                            key={childPath}
                                                            value={childPath}
                                                            className="border-b border-grey5 border-solid"
                                                        >
                                                            <AccordionTrigger className={`pl-4 pr-3 h-12 w-full ${isChildActive ? 'text-white' : ''}`}>
                                                                <div className="flex items-center">
                                                                    {getIcon(child.slug, typeof child.title === 'string' ? child.title : undefined) && (
                                                                        <div className="mr-2">
                                                                            {getIcon(child.slug, typeof child.title === 'string' ? child.title : undefined)}
                                                                        </div>
                                                                    )}
                                                                    <Paragraph size="small" className="text-start">
                                                                        {typeof child.title === 'string' ? child.title : ''}
                                                                    </Paragraph>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent className="bg-[#32363D] w-full p-0">
                                                                {child?.children?.map((grandChild) => {
                                                                    const grandChildPath = `${childPath}/${grandChild.slug}`;
                                                                    const isGreatGrandChildActive = isLinkActive(grandChildPath);

                                                                    if (grandChild && grandChild?.children && grandChild?.children?.length > 0) {
                                                                        return (
                                                                            <AccordionItem
                                                                                key={grandChildPath}
                                                                                value={grandChildPath}
                                                                                className="border-b border-grey5 border-solid"
                                                                            >
                                                                                <AccordionTrigger className={`bg-[#1A1C20]/40 pl-4 pr-3 w-full ${isGreatGrandChildActive ? 'text-white' : ''}`}>
                                                                                    <div className="flex items-center">
                                                                                        {getIcon(grandChild.slug, typeof grandChild.title === 'string' ? grandChild.title : undefined) && (
                                                                                            <div className="mr-2">
                                                                                                {getIcon(grandChild.slug, typeof grandChild.title === 'string' ? grandChild.title : undefined)}
                                                                                            </div>
                                                                                        )}
                                                                                        <Paragraph size="small" className="text-start">
                                                                                            {typeof grandChild.title === 'string' ? grandChild.title : ''}
                                                                                        </Paragraph>
                                                                                    </div>
                                                                                </AccordionTrigger>
                                                                                <AccordionContent className=" p-0">
                                                                                    {grandChild?.children?.map((greatGrandChild) => {
                                                                                        const greatGrandChildPath = `${grandChildPath}/${greatGrandChild.slug}`;
                                                                                        const isGreatGreatGrandChildActive = isLinkActive(greatGrandChildPath);

                                                                                        return (
                                                                                            <Link
                                                                                                key={greatGrandChildPath}
                                                                                                href={`/${section}/${greatGrandChildPath}`}
                                                                                                className={`bg-[#1A1C20]/80 pl-4 pr-3 h-12 flex items-center w-full hover:text-white border-b last:border-b-0 border-grey5 border-solid hover:bg-grey5 first:border-t ${isGreatGreatGrandChildActive ? 'text-white !bg-grey5' : ''}`}
                                                                                            >
                                                                                                <Paragraph className="text-start" size="small">
                                                                                                    {typeof greatGrandChild.title === 'string' ? greatGrandChild.title : ''}
                                                                                                </Paragraph>
                                                                                            </Link>
                                                                                        );
                                                                                    })}
                                                                                </AccordionContent>
                                                                            </AccordionItem>
                                                                        );
                                                                    }

                                                                    return (
                                                                        <Link
                                                                            key={grandChildPath}
                                                                            href={`/${section}/${grandChildPath}`}
                                                                            className={`bg-[#1A1C20]/40 pl-4 pr-3 h-12 flex items-center w-full hover:text-white border-b last:border-b-0 border-grey5 border-solid hover:bg-grey5 first:border-t ${isGreatGrandChildActive ? 'text-white !bg-grey5' : ''}`}
                                                                        >
                                                                            <Paragraph className="text-start" size="small">
                                                                                {typeof grandChild.title === 'string' ? grandChild.title : ''}
                                                                            </Paragraph>
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    );
                                                }

                                                return (
                                                    <Link
                                                        key={childPath}
                                                        href={`/${section}/${childPath}`}
                                                        className={`pl-4 pr-3 h-12 flex items-center w-full hover:text-white border-b border-grey5 border-solid hover:bg-grey5 ${isChildActive ? 'text-white bg-grey5' : ''
                                                            }`}
                                                    >
                                                        {getIcon(child.slug, typeof child.title === 'string' ? child.title : undefined) && (
                                                            <div className="mr-2">
                                                                {getIcon(child.slug, typeof child.title === 'string' ? child.title : undefined)}
                                                            </div>
                                                        )}
                                                        <Paragraph className="text-start" size="small">
                                                            {typeof child.title === 'string' ? child.title : ''}
                                                        </Paragraph>
                                                    </Link>
                                                );
                                            })}
                                        </AccordionContent>
                                    )}
                                </AccordionItem>
                            );
                        })}

                    </div>
                ))}
            </Accordion>
        </div>
    );
} 