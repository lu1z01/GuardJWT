import {
  importJWK,
  importSPKI,
  importPKCS8,
  exportJWK,
  calculateJwkThumbprint,
  type JWK,
} from 'jose';
import { readJson, object, print, MAX_INPUT } from '../parsing/json';
import { decode, utf8 } from '../jose/inspect';
export const ALGORITHMS = [
  'HS256',
  'HS384',
  'HS512',
  'RS256',
  'RS384',
  'RS512',
  'PS256',
  'PS384',
  'PS512',
  'ES256',
  'ES384',
  'ES512',
  'EdDSA',
  'Ed25519',
];
export class KeyError extends Error {
  constructor(
    readonly status: 'KEY INVALID' | 'KEY TYPE MISMATCH' | 'UNSUPPORTED',
    message: string,
  ) {
    super(message);
  }
}
export function keySet(input: string): JWK[] {
  const parsed = readJson(input);
  if (parsed.issues.length)
    throw new KeyError(
      'KEY INVALID',
      'Ambiguous numeric values or duplicate properties in key input.',
    );
  if (!object(parsed.value))
    throw new KeyError('KEY INVALID', 'Expected a JWK or JWKS object.');
  const list = 'keys' in parsed.value ? parsed.value.keys : [parsed.value];
  if (
    !Array.isArray(list) ||
    !list.length ||
    list.length > 100 ||
    list.some((k) => !object(k) || typeof k.kty !== 'string')
  )
    throw new KeyError('KEY INVALID', 'Expected 1–100 JWK objects.');
  for (const value of list) {
    if (!object(value))
      throw new KeyError('KEY INVALID', 'Invalid key object.');
    for (const field of [
      'kty',
      'kid',
      'alg',
      'use',
      'crv',
      'n',
      'e',
      'x',
      'y',
      'k',
      'd',
      'p',
      'q',
      'dp',
      'dq',
      'qi',
    ]) {
      if (field in value && typeof value[field] !== 'string')
        throw new KeyError(
          'KEY INVALID',
          'JWK metadata and key parameters must have the expected string types.',
        );
    }
    if (
      'key_ops' in value &&
      (!Array.isArray(value.key_ops) ||
        value.key_ops.length > 16 ||
        value.key_ops.some((x) => typeof x !== 'string'))
    )
      throw new KeyError('KEY INVALID', 'Invalid key_ops list.');
    if ('ext' in value && typeof value.ext !== 'boolean')
      throw new KeyError('KEY INVALID', 'Invalid ext flag.');
  }
  return JSON.parse(print(list, false)) as JWK[];
}
export function matchKeys(keys: JWK[], kid: unknown) {
  if (typeof kid !== 'string' || !kid)
    return { status: 'Missing kid', candidates: keys };
  const candidates = keys.filter((k) => k.kid === kid);
  return {
    status:
      candidates.length === 1
        ? 'Exact match'
        : candidates.length
          ? 'Multiple candidates'
          : 'No matching key',
    candidates,
  };
}
export function checkJwk(k: JWK, alg: string, operation: 'verify' | 'sign') {
  const expected = alg.startsWith('HS')
    ? 'oct'
    : /^(RS|PS)/.test(alg)
      ? 'RSA'
      : alg.startsWith('ES')
        ? 'EC'
        : 'OKP';
  if (k.kty !== expected)
    throw new KeyError(
      'KEY TYPE MISMATCH',
      `Expected ${expected} key for ${alg}.`,
    );
  if (k.alg && k.alg !== alg)
    throw new KeyError(
      'KEY TYPE MISMATCH',
      'JWK alg does not match the selected algorithm.',
    );
  if (k.use && k.use !== 'sig')
    throw new KeyError('KEY INVALID', 'JWK use must permit signatures.');
  if (
    k.key_ops &&
    (!Array.isArray(k.key_ops) ||
      !k.key_ops.includes(operation) ||
      new Set(k.key_ops).size !== k.key_ops.length)
  )
    throw new KeyError(
      'KEY INVALID',
      'JWK key_ops does not permit this operation.',
    );
  if (
    expected === 'EC' &&
    k.crv !==
      (
        { ES256: 'P-256', ES384: 'P-384', ES512: 'P-521' } as Record<
          string,
          string
        >
      )[alg]
  )
    throw new KeyError(
      'KEY TYPE MISMATCH',
      'EC curve does not match the selected algorithm.',
    );
  if (expected === 'OKP' && k.crv !== 'Ed25519')
    throw new KeyError(
      'UNSUPPORTED',
      'Only Ed25519 is supported for EdDSA here.',
    );
  if (operation === 'verify' && k.d)
    throw new KeyError(
      'KEY INVALID',
      'Provide a public JWK for verification; private key input is unnecessary.',
    );
}
export async function loadKey(
  input: string,
  alg: string,
  mode: 'secret' | 'key',
  kid?: unknown,
  operation: 'verify' | 'sign' = 'verify',
) {
  if (!ALGORITHMS.includes(alg))
    throw new KeyError('UNSUPPORTED', 'Select a supported JOSE algorithm.');
  if (!input || input.length > MAX_INPUT)
    throw new KeyError('KEY INVALID', 'Key input is empty or exceeds 1 MiB.');
  if (mode === 'secret') {
    if (!alg.startsWith('HS'))
      throw new KeyError(
        'KEY TYPE MISMATCH',
        'Raw secrets can only be used with HMAC algorithms.',
      );
    if (/-----BEGIN|^\s*\{/.test(input))
      throw new KeyError(
        'KEY TYPE MISMATCH',
        'PEM/JWK material must not be interpreted as a raw HMAC secret.',
      );
    return utf8(input);
  }
  const trimmed = input.trim();
  if (trimmed.startsWith('{')) {
    const keys = keySet(trimmed);
    const matches = matchKeys(keys, kid);
    if (matches.candidates.length !== 1)
      throw new KeyError(
        'KEY INVALID',
        matches.status + ' — exactly one trusted key is required.',
      );
    const jwk = matches.candidates[0]!;
    checkJwk(jwk, alg, operation);
    return importJWK(jwk, alg);
  }
  if (alg.startsWith('HS'))
    throw new KeyError(
      'KEY TYPE MISMATCH',
      'HMAC requires a raw secret or oct JWK, never a PEM key.',
    );
  if (trimmed.startsWith('-----BEGIN PUBLIC KEY-----'))
    return importSPKI(trimmed, alg);
  if (operation === 'sign' && trimmed.startsWith('-----BEGIN PRIVATE KEY-----'))
    return importPKCS8(trimmed, alg);
  throw new KeyError(
    'KEY INVALID',
    'Use SPKI PUBLIC KEY PEM, JWK or JWKS; builder signing also accepts PKCS8 PRIVATE KEY.',
  );
}
export function rsaBits(k: JWK) {
  if (!k.n) return undefined;
  try {
    const b = decode(k.n);
    let i = 0;
    while (i < b.length && b[i] === 0) i++;
    return i === b.length
      ? 0
      : (b.length - i - 1) * 8 + (32 - Math.clz32(b[i]!));
  } catch {
    return undefined;
  }
}
export async function inspectKeys(input: string, alg: string) {
  const keys = input.trim().startsWith('{')
    ? keySet(input)
    : [await exportJWK(await importSPKI(input, alg, { extractable: true }))];
  return Promise.all(
    keys.map(async (k) => ({
      kid: k.kid ?? '—',
      kty: k.kty ?? '—',
      alg: k.alg ?? (input.trim().startsWith('{') ? 'unspecified' : alg),
      use: k.use ?? 'unspecified',
      operations: k.key_ops?.join(', ') ?? 'unspecified',
      curve: k.crv ?? '—',
      bits: rsaBits(k),
      private: !!k.d || k.kty === 'oct',
      thumbprint:
        k.kty === 'oct'
          ? 'Not displayed for symmetric secrets'
          : await calculateJwkThumbprint(k, 'sha256'),
    })),
  );
}
export function secretQuality(input: string, alg: string) {
  const bytes = utf8(input).length;
  return {
    bytes,
    weak:
      /^(secret|password|123456|test|changeme)$/i.test(input) ||
      new Set(input).size < 4,
    short: bytes < Number(alg.slice(2)) / 8,
  };
}
