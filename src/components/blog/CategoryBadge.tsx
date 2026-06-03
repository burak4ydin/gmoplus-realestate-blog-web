import Link from 'next/link';

interface CategoryBadgeProps {
  category: { name: string; slug: string; icon?: string | null };
  size?: 'sm' | 'md';
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const sizeClasses = size === 'sm'
    ? 'text-[11px] px-2 py-0.5'
    : 'text-xs px-3 py-1';

  return (
    <Link
      href={`/category/${category.slug}`}
      className={`inline-block rounded-md font-semibold uppercase tracking-wider transition-colors hover:bg-brand-100 bg-brand-50 text-brand-600 ${sizeClasses}`}
    >
      {category.name}
    </Link>
  );
}
