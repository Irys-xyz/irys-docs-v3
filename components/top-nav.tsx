"use client"

import { Logo } from "@/components/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SearchBar } from "./search-bar";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import NavigationAccordion, { NavigationStructure } from "@/components/navigation-accordion";

const NavButton = (
  { text, href, primary = false }: {
    text: string;
    href: string;
    primary?: boolean;
  },
) => {
  return (
    <Link
      href={href}
      target="_blank"
      className={cn(
        "text-sm px-4 py-2 rounded-md transition-all duration-200",
        primary
          ? "!text-black bg-primary-green hover:bg-primary-green/80 hover:!text-black"
          : "text-white bg-grey4 hover:bg-primary-green hover:!text-black",
      )}
    >
      {text}
    </Link>
  );
};

const MenuButton = ({ navigation }: { navigation: NavigationStructure }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Add effect to control body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <div className="flex lg:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <Menu />
      </div>
      <div className={cn(
        "fixed top-0 left-0 w-full bg-grey4 h-screen border-b overflow-hidden border-solid border-grey4 flex justify-between items-center z-10 flex-col gap-4",
        isOpen ? "block" : "hidden"
      )}>
        <div className="fixed top-5 right-5 z-20">
          <div
            className="cursor-pointer text-grey2 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
        <div className="relative w-full h-full overflow-y-auto scrollbar-thin scrollbar-track-grey4 scrollbar-thumb-grey5">
          <NavigationAccordion initialNavigation={navigation} />
        </div>
      </div>
    </>
  );
};

const TopNav = ({ navigation }: { navigation: NavigationStructure }) => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-grey5 h-16 border-b border-solid border-grey4 flex justify-between items-center px-4 z-10">
        <Link href="/">
          <Logo />
        </Link>

        <div className="w-full px-6 lg:px-0 md:w-auto">
          <SearchBar />
        </div>

        <div className="gap-4 hidden lg:flex">
          <NavButton text="Explorer" href="https://explorer.irys.xyz" />
          <NavButton text="Github" href="https://github.com/Irys-xyz" />
          {/* <div className="h-4 w-[1px] bg-grey4 my-auto"></div>
          <NavButton text="Ask Irys" href="/ask-irys" primary /> */}
        </div>
        <div className="flex lg:hidden">
          <MenuButton navigation={navigation} />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
