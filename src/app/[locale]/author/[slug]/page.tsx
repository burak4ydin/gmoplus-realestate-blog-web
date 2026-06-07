import { notFound } from "next/navigation";
import { blogApi } from "@/lib/api";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ cursor?: string }>;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await blogApi.getArticlesByAuthor(slug, { limit: 1 });
    const author = data.items[0]?.author;
    if (!author) return { title: "Yazar — GMOPlus Real Estate Blog" };
    return {
      title: `${author.displayName} — GMOPlus Real Estate Blog`,
      description: author.bio || `${author.displayName} tarafından yazılan makaleler.`,
    };
  } catch {
    return { title: "Yazar — GMOPlus Real Estate Blog" };
  }
}

export default async function AuthorPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { cursor } = await searchParams;

  let data: { items: any[]; hasMore: boolean; nextCursor: string | null } = {
    items: [],
    hasMore: false,
    nextCursor: null,
  };

  try {
    data = await blogApi.getArticlesByAuthor(slug, { cursor });
  } catch {
    notFound();
  }

  const author = data.items[0]?.author;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
        <a href="/" className="hover:text-gray-600 transition-colors">Ana Sayfa</a>
        <span>›</span>
        <span className="text-gray-600 font-medium">Yazar</span>
      </nav>

      {author && (
        <header className="mb-8 flex flex-col sm:flex-row items-start gap-5">
          {author.avatarUrl ? (
            <img
              src={author.avatarUrl}
              alt={author.displayName}
              className="w-20 h-20 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-2xl font-bold shrink-0">
              {author.displayName?.charAt(0) || "?"}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{author.displayName}</h1>
            {author.bio && <p className="text-gray-600 max-w-2xl leading-relaxed">{author.bio}</p>}
          </div>
        </header>
      )}

      {data.items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {data.items.map((post: any) => (
            <article key={post.id} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              {post.coverImageUrl && (
                <a href={`/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={post.coverImageUrl}
                    alt={post.coverImageAlt || post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </a>
              )}
              <div className="p-5">
                <a href={`/${post.slug}`}>
                  <h2 className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 mb-2 leading-snug">
                    {post.title}
                  </h2>
                </a>
                {post.excerpt && (
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-gray-50 text-xs text-gray-400">
                  {post.category && <span>{post.category.name}</span>}
                  {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-lg font-medium text-gray-400">Bu yazara ait henüz makale yok.</p>
        </div>
      )}

      {data.hasMore && data.nextCursor && (
        <div className="mt-6 text-center">
          <a
            href={`/author/${slug}?cursor=${data.nextCursor}`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            Daha Fazla Yükle
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}