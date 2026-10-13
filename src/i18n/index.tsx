import { useEffect, useState, type ReactNode } from 'react';
import { LanguageContext, useI18n, type Locale } from './context';
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const languages =
      typeof navigator === 'undefined' ? ['en'] : navigator.languages;
    for (const language of languages) {
      if (language.startsWith('pt')) return 'pt-BR';
      if (language.startsWith('es')) return 'es';
      if (language.startsWith('en')) return 'en';
    }
    return 'en';
  });
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return (
    <LanguageContext value={{ locale, setLocale }}>{children}</LanguageContext>
  );
}
export function LanguageSelector() {
  const { locale, setLocale, tr } = useI18n();
  return (
    <label className="language-selector">
      <span className="sr-only">{tr('Language')}</span>
      <select
        aria-label={tr('Language')}
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
      >
        <option value="pt-BR">Português</option>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </label>
  );
}
