import { scan } from '../pii/scan';
import type { Obj, Value } from '../parsing/json';
export type RedactionProfile = 'Default' | 'Privacy' | 'Support' | 'Strict';
export function redact(payload: Obj, profile: RedactionProfile): Obj {
  const sensitive = new Set(scan(payload).map((e) => e.pointer));
  function walk(v: Value, path: string, name: string): Value {
    if (
      sensitive.has(path) ||
      (profile === 'Privacy' &&
        /^(iss|aud|roles|role|scope|scp|groups|permissions|tenant|tenant_id|tenantid|tid|session|session_id|sessionid|session_state|sid|client_id|azp|auth_time|acr|amr)$/i.test(
          name,
        )) ||
      (profile !== 'Default' &&
        /^(sub|jti|sid|name|given_name|family_name|id|tid|tenant|nonce)$/i.test(
          name,
        ))
    )
      return '[REDACTED]';
    if (Array.isArray(v))
      return v.map((x, i) => walk(x, path + '/' + i, String(i)));
    if (v && typeof v === 'object')
      return Object.fromEntries(
        Object.entries(v).map(([k, x]) => [
          k,
          walk(x, path + '/' + k.replace(/~/g, '~0').replace(/\//g, '~1'), k),
        ]),
      );
    return profile === 'Strict' ? '[REDACTED]' : v;
  }
  return walk(payload, '', '') as Obj;
}
