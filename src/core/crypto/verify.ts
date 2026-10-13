import { compactVerify, flattenedVerify } from 'jose';
import { inspect } from '../jose/inspect';
import { loadKey, KeyError } from './keys';
export type CryptoStatus =
  | 'SIGNATURE VALID'
  | 'SIGNATURE INVALID'
  | 'NOT VERIFIED'
  | 'UNSUPPORTED'
  | 'KEY INVALID'
  | 'KEY TYPE MISMATCH';
export interface CryptoResult {
  status: CryptoStatus;
  message: string;
}
export async function verify(
  input: string,
  key: string,
  algorithm: string,
  mode: 'secret' | 'key',
): Promise<CryptoResult> {
  try {
    const token = inspect(input);
    if (!token.ok)
      return {
        status: 'NOT VERIFIED',
        message: 'Inspect a structurally readable token first.',
      };
    if (token.format === 'JWE Compact')
      return {
        status: 'UNSUPPORTED',
        message:
          'JWE inspection does not decrypt or verify authentication tags.',
      };
    if (token.header.alg !== algorithm)
      return {
        status: 'KEY TYPE MISMATCH',
        message:
          'Declared algorithm differs from the independently selected algorithm.',
      };
    if (token.issues.some((i) => i.kind === 'duplicate'))
      return {
        status: 'NOT VERIFIED',
        message:
          'Ambiguous duplicate JSON properties must be resolved before verification.',
      };
    if (!token.segments[1]?.raw)
      return {
        status: 'UNSUPPORTED',
        message: 'Detached or empty payload verification is not supported.',
      };
    const imported = await loadKey(key, algorithm, mode, token.header.kid);
    const compact = input.trim();
    if (token.header.b64 === false)
      await flattenedVerify(
        {
          protected: token.segments[0]!.raw,
          payload: token.segments[1]!.raw,
          signature: token.segments[2]!.raw,
        },
        imported,
        { algorithms: [algorithm] },
      );
    else await compactVerify(compact, imported, { algorithms: [algorithm] });
    return {
      status: 'SIGNATURE VALID',
      message:
        'Signature matches the supplied key and selected algorithm. Issuer trust, claims, authorization and key provenance are not established.',
    };
  } catch (e) {
    if (e instanceof KeyError) return { status: e.status, message: e.message };
    const code =
      typeof e === 'object' && e !== null && 'code' in e ? String(e.code) : '';
    if (code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED')
      return {
        status: 'SIGNATURE INVALID',
        message: 'Signature does not match the supplied key.',
      };
    if (
      code === 'ERR_JOSE_NOT_SUPPORTED' ||
      (e instanceof DOMException && e.name === 'NotSupportedError')
    )
      return {
        status: 'UNSUPPORTED',
        message:
          'Algorithm or critical header extension is not supported by this runtime.',
      };
    return {
      status: 'KEY INVALID',
      message:
        'Unable to use the supplied key or JOSE parameters. Check format, curve, key size and operation permissions.',
    };
  }
}
