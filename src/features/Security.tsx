import { useState } from 'react';
import { score, type Finding } from '../core/audit/analyze';
export function Security({
  findings,
  pointer = '',
  onClaim,
  onClearFilter,
}: {
  findings: Finding[];
  pointer?: string;
  onClaim?: (pointer: string) => void;
  onClearFilter?: () => void;
}) {
  const [q, setQ] = useState('');
  const [severity, setSeverity] = useState('');
  const s = score(findings);
  const matched = findings.filter(
    (f) =>
      (!pointer || f.claimPointers?.includes(pointer)) &&
      (!severity || f.severity === severity) &&
      (f.title + ' ' + f.category + ' ' + f.evidence)
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  const [limit, setLimit] = useState(100);
  return (
    <>
      <h2>Security Auditor</h2>
      <div className="toolbar">
        <strong>Token hygiene {s.hygiene}/100</strong>
        <strong>Privacy exposure score {s.privacy}/100</strong>
      </div>
      <p className="muted">
        Observable properties only, not the security of the issuing application.
        Unverified signatures are not counted as failed.
      </p>
      <details>
        <summary>Score calculation</summary>
        <p>
          Each axis starts at 100. High −20, Medium −10, Low −3; Info/Pass 0.
          Minimum 0. Privacy findings affect only privacy.
        </p>
        {s.penalties.slice(0, 100).map((p) => (
          <div key={p.id}>
            −{p.points} {p.title}
          </div>
        ))}
      </details>
      <input
        aria-label="Search findings"
        placeholder="Filter findings"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setLimit(100);
        }}
      />
      <label>
        Severity
        <select
          value={severity}
          onChange={(e) => {
            setSeverity(e.target.value);
            setLimit(100);
          }}
        >
          <option value="">All severities</option>
          {['High', 'Medium', 'Low', 'Info', 'Pass'].map((level) => (
            <option key={level} value={level}>
              {level} ({findings.filter((f) => f.severity === level).length})
            </option>
          ))}
        </select>
      </label>
      {pointer && (
        <p>
          Related to <code>{pointer}</code>{' '}
          <button onClick={onClearFilter}>Show all findings</button>
        </p>
      )}
      <p>{matched.length} matching findings</p>
      {matched.slice(0, limit).map((f) => (
        <details className="finding" key={f.id}>
          <summary>
            <span className={'severity ' + f.severity}>{f.severity}</span>{' '}
            {f.title}{' '}
            <small>
              {f.category} · {f.scope}
            </small>
          </summary>
          <p>{f.description}</p>
          {onClaim &&
            f.claimPointers?.map((p) => (
              <button key={p} onClick={() => onClaim(p)}>
                View claim {p}
              </button>
            ))}
          <pre>{f.evidence}</pre>
          <p>
            <strong>What to check:</strong> {f.recommendation}
          </p>
          <p>
            Confidence: {f.confidence} ·{' '}
            <a href={f.reference} target="_blank" rel="noopener noreferrer">
              Technical reference
            </a>
          </p>
        </details>
      ))}
      {matched.length > limit && (
        <button onClick={() => setLimit(limit + 100)}>
          Show more findings
        </button>
      )}
      {!findings.length && (
        <p>
          No findings from the implemented checks. This is not a security
          guarantee.
        </p>
      )}
    </>
  );
}
