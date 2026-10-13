import type { Claim } from './explore';
import { finite } from '../parsing/json';
import { date } from '../timeline/analyze';
import { words } from '../policy/evaluate';
const RFC = 'https://www.rfc-editor.org/rfc/rfc7519.html',
  OIDC = 'https://openid.net/specs/openid-connect-core-1_0.html';
const meanings: Record<string, [string, string, string, string]> = {
  exp: [
    'Expiration Time',
    'Temporal',
    'The JWT must not be accepted at or after this time (subject to configured clock skew).',
    RFC,
  ],
  iat: [
    'Issued At',
    'Temporal',
    'When the token was issued; not a universal activation condition.',
    RFC,
  ],
  nbf: [
    'Not Before',
    'Temporal',
    'The JWT must not be accepted before this time.',
    RFC,
  ],
  auth_time: [
    'Authentication Time',
    'Temporal',
    'When end-user authentication occurred.',
    OIDC,
  ],
  iss: [
    'Issuer',
    'Issuer / Audience',
    'Identifies the issuing principal. Compare with the issuer your application trusts.',
    RFC,
  ],
  aud: [
    'Audience',
    'Issuer / Audience',
    'Identifies intended recipients. Your application must be an intended recipient.',
    RFC,
  ],
  sub: [
    'Subject',
    'Identity',
    'Identifies the token subject within the issuer context.',
    RFC,
  ],
  jti: [
    'JWT ID',
    'Session',
    'Unique token identifier; replay protection still needs verifier-side state.',
    RFC,
  ],
  nonce: [
    'Nonce',
    'OAuth / OIDC',
    'Binds an ID token to a client authentication request.',
    OIDC,
  ],
  azp: [
    'Authorized Party',
    'OAuth / OIDC',
    'Identifies the party to which the ID token was issued.',
    OIDC,
  ],
  acr: [
    'Authentication Context Class',
    'OAuth / OIDC',
    'Authentication context; interpret according to the application agreement.',
    OIDC,
  ],
  amr: [
    'Authentication Methods',
    'OAuth / OIDC',
    'Methods used for authentication, not proof of current session state.',
    OIDC,
  ],
  at_hash: [
    'Access Token Hash',
    'OAuth / OIDC',
    'Access-token binding value; needs contextual validation.',
    OIDC,
  ],
  c_hash: [
    'Code Hash',
    'OAuth / OIDC',
    'Authorization-code binding value.',
    OIDC,
  ],
  sid: [
    'Session ID',
    'Session',
    'Session correlation identifier. Do not expose unnecessarily.',
    OIDC,
  ],
  cnf: [
    'Confirmation',
    'Confirmation',
    'Identifies proof-of-possession key information. Presence is not proof of possession.',
    'https://www.rfc-editor.org/rfc/rfc7800.html',
  ],
  jkt: [
    'JWK Thumbprint',
    'Confirmation',
    'Key thumbprint used for key binding; verify protocol context.',
    'https://www.rfc-editor.org/rfc/rfc9449.html',
  ],
  tid: [
    'Tenant ID',
    'Identity',
    'Common in Microsoft Entra identity tokens; does not itself authorize a tenant.',
    'https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference',
  ],
  oid: [
    'Object ID',
    'Identity',
    'Common Microsoft identity object identifier.',
    'https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference',
  ],
  aal: [
    'Authenticator Assurance Level',
    'OAuth / OIDC',
    'Common in Supabase authentication tokens.',
    'https://supabase.com/docs/guides/auth/jwt-fields',
  ],
  session_id: [
    'Session ID',
    'Session',
    'Common Supabase session identifier.',
    'https://supabase.com/docs/guides/auth/jwt-fields',
  ],
  user_metadata: [
    'User Metadata',
    'Custom',
    'Common Supabase metadata. User-editable metadata must not be trusted for authorization.',
    'https://supabase.com/docs/guides/auth/jwt-fields',
  ],
  'cognito:groups': [
    'Cognito Groups',
    'Authorization',
    'Group memberships commonly emitted by Amazon Cognito.',
    'https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-access-token.html',
  ],
  token_use: [
    'Token Use',
    'OAuth / OIDC',
    'Common Amazon Cognito token classification; still verify issuer and audience.',
    'https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-access-token.html',
  ],
};
export function claimDetails(c: Claim, now = Date.now() / 1000) {
  const def = Object.hasOwn(meanings, c.name) ? meanings[c.name] : undefined;
  const timestamp = ['exp', 'iat', 'nbf', 'auth_time'].includes(c.name)
    ? finite(c.value)
    : undefined;
  const temporal =
    timestamp === undefined
      ? undefined
      : {
          unix: timestamp,
          utc: date(timestamp),
          local:
            Math.abs(timestamp) <= 8.64e12
              ? new Date(timestamp * 1000).toLocaleString()
              : 'Out of supported range',
          relative: Math.round(timestamp - now),
          status:
            c.name === 'exp'
              ? now >= timestamp
                ? 'Expired'
                : 'Before expiration'
              : c.name === 'nbf'
                ? now < timestamp
                  ? 'Not yet valid'
                  : 'Activation reached'
                : 'Informational time',
        };
  const items =
    c.name === 'aud'
      ? typeof c.value === 'string'
        ? [c.value]
        : words(c.value)
      : [
            'scope',
            'scp',
            'roles',
            'permissions',
            'groups',
            'cognito:groups',
          ].includes(c.name)
        ? words(c.value)
        : undefined;
  return {
    name: def?.[0] ?? c.description,
    category: def?.[1] ?? c.category,
    meaning: def?.[2] ?? c.description,
    reference: def?.[3] ?? RFC,
    security:
      'All values are untrusted until signature, issuer, audience and application context are validated.',
    temporal,
    items,
  };
}
