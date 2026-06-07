import { cookies, headers } from 'next/headers';
import { blogApi } from '@/lib/api';
import { PostCard, PostCardCompact } from '@/components/blog/PostCard';
import { FeaturedPost } from '@/components/blog/FeaturedPost';
import { BlogSidebar } from '@/components/layout/BlogSidebar';
import { NewsletterCTA } from '@/components/blog/NewsletterCTA';
import { getVerticalConfig } from '@/lib/vertical-config';
import { t } from '@/lib/translations';
import type { Article } from '@/types/blog';

export const revalidate = 60;

const VERTICAL = 'realestate';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://realestate-blog.gmoplus.com';

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ language?: string }>;
}) {
  const cookieStore = await cookies();
  const headersList = await headers();
  const params = searchParams ? await searchParams : {};
  const language = params.language || headersList.get('x-language') || cookieStore.get('language')?.value || 'tr';
  const config = getVerticalConfig(VERTICAL);

  let posts: Article[] = [];
  let popular: Article[] = [];
  let hasMore = false;
  let nextCursor: string | null = null;

  try {
    const [postsData, popularData] = await Promise.all([
      blogApi.getArticles({ limit: 13, language }),
      blogApi.getPopular(4),
    ]);
    posts = postsData.items;
    hasMore = postsData.hasMore;
    nextCursor = postsData.nextCursor;
    popular = popularData;
  } catch {
    // Graceful fallback
  }

  const featured = posts[0] || null;
  const gridPosts = posts.slice(1, 10);
  const morePosts = posts.slice(10);

  const gridIds = new Set(gridPosts.map((p) => p.id));
  const alsoLike = popular.filter((p) => p.id !== featured?.id && !gridIds.has(p.id)).slice(0, 4);

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: config.name,
    description: `${config.tagline} — expert articles, industry insights, and practical tips.`,
    url: SITE_URL,
    publisher: { '@type': 'Organization', name: 'GMOPlus', url: 'https://gmoplus.com' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: config.mainSiteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: SITE_URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="pt-4 pb-2">
          <ol className="flex items-center gap-1.5 text-xs text-gray-400">
            <li>
              <a href={config.mainSiteUrl} className="hover:text-gray-600 transition-colors">{t(language, 'home')}</a>
            </li>
            <li aria-hidden="true">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </li>
            <li>
              <span className="text-gray-600 font-medium">{t(language, 'blog')}</span>
            </li>
          </ol>
        </nav>

        <header className="pt-4 pb-8 sm:pt-6 sm:pb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            {config.tagline}
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl leading-relaxed">
            {t(language, 'expertArticles')} {config.name}.
          </p>
        </header>

        {featured && (
          <section className="mb-10" aria-label="Featured article">
            <FeaturedPost post={featured} language={language} />
          </section>
        )}

        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
          <div>
            {gridPosts.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">{t(language, 'latestArticles')}</h2>
                  <div className="h-px flex-1 bg-gray-100 ml-4" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {gridPosts.map((post) => (
                    <PostCard key={post.id} post={post} language={language} />
                  ))}
                </div>
              </>
            ) : !featured ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg>
                </div>
                <p className="text-lg font-medium text-gray-400">{t(language, 'noArticlesYet')}</p>
                <p className="text-sm text-gray-400 mt-1">{t(language, 'checkBackSoon')}</p>
              </div>
            ) : null}

            {morePosts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {morePosts.map((post) => (
                  <PostCard key={post.id} post={post} language={language} />
                ))}
              </div>
            )}

            {hasMore && (
              <div className="mt-10 text-center">
                <a
                  href={`/?cursor=${nextCursor}`}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  {t(language, 'loadMore')}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </a>
              </div>
            )}
          </div>

          <aside className="hidden lg:block" aria-label="Sidebar">
            <div className="sticky top-20">
              <BlogSidebar vertical={VERTICAL} language={language} />
            </div>
          </aside>
        </div>

        <section className="my-14" aria-label="Newsletter subscription">
          <NewsletterCTA variant="inline" language={language} />
        </section>

        {alsoLike.length > 0 && (
          <section className="pb-14" aria-label="Recommended articles">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">{t(language, 'youMayAlsoLike')}</h2>
              <div className="h-px flex-1 bg-gray-100 ml-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {alsoLike.map((post) => (
                <PostCardCompact key={post.id} post={post} language={language} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}