import { CompactSign, exportPKCS8, exportSPKI, generateKeyPair } from 'jose';
import { encode, utf8 } from '../jose/inspect';
export const SAMPLE_ALGORITHMS = [
  'none',
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
] as const;
// Synthetic value for examples only; never a credential.
export const SAMPLE_SECRET =
  'guardjwt-example-secret-only-for-demos-never-use-it-for-real-tokens-0123456789';
export const isHmac = (alg: unknown) =>
  typeof alg === 'string' && alg.startsWith('HS');
export function samplePayload(now = Math.floor(Date.now() / 1000)) {
  return {
    iss: 'https://issuer.example',
    sub: '1234567890',
    name: 'Alex Example',
    admin: true,
    iat: now,
    exp: now + 3600,
  };
}
export interface Sample {
  alg: string;
  header: string;
  payload: string;
  token: string;
  /** HMAC secret, or the verification key for asymmetric algorithms. */
  verifyKey: string;
  /** Private key PEM for asymmetric algorithms. */
  signKey: string;
}
export async function generateSample(alg: string): Promise<Sample> {
  const header = JSON.stringify({ alg, typ: 'JWT' }, null, 2);
  const payload = JSON.stringify(samplePayload(), null, 2);
  if (alg === 'none')
    return {
      alg,
      header,
      payload,
      token:
        encode(utf8(JSON.stringify({ alg, typ: 'JWT' }))) +
        '.' +
        encode(utf8(JSON.stringify(JSON.parse(payload)))) +
        '.',
      verifyKey: '',
      signKey: '',
    };
  let key: CryptoKey | Uint8Array;
  let verifyKey = SAMPLE_SECRET;
  let signKey = SAMPLE_SECRET;
  if (isHmac(alg)) key = utf8(SAMPLE_SECRET);
  else {
    const pair = await generateKeyPair(alg, {
      extractable: true,
      ...(/^(RS|PS)/.test(alg) ? { modulusLength: 2048 } : {}),
    });
    key = pair.privateKey;
    verifyKey = await exportSPKI(pair.publicKey);
    signKey = await exportPKCS8(pair.privateKey);
  }
  const token = await new CompactSign(utf8(JSON.stringify(JSON.parse(payload))))
    .setProtectedHeader({ alg, typ: 'JWT' })
    .sign(key);
  return { alg, header, payload, token, verifyKey, signKey };
}
