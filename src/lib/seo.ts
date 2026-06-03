import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.gmoplus.com';
const SITE_NAME = 'GMOPlus Blog';

export function generatePostMetadata(post: {
  title: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  excerpt?: string | null;
  slug: string;
  canonicalUrl?: string | null;
  ogImageUrl?: string | null;
  coverImageUrl?: string | null;
  publishedAt?: string | null;
  author?: { displayName?: string | null };
}): Metadata {
  const title = post.seoTitle || post.title || 'Untitled';
  const description = post.seoDescription || post.excerpt || '';
  const url = post.canonicalUrl || `${SITE_URL}/${post.slug}`;
  const image = post.ogImageUrl || post.coverImageUrl;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      authors: post.author?.displayName ? [post.author.displayName] : undefined,
      ...(image && { images: [{ url: image, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export function generateCategoryMetadata(category: {
  name: string;
  slug: string;
}): Metadata {
  const title = `${category.name} — ${SITE_NAME}`;
  const description = `Read the latest ${category.name} articles on ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/category/${category.slug}` },
    openGraph: { title, description, url: `${SITE_URL}/category/${category.slug}`, siteName: SITE_NAME },
  };
}

export function generateTagMetadata(tag: { name: string; slug: string }): Metadata {
  const title = `Posts tagged "${tag.name}" — ${SITE_NAME}`;

  return {
    title,
    description: `Browse all articles tagged with ${tag.name}`,
    alternates: { canonical: `${SITE_URL}/tag/${tag.slug}` },
  };
}
