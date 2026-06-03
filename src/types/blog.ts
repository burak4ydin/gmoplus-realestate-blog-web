export interface BlogAuthor {
  id: string;
  firstName?: string;
  lastName?: string;
  displayName: string;
  avatarUrl?: string | null;
  bio?: string | null;
}

export interface BlogCategory {
  id: string;
  name: string;
  nameEn?: string;
  slug: string;
  icon?: string | null;
  vertical?: string;
  sortOrder?: number;
  _count?: { articles: number };
}

export interface ArticleTag {
  id: number;
  name: string;
  slug: string;
  color?: string | null;
  usageCount: number;
}

export interface Article {
  id: number;
  postId: string;
  authorId: string;
  title: string;
  subtitle?: string | null;
  slug: string;
  excerpt: string | null;
  content: string | null;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  readingTimeMin: number | null;
  wordCount: number | null;
  contentFormat: string;
  difficulty: string | null;
  vertical: string | null;
  verticals: string[];
  language: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  canonicalUrl: string | null;
  ogImageUrl: string | null;
  noIndex: boolean;
  status: 'draft' | 'review' | 'scheduled' | 'published' | 'archived';
  publishedAt: string | null;
  scheduledAt: string | null;
  isEditorPick: boolean;
  isPremium: boolean;
  isSponsored: boolean;
  sponsorName: string | null;
  sponsorUrl: string | null;
  readCount: number;
  author: BlogAuthor;
  category: Pick<BlogCategory, 'id' | 'name' | 'slug' | 'icon'> | null;
  tags: ArticleTag[];
  createdAt: string;
  updatedAt: string;
}

/** @deprecated Use Article instead */
export type BlogPost = Article;

/** @deprecated Use ArticleTag instead */
export type BlogTag = ArticleTag;

export interface PaginatedResponse<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface CategoryWithArticles {
  category: BlogCategory;
  items: Article[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface TagWithArticles {
  tag: ArticleTag;
  items: Article[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface AuthorWithArticles {
  author: BlogAuthor;
  items: Article[];
  nextCursor: string | null;
  hasMore: boolean;
}

/** @deprecated Use CategoryWithArticles */
export type CategoryWithPosts = CategoryWithArticles;

/** @deprecated Use TagWithArticles */
export type TagWithPosts = TagWithArticles;

/** @deprecated Use AuthorWithArticles */
export type AuthorWithPosts = AuthorWithArticles;