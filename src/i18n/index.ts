import type { Language, Translation } from '../types/i18n';
import { fr } from './fr';
import { en } from './en';
import { es } from './es';
import { de } from './de';
import { ar } from './ar';
import { zh } from './zh';

export const translations: Record<Language, Translation> = {
  fr,
  en,
  es,
  de,
  ar,
  zh,
};

export function getTranslation(lang: Language): Translation {
  return translations[lang] || translations.fr;
}
