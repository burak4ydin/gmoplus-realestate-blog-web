import Link from 'next/link';
import { blogApi } from '@/lib/api';
import { t, getLocale } from '@/lib/translations';
import type { BlogCategory, Article } from '@/types/blog';
import { NewsletterCTA } from '../blog/NewsletterCTA';
import { SidebarSearch } from '../blog/SidebarSearch';

const VERTICAL_COLORS: Record<string, string> = {
  auto: '#3B82F6',
  realestate: '#8B5CF6',
  store: '#10B981',
  jobs: '#F59E0B',
  booking: '#06B6D4',
  academy: '#EC4899',
  franchise: '#EF4444',
  online: '#6366F1',
  social: '#14B8A6',
  blog: '#3B82F6',
};

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="font-semibold text-gray-900 mb-4 text-xs uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

export async function BlogSidebar({ vertical, language }: { vertical?: string; language?: string } = {}) {
  let categories: BlogCategory[] = [];
  let popular: Article[] = [];

  try {
    [categories, popular] = await Promise.all([
      blogApi.getCategories(),
      blogApi.getPopular(5),
    ]);
  } catch {
    // Graceful degradation if API is down
  }

  const locale = getLocale(language);

  return (
    <aside className="space-y-6">
      {/* Search */}
      <SidebarSearch placeholder={t(language, 'searchArticles')} />

      {/* Popular Posts */}
      {popular.length > 0 && (
        <SidebarSection title={t(language, 'trending')}>
          <ul className="space-y-4">
            {popular.map((post, i) => (
              <li key={post.id}>
                <Link href={`/${post.slug}`} className="group flex gap-3">
                  <span className="text-2xl font-bold text-gray-200 group-hover:text-brand-300 transition-colors shrink-0 w-8 text-right">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug block">
                      {post.title}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      {post.readingTimeMin && (
                        <span className="text-[11px] text-gray-400">{post.readingTimeMin} {t(language, 'minRead')}</span>
                      )}
                      <span className="text-[11px] text-gray-400">
                        {post.readCount.toLocaleString(locale)} {t(language, 'views')}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </SidebarSection>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <SidebarSection title={t(language, 'categories')}>
          <ul className="space-y-1.5">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="flex items-center justify-between text-sm text-gray-600 hover:text-brand-600 transition-colors py-1.5 px-2 -mx-2 rounded-lg hover:bg-gray-50"
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: (cat as any).color || (cat.vertical ? VERTICAL_COLORS[cat.vertical] : undefined) || '#3b82f6' }}
                    />
                    {cat.name}
                  </span>
                  {cat._count?.articles !== undefined && (
                    <span className="text-xs text-gray-300 font-medium">{cat._count.articles}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </SidebarSection>
      )}

      {/* Newsletter */}
      <NewsletterCTA language={language} />
    </aside>
  );
}