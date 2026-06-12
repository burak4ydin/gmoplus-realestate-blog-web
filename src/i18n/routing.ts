import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'de', 'en', 'es', 'fr', 'ru'],
  defaultLocale: 'tr',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/kategoriler': {
      tr: '/kategoriler',
      en: '/categories',
      de: '/kategorien',
      fr: '/categories',
      es: '/categorias',
      ru: '/kategorii',
    },
    '/kategoriler/[slug]': {
      tr: '/kategoriler/[slug]',
      en: '/categories/[slug]',
      de: '/kategorien/[slug]',
      fr: '/categories/[slug]',
      es: '/categorias/[slug]',
      ru: '/kategorii/[slug]',
    },
    '/search': {
      tr: '/arama',
      en: '/search',
      de: '/suche',
      fr: '/recherche',
      es: '/busqueda',
      ru: '/poisk',
    },
  },
});