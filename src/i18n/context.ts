import { createContext, useCallback, useContext } from 'react';
import { messages } from './messages';
export type Locale = 'pt-BR' | 'en' | 'es';
export const LanguageContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>({ locale: 'en', setLocale: () => {} });

export function useI18n() {
  const { locale, setLocale } = useContext(LanguageContext);
  const tr = useCallback(
    (text: string) => {
      if (locale === 'en' || !Object.hasOwn(messages, text)) return text;
      return messages[text]![locale === 'pt-BR' ? 0 : 1];
    },
    [locale],
  );
  return { locale, setLocale, tr };
}
