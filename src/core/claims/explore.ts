import { object, type Obj, type Value } from '../parsing/json';
export const CLAIMS: Record<string, { category: string; description: string }> =
  Object.fromEntries(
    [
      [
        'standard',
        'iss:Issuer|sub:Subject|aud:Intended audience|jti:Token identifier',
      ],
      [
        'temporal',
        'exp:Expiration NumericDate|iat:Issued-at NumericDate|nbf:Not-before NumericDate|auth_time:Authentication time',
      ],
      [
        'security',
        'nonce:Request binding nonce|azp:Authorized party|acr:Authentication context|amr:Authentication methods|at_hash:Access token hash|c_hash:Authorization code hash|s_hash:State hash|cnf:Confirmation key|jkt:JWK thumbprint|act:Acting party|may_act:Authorized actor',
      ],
      [
        'authorization',
        'scope:Space-delimited scopes|scp:Scopes|roles:Roles|permissions:Permissions|groups:Groups|client_id:Client identifier',
      ],
      [
        'identity',
        'email:Email address|name:Display name|phone:Phone number|address:Address|sid:Session identifier|session_state:Session state|tenant:Tenant|tid:Tenant identifier|typ:Token type',
      ],
    ].flatMap(([category, list]) =>
      list!.split('|').map((pair) => {
        const [key, description] = pair.split(':');
        return [key!, { category: category!, description: description! }];
      }),
    ),
  );
export interface Claim {
  path: string;
  pointer: string;
  name: string;
  type: string;
  category: string;
  description: string;
  value: Value;
}
export function claims(payload: Obj): Claim[] {
  const rows: Claim[] = [];
  function walk(v: Value, path: string[], pointer: string) {
    if (path.length) {
      const name = path.at(-1)!;
      const def = Object.hasOwn(CLAIMS, name) ? CLAIMS[name] : undefined;
      rows.push({
        path: path.join('.'),
        pointer,
        name,
        type: Array.isArray(v)
          ? `array[${v.length}]`
          : v === null
            ? 'null'
            : typeof v === 'bigint'
              ? 'large integer'
              : object(v)
                ? 'object'
                : typeof v,
        category: def?.category ?? 'custom',
        description:
          def?.description ?? 'Custom claim; not inherently invalid.',
        value: v,
      });
    }
    if (v && typeof v === 'object')
      for (const [k, child] of Object.entries(v))
        walk(
          child,
          [...path, k],
          pointer + '/' + k.replace(/~/g, '~0').replace(/\//g, '~1'),
        );
  }
  walk(payload, [], '');
  return rows;
}
export function profile(header: Obj, payload?: Obj) {
  if (!payload)
    return { name: 'JOSE object', confidence: 'Low', evidence: [] as string[] };
  const has = (keys: string[]) => keys.filter((k) => Object.hasOwn(payload, k));
  if (header.typ === 'dpop+jwt')
    return {
      name: 'Likely DPoP proof',
      confidence: 'High',
      evidence: ['typ: dpop+jwt', ...has(['htu', 'htm', 'jti'])],
    };
  if (header.typ === 'at+jwt' || header.typ === 'application/at+jwt')
    return {
      name: 'Likely OAuth 2.0 Access Token',
      confidence: 'High',
      evidence: ['typ: at+jwt'],
    };
  const oidc = has(['nonce', 'auth_time', 'azp', 'at_hash', 'c_hash']);
  if (oidc.length >= 2)
    return {
      name: 'Possible OpenID Connect ID Token',
      confidence: 'Medium',
      evidence: oidc,
    };
  if (has(['scope', 'scp']).length)
    return {
      name: 'Possible OAuth 2.0 Access Token',
      confidence: 'Low',
      evidence: has(['scope', 'scp', 'client_id']),
    };
  if (has(['sid', 'session_state']).length)
    return {
      name: 'Possible session token',
      confidence: 'Low',
      evidence: has(['sid', 'session_state']),
    };
  if (has(['client_id']).length)
    return {
      name: 'Possible service token',
      confidence: 'Low',
      evidence: ['client_id'],
    };
  return { name: 'Generic JWT', confidence: 'Low', evidence: [] as string[] };
}
