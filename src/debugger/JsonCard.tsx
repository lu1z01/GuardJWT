import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { useI18n } from '../i18n/context';
import { claims as readClaims } from '../core/claims/explore';
import { claimDetails } from '../core/claims/details';
import { finite, print, type Obj, type Value } from '../core/parsing/json';
import {
  CheckIcon,
  CloseIcon,
  CopyIcon,
  ExpandIcon,
  TerminalIcon,
} from './icons';
export function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className="dbg-icon-btn"
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export function CopyIconButton({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const { tr } = useI18n();
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <>
      <IconButton
        label={done ? tr('Copied') : label}
        onClick={() => {
          void navigator.clipboard
            ?.writeText(value)
            .then(() => {
              setDone(true);
              clearTimeout(timer.current);
              timer.current = setTimeout(() => setDone(false), 1800);
            })
            .catch(() => undefined);
        }}
      >
        {done ? <CheckIcon /> : <CopyIcon />}
      </IconButton>
      <span role="status" className="sr-only">
        {done ? tr('Copied') : ''}
      </span>
    </>
  );
}
/** Card with the terminal-style title row used across the debugger. */
export function Card({
  title,
  actions,
  children,
  footer,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="dbg-card">
      <header className="dbg-card-head">
        <span className="dbg-card-title">
          <TerminalIcon />
          {title}
        </span>
        <span className="dbg-card-actions">{actions}</span>
      </header>
      <div className="dbg-card-body">{children}</div>
      {footer}
    </section>
  );
}
const HEADER_MEANINGS: Record<string, [string, string]> = {
  alg: [
    'The algorithm used to sign the JWT.',
    'https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.1',
  ],
  typ: [
    'The media type of this complete JWT.',
    'https://www.rfc-editor.org/rfc/rfc7519.html#section-5.1',
  ],
  kid: [
    'Hint indicating which key signed the token. Never trust it by itself.',
    'https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.4',
  ],
  cty: [
    'The content type of the payload, such as JWT for nested tokens.',
    'https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.10',
  ],
  jku: [
    'URL of a JWK Set. Attacker-controlled when read from an untrusted token.',
    'https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.2',
  ],
  jwk: [
    'Public key embedded in the token. Do not trust it as a verification key.',
    'https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.3',
  ],
  x5u: [
    'URL of an X.509 certificate chain.',
    'https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.5',
  ],
  x5c: [
    'Embedded X.509 certificate chain.',
    'https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.6',
  ],
  x5t: [
    'SHA-1 thumbprint of the signing certificate.',
    'https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.7',
  ],
  crit: [
    'Extensions the recipient must understand to process the token.',
    'https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.11',
  ],
  b64: [
    'Whether the payload is Base64URL-encoded (RFC 7797).',
    'https://www.rfc-editor.org/rfc/rfc7797.html',
  ],
  enc: [
    'Content encryption algorithm of a JWE.',
    'https://www.rfc-editor.org/rfc/rfc7516.html#section-4.1.2',
  ],
  zip: [
    'Compression applied before encryption.',
    'https://www.rfc-editor.org/rfc/rfc7516.html#section-4.1.3',
  ],
};
const TIME_CLAIMS = ['exp', 'iat', 'nbf', 'auth_time'];
function JsonView({ value, kind }: { value: Obj; kind: 'header' | 'payload' }) {
  const { tr, locale } = useI18n();
  const [now] = useState(() => Date.now() / 1000);
  const tip = (name: string, v: Value, top: boolean) => {
    if (!top) return undefined;
    if (kind === 'header')
      return Object.hasOwn(HEADER_MEANINGS, name)
        ? tr(HEADER_MEANINGS[name]![0])
        : undefined;
    const row = readClaims({ [name]: v })[0];
    const details = row && claimDetails(row, now);
    return details && details.category !== 'custom'
      ? tr(details.meaning)
      : undefined;
  };
  const when = (n: number) =>
    Math.abs(n) <= 8.64e12 ? new Date(n * 1000).toLocaleString(locale) : '—';
  function node(v: Value, depth: number, name?: string): ReactNode {
    if (v === null || typeof v !== 'object') {
      const time =
        depth === 1 && name && kind === 'payload' && TIME_CLAIMS.includes(name)
          ? finite(v)
          : undefined;
      const cls =
        time !== undefined
          ? 'dbg-time'
          : typeof v === 'string'
            ? 'dbg-str'
            : typeof v === 'number' || typeof v === 'bigint'
              ? 'dbg-num'
              : 'dbg-lit';
      return time !== undefined ? (
        <span className={cls + ' dbg-tip'} tabIndex={0} data-tip={when(time)}>
          {print(v, false)}
        </span>
      ) : (
        <span className={cls}>{print(v, false)}</span>
      );
    }
    const array = Array.isArray(v);
    const entries = Object.entries(v);
    if (!entries.length) return array ? '[]' : '{}';
    return (
      <>
        {array ? '[' : '{'}
        {'\n'}
        {entries.map(([k, child], i) => {
          const explanation = tip(k, child, depth === 1 && !array);
          return (
            <span key={k}>
              {'  '.repeat(depth)}
              {!array &&
                (explanation ? (
                  <span
                    className="dbg-key dbg-tip"
                    tabIndex={0}
                    data-tip={explanation}
                  >
                    {JSON.stringify(k)}
                  </span>
                ) : (
                  <span className="dbg-key">{JSON.stringify(k)}</span>
                ))}
              {!array && ': '}
              {node(child, depth + 1, k)}
              {i < entries.length - 1 ? ',' : ''}
              {'\n'}
            </span>
          );
        })}
        {'  '.repeat(depth - 1)}
        {array ? ']' : '}'}
      </>
    );
  }
  return <pre className="dbg-json">{node(value, 1)}</pre>;
}
function ClaimsTable({
  value,
  kind,
}: {
  value: Obj;
  kind: 'header' | 'payload';
}) {
  const { tr, locale } = useI18n();
  const [now] = useState(() => Date.now() / 1000);
  const rows = Object.entries(value).map(([name, v]) => {
    const text = typeof v === 'string' ? v : print(v, false);
    if (kind === 'header') {
      const meaning = Object.hasOwn(HEADER_MEANINGS, name)
        ? HEADER_MEANINGS[name]
        : undefined;
      return {
        name,
        text,
        note: meaning && tr(meaning[0]),
        href: meaning?.[1],
        extra: '',
      };
    }
    const claim = readClaims({ [name]: v })[0]!;
    const details = claimDetails(claim, now);
    const known = details.category !== 'custom';
    const time = details.temporal;
    return {
      name,
      text,
      note: known ? tr(details.meaning) : undefined,
      href: known ? details.reference : undefined,
      extra: time
        ? new Date(time.unix * 1000).toLocaleString(locale) +
          ' · ' +
          tr(time.status)
        : '',
    };
  });
  if (!rows.length)
    return <p className="dbg-empty">{tr('No claims to explain.')}</p>;
  return (
    <div className="dbg-table-wrap">
      <table className="dbg-table">
        <thead>
          <tr>
            <th scope="col">{tr('Claim')}</th>
            <th scope="col">{tr('Value')}</th>
            <th scope="col">{tr('Description')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <th scope="row">{r.name}</th>
              <td>
                <span className="dbg-cell-value">{r.text}</span>
                {r.extra && <small className="dbg-cell-extra">{r.extra}</small>}
              </td>
              <td>
                {r.note ?? (
                  <span className="dbg-muted">{tr('Custom claim')}</span>
                )}
                {r.href && (
                  <>
                    {' '}
                    <a href={r.href} target="_blank" rel="noopener noreferrer">
                      {tr('Learn more')}
                    </a>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {kind === 'payload' &&
        Object.keys(value).some((k) => TIME_CLAIMS.includes(k)) && (
          <p className="dbg-note">
            {tr(
              'Time claims must be a NumericDate type, representing seconds.',
            )}
          </p>
        )}
    </div>
  );
}
/** Decoded header/payload card with JSON and Claims Breakdown tabs. */
export function JsonCard({
  title,
  kind,
  value,
  raw,
  emptyMessage,
}: {
  title: string;
  kind: 'header' | 'payload';
  value?: Obj;
  raw?: string;
  emptyMessage?: string;
}) {
  const { tr } = useI18n();
  const [tab, setTab] = useState<'json' | 'claims'>('json');
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  const text = value ? print(value, true) : (raw ?? '');
  const body = (
    <>
      {value ? (
        tab === 'json' ? (
          <JsonView value={value} kind={kind} />
        ) : (
          <ClaimsTable value={value} kind={kind} />
        )
      ) : (
        <p className="dbg-empty">{emptyMessage ?? 'N/A'}</p>
      )}
    </>
  );
  const tabs = (prefix: string) => (
    <div className="dbg-tabs dbg-tabs-sm" role="tablist" aria-label={title}>
      {(['json', 'claims'] as const).map((t) => (
        <button
          key={t}
          type="button"
          role="tab"
          id={`${id}${prefix}-${t}`}
          aria-selected={tab === t}
          onClick={() => setTab(t)}
        >
          {t === 'json' ? 'JSON' : tr('Claims breakdown')}
        </button>
      ))}
    </div>
  );
  return (
    <div className="dbg-block">
      <h3 className="dbg-block-title">{title}</h3>
      <div className="dbg-card dbg-card-tabs">
        <div className="dbg-card-head">
          {tabs('')}
          <span className="dbg-card-actions">
            <CopyIconButton value={text} label={tr('Copy')} />
            <IconButton label={tr('Expand')} onClick={() => setOpen(true)}>
              <ExpandIcon />
            </IconButton>
          </span>
        </div>
        <div
          className="dbg-card-body"
          role="tabpanel"
          aria-labelledby={`${id}-${tab}`}
        >
          {body}
        </div>
      </div>
      <dialog
        ref={dialog}
        className="dbg-dialog"
        aria-label={title}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialog.current) setOpen(false);
        }}
      >
        <div className="dbg-dialog-head">
          <strong>{title}</strong>
          {tabs('-dialog')}
          <span className="dbg-card-actions">
            <CopyIconButton value={text} label={tr('Copy')} />
            <IconButton label={tr('Close')} onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </span>
        </div>
        <div className="dbg-dialog-body">{open && body}</div>
      </dialog>
    </div>
  );
}
