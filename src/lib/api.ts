// Server components use internal URL (avoids hairpin NAT timeout in Coolify)
// Client components use public URL
const BLOG_API = process.env.BLOG_API_INTERNAL_URL || process.env.NEXT_PUBLIC_BLOG_API_URL || "https://blog-api.gmoplus.com/api/v1";
export const VERTICAL = "realestate";

// MongoDB returns _id + authorId — normalize to frontend Article shape
function normalizeArticle(a: any) {
  if (!a) return a;
  return {
    ...a,
    id: a._id || a.id,
    author: a.author || {
      id: a.authorId || '',
      displayName: a.authorName || 'GMOPlus',
      avatarUrl: null,
    },
    category: a.category || null,
    tags: a.tags || [],
  };
}
function normalizeList(items: any[]) {
  return (items || []).map(normalizeArticle);
}

const SLUG_RE = /^[a-z0-9]([a-z0-9-]{0,98}[a-z0-9])?$/;

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${BLOG_API}${path}`, {
    next: { revalidate: 60 },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export const blogApi = {
  async getArticles(params: Record<string, any> = {}) {
    const merged = { vertical: VERTICAL, ...params };
    const qs = new URLSearchParams(Object.entries(merged).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString();
    try {
      const data = await apiFetch(`/blog/posts${qs ? `?${qs}` : ""}`);
      return { ...data.data, items: normalizeList(data.data.items) };
    } catch (err) {
      console.error('[blogApi.getArticles]', err);
      throw err;
    }
  },

  async getArticleBySlug(slug: string) {
    if (!SLUG_RE.test(slug)) throw new Error("Invalid slug");
    try {
      const data = await apiFetch(`/blog/posts/${encodeURIComponent(slug)}`);
      return normalizeArticle(data.data.article);
    } catch (err) {
      console.error('[blogApi.getArticleBySlug]', err);
      throw err;
    }
  },

  async getPopular(limit = 4, vertical?: string) {
    const qs = new URLSearchParams({ limit: String(limit), vertical: vertical || VERTICAL }).toString();
    try {
      const data = await apiFetch(`/blog/posts/popular?${qs}`);
      return normalizeList(data.data.articles);
    } catch (err) {
      console.error('[blogApi.getPopular]', err);
      throw err;
    }
  },

  async getCategories(vertical?: string) {
    const qs = new URLSearchParams({ vertical: vertical || VERTICAL }).toString();
    const data = await apiFetch(`/blog/categories?${qs}`);
    return data.data.categories;
  },

  async getTags(limit = 20) {
    const qs = new URLSearchParams({ vertical: VERTICAL, limit: String(limit) }).toString();
    const data = await apiFetch(`/blog/tags?${qs}`);
    return data.data.tags as any[];
  },

  async getArticlesByCategory(categorySlug: string, params: Record<string, any> = {}) {
    const merged = { vertical: VERTICAL, categorySlug, limit: 12, ...params };
    const qs = new URLSearchParams(Object.entries(merged).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString();
    const data = await apiFetch(`/blog/posts?${qs}`);
    return data.data as { items: any[]; hasMore: boolean; nextCursor: string | null };
  },

  async getArticlesByTag(tagSlug: string, params: Record<string, any> = {}) {
    const merged = { vertical: VERTICAL, tagSlug, limit: 12, ...params };
    const qs = new URLSearchParams(Object.entries(merged).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString();
    const data = await apiFetch(`/blog/posts?${qs}`);
    return data.data as { items: any[]; hasMore: boolean; nextCursor: string | null };
  },

  async getArticlesByAuthor(authorId: string, params: Record<string, any> = {}) {
    const merged = { vertical: VERTICAL, authorId, limit: 12, ...params };
    const qs = new URLSearchParams(Object.entries(merged).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString();
    const data = await apiFetch(`/blog/posts?${qs}`);
    return data.data as { items: any[]; hasMore: boolean; nextCursor: string | null };
  },
};