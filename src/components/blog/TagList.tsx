import Link from 'next/link';
import type { ArticleTag } from '@/types/blog';

export function TagList({ tags }: { tags: ArticleTag[] }) {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={`/tag/${tag.slug}`}
          className="text-xs px-3 py-1 rounded-full hover:opacity-80 transition-colors"
          style={{
            backgroundColor: tag.color ? `${tag.color}15` : '#F3F4F6',
            color: tag.color || '#4B5563',
          }}
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  );
}
