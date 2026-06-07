import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'de', 'en', 'es', 'fr', 'ru'],
  defaultLocale: 'tr',
});