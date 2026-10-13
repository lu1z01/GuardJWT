import {
  readJson,
  object,
  MAX_INPUT,
  type Obj,
  type JsonIssue,
} from '../parsing/json';
export function encode(bytes: Uint8Array): string {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
export function decode(s: string): Uint8Array {
  if (s.length > MAX_INPUT)
    throw new Error('Input too large for interactive analysis.');
  if (!/^[\w-]*$/.test(s) || s.length % 4 === 1)
    throw new Error(
      'Invalid Base64URL. Padding and whitespace are not permitted.',
    );
  const bin = atob(
    s.replace(/-/g, '+').replace(/_/g, '/') +
      '='.repeat((4 - (s.length % 4)) % 4),
  );
  const b = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  if (encode(b) !== s)
    throw new Error('Invalid Base64URL: non-canonical padding bits.');
  return b;
}
export const utf8 = (s: string) => new TextEncoder().encode(s);
export function text(bytes: Uint8Array): string {
  try {
    return new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(
      bytes,
    );
  } catch {
    throw new Error('Payload or protected header is not valid UTF-8.');
  }
}
export interface Segment {
  name: string;
  raw: string;
  bytes: number;
  hex: string;
}
export interface Inspection {
  ok: true;
  format: 'JWT / JWS' | 'JWS Compact' | 'JWE Compact';
  header: Obj;
  payload?: Obj;
  rawHeader: string;
  rawPayload?: string;
  payloadError?: string;
  segments: Segment[];
  issues: JsonIssue[];
  totalBytes: number;
  nested?: string;
}
export type InspectionResult = Inspection | { ok: false; message: string };
export function inspect(input: string): InspectionResult {
  try {
    if (input.length > MAX_INPUT)
      throw new Error(
        'Input too large for interactive analysis (1 MiB limit).',
      );
    const token = input.trim();
    if (!token) throw new Error('Paste a token to begin local inspection.');
    const parts = token.split('.');
    if (parts.length !== 3 && parts.length !== 5)
      throw new Error(
        'Compact JOSE requires exactly three segments (JWS) or five segments (JWE).',
      );
    const rawHeader = text(decode(parts[0]!));
    const parsed = readJson(rawHeader);
    if (
      !object(parsed.value) ||
      typeof parsed.value.alg !== 'string' ||
      !parsed.value.alg
    )
      throw new Error(
        'Protected header must be a JSON object with a string alg.',
      );
    const header = parsed.value;
    const jwe = parts.length === 5;
    if (jwe && (typeof header.enc !== 'string' || !header.enc))
      throw new Error('JWE protected header must declare enc.');
    if ('b64' in header && typeof header.b64 !== 'boolean')
      throw new Error('b64 must be a boolean.');
    const unencoded = !jwe && header.b64 === false;
    if (unencoded && !/^[\x20-\x7e]*$/.test(parts[1]!))
      throw new Error(
        'Unencoded compact JWS payload must use printable ASCII without periods.',
      );
    const names = jwe
      ? [
          'Protected Header',
          'Encrypted Key',
          'Initialization Vector',
          'Ciphertext',
          'Authentication Tag',
        ]
      : ['Header segment', 'Payload segment', 'Signature segment'];
    const segments = parts.map((raw, i) => {
      const bytes = unencoded && i === 1 ? utf8(raw) : decode(raw);
      return {
        name: names[i]!,
        raw,
        bytes: bytes.length,
        hex:
          Array.from(bytes.slice(0, 256), (b) =>
            b.toString(16).padStart(2, '0'),
          ).join(' ') + (bytes.length > 256 ? ' …' : ''),
      };
    });
    const result: Inspection = {
      ok: true,
      format: jwe ? 'JWE Compact' : 'JWS Compact',
      header,
      rawHeader,
      segments,
      issues: parsed.issues.map((i) => ({ ...i, key: 'header.' + i.key })),
      totalBytes: utf8(token).length,
    };
    if (!jwe) {
      try {
        result.rawPayload = unencoded ? parts[1]! : text(decode(parts[1]!));
      } catch {
        result.payloadError =
          'Payload is not valid UTF-8; inspect bytes in Raw view.';
        return result;
      }
      if (
        header.cty === 'JWT' &&
        [3, 5].includes(result.rawPayload.split('.').length)
      )
        result.nested = result.rawPayload;
      try {
        const payload = readJson(result.rawPayload);
        result.issues.push(
          ...payload.issues.map((i) => ({ ...i, key: 'payload.' + i.key })),
        );
        if (object(payload.value)) {
          result.payload = payload.value;
          if (!unencoded) result.format = 'JWT / JWS';
        } else result.payloadError = 'JWS payload is not a JWT claims object.';
      } catch {
        result.payloadError =
          'JWS payload is not valid JSON claims. Raw content remains available.';
      }
    }
    return result;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : 'Unable to inspect JOSE input.',
    };
  }
}
