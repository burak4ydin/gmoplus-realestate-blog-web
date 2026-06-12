export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
] as const;

export type LangCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

const LOCALE_MAP: Record<string, string> = {
  en: 'en-US',
  tr: 'tr-TR',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
  ru: 'ru-RU',
};

export function getLocale(lang?: string): string {
  return LOCALE_MAP[lang || 'en'] || 'en-US';
}

export function isValidLang(lang: string): boolean {
  return SUPPORTED_LANGUAGES.some((l) => l.code === lang);
}