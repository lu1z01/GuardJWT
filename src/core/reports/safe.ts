import { version } from '../../../package.json';
import type { Inspection } from '../jose/inspect';
import type { Finding } from '../audit/analyze';
import { score } from '../audit/analyze';
import type { CryptoStatus } from '../crypto/verify';
import type { PolicyCheck } from '../policy/evaluate';
export interface ReportOptions {
  algorithm: boolean;
  claimNames: boolean;
  temporal: boolean;
  findings: boolean;
  policy: boolean;
  signature: boolean;
  pii: boolean;
}
export const DEFAULT_REPORT: ReportOptions = {
  algorithm: true,
  claimNames: false,
  temporal: false,
  findings: true,
  policy: true,
  signature: true,
  pii: false,
};
export function safeReport(
  t: Inspection,
  findings: Finding[],
  crypto: CryptoStatus,
  policy: PolicyCheck[],
  options: ReportOptions,
) {
  const known = /^(HS|RS|PS|ES)(256|384|512)$|^none$|^EdDSA$|^Ed25519$/;
  return {
    application: 'GuardJWT',
    version,
    notice:
      'Observable token properties only. Raw token, values, evidence, keys and signature bytes are excluded.',
    format: t.format,
    ...(options.algorithm
      ? {
          algorithm: known.test(String(t.header.alg))
            ? String(t.header.alg)
            : 'Other / unrecognized',
        }
      : {}),
    ...(options.claimNames ? { claimNames: Object.keys(t.payload ?? {}) } : {}),
    ...(options.temporal
      ? {
          temporal: Object.fromEntries(
            ['exp', 'nbf', 'iat']
              .filter((k) => typeof t.payload?.[k] === 'number')
              .map((k) => [k, t.payload![k]]),
          ),
        }
      : {}),
    ...(options.findings
      ? {
          findings: findings
            .filter((f) => options.pii || f.category !== 'Privacy')
            .map((f) => ({
              title: f.title,
              severity: f.severity,
              category: f.category,
              scope: f.scope,
              confidence: f.confidence,
              reference: f.reference,
            })),
        }
      : {}),
    scores: {
      hygiene: score(findings).hygiene,
      privacy: score(findings).privacy,
    },
    ...(options.signature ? { signature: crypto } : {}),
    ...(options.policy
      ? {
          policy: {
            passed: policy.filter((p) => p.status === 'Passed').length,
            inconclusive: policy.filter((p) => p.status === 'Inconclusive')
              .length,
            warnings: policy.filter((p) => p.status === 'Warnings').length,
            failed: policy.filter((p) => p.status === 'Failed').length,
          },
        }
      : {}),
  };
}
export function reportText(
  report: ReturnType<typeof safeReport>,
  format: 'JSON' | 'Markdown' | 'Plain Text',
) {
  const json = JSON.stringify(report, null, 2);
  return format === 'JSON'
    ? json
    : format === 'Markdown'
      ? '# GuardJWT safe report\n\n```json\n' + json + '\n```\n'
      : 'GuardJWT safe report\n\n' + json;
}
