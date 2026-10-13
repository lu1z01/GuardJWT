import { useMemo, useState } from 'react';
import { claims } from '../core/claims/explore';
import { claimDetails } from '../core/claims/details';
import { print, type Obj } from '../core/parsing/json';
import { scan } from '../core/pii/scan';
import { CopyButton } from '../components/CopyButton';
export function Claims({
  payload,
  selectedPointer = '',
  onDecoder,
  onSecurity,
}: {
  payload: Obj;
  selectedPointer?: string;
  onDecoder?: (p: string) => void;
  onSecurity?: (pointer: string) => void;
}) {
  const [q, setQ] = useState(''),
    [category, setCategory] = useState(''),
    [sort, setSort] = useState('Original order'),
    [page, setPage] = useState(0),
    [selected, setSelected] = useState(selectedPointer);
  const all = useMemo(() => claims(payload), [payload]);
  const pii = useMemo(
    () => new Set(scan(payload).map((e) => e.pointer)),
    [payload],
  );
  const rows = useMemo(() => {
    const r = all.filter((c) => {
      const d = claimDetails(c);
      return (
        (!category ||
          (category === 'PII'
            ? pii.has(c.pointer)
            : category === 'Standard'
              ? ['iss', 'sub', 'aud', 'exp', 'iat', 'nbf', 'jti'].includes(
                  c.name,
                )
              : category === 'Custom'
                ? d.category.toLowerCase() === 'custom'
                : d.category.toLowerCase() === category.toLowerCase())) &&
        (c.path + ' ' + c.name + ' ' + d.category + ' ' + print(c.value, false))
          .toLowerCase()
          .includes(q.toLowerCase())
      );
    });
    if (sort === 'Alphabetical') r.sort((a, b) => a.path.localeCompare(b.path));
    if (sort === 'Category')
      r.sort((a, b) =>
        claimDetails(a).category.localeCompare(claimDetails(b).category),
      );
    if (sort === 'Risk')
      r.sort((a, b) => Number(pii.has(b.pointer)) - Number(pii.has(a.pointer)));
    return r;
  }, [all, category, q, sort, pii]);
  const active = all.find((c) => c.pointer === selected);
  return (
    <>
      <h2>Claims Breakdown</h2>
      <div className="toolbar">
        <span>Claims {all.length}</span>
        <span>
          Standard{' '}
          {
            all.filter((c) =>
              ['iss', 'sub', 'aud', 'exp', 'iat', 'nbf', 'jti'].includes(
                c.name,
              ),
            ).length
          }
        </span>
        <span>
          Custom{' '}
          {
            all.filter(
              (c) => claimDetails(c).category.toLowerCase() === 'custom',
            ).length
          }
        </span>
        <span>
          Temporal {all.filter((c) => c.category === 'temporal').length}
        </span>
        <span>Possible PII {pii.size}</span>
      </div>
      <div className="toolbar">
        <input
          aria-label="Search claims"
          placeholder="Search names, paths, values or categories"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(0);
          }}
        />
        <select
          aria-label="Claim category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(0);
          }}
        >
          <option value="">All</option>
          {[
            'Standard',
            'Custom',
            'Temporal',
            'Authorization',
            'PII',
            'OAuth / OIDC',
            'Identity',
            'Issuer / Audience',
            'Session',
            'Confirmation',
          ].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          aria-label="Claim sorting"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(0);
          }}
        >
          {['Original order', 'Alphabetical', 'Category', 'Risk'].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      {selected && !active && (
        <p role="status">Claim {selected} is absent from this payload.</p>
      )}
      {active &&
        (() => {
          const d = claimDetails(active);
          return (
            <section className="claim-detail" aria-label="Selected claim">
              <h2>
                {active.name} — {d.name}
              </h2>
              <p>
                {d.category} · {d.temporal ? 'NumericDate' : active.type}{' '}
                {pii.has(active.pointer) ? '· Possible PII' : ''}
              </p>
              <p>{d.meaning}</p>
              <pre>{print(active.value)}</pre>
              <p>{d.security}</p>
              {d.temporal && (
                <dl>
                  <dt>Unix</dt>
                  <dd>{d.temporal.unix}</dd>
                  <dt>UTC</dt>
                  <dd>{d.temporal.utc}</dd>
                  <dt>Local</dt>
                  <dd>{d.temporal.local}</dd>
                  <dt>Relative to analysis time</dt>
                  <dd>
                    {Math.abs(d.temporal.relative)} seconds{' '}
                    {d.temporal.relative >= 0 ? 'from now' : 'ago'}
                  </dd>
                  <dt>Temporal status only</dt>
                  <dd>{d.temporal.status}</dd>
                </dl>
              )}
              {d.items && (
                <>
                  <p>Items: {d.items.length}</p>
                  {d.items.slice(0, 100).map((v, i) => (
                    <div className="toolbar" key={i}>
                      <code>{v}</code>
                      <CopyButton value={v} label="Copy item" />
                    </div>
                  ))}
                  {d.items.length > 100 && (
                    <p className="muted">
                      Showing the first 100 items. Copy Value retains the full
                      claim; use Claims search to inspect other items.
                    </p>
                  )}
                </>
              )}
              <div className="toolbar">
                <CopyButton value={active.path} label="Copy Path" />
                <CopyButton value={active.pointer} label="Copy JSON Pointer" />
                <CopyButton
                  value={print(active.value, false)}
                  label="Copy Value"
                />
                {onDecoder && (
                  <button onClick={() => onDecoder(active.pointer)}>
                    Show in Decoder
                  </button>
                )}
                {onSecurity && (
                  <button onClick={() => onSecurity(active.pointer)}>
                    Related Security Findings
                  </button>
                )}
                <a href={d.reference} rel="noopener noreferrer" target="_blank">
                  Reference
                </a>
              </div>
            </section>
          );
        })()}
      {!rows.length && (
        <p role="status">No claims match the current search and filters.</p>
      )}
      <div
        className="table-scroll"
        role="region"
        aria-label="Claims table"
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th>Claim / path / type</th>
              <th>Current value</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(page * 100, page * 100 + 100).map((c) => (
              <tr
                key={c.pointer}
                className={c.pointer === selected ? 'selected' : ''}
              >
                <td>
                  <button onClick={() => setSelected(c.pointer)}>
                    {c.path}
                  </button>
                  <small>{c.type}</small>
                  <small>{c.description}</small>
                </td>
                <td>
                  <pre>{print(c.value, false).slice(0, 1500)}</pre>
                </td>
                <td>
                  {claimDetails(c).category}
                  {pii.has(c.pointer) && <small>Possible PII</small>}
                  <div className="row-actions">
                    <CopyButton value={c.path} label="Path" />
                    <CopyButton value={c.pointer} label="Pointer" />
                    <CopyButton value={print(c.value, false)} label="Value" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="toolbar">
        <button disabled={!page} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page + 1} · {rows.length} matching claims
        </span>
        <button
          disabled={(page + 1) * 100 >= rows.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
