import TopNav from "@/components/top-nav";
import NavigationAccordion from "@/components/navigation-accordion";

// Add this at the top level of the file, outside the component
async function getNavigation() {
  const http = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'https' : 'http';
  const response = await fetch(`${http}://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/navigation`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  return response.json();
}

export default async function Home({ children }: { children: React.ReactNode, frontmatter: Record<string, string> }) {
  const navigation = await getNavigation();

  return (
    <div>
      <TopNav />
      <div className="flex mt-16">
        <aside className="h-[calc(100vh-64px)] bg-grey4 w-[298px] fixed top-16">
          <div className="flex flex-col h-full border-r border-grey4">

            <div className="overflow-y-auto flex-grow !scrollbar-thin scrollbar-track-grey4 scrollbar-thumb-grey5 pb-8">
              <NavigationAccordion initialNavigation={navigation} />
            </div>
          </div>
        </aside>
        <main className={`w-full ml-[298px] relative ${false ? 'mr-[298px]' : ''}`}>
          <div className="flex items-start justify-center">
            <div className="py-12 w-full border-b border-grey5 max-w-2xl mx-auto ">
              <article className="prose-li:text-grey2/90 prose-strong:text-white prose-strong:font-bold prose prose-headings:!leading-none prose-headings:font-semibold prose-headings:text-white prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white prose-p:text-grey2 prose-p:!text-base prose-p:!leading-loose font-gtPressura prose-headings:font-skrappaNarrow prose-headings:tracking-wider prose-headings:border-b prose-headings:pb-2 prose-headings:border-grey4/40 prose-headings:uppercase max-w-full">{children}</article>
            </div>
          </div>
        </main>
      </div >
    </div >
  );
}
