import { readJson, object, finite, type Value } from '../parsing/json';
import type { Inspection } from '../jose/inspect';
import { timeline } from '../timeline/analyze';
import type { CryptoStatus } from '../crypto/verify';
export interface Policy {
  name: string;
  allowedAlgorithms?: string[];
  forbiddenAlgorithms?: string[];
  requiredClaims?: string[];
  forbiddenClaims?: string[];
  issuerAllowlist?: string[];
  audienceAllowlist?: string[];
  maximumLifetime?: number;
  maximumClockSkew?: number;
  requireExpiration?: boolean;
  requireIssuedAt?: boolean;
  requireNotBefore?: boolean;
  requireJti?: boolean;
  requiredScopes?: string[];
  forbiddenScopes?: string[];
  requiredRoles?: string[];
  forbiddenRoles?: string[];
  allowedKeyIds?: string[];
  requireSignature?: boolean;
  forbidEmbeddedJwk?: boolean;
  forbidRemoteJku?: boolean;
  requireTyp?: string;
}
export interface PolicyCheck {
  rule: string;
  status: 'Passed' | 'Warnings' | 'Failed';
  description: string;
}
export const PRESETS: Policy[] = [
  { name: 'Generic JWT', requireExpiration: true },
  {
    name: 'OAuth 2.0 Access Token',
    allowedAlgorithms: ['RS256', 'PS256', 'ES256', 'EdDSA'],
    requiredClaims: ['iss', 'sub', 'aud', 'exp', 'iat', 'jti', 'client_id'],
    requireTyp: 'at+jwt',
    requireSignature: true,
  },
  {
    name: 'OIDC ID Token',
    requiredClaims: ['iss', 'sub', 'aud', 'exp', 'iat'],
    requireSignature: true,
  },
  {
    name: 'High Security API',
    allowedAlgorithms: ['PS256', 'ES256'],
    requireExpiration: true,
    requireIssuedAt: true,
    requireJti: true,
    maximumLifetime: 900,
    maximumClockSkew: 30,
    requireSignature: true,
    forbidEmbeddedJwk: true,
    forbidRemoteJku: true,
  },
  {
    name: 'Internal Session',
    requireExpiration: true,
    requireIssuedAt: true,
    maximumLifetime: 3600,
    requireSignature: true,
  },
  {
    name: 'Machine-to-Machine',
    requiredClaims: ['iss', 'aud', 'exp', 'client_id'],
    maximumLifetime: 1800,
    requireSignature: true,
  },
];
export function readPolicy(raw: string): Policy {
  const parsed = readJson(raw);
  if (
    parsed.issues.length ||
    !object(parsed.value) ||
    typeof parsed.value.name !== 'string' ||
    !parsed.value.name ||
    parsed.value.name.length > 100
  )
    throw new Error('Policy must have an unambiguous name (1–100 characters).');
  const p = parsed.value;
  const arrays = [
    'allowedAlgorithms',
    'forbiddenAlgorithms',
    'requiredClaims',
    'forbiddenClaims',
    'issuerAllowlist',
    'audienceAllowlist',
    'requiredScopes',
    'forbiddenScopes',
    'requiredRoles',
    'forbiddenRoles',
    'allowedKeyIds',
  ];
  const bools = [
    'requireExpiration',
    'requireIssuedAt',
    'requireNotBefore',
    'requireJti',
    'requireSignature',
    'forbidEmbeddedJwk',
    'forbidRemoteJku',
  ];
  const nums = ['maximumLifetime', 'maximumClockSkew'];
  for (const [k, v] of Object.entries(p)) {
    if (k === 'name') continue;
    if (arrays.includes(k)) {
      if (
        !Array.isArray(v) ||
        v.length > 100 ||
        v.some((x) => typeof x !== 'string' || x.length > 500)
      )
        throw new Error('Policy lists must contain at most 100 strings.');
    } else if (bools.includes(k)) {
      if (typeof v !== 'boolean')
        throw new Error('Policy flags must be boolean.');
    } else if (nums.includes(k)) {
      if (
        typeof v !== 'number' ||
        !Number.isFinite(v) ||
        v < 0 ||
        (k === 'maximumClockSkew' && v > 120)
      )
        throw new Error(
          'Invalid lifetime or skew; skew must be 0–120 seconds.',
        );
    } else if (k === 'requireTyp') {
      if (typeof v !== 'string')
        throw new Error('requireTyp must be a string.');
    } else
      throw new Error('Unknown policy field. Check the documented schema.');
  }
  return p as unknown as Policy;
}
export function words(v: Value | undefined): string[] {
  return typeof v === 'string'
    ? v.split(/\s+/).filter(Boolean)
    : Array.isArray(v)
      ? v.filter((x): x is string => typeof x === 'string')
      : [];
}
export function evaluate(
  t: Inspection,
  p: Policy,
  crypto: CryptoStatus = 'NOT VERIFIED',
  now = Date.now() / 1000,
): PolicyCheck[] {
  const out: PolicyCheck[] = [];
  const add = (rule: string, ok: boolean, description: string) =>
    out.push({ rule, status: ok ? 'Passed' : 'Failed', description });
  const h = t.header,
    c = t.payload ?? {};
  if (!t.payload)
    out.push({
      rule: 'claims applicability',
      status: 'Warnings',
      description:
        'No JWT claims are available. JWE ciphertext is not evaluated.',
    });
  for (const [field, allow] of [
    ['allowedAlgorithms', true],
    ['forbiddenAlgorithms', false],
  ] as const)
    if (p[field])
      add(
        field,
        p[field]!.includes(String(h.alg)) === allow,
        'Declared algorithm compared with policy.',
      );
  for (const name of p.requiredClaims ?? [])
    add(
      'required claim: ' + name,
      Object.hasOwn(c, name),
      'Top-level claim presence.',
    );
  for (const name of p.forbiddenClaims ?? [])
    add(
      'forbidden claim: ' + name,
      !containsKey(c, name),
      'Checked recursively.',
    );
  for (const [flag, claim] of [
    ['requireExpiration', 'exp'],
    ['requireIssuedAt', 'iat'],
    ['requireNotBefore', 'nbf'],
  ] as const)
    if (p[flag])
      add(flag, finite(c[claim]) !== undefined, 'A numeric claim is required.');
  if (p.requireJti)
    add(
      'requireJti',
      typeof c.jti === 'string' && !!c.jti,
      'Nonempty string jti required.',
    );
  if (p.issuerAllowlist)
    add(
      'issuerAllowlist',
      typeof c.iss === 'string' && p.issuerAllowlist.includes(c.iss),
      'Issuer compared locally; authenticity not implied.',
    );
  if (p.audienceAllowlist)
    add(
      'audienceAllowlist',
      (typeof c.aud === 'string' ? [c.aud] : words(c.aud)).some((v) =>
        p.audienceAllowlist!.includes(v),
      ),
      'At least one allowed recipient required.',
    );
  if (p.allowedKeyIds)
    add(
      'allowedKeyIds',
      typeof h.kid === 'string' && p.allowedKeyIds.includes(h.kid),
      'Key ID compared with policy.',
    );
  for (const [field, claim, required] of [
    ['requiredScopes', 'scope', true],
    ['forbiddenScopes', 'scope', false],
    ['requiredRoles', 'roles', true],
    ['forbiddenRoles', 'roles', false],
  ] as const)
    if (p[field]) {
      const set = words(c[claim] ?? (claim === 'scope' ? c.scp : undefined));
      add(
        field,
        p[field]!.every((v) => set.includes(v) === required),
        'Exact scope/role membership.',
      );
    }
  const time = timeline(c, now, p.maximumClockSkew ?? 0);
  if (p.maximumLifetime !== undefined)
    add(
      'maximumLifetime',
      time.lifetime !== undefined &&
        time.lifetime >= 0 &&
        time.lifetime <= p.maximumLifetime,
      'Requires numeric iat and exp within the configured lifetime.',
    );
  if ('exp' in c || 'nbf' in c)
    add(
      'temporal window',
      !time.expired && !time.early && !time.invalid.length,
      'Evaluated with policy clock skew.',
    );
  if (p.requireSignature)
    out.push({
      rule: 'requireSignature',
      status:
        crypto === 'SIGNATURE VALID'
          ? 'Passed'
          : crypto === 'NOT VERIFIED'
            ? 'Warnings'
            : 'Failed',
      description:
        'Requires actual verification with a supplied trusted key, not signature presence.',
    });
  if (p.forbidEmbeddedJwk)
    add('forbidEmbeddedJwk', !('jwk' in h), 'Embedded key must be absent.');
  if (p.forbidRemoteJku)
    add(
      'forbidRemoteJku',
      !('jku' in h),
      'Remote JWK reference must be absent.',
    );
  if (p.requireTyp)
    add('requireTyp', h.typ === p.requireTyp, 'Exact type match.');
  return out;
}
function containsKey(v: Value, key: string): boolean {
  return (
    !!v &&
    typeof v === 'object' &&
    (Object.hasOwn(v, key) || Object.values(v).some((x) => containsKey(x, key)))
  );
}
