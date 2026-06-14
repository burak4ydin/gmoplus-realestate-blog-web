import Link from 'next/link';
import type { Article } from '@/types/blog';
import { t, getLocale } from '@/lib/translations';

function formatDate(dateStr: string, locale?: string): string {
  return new Date(dateStr).toLocaleDateString(locale || 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function FeaturedPost({ post, language }: { post: Article; language?: string }) {
  const locale = getLocale(language ?? 'tr');

  return (
    <article className="relative rounded-2xl overflow-hidden group">
      <Link href={`/${post.slug}`} className="block">
        {/* Image */}
        <div className="aspect-[21/9] sm:aspect-[2.4/1] bg-gray-200">
          {post.coverImageUrl ? (
            <img
              src={post.coverImageUrl}
              alt={post.coverImageAlt || post.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-500 to-brand-800" />
          )}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 featured-overlay" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
          <div className="max-w-2xl">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-3">
              {post.isEditorPick && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 bg-amber-500/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-amber-400/30">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  {t(language, 'editorsPick')}
                </span>
              )}
              {post.category && (
                <span className="text-xs font-medium text-white/90 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                  {post.category.name}
                </span>
              )}
              {!!post.readingTimeMin && (
                <span className="text-xs text-white/70">{post.readingTimeMin} {t(language, 'minRead')}</span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight group-hover:text-brand-200 transition-colors">
              {post.title}
            </h2>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-sm sm:text-base text-gray-300 line-clamp-2 mb-4 max-w-xl">
                {post.excerpt}
              </p>
            )}

            {/* Author + date */}
            <div className="flex items-center gap-3 text-sm text-white/70">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.avatarUrl && (
                    <img
                      src={post.author.avatarUrl}
                      alt={post.author.displayName}
                      className="w-7 h-7 rounded-full border border-white/30"
                    />
                  )}
                  <span className="font-medium text-white/90">{post.author.displayName}</span>
                </div>
              )}
              {post.publishedAt && (
                <>
                  <span className="text-white/40">·</span>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
