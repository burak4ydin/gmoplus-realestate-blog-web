const BLOG_API = process.env.NEXT_PUBLIC_BLOG_API_URL || "https://blog-api.gmoplus.com/api/v1";
export const VERTICAL = "realestate";

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
    const data = await apiFetch(`/blog/posts${qs ? `?${qs}` : ""}`);
    return data.data;
  },

  async getArticleBySlug(slug: string) {
    if (!SLUG_RE.test(slug)) throw new Error("Invalid slug");
    const data = await apiFetch(`/blog/posts/${encodeURIComponent(slug)}`);
    return data.data.article;
  },

  async getPopular(limit = 4) {
    const qs = new URLSearchParams({ limit: String(limit), vertical: VERTICAL }).toString();
    const data = await apiFetch(`/blog/posts/popular?${qs}`);
    return data.data.articles;
  },

  async getCategories() {
    const data = await apiFetch(`/blog/categories?vertical=${VERTICAL}`);
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