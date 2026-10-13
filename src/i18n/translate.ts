import { messages } from './messages';
import { englishMessages } from './interface';
export type Locale = 'pt-BR' | 'en' | 'es';
export type Parameters = Readonly<Record<string, string | number>>;
/** Only pass application-owned copy. Token values and exported data stay untouched. */
export function translate(
  locale: Locale,
  text: string,
  parameters?: Parameters,
): string {
  let key = text;
  let values = parameters;
  if (!Object.hasOwn(messages, key) && !values && text.length < 512) {
    const bits =
      /^At least (256|384|512) bits of key material; length does not prove entropy\.$/.exec(
        text,
      );
    const expected =
      /^Expected (oct|RSA|EC|OKP) key for ([A-Za-z0-9_-]{1,16})\.$/.exec(text);
    const match =
      /^(Missing kid|Exact match|Multiple candidates|No matching key) — exactly one trusted key is required\.$/.exec(
        text,
      );
    if (bits) {
      key =
        'At least {bits} bits of key material; length does not prove entropy.';
      values = { bits: bits[1]! };
    } else if (expected) {
      key = 'Expected {type} key for {algorithm}.';
      values = { type: expected[1]!, algorithm: expected[2]! };
    } else if (match) {
      key = '{status} — exactly one trusted key is required.';
      values = { status: translate(locale, match[1]!) };
    }
  }
  const result =
    locale === 'en'
      ? Object.hasOwn(englishMessages, key)
        ? englishMessages[key]!
        : key
      : Object.hasOwn(messages, key)
        ? messages[key]![locale === 'pt-BR' ? 0 : 1]
        : key;
  return values
    ? result.replace(
        /\{([a-zA-Z][a-zA-Z0-9]*)\}/g,
        (placeholder, name: string) =>
          Object.hasOwn(values, name) ? String(values![name]) : placeholder,
      )
    : result;
}
/** Fold accents for UI search only; original values are never modified. */
export function searchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
}
