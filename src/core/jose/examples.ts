import { encode, utf8 } from './inspect';
import { EXAMPLE_TOKEN } from '../jwt/example';
export const EXAMPLES = [
  'Basic JWT (unsigned)',
  'Expired JWT',
  'Missing exp',
  'Future nbf',
  'alg:none',
  'HS256 structure',
  'RS256 structure',
  'ES256 structure',
  'Nested claims',
  'Unicode JWT',
  'Large JWT',
  'Duplicate claim',
  'JWE example',
  'OIDC-like',
  'OAuth access-like',
  'Embedded JWK',
  'jku header',
  'crit header',
  'b64=false JWS',
  'Nested JWT',
];
export function example(name: string) {
  const now = Math.floor(Date.now() / 1000);
  const h: Record<string, unknown> = { alg: 'none', typ: 'JWT' };
  let p: Record<string, unknown> = {
    sub: 'fictional-user',
    iss: 'https://issuer.example',
    aud: 'demo-api',
    iat: now,
    exp: now + 3600,
  };
  let raw: string | undefined;
  if (name === EXAMPLES[0]) return EXAMPLE_TOKEN;
  if (name === 'Expired JWT') p.exp = now - 60;
  if (name === 'Missing exp') delete p.exp;
  if (name === 'Future nbf') p.nbf = now + 600;
  for (const a of ['HS256', 'RS256', 'ES256'])
    if (name.startsWith(a)) h.alg = a;
  if (name === 'Nested claims')
    p = {
      ...p,
      user: {
        profile: { email: 'demo@example.test' },
        roles: ['user', 'reader'],
      },
      permissions: [{ resource: 'demo', actions: ['read'] }],
    };
  if (name === 'Unicode JWT')
    p = { ...p, name: 'José 日本 العربية 🛡', 空: 'value' };
  if (name === 'Large JWT') p.large = 'x'.repeat(100000);
  if (name === 'Duplicate claim')
    raw = '{"role":"user","role":"admin","id":9223372036854775807}';
  if (name === 'OIDC-like')
    p = {
      ...p,
      nonce: 'fictional',
      auth_time: now - 60,
      azp: 'demo-client',
      at_hash: 'fictitious',
    };
  if (name === 'OAuth access-like') {
    h.typ = 'at+jwt';
    p = {
      ...p,
      client_id: 'demo-client',
      jti: 'fictional-id',
      scope: 'read write',
    };
  }
  if (name === 'Embedded JWK')
    h.jwk = {
      kty: 'RSA',
      n: 'AQAB',
      e: 'AQAB',
      kid: 'illustrative-invalid-key',
    };
  if (name === 'jku header') h.jku = 'https://keys.example/jwks';
  if (name === 'crit header') {
    h.crit = ['custom'];
    h.custom = true;
  }
  if (name === 'b64=false JWS')
    return (
      encode(utf8('{"alg":"HS256","b64":false,"crit":["b64"]}')) +
      '.Hello local JWS.AA'
    );
  if (name === 'Nested JWT')
    return (
      encode(utf8('{"alg":"none","cty":"JWT"}')) +
      '.' +
      encode(utf8(EXAMPLE_TOKEN)) +
      '.'
    );
  if (name === 'JWE example')
    return (
      encode(utf8('{"alg":"dir","enc":"A256GCM","cty":"JWT"}')) +
      '..AAAAAAAAAAAAAAAA.ZmljdGlvbmFs.AAAAAAAAAAAAAAAAAAAAAA'
    );
  return (
    encode(utf8(JSON.stringify(h))) +
    '.' +
    encode(utf8(raw ?? JSON.stringify(p))) +
    '.' +
    (h.alg === 'none' ? '' : 'AA')
  );
}
