import Link from 'next/link';
import type { Article } from '@/types/blog';
import { CategoryBadge } from './CategoryBadge';
import { t, getLocale } from '@/lib/translations';

function formatDate(dateStr: string, locale?: string): string {
  return new Date(dateStr).toLocaleDateString(locale || 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function PostCard({ post, language }: { post: Article; language?: string }) {
  const locale = getLocale(language ?? 'tr');

  return (
    <article className="group bg-white rounded-xl border border-gray-100 overflow-hidden card-hover">
      {/* Image */}
      {post.coverImageUrl && (
        <Link href={`/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-gray-100">
          <img
            src={post.coverImageUrl}
            alt={post.coverImageAlt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
      )}

      <div className="p-5">
        {/* Category + Reading time */}
        <div className="flex items-center gap-2 mb-3">
          {post.category && <CategoryBadge category={post.category} />}
          {!!post.readingTimeMin && (
            <span className="text-xs text-gray-400">{post.readingTimeMin} {t(language ?? 'tr', 'minRead')}</span>
          )}
          {post.isEditorPick && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              {t(language ?? 'tr', 'pick')}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/${post.slug}`}>
          <h2 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2 leading-snug">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
        )}

        {/* Author + Date footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-2 min-w-0">
            {post.author && (
              <Link
                href={`/author/${post.author.id}`}
                className="flex items-center gap-2 hover:text-brand-600 text-sm text-gray-500 min-w-0"
              >
                {post.author.avatarUrl ? (
                  <img
                    src={post.author.avatarUrl}
                    alt={post.author.displayName}
                    className="w-6 h-6 rounded-full shrink-0"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-semibold shrink-0">
                    {post.author.displayName?.charAt(0) || '?'}
                  </div>
                )}
                <span className="truncate">{post.author.displayName}</span>
              </Link>
            )}
          </div>
          {post.publishedAt && (
            <time dateTime={post.publishedAt} className="text-xs text-gray-400 shrink-0">
              {formatDate(post.publishedAt, locale)}
            </time>
          )}
        </div>
      </div>
    </article>
  );
}

/** Compact horizontal card for "You May Also Like" section */
export function PostCardCompact({ post, language }: { post: Article; language?: string }) {
  const locale = getLocale(language ?? 'tr');

  return (
    <article className="group flex gap-4 card-hover rounded-xl bg-white border border-gray-100 p-3">
      {post.coverImageUrl && (
        <Link href={`/${post.slug}`} className="block w-28 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
          <img
            src={post.coverImageUrl}
            alt={post.coverImageAlt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
      )}
      <div className="min-w-0 flex-1 flex flex-col justify-center">
        {post.category && (
          <span className="text-[10px] font-medium text-brand-600 uppercase tracking-wider mb-1">
            {post.category.name}
          </span>
        )}
        <Link href={`/${post.slug}`}>
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
        </Link>
        {post.publishedAt && (
          <time dateTime={post.publishedAt} className="text-[11px] text-gray-400 mt-1">
            {formatDate(post.publishedAt, locale)}
          </time>
        )}
      </div>
    </article>
  );
}
