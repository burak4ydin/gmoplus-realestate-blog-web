import tr from '../../messages/tr.json';
import en from '../../messages/en.json';
import de from '../../messages/de.json';
import fr from '../../messages/fr.json';
import es from '../../messages/es.json';
import ru from '../../messages/ru.json';

type Messages = Record<string, Record<string, string>>;

const messages: Record<string, Messages> = { tr, en, de, fr, es, ru };

const LOCALE_MAP: Record<string, string> = {
  tr: 'tr-TR',
  en: 'en-US',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
  ru: 'ru-RU',
};

function flatten(obj: Messages): Record<string, string> {
  const result: Record<string, string> = {};
  for (const section of Object.values(obj)) {
    if (typeof section === 'object') {
      Object.assign(result, section);
    }
  }
  return result;
}

export const SUPPORTED_LANGUAGES = Object.keys(messages);

export function t(language: string, key: string): string {
  const lang = language in messages ? language : 'tr';
  const flat = flatten(messages[lang] as Messages);
  return flat[key] ?? key;
}

export function getLocale(language: string): string {
  return LOCALE_MAP[language] ?? 'tr-TR';
}