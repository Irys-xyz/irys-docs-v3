import { Logo } from "@/components/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

const TopNav = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-grey5 h-16 border-b border-solid border-grey4 flex justify-between items-center px-4 z-10">
        <Logo />
        <div className="flex gap-4">
          <NavButton text="Explorer" href="/learn" />
          {/* <NavButton text="Learn" href="/learn" /> */}
          {/* <NavButton text="Build" href="/build" /> */}
          <NavButton text="Github" href="/github" />
          <div className="h-4 w-[1px] bg-grey4 my-auto"></div>
          <NavButton text="Ask Irys" href="/ask-irys" primary />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
