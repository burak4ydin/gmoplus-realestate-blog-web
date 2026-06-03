import { notFound } from "next/navigation";
import { blogApi } from "@/lib/api";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await blogApi.getArticleBySlug(slug);
    return { title: post.seoTitle || post.title, description: post.seoDescription || post.excerpt };
  } catch {
    return { title: "Makale Bulunamadı" };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  let post: any;
  try {
    post = await blogApi.getArticleBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
        <a href="/" className="hover:text-gray-600">Ana Sayfa</a>
        <span>›</span>
        <span className="text-gray-600">{post.title}</span>
      </nav>

      {post.coverImageUrl && (
        <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-8">
          <img src={post.coverImageUrl} alt={post.coverImageAlt || post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">EMLAK</span>
          {post.language && <span className="text-xs text-gray-400">{post.language.toUpperCase()}</span>}
          {post.difficulty && (
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded capitalize">{post.difficulty}</span>
          )}
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-3">{post.title}</h1>
        {post.subtitle && <p className="text-xl text-gray-600 leading-relaxed mb-3">{post.subtitle}</p>}
        {post.excerpt && <p className="text-lg text-gray-500 leading-relaxed">{post.excerpt}</p>}
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-4 flex-wrap">
          {post.publishedAt && (
            <span>{new Date(post.publishedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</span>
          )}
          <span>·</span>
          <span>{post.readingTimeMin} dk okuma</span>
          {post.wordCount > 0 && <><span>·</span><span>{post.wordCount} kelime</span></>}
          {post.isEditorPick && <span className="text-emerald-600 font-medium">Editörün Seçimi</span>}
        </div>
      </header>

      <article
        className="prose prose-gray max-w-none prose-headings:font-bold prose-a:text-emerald-600 prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.seoKeywords?.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
          {post.seoKeywords.map((k: string) => (
            <span key={k} className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">{k}</span>
          ))}
        </div>
      )}

      <div className="mt-10 pt-8 border-t border-gray-100">
        <div className="bg-emerald-50 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-900 mb-1">GMOPlus Emlak</p>
            <p className="text-xs text-emerald-700">Kiralık ve satılık ilanlar için platformumuzu keşfedin.</p>
          </div>
          <a
            href="https://realestate.gmoplus.com"
            className="shrink-0 ml-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Keşfet →
          </a>
        </div>
      </div>
    </div>
  );
}