import { analyze } from '../jose/workspace';
import { score } from '../audit/analyze';
import { MAX_INPUT, print } from '../parsing/json';
export function batch(raw: string) {
  if (raw.length > MAX_INPUT) throw new Error('Batch exceeds 1 MiB.');
  const lines = raw.split(/\r?\n/).filter((s) => s.trim());
  if (lines.length > 50) throw new Error('Batch limit: 50 tokens.');
  return lines.map((input, i) => {
    const a = analyze(input);
    return {
      index: i + 1,
      format: a.token.ok ? a.token.format : 'Invalid',
      algorithm: a.token.ok ? print(a.token.header.alg, false) : '—',
      issuer: a.token.ok ? print(a.token.payload?.iss, false) : '—',
      audience: a.token.ok ? print(a.token.payload?.aud, false) : '—',
      expiration: a.token.ok ? print(a.token.payload?.exp, false) : '—',
      status: a.token.ok ? 'Decoded · not verified' : a.token.message,
      score: a.token.ok ? score(a.findings).hygiene : undefined,
      size: input.length,
    };
  });
}
