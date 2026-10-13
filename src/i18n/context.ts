import { createContext, useCallback, useContext } from 'react';
import { translate, type Locale, type Parameters } from './translate';
export type { Locale } from './translate';
export const LanguageContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>({ locale: 'en', setLocale: () => {} });

export function useI18n() {
  const { locale, setLocale } = useContext(LanguageContext);
  const tr = useCallback(
    (text: string, parameters?: Parameters) =>
      translate(locale, text, parameters),
    [locale],
  );
  return { locale, setLocale, tr };
}
