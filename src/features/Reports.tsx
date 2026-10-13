import { useState } from 'react';
import {
  safeReport,
  reportText,
  DEFAULT_REPORT,
  type ReportOptions,
} from '../core/reports/safe';
import type { Inspection } from '../core/jose/inspect';
import type { Finding } from '../core/audit/analyze';
import type { CryptoStatus } from '../core/crypto/verify';
import type { PolicyCheck } from '../core/policy/evaluate';
import { CopyButton } from '../components/CopyButton';
export function Reports({
  token,
  findings,
  status,
  checks,
}: {
  token: Inspection;
  findings: Finding[];
  status: CryptoStatus;
  checks: PolicyCheck[];
}) {
  const [options, setOptions] = useState(DEFAULT_REPORT),
    [format, setFormat] = useState<'JSON' | 'Markdown' | 'Plain Text'>('JSON');
  const preview = reportText(
    safeReport(token, findings, status, checks, options),
    format,
  );
  return (
    <>
      <h2>Safe report</h2>
      <p>
        Review the exact export below. Values, evidence, token, keys and
        signature bytes are excluded. Claim names and timestamps may identify a
        user or system; include them only deliberately.
      </p>
      <div className="toolbar">
        {Object.keys(options).map((k) => (
          <label className="check" key={k}>
            <input
              type="checkbox"
              checked={options[k as keyof ReportOptions]}
              onChange={(e) =>
                setOptions({ ...options, [k]: e.target.checked })
              }
            />
            {k}
          </label>
        ))}
      </div>
      <label>
        Format
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as typeof format)}
        >
          {['JSON', 'Markdown', 'Plain Text'].map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </label>
      <pre>{preview}</pre>
      <CopyButton value={preview} label="Copy report" />
      <button
        onClick={() => {
          const url = URL.createObjectURL(
            new Blob([preview], { type: 'text/plain;charset=utf-8' }),
          );
          const a = document.createElement('a');
          a.href = url;
          a.download =
            'guardjwt-report.' +
            (format === 'JSON' ? 'json' : format === 'Markdown' ? 'md' : 'txt');
          a.click();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }}
      >
        Download preview
      </button>
    </>
  );
}
