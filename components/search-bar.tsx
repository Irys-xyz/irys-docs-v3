"use client"

import * as React from "react"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { search } from "@/actions/search"
import Link from "next/link"
import { Search } from "lucide-react"

interface SearchResult {
    title: string;
    path: string;
    preview: string;
}

export function SearchBar() {
    const [open, setOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [results, setResults] = React.useState<SearchResult[]>([])

    // Add ref for CommandList
    const commandListRef = React.useRef<HTMLDivElement>(null)

    // Add useEffect to reset scroll position
    React.useEffect(() => {
        if (commandListRef.current) {
            commandListRef.current.scrollTop = 0
        }
    }, [results])

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const handleSearch = async (value: string) => {
        try {
            const results = await search(value);
            console.log("Search results structure:", JSON.stringify(results, null, 2));
            console.log("Number of results:", results.length);
            setResults(results as unknown as SearchResult[]);
            console.log("Updated results state:", results);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        }
    };

    console.log("Render - current results:", results);

    return (
        <>
            <Button
                className="relative w-full justify-start text-sm !bg-grey4 sm:pr-12 md:w-40 lg:w-64 text-grey2 items-center"
                onClick={() => setOpen(true)}
            >
                <Search className="mr-2 h-4 w-4" />
                Search...
                <kbd className="pointer-events-none absolute right-1.5  hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex mr-2">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <Command shouldFilter={false}>
                    <CommandInput placeholder="Type a search..."
                        value={searchQuery}
                        onValueChange={(value) => {
                            setSearchQuery(value);
                            if (value.trim()) {
                                handleSearch(value);
                            } else {
                                setResults([]);
                            }
                        }} />
                    <CommandList ref={commandListRef}>
                        {results.length === 0 ? (
                            <>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Suggestions">
                                    <Link href="/learn/what/what-a-datachain-is">
                                        <CommandItem className="cursor-pointer text-black">What a Datachain Is</CommandItem>
                                    </Link>
                                    <Link href="/learn/what/why-irys-exists">
                                        <CommandItem className="cursor-pointer text-black">Why Irys Exists</CommandItem>
                                    </Link>
                                    <Link href="/learn/protocol-overview/programmable-data">
                                        <CommandItem className="cursor-pointer text-black">Programmable Data</CommandItem>
                                    </Link>
                                </CommandGroup>
                            </>
                        ) : (
                            <CommandGroup heading="Search Results">
                                {results.map((result: SearchResult) => (

                                    <Link href={result.path} key={result.path}>
                                        <CommandItem

                                            value={result.path}
                                            className="cursor-pointer "
                                            onSelect={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <div className="flex flex-col">
                                                <div className="text-sm font-bold text-grey5 flex items-center">{result.title}</div>
                                                <span className="text-sm text-grey4">{result.path}</span>
                                                <span
                                                    className="text-xs text-grey4"
                                                    dangerouslySetInnerHTML={{ __html: result.preview }}
                                                />
                                            </div>
                                        </CommandItem>
                                    </Link>

                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </CommandDialog >
        </>
    )
}
