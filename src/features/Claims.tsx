import { useI18n } from '../i18n/context';
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
  const { tr } = useI18n();
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
      <h2>{tr('Claims Breakdown')}</h2>
      <div className="toolbar">
        <span>
          {tr('Claims')} {all.length}
        </span>
        <span>
          {' '}
          {tr('Standard')}{' '}
          {
            all.filter((c) =>
              ['iss', 'sub', 'aud', 'exp', 'iat', 'nbf', 'jti'].includes(
                c.name,
              ),
            ).length
          }
        </span>
        <span>
          {' '}
          {tr('Custom')}{' '}
          {
            all.filter(
              (c) => claimDetails(c).category.toLowerCase() === 'custom',
            ).length
          }
        </span>
        <span>
          {' '}
          {tr('Temporal')} {all.filter((c) => c.category === 'temporal').length}
        </span>
        <span>
          {tr('Possible PII')} {pii.size}
        </span>
      </div>
      <div className="toolbar">
        <input
          aria-label={tr('Search claims')}
          placeholder={tr('Search names, paths, values or categories')}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(0);
          }}
        />
        <select
          aria-label={tr('Claim category')}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(0);
          }}
        >
          <option value="">{tr('All')}</option>
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
            <option key={c} value={c}>
              {tr(c)}
            </option>
          ))}
        </select>
        <select
          aria-label={tr('Claim sorting')}
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(0);
          }}
        >
          {['Original order', 'Alphabetical', 'Category', 'Risk'].map((s) => (
            <option key={s} value={s}>
              {tr(s)}
            </option>
          ))}
        </select>
      </div>
      {selected && !active && (
        <p role="status">
          {tr('Claim')} {selected} {tr('is absent from this payload.')}
        </p>
      )}
      {active &&
        (() => {
          const d = claimDetails(active);
          return (
            <section className="claim-detail" aria-label={tr('Selected claim')}>
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
                  <dt>{tr('Local')}</dt>
                  <dd>{d.temporal.local}</dd>
                  <dt>{tr('Relative to analysis time')}</dt>
                  <dd>
                    {Math.abs(d.temporal.relative)} {tr('seconds')}{' '}
                    {d.temporal.relative >= 0 ? 'from now' : 'ago'}
                  </dd>
                  <dt>{tr('Temporal status only')}</dt>
                  <dd>{d.temporal.status}</dd>
                </dl>
              )}
              {d.items && (
                <>
                  <p>
                    {tr('Items:')} {d.items.length}
                  </p>
                  {d.items.slice(0, 100).map((v, i) => (
                    <div className="toolbar" key={i}>
                      <code>{v}</code>
                      <CopyButton value={v} label={tr('Copy item')} />
                    </div>
                  ))}
                  {d.items.length > 100 && (
                    <p className="muted">
                      {' '}
                      {tr(
                        'Showing the first 100 items. Copy Value retains the full claim; use Claims search to inspect other items.',
                      )}{' '}
                    </p>
                  )}
                </>
              )}
              <div className="toolbar">
                <CopyButton value={active.path} label={tr('Copy Path')} />
                <CopyButton
                  value={active.pointer}
                  label={tr('Copy JSON Pointer')}
                />
                <CopyButton
                  value={print(active.value, false)}
                  label={tr('Copy Value')}
                />
                {onDecoder && (
                  <button onClick={() => onDecoder(active.pointer)}>
                    {' '}
                    {tr('Show in Decoder')}{' '}
                  </button>
                )}
                {onSecurity && (
                  <button onClick={() => onSecurity(active.pointer)}>
                    {' '}
                    {tr('Related Security Findings')}{' '}
                  </button>
                )}
                <a href={d.reference} rel="noopener noreferrer" target="_blank">
                  {' '}
                  {tr('Reference')}{' '}
                </a>
              </div>
            </section>
          );
        })()}
      {!rows.length && (
        <p role="status">
          {tr('No claims match the current search and filters.')}
        </p>
      )}
      <div
        className="table-scroll"
        role="region"
        aria-label={tr('Claims table')}
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th>{tr('Claim / path / type')}</th>
              <th>{tr('Current value')}</th>
              <th>{tr('Category')}</th>
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
                  {pii.has(c.pointer) && <small>{tr('Possible PII')}</small>}
                  <div className="row-actions">
                    <CopyButton value={c.path} label={tr('Path')} />
                    <CopyButton value={c.pointer} label="Pointer" />
                    <CopyButton
                      value={print(c.value, false)}
                      label={tr('Value')}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="toolbar">
        <button disabled={!page} onClick={() => setPage(page - 1)}>
          {' '}
          {tr('Previous')}{' '}
        </button>
        <span>
          {' '}
          {tr('Page')} {page + 1} · {rows.length} {tr('matching claims')}{' '}
        </span>
        <button
          disabled={(page + 1) * 100 >= rows.length}
          onClick={() => setPage(page + 1)}
        >
          {' '}
          {tr('Next')}{' '}
        </button>
      </div>
    </>
  );
}
