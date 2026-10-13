import { CompactSign } from 'jose';
import { readJson, object } from '../parsing/json';
import { encode, utf8 } from '../jose/inspect';
import { loadKey } from '../crypto/keys';
export async function build(
  header: string,
  payload: string,
  sign: boolean,
  algorithm: string,
  key: string,
  mode: 'secret' | 'key',
) {
  const h = readJson(header),
    p = readJson(payload);
  if (
    !object(h.value) ||
    !object(p.value) ||
    h.issues.length ||
    p.issues.some((i) => i.kind === 'duplicate')
  )
    throw new Error('Use unambiguous header and payload JSON objects.');
  if (h.value.b64 !== undefined || h.value.crit !== undefined)
    throw new Error('Builder does not support critical extensions.');
  if (!sign) {
    if (h.value.alg !== 'none')
      throw new Error(
        'Unsigned development tokens must explicitly declare alg: none.',
      );
    return encode(utf8(header)) + '.' + encode(utf8(payload)) + '.';
  }
  if (h.value.alg !== algorithm)
    throw new Error(
      'Header algorithm must equal the selected signing algorithm.',
    );
  const imported = await loadKey(key, algorithm, mode, h.value.kid, 'sign');
  return new CompactSign(utf8(payload))
    .setProtectedHeader(JSON.parse(header))
    .sign(imported);
}
