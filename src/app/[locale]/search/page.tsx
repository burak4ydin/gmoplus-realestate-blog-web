import { blogApi } from "@/lib/api";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ara — GMOPlus Real Estate Blog",
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ q?: string; categoryId?: string; tagId?: string; sortBy?: string }>;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

const SORT_OPTIONS = [
  { value: "newest", label: "En Yeni" },
  { value: "oldest", label: "En Eski" },
  { value: "popular", label: "En Popüler" },
];

export default async function SearchPage({ searchParams }: Props) {
  const { q, categoryId, tagId, sortBy } = await searchParams;

  let items: any[] = [];
  let categories: any[] = [];
  let tags: any[] = [];

  try {
    [categories, tags] = await Promise.all([
      blogApi.getCategories().catch(() => []),
      blogApi.getTags().catch(() => []),
    ]);
  } catch {}

  if (q || categoryId || tagId) {
    try {
      const data = await blogApi.getArticles({
        search: q,
        categoryId,
        tagId,
        sortBy: sortBy || "newest",
        limit: 20,
      });
      items = data.items || [];
    } catch {}
  }

  const buildUrl = (key: string, value: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (sortBy) params.set("sortBy", sortBy);
    if (categoryId) params.set("categoryId", categoryId);
    if (tagId) params.set("tagId", tagId);
    if (value) params.set(key, value);
    else params.delete(key);
    return `/search?${params.toString()}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Ara</h1>

      {/* Search box */}
      <form action="/search" method="get" className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              name="q"
              defaultValue={q}
              placeholder="Gayrimenkul makalesi ara..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-orange-600 text-white rounded-xl text-sm font-semibold hover:bg-orange-700 transition-colors"
          >
            Ara
          </button>
        </div>
        {sortBy && <input type="hidden" name="sortBy" value={sortBy} />}
        {categoryId && <input type="hidden" name="categoryId" value={categoryId} />}
        {tagId && <input type="hidden" name="tagId" value={tagId} />}
      </form>

      {/* Sort options */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm text-gray-500">Sırala:</span>
        {SORT_OPTIONS.map((opt) => (
          <Link
            key={opt.value}
            href={buildUrl("sortBy", (sortBy || "newest") === opt.value ? "" : opt.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              (sortBy || "newest") === opt.value
                ? "bg-orange-600 text-white border-orange-600"
                : "border-gray-200 text-gray-600 hover:border-orange-400"
            }`}
          >
            {opt.label}
          </Link>
        ))}
      </div>

      {/* Category chips */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-sm text-gray-500 self-center">Kategori:</span>
          <Link
            href={buildUrl("categoryId", "")}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              !categoryId ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 text-gray-600 hover:border-gray-400"
            }`}
          >
            Tümü
          </Link>
          {categories.map((cat: any) => (
            <Link
              key={cat.id || cat._id}
              href={buildUrl("categoryId", categoryId === (cat.id || cat._id) ? "" : (cat.id || cat._id))}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                categoryId === (cat.id || cat._id)
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* Tag chips */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm text-gray-500 self-center">Etiket:</span>
          {tags.slice(0, 12).map((tag: any) => (
            <Link
              key={tag.id}
              href={buildUrl("tagId", tagId === String(tag.id) ? "" : String(tag.id))}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                tagId === String(tag.id)
                  ? "bg-orange-600 text-white border-orange-600"
                  : "border-gray-200 text-gray-600 hover:border-orange-400"
              }`}
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      )}

      {/* Results */}
      {q || categoryId || tagId ? (
        <>
          <p className="text-gray-500 mb-6">
            {items.length} sonuç{q && ` "${q}" için`}
          </p>
          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((post: any) => (
                <article key={post.id} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  {post.coverImageUrl && (
                    <a href={`/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-gray-100">
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </a>
                  )}
                  <div className="p-4">
                    <a href={`/${post.slug}`}>
                      <h2 className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h2>
                    </a>
                    {post.excerpt && (
                      <p className="text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg font-medium text-gray-400 mb-2">Sonuç bulunamadı.</p>
              <p className="text-sm text-gray-400">Farklı anahtar kelimeler deneyin.</p>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">Aramak istediğiniz konuyu yazın.</p>
      )}
    </div>
  );
}