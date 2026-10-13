import { useI18n } from '../i18n/context';
import { useState } from 'react';
import type { Inspection } from '../core/jose/inspect';
import { useAnalysis } from '../hooks/useAnalysis';
import { compare } from '../core/compare/diff';
export function Compare({ token }: { token: Inspection }) {
  const { tr } = useI18n();
  const [other, setOther] = useState('');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(100);
  const [error, setError] = useState('');
  const data = useAnalysis(other);
  const t = data?.token;
  const rows = t?.ok
    ? compare(
        {
          header: token.header,
          claims: token.payload ?? {},
          size: token.totalBytes,
          signatureBytes: token.segments.at(-1)?.bytes ?? 0,
        },
        {
          header: t.header,
          claims: t.payload ?? {},
          size: t.totalBytes,
          signatureBytes: t.segments.at(-1)?.bytes ?? 0,
        },
      )
    : [];
  return (
    <>
      <h2>{tr('Compare · current token A vs token B')}</h2>
      <label>
        {' '}
        {tr('Token B')}{' '}
        <textarea
          value={other}
          spellCheck={false}
          onChange={(e) => {
            setError(
              e.target.value.length > 1048576
                ? 'Comparison input exceeds 1 MiB.'
                : '',
            );
            setOther(e.target.value.length <= 1048576 ? e.target.value : '');
            setLimit(100);
          }}
        />
      </label>
      {other && t && !t.ok && <p role="alert">{tr(t.message)}</p>}
      {error && <p role="alert">{tr(error)}</p>}
      <input
        aria-label={tr('Search differences')}
        placeholder={tr('Filter paths')}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setLimit(100);
        }}
      />
      <p>
        {rows.length}{' '}
        {tr(
          'changed fields. Value previews are limited to 2500 characters.',
        )}{' '}
      </p>
      <div
        className="table-scroll"
        role="region"
        aria-label={tr('Compare table')}
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th>{tr('Path / change')}</th>
              <th>A</th>
              <th>B</th>
              <th>{tr('Semantic change')}</th>
            </tr>
          </thead>
          <tbody>
            {rows
              .filter((r) => r.path.toLowerCase().includes(query.toLowerCase()))
              .slice(0, limit)
              .map((r) => (
                <tr key={r.path}>
                  <td>
                    {r.path}
                    <small>{tr(r.status)}</small>
                  </td>
                  <td>
                    <pre>{r.before.slice(0, 2500)}</pre>
                  </td>
                  <td>
                    <pre>{r.after.slice(0, 2500)}</pre>
                  </td>
                  <td>
                    {r.added.length > 0 && (
                      <p>
                        {tr('Added:')} {r.added.join(', ')}
                      </p>
                    )}
                    {r.removed.length > 0 && (
                      <p>
                        {tr('Removed:')} {r.removed.join(', ')}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {rows.length > limit && (
        <button onClick={() => setLimit(limit + 100)}>
          {' '}
          {tr('Show more differences')}{' '}
        </button>
      )}
      {other && t?.ok && !rows.length && (
        <p>{tr('No differences in compared fields.')}</p>
      )}
    </>
  );
}
