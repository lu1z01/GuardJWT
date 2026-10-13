import { inspect } from './inspect';
import { audit } from '../audit/analyze';
export function analyze(input: string, now = Date.now() / 1000) {
  const token = inspect(input);
  return { token, findings: token.ok ? audit(token, now) : [] };
}
export type Analysis = ReturnType<typeof analyze>;
