export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
] as const;

export type LangCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

const translations: Record<string, Record<LangCode, string>> = {
  latestArticles: {
    en: 'Latest Articles', tr: 'Son Yazılar', de: 'Neueste Artikel',
    fr: 'Derniers Articles', es: 'Últimos Artículos', ru: 'Последние статьи',
  },
  trending: {
    en: 'Trending', tr: 'Popüler', de: 'Beliebt',
    fr: 'Tendances', es: 'Tendencias', ru: 'Популярное',
  },
  categories: {
    en: 'Categories', tr: 'Kategoriler', de: 'Kategorien',
    fr: 'Catégories', es: 'Categorías', ru: 'Категории',
  },
  topics: {
    en: 'Topics', tr: 'Konular', de: 'Themen',
    fr: 'Sujets', es: 'Temas', ru: 'Темы',
  },
  youMayAlsoLike: {
    en: 'You May Also Like', tr: 'Bunları da Beğenebilirsiniz', de: 'Das könnte Ihnen auch gefallen',
    fr: 'Vous aimerez aussi', es: 'También te puede gustar', ru: 'Вам также может понравиться',
  },
  loadMore: {
    en: 'Load more articles', tr: 'Daha fazla yükle', de: 'Mehr laden',
    fr: 'Charger plus', es: 'Cargar más', ru: 'Загрузить ещё',
  },
  searchArticles: {
    en: 'Search articles...', tr: 'Yazılarda ara...', de: 'Artikel suchen...',
    fr: 'Rechercher des articles...', es: 'Buscar artículos...', ru: 'Поиск статей...',
  },
  noArticlesYet: {
    en: 'No articles yet', tr: 'Henüz yazı yok', de: 'Noch keine Artikel',
    fr: 'Pas encore d\'articles', es: 'Aún no hay artículos', ru: 'Статей пока нет',
  },
  checkBackSoon: {
    en: 'Check back soon for new content.', tr: 'Yakında yeni içerikler gelecek.', de: 'Schauen Sie bald wieder vorbei.',
    fr: 'Revenez bientôt pour du nouveau contenu.', es: 'Vuelva pronto para nuevo contenido.', ru: 'Загляните позже за новым контентом.',
  },
  home: {
    en: 'Home', tr: 'Ana Sayfa', de: 'Startseite',
    fr: 'Accueil', es: 'Inicio', ru: 'Главная',
  },
  blog: {
    en: 'Blog', tr: 'Blog', de: 'Blog',
    fr: 'Blog', es: 'Blog', ru: 'Блог',
  },
  allLanguages: {
    en: 'All Languages', tr: 'Tüm Diller', de: 'Alle Sprachen',
    fr: 'Toutes les langues', es: 'Todos los idiomas', ru: 'Все языки',
  },
  minRead: {
    en: 'min read', tr: 'dk okuma', de: 'Min. Lesezeit',
    fr: 'min de lecture', es: 'min de lectura', ru: 'мин чтения',
  },
  views: {
    en: 'views', tr: 'görüntülenme', de: 'Aufrufe',
    fr: 'vues', es: 'vistas', ru: 'просмотров',
  },
  editorsPick: {
    en: "Editor's Pick", tr: 'Editörün Seçimi', de: 'Empfehlung der Redaktion',
    fr: 'Choix de la rédaction', es: 'Selección del editor', ru: 'Выбор редакции',
  },
  pick: {
    en: 'Pick', tr: 'Seçim', de: 'Empfehlung',
    fr: 'Choix', es: 'Selección', ru: 'Выбор',
  },
  share: {
    en: 'Share:', tr: 'Paylaş:', de: 'Teilen:',
    fr: 'Partager :', es: 'Compartir:', ru: 'Поделиться:',
  },
  ecosystem: {
    en: 'Our Ecosystem', tr: 'Ekosistemimiz', de: 'Unser Ökosystem',
    fr: 'Notre écosystème', es: 'Nuestro ecosistema', ru: 'Наша экосистема',
  },
  resources: {
    en: 'Resources', tr: 'Kaynaklar', de: 'Ressourcen',
    fr: 'Ressources', es: 'Recursos', ru: 'Ресурсы',
  },
  allRightsReserved: {
    en: 'All rights reserved.', tr: 'Tüm hakları saklıdır.', de: 'Alle Rechte vorbehalten.',
    fr: 'Tous droits réservés.', es: 'Todos los derechos reservados.', ru: 'Все права защищены.',
  },
  newsletter: {
    en: 'Newsletter', tr: 'Bülten', de: 'Newsletter',
    fr: 'Newsletter', es: 'Boletín', ru: 'Рассылка',
  },
  subscribe: {
    en: 'Subscribe', tr: 'Abone Ol', de: 'Abonnieren',
    fr: "S'abonner", es: 'Suscribirse', ru: 'Подписаться',
  },
  stayAhead: {
    en: 'Stay ahead of the curve', tr: 'Gelişmelerden haberdar olun', de: 'Bleiben Sie auf dem Laufenden',
    fr: 'Gardez une longueur d\'avance', es: 'Mantente a la vanguardia', ru: 'Будьте в курсе событий',
  },
  weeklyInsights: {
    en: 'Get weekly insights, expert analysis, and the latest trends delivered straight to your inbox.',
    tr: 'Haftalık analizler ve son trendler doğrudan gelen kutunuzda.',
    de: 'Wöchentliche Einblicke und Analysen direkt in Ihren Posteingang.',
    fr: 'Recevez des analyses hebdomadaires et les dernières tendances directement dans votre boîte mail.',
    es: 'Reciba análisis semanales y las últimas tendencias directamente en su bandeja de entrada.',
    ru: 'Еженедельные обзоры и последние тренды прямо на вашу почту.',
  },
  sidebarNewsletter: {
    en: 'Weekly insights and expert analysis delivered to your inbox.',
    tr: 'Haftalık analizler ve uzman görüşleri gelen kutunuzda.',
    de: 'Wöchentliche Einblicke und Analysen in Ihrem Posteingang.',
    fr: 'Analyses hebdomadaires directement dans votre boîte mail.',
    es: 'Análisis semanales directamente en su bandeja de entrada.',
    ru: 'Еженедельные обзоры прямо на вашу почту.',
  },
  noSpam: {
    en: 'No spam. Unsubscribe anytime.', tr: 'Spam yok. İstediğiniz zaman iptal edin.', de: 'Kein Spam. Jederzeit abmelden.',
    fr: 'Pas de spam. Désabonnez-vous à tout moment.', es: 'Sin spam. Cancele cuando quiera.', ru: 'Без спама. Отпишитесь в любое время.',
  },
  subscribed: {
    en: "You're subscribed!", tr: 'Abone oldunuz!', de: 'Abonniert!',
    fr: 'Vous êtes abonné !', es: '¡Suscrito!', ru: 'Вы подписаны!',
  },
  noResults: {
    en: 'No articles found.', tr: 'Yazı bulunamadı.', de: 'Keine Artikel gefunden.',
    fr: 'Aucun article trouvé.', es: 'No se encontraron artículos.', ru: 'Статьи не найдены.',
  },
  enterSearchTerm: {
    en: 'Enter a search term to find articles.', tr: 'Yazı aramak için bir terim girin.', de: 'Suchbegriff eingeben.',
    fr: 'Entrez un terme de recherche.', es: 'Ingrese un término de búsqueda.', ru: 'Введите поисковый запрос.',
  },
  browseArticlesIn: {
    en: 'Browse all articles in', tr: 'Tüm yazılara göz atın:', de: 'Alle Artikel in',
    fr: 'Parcourir les articles dans', es: 'Ver todos los artículos en', ru: 'Все статьи в',
  },
  articlesTaggedWith: {
    en: 'All articles tagged with', tr: 'Bu etiketle ilgili tüm yazılar:', de: 'Alle Artikel mit dem Tag',
    fr: 'Tous les articles étiquetés', es: 'Todos los artículos etiquetados con', ru: 'Все статьи с тегом',
  },
  noArticlesInCategory: {
    en: 'No articles in this category yet.', tr: 'Bu kategoride henüz yazı yok.', de: 'Noch keine Artikel in dieser Kategorie.',
    fr: 'Pas encore d\'articles dans cette catégorie.', es: 'Aún no hay artículos en esta categoría.', ru: 'В этой категории пока нет статей.',
  },
  noPostsWithTag: {
    en: 'No posts with this tag yet.', tr: 'Bu etikette henüz yazı yok.', de: 'Noch keine Beiträge mit diesem Tag.',
    fr: 'Pas encore d\'articles avec ce tag.', es: 'Aún no hay publicaciones con esta etiqueta.', ru: 'С этим тегом пока нет статей.',
  },
  noPublishedPosts: {
    en: 'No published posts yet.', tr: 'Henüz yayınlanmış yazı yok.', de: 'Noch keine veröffentlichten Beiträge.',
    fr: 'Pas encore de publications.', es: 'Aún no hay publicaciones.', ru: 'Опубликованных статей пока нет.',
  },
  viewAllPosts: {
    en: 'View all posts', tr: 'Tüm yazıları gör', de: 'Alle Beiträge anzeigen',
    fr: 'Voir tous les articles', es: 'Ver todas las publicaciones', ru: 'Все статьи',
  },
  searchResults: {
    en: 'Search Results', tr: 'Arama Sonuçları', de: 'Suchergebnisse',
    fr: 'Résultats de recherche', es: 'Resultados de búsqueda', ru: 'Результаты поиска',
  },
  blogDescription: {
    en: 'Your trusted source for automotive news, reviews, comparisons, and expert maintenance tips.',
    tr: 'Otomotiv haberleri, incelemeler, karşılaştırmalar ve uzman bakım ipuçları için güvenilir kaynağınız.',
    de: 'Ihre vertrauenswürdige Quelle für Nachrichten, Bewertungen und Expertentipps.',
    fr: 'Votre source de confiance pour les actualités, les avis et les conseils d\'experts.',
    es: 'Su fuente confiable de noticias, reseñas y consejos de expertos.',
    ru: 'Ваш надёжный источник новостей, обзоров и экспертных советов.',
  },
  expertArticles: {
    en: 'Expert articles, industry insights, and practical guides from the',
    tr: 'Uzman makaleler, sektör analizleri ve pratik rehberler:',
    de: 'Expertenbeiträge, Brancheneinblicke und praktische Leitfäden vom',
    fr: 'Articles d\'experts, analyses du secteur et guides pratiques de',
    es: 'Artículos de expertos, perspectivas del sector y guías prácticas de',
    ru: 'Экспертные статьи, отраслевые обзоры и практические руководства от',
  },
  allCategories: {
    en: 'All Categories', tr: 'Tüm Kategoriler', de: 'Alle Kategorien',
    fr: 'Toutes les catégories', es: 'Todas las categorías', ru: 'Все категории',
  },
  resultsFor: {
    en: 'results for', tr: 'sonuç:', de: 'Ergebnisse für',
    fr: 'résultats pour', es: 'resultados para', ru: 'результатов для',
  },
  tryDifferentKeywords: {
    en: 'Try different keywords or browse our categories.',
    tr: 'Farklı anahtar kelimeler deneyin veya kategorilerimize göz atın.',
    de: 'Versuchen Sie andere Suchbegriffe oder durchsuchen Sie unsere Kategorien.',
    fr: 'Essayez d\'autres mots-clés ou parcourez nos catégories.',
    es: 'Pruebe con otras palabras clave o explore nuestras categorías.',
    ru: 'Попробуйте другие ключевые слова или просмотрите наши категории.',
  },
  articles: {
    en: 'articles', tr: 'yazı', de: 'Artikel',
    fr: 'articles', es: 'artículos', ru: 'статей',
  },
  legal: {
    en: 'Legal', tr: 'Yasal', de: 'Rechtliches',
    fr: 'Juridique', es: 'Legal', ru: 'Правовая информация',
  },
  privacy: {
    en: 'Privacy Policy', tr: 'Gizlilik Politikası', de: 'Datenschutzrichtlinie',
    fr: 'Politique de Confidentialité', es: 'Política de Privacidad', ru: 'Политика конфиденциальности',
  },
  terms: {
    en: 'Terms of Service', tr: 'Kullanım Koşulları', de: 'Nutzungsbedingungen',
    fr: "Conditions d'Utilisation", es: 'Términos de Servicio', ru: 'Условия использования',
  },
  cookiePolicy: {
    en: 'Cookie Policy', tr: 'Çerez Politikası', de: 'Cookie-Richtlinie',
    fr: 'Politique de Cookies', es: 'Política de Cookies', ru: 'Политика файлов cookie',
  },
  kvkk: {
    en: 'Data Protection', tr: 'KVKK', de: 'Datenschutz',
    fr: 'Protection des Données', es: 'Protección de Datos', ru: 'Защита данных',
  },
  security: {
    en: 'Security', tr: 'Güvenlik', de: 'Sicherheit',
    fr: 'Sécurité', es: 'Seguridad', ru: 'Безопасность',
  },
};

export function t(lang: string | undefined, key: string): string {
  const entry = translations[key];
  if (!entry) return key;
  const code = (lang && lang in entry ? lang : 'en') as LangCode;
  return entry[code] || entry.en;
}

const LOCALE_MAP: Record<string, string> = {
  en: 'en-US', tr: 'tr-TR', de: 'de-DE', fr: 'fr-FR', es: 'es-ES', ru: 'ru-RU',
};

export function getLocale(lang?: string): string {
  return LOCALE_MAP[lang || 'en'] || 'en-US';
}

export function isValidLang(lang: string): boolean {
  return SUPPORTED_LANGUAGES.some((l) => l.code === lang);
}