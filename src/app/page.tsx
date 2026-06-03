import { blogApi } from "@/lib/api";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

const LANG_LABELS: Record<string, string> = { tr: "Türkçe", en: "English", de: "Deutsch", fr: "Français", es: "Español" };

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { lang } = await searchParams;
  const langLabel = lang ? ` (${LANG_LABELS[lang] ?? lang.toUpperCase()})` : "";
  return {
    title: `GMOPlus Emlak Blog${langLabel}`,
    description: "Gayrimenkul haberleri, ev satın alma rehberleri ve piyasa analizleri",
    alternates: {
      languages: { tr: "/?lang=tr", en: "/?lang=en", de: "/?lang=de", fr: "/?lang=fr", es: "/?lang=es" },
    },
  };
}

function formatDate(d?: string, lang = "tr") {
  if (!d) return "";
  const localeMap: Record<string, string> = { tr: "tr-TR", en: "en-US", de: "de-DE", fr: "fr-FR", es: "es-ES" };
  return new Date(d).toLocaleDateString(localeMap[lang] ?? "tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

function LangBadge({ lang }: { lang?: string }) {
  if (!lang) return null;
  const colors: Record<string, string> = { tr: "bg-red-50 text-red-600", en: "bg-blue-50 text-blue-600", de: "bg-yellow-50 text-yellow-700", fr: "bg-purple-50 text-purple-600", es: "bg-orange-50 text-orange-600" };
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded ${colors[lang] ?? "bg-gray-50 text-gray-500"}`}>{lang.toUpperCase()}</span>;
}

function PostCard({ post, lang }: { post: any; lang?: string }) {
  return (
    <Link href={`/${post.slug}`} className="group block">
      {post.coverImageUrl && (
        <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-3">
          <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        </div>
      )}
      <div className="flex items-center gap-2 mb-1">
        <LangBadge lang={post.language} />
      </div>
      <h2 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-1">{post.title}</h2>
      {post.excerpt && <p className="text-sm text-gray-500 line-clamp-2 mb-2">{post.excerpt}</p>}
      <p className="text-xs text-gray-400">{formatDate(post.publishedAt, lang)} · {post.readingTimeMin} dk okuma</p>
    </Link>
  );
}

export default async function HomePage({ searchParams }: { searchParams: Promise<{ cursor?: string; lang?: string }> }) {
  const params = await searchParams;
  const lang = params.lang;
  let result: any = { items: [], hasMore: false, nextCursor: null };
  let popular: any[] = [];

  try {
    const fetchParams: Record<string, any> = { limit: 12 };
    if (lang) fetchParams.language = lang;
    if (params.cursor) fetchParams.cursor = params.cursor;
    [result, popular] = await Promise.all([
      blogApi.getArticles(fetchParams).catch(() => ({ items: [], hasMore: false, nextCursor: null })),
      blogApi.getPopular(4).catch(() => []),
    ]);
  } catch {}

  const posts: any[] = result?.items ?? [];
  const [heroPost, ...restPosts] = posts;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {heroPost && (
        <Link href={`/${heroPost.slug}`} className="group block mb-12">
          <div className="relative rounded-2xl overflow-hidden bg-emerald-900">
            {heroPost.coverImageUrl ? (
              <img src={heroPost.coverImageUrl} alt={heroPost.title} className="w-full h-80 object-cover opacity-60 group-hover:opacity-70 transition-opacity" />
            ) : (
              <div className="w-full h-80 bg-gradient-to-br from-emerald-700 to-emerald-900" />
            )}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-emerald-200 bg-emerald-800/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  EMLAK
                </span>
                <LangBadge lang={heroPost.language} />
              </div>
              <h1 className="text-3xl font-extrabold text-white leading-tight mb-2 drop-shadow">{heroPost.title}</h1>
              {heroPost.excerpt && <p className="text-sm text-emerald-100 line-clamp-2">{heroPost.excerpt}</p>}
              <p className="text-xs text-emerald-200 mt-3">{formatDate(heroPost.publishedAt, lang)} · {heroPost.readingTimeMin} dk</p>
            </div>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {restPosts.length === 0 && !heroPost && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-2xl mb-2">🏠</p>
              <p className="font-medium">Henüz makale yok</p>
              <p className="text-sm mt-1">Yakında içerikler eklenecek</p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {restPosts.map((p) => <PostCard key={p._id} post={p} lang={lang} />)}
          </div>
          {result?.hasMore && result?.nextCursor && (
            <div className="mt-10 text-center">
              <Link
                href={`/?cursor=${result.nextCursor}${lang ? `&lang=${lang}` : ""}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Daha Fazla Yükle
              </Link>
            </div>
          )}
        </div>

        <aside className="space-y-8">
          {popular.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Popüler</h3>
              <div className="space-y-4">
                {popular.map((p: any, i: number) => (
                  <Link key={p._id} href={`/${p.slug}`} className="flex gap-3 group">
                    <span className="text-2xl font-black text-emerald-100 w-6 shrink-0">{i + 1}</span>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-2">{p.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{p.readingTimeMin} dk</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="bg-emerald-50 rounded-xl p-5">
            <h3 className="text-sm font-bold text-emerald-900 mb-2">Emlak platformuna gidin</h3>
            <p className="text-xs text-emerald-700 mb-3">Kiralık ve satılık ilanlar, değer analizleri ve daha fazlası.</p>
            <a href="https://realestate.gmoplus.com" className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700">
              realestate.gmoplus.com →
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}