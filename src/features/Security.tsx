import { useI18n } from '../i18n/context';
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
  const { tr } = useI18n();
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
      <h2>{tr('Security Auditor')}</h2>
      <div className="toolbar">
        <strong>
          {tr('Token hygiene')} {s.hygiene}/100
        </strong>
        <strong>
          {tr('Privacy exposure score')} {s.privacy}/100
        </strong>
      </div>
      <p className="muted">
        {' '}
        {tr(
          'Observable properties only, not the security of the issuing application. Unverified signatures are not counted as failed.',
        )}{' '}
      </p>
      <details>
        <summary>{tr('Score calculation')}</summary>
        <p>
          {' '}
          {tr(
            'Each axis starts at 100. High −20, Medium −10, Low −3; Info/Pass 0. Minimum 0. Privacy findings affect only privacy.',
          )}{' '}
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
        {' '}
        {tr('Severity')}{' '}
        <select
          value={severity}
          onChange={(e) => {
            setSeverity(e.target.value);
            setLimit(100);
          }}
        >
          <option value="">{tr('All severities')}</option>
          {['High', 'Medium', 'Low', 'Info', 'Pass'].map((level) => (
            <option key={level} value={level}>
              {tr(level)} ({findings.filter((f) => f.severity === level).length}
              )
            </option>
          ))}
        </select>
      </label>
      {pointer && (
        <p>
          {' '}
          {tr('Related to')} <code>{pointer}</code>{' '}
          <button onClick={onClearFilter}>{tr('Show all findings')}</button>
        </p>
      )}
      <p>
        {matched.length} {tr('matching findings')}
      </p>
      {matched.slice(0, limit).map((f) => (
        <details className="finding" key={f.id}>
          <summary>
            <span className={'severity ' + f.severity}>{tr(f.severity)}</span>{' '}
            {f.title}{' '}
            <small>
              {f.category} · {f.scope}
            </small>
          </summary>
          <p>{f.description}</p>
          {onClaim &&
            f.claimPointers?.map((p) => (
              <button key={p} onClick={() => onClaim(p)}>
                {' '}
                {tr('View claim')} {p}
              </button>
            ))}
          <pre>{f.evidence}</pre>
          <p>
            <strong>{tr('What to check:')}</strong> {f.recommendation}
          </p>
          <p>
            {' '}
            {tr('Confidence:')} {tr(f.confidence)} ·{' '}
            <a href={f.reference} target="_blank" rel="noopener noreferrer">
              {' '}
              {tr('Technical reference')}{' '}
            </a>
          </p>
        </details>
      ))}
      {matched.length > limit && (
        <button onClick={() => setLimit(limit + 100)}>
          {' '}
          {tr('Show more findings')}{' '}
        </button>
      )}
      {!findings.length && (
        <p>
          {' '}
          {tr(
            'No findings from the implemented checks. This is not a security guarantee.',
          )}{' '}
        </p>
      )}
    </>
  );
}
