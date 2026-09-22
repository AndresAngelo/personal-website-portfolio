import english from '../content/i18n/en.json';
import spanish from '../content/i18n/es.json';

export const supportedLanguages = ['en', 'es'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
export const defaultLanguage: SupportedLanguage = 'en';

export function getLanguageFromPath(pathname: string): SupportedLanguage {
  const candidate = pathname.split('/').filter(Boolean)[0];
  return supportedLanguages.includes(candidate as SupportedLanguage)
    ? (candidate as SupportedLanguage)
    : defaultLanguage;
}

export const translations = { en: english, es: spanish } as const;
export type TranslationKeys = LeafKeys<typeof english>;

type LeafKeys<T, Prefix extends string = ''> = {
  [Key in keyof T & string]: T[Key] extends Record<string, unknown>
    ? LeafKeys<T[Key], `${Prefix}${Key}.`>
    : `${Prefix}${Key}`;
}[keyof T & string];

interface TranslationTree {
  [key: string]: string | TranslationTree;
}

function readKey(tree: TranslationTree, key: string): string | undefined {
  const value = key.split('.').reduce<string | TranslationTree | undefined>(
    (current, segment) =>
      current && typeof current === 'object' ? current[segment] : undefined,
    tree,
  );

  return typeof value === 'string' ? value : undefined;
}

export function t(language: SupportedLanguage, key: TranslationKeys): string {
  return readKey(translations[language], key) ?? readKey(translations.en, key) ?? key;
}

export function getMissingTranslationKeys(
  language: Exclude<SupportedLanguage, 'en'>,
): TranslationKeys[] {
  return getLeafKeys(translations.en).filter(
    (key): key is TranslationKeys => !readKey(translations[language], key),
  );
}

export function validateTranslations(): Record<SupportedLanguage, TranslationKeys[]> {
  const missing = { en: [], es: getMissingTranslationKeys('es') } satisfies Record<
    SupportedLanguage,
    TranslationKeys[]
  >;

  if (import.meta.env?.DEV && missing.es.length > 0) {
    console.warn(`[i18n] Missing Spanish translation keys: ${missing.es.join(', ')}`);
  }

  return missing;
}

function getLeafKeys(tree: TranslationTree, prefix = ''): string[] {
  return Object.entries(tree).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return typeof value === 'string' ? [fullKey] : getLeafKeys(value, fullKey);
  });
}
