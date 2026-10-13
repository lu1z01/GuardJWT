import { parse, isSafeNumber } from 'lossless-json';
export type Value = string | number | bigint | boolean | null | Value[] | Obj;
export interface Obj {
  [key: string]: Value;
}
export const MAX_INPUT = 1_048_576;
export const MAX_DEPTH = 64;
export interface JsonIssue {
  kind: 'duplicate' | 'large-number' | 'precision';
  key: string;
  position?: number;
  raw?: string;
}
export function object(value: Value | undefined): value is Obj {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}
export function readJson(raw: string): { value: Value; issues: JsonIssue[] } {
  if (raw.length > MAX_INPUT)
    throw new Error('Input too large for interactive analysis (1 MiB limit).');
  const issues: JsonIssue[] = [];
  // Prefix every object key before the library sees it, then restore as own
  // data properties. This prevents legacy __proto__ setters and also lets us
  // detect equal-value duplicates that lossless-json deliberately ignores.
  let protectedJson = '';
  const scopes: Array<Set<string> | null> = [];
  try {
    for (let i = 0; i < raw.length; i++) {
      const c = raw[i]!;
      if (c === '"') {
        const start = i;
        let escaped = false;
        for (i++; i < raw.length; i++) {
          if (escaped) escaped = false;
          else if (raw[i] === '\\') escaped = true;
          else if (raw[i] === '"') break;
        }
        const quoted = raw.slice(start, i + 1);
        let next = i + 1;
        while (/\s/.test(raw[next] ?? '') && next < raw.length) next++;
        if (raw[next] === ':') {
          const key = JSON.parse(quoted) as string;
          const scope = scopes.at(-1);
          if (scope?.has(key))
            issues.push({ kind: 'duplicate', key, position: start });
          scope?.add(key);
          protectedJson += JSON.stringify('~' + key);
        } else protectedJson += quoted;
      } else {
        if (c === '{' || c === '[') {
          scopes.push(c === '{' ? new Set() : null);
          if (scopes.length > MAX_DEPTH) throw new Error('depth');
        }
        if (c === '}' || c === ']') scopes.pop();
        protectedJson += c;
      }
    }
  } catch (e) {
    if (e instanceof Error && e.message === 'depth')
      throw new Error('JSON exceeds the 64-level inspection limit.', {
        cause: e,
      });
    throw new Error('Invalid JSON.', { cause: e });
  }
  try {
    const value = parse(protectedJson, null, {
      parseNumber: (s) => {
        const n = Number(s);
        if (!Number.isFinite(n)) throw new Error('finite');
        if (/^-?\d+$/.test(s) && !Number.isSafeInteger(n)) {
          issues.push({ kind: 'large-number', key: '', raw: s });
          return BigInt(s);
        }
        if (!isSafeNumber(s))
          issues.push({ kind: 'precision', key: '', raw: s });
        return n;
      },
      onDuplicateKey: ({ newValue }) => newValue,
    }) as Value;
    function restore(v: Value): Value {
      if (Array.isArray(v)) return v.map(restore);
      if (v && typeof v === 'object')
        return Object.fromEntries(
          Object.entries(v).map(([k, x]) => [k.slice(1), restore(x)]),
        );
      return v;
    }
    return { value: restore(value), issues };
  } catch {
    throw new Error('Invalid JSON or non-finite number.');
  }
}
// Own serializer avoids interpreting attacker-controlled isLosslessNumber/toJSON properties.
export function print(
  value: Value | undefined,
  pretty = true,
  level = 0,
): string {
  if (value === undefined) return '—';
  if (typeof value === 'bigint') return value.toString();
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  const pad = pretty ? '  '.repeat(level + 1) : '',
    end = pretty ? '\n' + '  '.repeat(level) : '',
    sep = pretty ? ',\n' : ',';
  const entries = Array.isArray(value)
    ? value.map((v) => print(v, pretty, level + 1))
    : Object.entries(value).map(
        ([k, v]) =>
          JSON.stringify(k) +
          (pretty ? ': ' : ':') +
          print(v, pretty, level + 1),
      );
  return (
    (Array.isArray(value) ? '[' : '{') +
    (entries.length
      ? (pretty ? '\n' : '') + entries.map((e) => pad + e).join(sep) + end
      : '') +
    (Array.isArray(value) ? ']' : '}')
  );
}
export function finite(value: Value | undefined): number | undefined {
  return typeof value === 'number' && Number.isFinite(value)
    ? value
    : undefined;
}
