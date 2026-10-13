import type { Inspection } from '../jose/inspect';
import { timeline } from '../timeline/analyze';
import { scan } from '../pii/scan';
import { object, print } from '../parsing/json';
export interface Finding {
  id: string;
  claimPointers?: string[];
  title: string;
  severity: 'High' | 'Medium' | 'Low' | 'Info' | 'Pass';
  category: string;
  description: string;
  evidence: string;
  recommendation: string;
  reference: string;
  confidence: 'High' | 'Medium' | 'Low';
  scope: 'token' | 'cryptographic' | 'server-dependent';
}
export const rfc = (n: number) => `https://www.rfc-editor.org/rfc/rfc${n}.html`;
export function audit(
  token: Inspection,
  now = Date.now() / 1000,
  skew = 0,
): Finding[] {
  const f: Finding[] = [];
  const add = (
    id: string,
    title: string,
    severity: Finding['severity'],
    category: string,
    description: string,
    evidence: string,
    recommendation: string,
    scope: Finding['scope'] = 'token',
    reference = rfc(8725),
    confidence: Finding['confidence'] = 'High',
  ) =>
    f.push({
      id,
      title,
      severity,
      category,
      description,
      evidence,
      recommendation,
      scope,
      reference,
      confidence,
    });
  const h = token.header;
  if (h.alg === 'none')
    add(
      'alg-none',
      'Unsigned algorithm declared',
      'High',
      'Algorithm',
      'Unsigned tokens can be dangerous if accepted for authentication. This does not prove a server vulnerability.',
      'alg: none',
      'Check the verifier’s explicit algorithm allowlist.',
      'server-dependent',
    );
  else if (
    !/^(HS|RS|PS|ES)(256|384|512)$|^EdDSA$|^Ed25519$/.test(String(h.alg)) &&
    token.format !== 'JWE Compact'
  )
    add(
      'alg-unknown',
      'Unrecognized signing algorithm',
      'Info',
      'Algorithm',
      'Inspection is supported; cryptographic support is separate.',
      'Algorithm not in the supported verification set.',
      'Check JOSE registry and verifier support.',
    );
  if (token.format !== 'JWE Compact' && !token.segments[2]?.bytes)
    add(
      'signature-empty',
      'Signature is absent',
      'Medium',
      'Signature',
      'No signature bytes were provided.',
      '0 signature bytes',
      'Use signed tokens when the application requires integrity.',
      'server-dependent',
    );
  for (const [i, issue] of token.issues.entries())
    add(
      'structure-' + i,
      issue.kind === 'duplicate'
        ? 'Duplicate JSON property'
        : issue.kind === 'large-number'
          ? 'Large integer detected'
          : 'Numeric precision warning',
      issue.kind === 'duplicate' ? 'Medium' : 'Info',
      'Interoperability',
      issue.kind === 'duplicate'
        ? 'Parsers may disagree about duplicate members. Raw text preserves every occurrence.'
        : 'The original numeric text is retained; large integers are represented exactly. Inspect raw JSON for decimal precision.',
      issue.kind === 'duplicate'
        ? `${issue.key} at offset ${issue.position}`
        : 'Numeric value requires attention.',
      'Avoid ambiguous JSON and use strings for identifiers outside safe numeric ranges.',
      'token',
      rfc(7519),
    );
  if ('crit' in h) {
    const c = h.crit;
    if (
      !Array.isArray(c) ||
      !c.length ||
      c.some((v) => typeof v !== 'string') ||
      new Set(c.map(String)).size !== c.length
    )
      add(
        'crit-invalid',
        'Invalid critical header list',
        'Medium',
        'JOSE Header',
        'crit must be a nonempty list of unique extension names.',
        'crit shape is invalid.',
        'Correct crit before verification.',
        'token',
        rfc(7515),
      );
    else
      for (const v of c) {
        if (typeof v === 'string' && (!Object.hasOwn(h, v) || v !== 'b64'))
          add(
            'crit-' + v,
            'Unsupported critical header parameter',
            'Medium',
            'JOSE Header',
            'Critical extensions must be understood and present. Inspection does not imply support.',
            v,
            'Reject unsupported extensions at verification.',
            'token',
            rfc(7515),
          );
      }
  }
  if (h.b64 === false && (!Array.isArray(h.crit) || !h.crit.includes('b64')))
    add(
      'b64-crit',
      'Unencoded payload missing critical declaration',
      'Medium',
      'JOSE Header',
      'RFC 7797 requires b64 in crit; this is JWS, not JWT.',
      'b64: false',
      'Include b64 in crit.',
      'token',
      rfc(7797),
    );
  if (
    'kid' in h &&
    (typeof h.kid !== 'string' ||
      !h.kid ||
      h.kid.length > 128 ||
      /[\\/:'"<>]/.test(h.kid) ||
      Array.from(h.kid).some((c) => c.charCodeAt(0) < 32))
  )
    add(
      'kid-handling',
      'Potentially unsafe key identifier handling',
      'Medium',
      'Key Management',
      'Security impact depends on how the verifier resolves keys.',
      'kid is empty, long, non-string or contains unusual characters.',
      'Resolve only against a trusted key map; never concatenate into paths or queries.',
      'server-dependent',
    );
  for (const field of ['jku', 'x5u'])
    if (field in h) {
      let detail = 'Invalid URL';
      try {
        const u = new URL(String(h[field]));
        const host = u.hostname.replace(/^\[|\]$/g, '').toLowerCase();
        const local =
          /^(localhost|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|0\.|::1$|::$|f[cd][0-9a-f]{2}:|fe[89ab][0-9a-f]:|::ffff:)/.test(
            host,
          ) ||
          host.endsWith('.localhost') ||
          !host.includes('.');
        detail = [
          u.protocol !== 'https:' ? 'Non-HTTPS' : 'HTTPS',
          local
            ? 'local/private-looking host'
            : 'host requires server-side allowlist',
          u.username || u.password ? 'embedded credentials' : '',
        ]
          .filter(Boolean)
          .join('; ');
      } catch {
        /* Local URL syntax inspection only. */
      }
      add(
        'remote-' + field,
        'Remote key reference detected',
        'Medium',
        'Key Management',
        'The URL is never requested. Host classification is heuristic; DNS resolution is not performed.',
        field + ': ' + detail,
        'Use a trusted allowlist; do not trust token-provided URLs.',
        'server-dependent',
      );
    }
  if ('jwk' in h)
    add(
      'embedded-jwk',
      'Embedded JWK is untrusted',
      'Medium',
      'Key Management',
      'An embedded key is controlled by the token producer.',
      'jwk is present.',
      'Trust only keys independently provisioned by the verifier.',
      'server-dependent',
      rfc(7517),
    );
  if ('zip' in h)
    add(
      'compression',
      'Compression declared',
      'Low',
      'JOSE Header',
      'Compression can create confidentiality risks depending on context.',
      'zip is present.',
      'Review compression requirements and threat model.',
      'server-dependent',
    );
  if (token.totalBytes > 4096)
    add(
      'size',
      'Large token',
      'Low',
      'Structure',
      'May exceed practical limits in some cookie or proxy configurations. There is no universal limit.',
      `${token.totalBytes} bytes`,
      'Check actual infrastructure limits and reduce unnecessary claims.',
    );
  if (token.payloadError)
    add(
      'payload-format',
      'Payload is not a JWT claims object',
      'Info',
      'Structure',
      token.payloadError,
      'JWS content retained.',
      'Use raw inspection for non-JWT JWS content.',
      'token',
      rfc(7515),
    );
  const p = token.payload;
  if (p) {
    const t = timeline(p, now, skew);
    if (!('exp' in p))
      add(
        'exp-missing',
        'No expiration claim',
        'Low',
        'Temporal',
        'Expiration is optional in generic JWT; many application profiles require it.',
        'exp absent',
        'Define an expiration policy for the application.',
        'server-dependent',
        rfc(7519),
      );
    for (const name of t.invalid)
      add(
        'time-' + name,
        'Invalid temporal claim',
        'Medium',
        'Temporal',
        'NumericDate must be numeric and within the supported date range.',
        name,
        'Use a NumericDate in seconds.',
        'token',
        rfc(7519),
      );
    if (t.expired)
      add(
        'expired',
        'Token has expired',
        'Medium',
        'Temporal',
        'Current time is on or after expiration with selected skew.',
        'exp boundary exceeded',
        'Obtain a fresh token; check server clock.',
        'token',
        rfc(7519),
      );
    if (t.early)
      add(
        'early',
        'Token is not yet valid',
        'Low',
        'Temporal',
        'Current time is before nbf with selected skew.',
        'nbf boundary not reached',
        'Check intended activation time and clock skew.',
        'token',
        rfc(7519),
      );
    if (t.iat !== undefined && t.iat > now + skew)
      add(
        'future-iat',
        'Issued-at time is in the future',
        'Low',
        'Temporal',
        'This may indicate clock differences or unexpected issuance.',
        'iat > analysis time',
        'Check issuer and verifier clocks.',
      );
    if (t.lifetime !== undefined && (t.lifetime < 0 || t.lifetime > 86400))
      add(
        'lifetime',
        t.lifetime < 0 ? 'Expiration precedes issuance' : 'Long token lifetime',
        t.lifetime < 0 ? 'Medium' : 'Low',
        'Temporal',
        'The one-day threshold is a workbench heuristic, not a universal RFC limit.',
        `${t.lifetime} seconds`,
        'Choose lifetime for the application threat model.',
      );
    for (const k of ['iss', 'sub', 'jti'])
      if (k in p && typeof p[k] !== 'string')
        add(
          'claim-' + k,
          'Unexpected registered claim type',
          'Medium',
          'Claims',
          'This registered claim is expected to be a string.',
          k,
          'Use the RFC-defined claim type.',
          'token',
          rfc(7519),
        );
    if (
      'aud' in p &&
      !(
        typeof p.aud === 'string' ||
        (Array.isArray(p.aud) && p.aud.every((v) => typeof v === 'string'))
      )
    )
      add(
        'aud-type',
        'Unexpected audience type',
        'Medium',
        'Claims',
        'aud should be a string or array of strings.',
        'aud',
        'Use the RFC-defined audience type.',
        'token',
        rfc(7519),
      );
    for (const [i, e] of scan(p).entries()) {
      add(
        'pii-' + i,
        e.kind,
        e.kind.includes('secret') ? 'High' : 'Medium',
        'Privacy',
        'JWT payloads are encoded, not hidden. This is a heuristic, not a confirmed data leak.',
        e.path,
        'Remove unnecessary sensitive data or use an appropriate opaque token.',
        'token',
        rfc(7519),
        e.confidence,
      );
      f[f.length - 1]!.claimPointers = [e.pointer];
    }
    if (h.typ === 'at+jwt')
      for (const k of ['iss', 'sub', 'aud', 'exp', 'iat', 'jti', 'client_id'])
        if (!(k in p))
          add(
            'oauth-' + k,
            'Access token profile claim missing',
            'Medium',
            'OAuth/OIDC',
            'The declared at+jwt profile requires this claim.',
            k,
            'Review RFC 9068 issuer requirements.',
            'token',
            rfc(9068),
          );
  }
  if (object(h.jwk))
    add(
      'jwk-meta',
      'Embedded key metadata',
      'Info',
      'Key Management',
      'Metadata is observed, not trusted.',
      ['kty', 'crv', 'use']
        .map(
          (k) =>
            `${k}: ${print((h.jwk as import('../parsing/json').Obj)[k], false)}`,
        )
        .join(', '),
      'Inspect the key separately.',
      'token',
      rfc(7517),
    );
  const temporalPointers: Record<string, string[]> = {
    'exp-missing': ['/exp'],
    expired: ['/exp'],
    early: ['/nbf'],
    'future-iat': ['/iat'],
    lifetime: ['/iat', '/exp'],
    'aud-type': ['/aud'],
  };
  for (const finding of f) {
    if (temporalPointers[finding.id])
      finding.claimPointers = temporalPointers[finding.id];
    if (/^(claim|oauth|time)-/.test(finding.id))
      finding.claimPointers = ['/' + finding.id.split('-').slice(1).join('-')];
  }
  return f;
}
export function score(findings: Finding[]) {
  const weights = { High: 20, Medium: 10, Low: 3, Info: 0, Pass: 0 };
  const penalties = findings
    .filter((f) => weights[f.severity] > 0)
    .map((f) => ({
      id: f.id,
      title: f.title,
      points: weights[f.severity],
      category: f.category,
    }));
  return {
    hygiene: Math.max(
      0,
      100 -
        penalties
          .filter((p) => p.category !== 'Privacy')
          .reduce((s, p) => s + p.points, 0),
    ),
    privacy: Math.max(
      0,
      100 -
        penalties
          .filter((p) => p.category === 'Privacy')
          .reduce((s, p) => s + p.points, 0),
    ),
    penalties,
  };
}
