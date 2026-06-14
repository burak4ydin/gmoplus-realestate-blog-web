import Link from 'next/link';
import type { Article } from '@/types/blog';
import { CategoryBadge } from './CategoryBadge';
import { TagList } from './TagList';
import { t, getLocale } from '@/lib/translations';

export function PostHeader({ post, language }: { post: Article; language?: string }) {
  const locale = getLocale(language ?? 'tr');
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <header className="mb-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex flex-wrap items-center gap-1">
        <Link href="/" className="hover:text-brand-600">{t(language ?? 'tr', 'home')}</Link>
        <span>/</span>
        {post.category && (
          <>
            <Link href={`/category/${post.category.slug}`} className="hover:text-brand-600">
              {post.category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-400 truncate">{post.title}</span>
      </nav>

      {/* Category + Read time + Difficulty */}
      <div className="flex items-center gap-3 mb-4">
        {post.category && <CategoryBadge category={post.category} size="md" />}
        {post.readingTimeMin && (
          <span className="text-sm text-gray-500">{post.readingTimeMin} {t(language ?? 'tr', 'minRead')}</span>
        )}
        {post.difficulty && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
            {post.difficulty}
          </span>
        )}
        <span className="text-sm text-gray-500">{(post.readCount ?? 0).toLocaleString(locale)} {t(language ?? 'tr', 'views')}</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
        {post.title}
      </h1>

      {/* Subtitle */}
      {post.subtitle && (
        <p className="text-xl text-gray-500 mb-4">{post.subtitle}</p>
      )}

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>
      )}

      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        {post.isEditorPick && (
          <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full">{t(language ?? 'tr', 'editorsPick')}</span>
        )}
        {post.isPremium && (
          <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2 py-1 rounded-full">Premium</span>
        )}
        {post.isSponsored && (
          <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-full">
            Sponsored{post.sponsorName ? ` by ${post.sponsorName}` : ''}
          </span>
        )}
      </div>

      {/* Author + Date */}
      <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
        {post.author && (
          <Link href={`/author/${post.author.id}`} className="flex items-center gap-3">
            {post.author.avatarUrl && (
              <img
                src={post.author.avatarUrl}
                alt={post.author.displayName}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <div className="text-sm font-semibold text-gray-900 hover:text-brand-600">
                {post.author.displayName}
              </div>
              {date && (
                <time dateTime={post.publishedAt!} className="text-xs text-gray-500">
                  {date}
                </time>
              )}
            </div>
          </Link>
        )}
      </div>

      {/* Cover image */}
      {post.coverImageUrl && (
        <div className="mt-6 rounded-xl overflow-hidden">
          <img
            src={post.coverImageUrl}
            alt={post.coverImageAlt || post.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mt-4">
          <TagList tags={post.tags} />
        </div>
      )}
    </header>
  );
}
