import { useI18n } from '../i18n/context';
import { useEffect, useRef, useState } from 'react';
import { encode, decode, utf8, text } from '../core/jose/inspect';
import { readJson, print } from '../core/parsing/json';
import { date } from '../core/timeline/analyze';
import { CopyButton } from '../components/CopyButton';
export function Tools({ token }: { token: string }) {
  const { tr } = useI18n();
  const [input, setInput] = useState(''),
    [out, setOut] = useState(''),
    [error, setError] = useState('');
  const revision = useRef(0);
  useEffect(
    () => () => {
      revision.current++;
    },
    [token],
  );
  function action(fn: () => string) {
    revision.current++;
    try {
      setOut(fn());
      setError('');
    } catch {
      setOut('');
      setError(
        'Invalid input or unsupported conversion. JSON must be unambiguous for formatting.',
      );
    }
  }
  return (
    <>
      <h2>{tr('Local developer tools')}</h2>
      <label>
        {' '}
        {tr('Input')}{' '}
        <textarea
          value={input}
          onChange={(e) => {
            revision.current++;
            setError(
              e.target.value.length > 1048576
                ? 'Tool input exceeds 1 MiB.'
                : '',
            );
            setInput(e.target.value.length <= 1048576 ? e.target.value : '');
            setOut('');
          }}
          spellCheck={false}
        />
      </label>
      <div className="toolbar">
        <button onClick={() => action(() => encode(utf8(input)))}>
          {' '}
          {tr('Base64URL encode')}{' '}
        </button>
        <button onClick={() => action(() => text(decode(input)))}>
          {' '}
          {tr('Base64URL decode')}{' '}
        </button>
        {['Pretty print', 'Minify', 'Validate'].map((label, i) => (
          <button
            key={tr(label)}
            onClick={() =>
              action(() => {
                const p = readJson(input);
                if (
                  p.issues.some(
                    (x) => x.kind === 'duplicate' || x.kind === 'precision',
                  )
                )
                  throw new Error();
                return i === 2 ? 'Valid JSON' : print(p.value, i === 0);
              })
            }
          >
            JSON {tr(label)}
          </button>
        ))}
        <button
          onClick={() =>
            action(() => {
              if (!input.trim() || !Number.isFinite(Number(input)))
                throw new Error();
              const d = date(Number(input));
              if (d === '—') throw new Error();
              return d;
            })
          }
        >
          Unix → UTC
        </button>
        <button
          onClick={() =>
            action(() => {
              if (!/(Z|[+-]\d{2}:\d{2})$/.test(input)) throw new Error();
              const n = Date.parse(input) / 1000;
              if (!Number.isFinite(n)) throw new Error();
              return String(n);
            })
          }
        >
          ISO date → Unix
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
      <pre>{out || 'Output appears here.'}</pre>
      {out && <CopyButton value={out} />}
      <h2>{tr('Current token utilities')}</h2>
      <p>
        {' '}
        {tr(
          'Do not share production tokens. Copying is an explicit local action.',
        )}{' '}
      </p>
      <CopyButton
        value={'Authorization: Bearer ' + token}
        label="Copy Authorization header"
      />
      <p>
        {' '}
        {tr('Authorization header: ~')}
        {utf8('Authorization: Bearer ' + token).length}{' '}
        {tr('bytes. Cookie value: ~')}
        {utf8('token=' + token).length}{' '}
        {tr(
          'bytes, excluding attributes. Actual limits depend on your infrastructure.',
        )}{' '}
      </p>
      <button
        onClick={async () => {
          const id = ++revision.current;
          setOut('');
          setError('');
          try {
            const hash = await crypto.subtle.digest('SHA-256', utf8(token));
            if (id !== revision.current) return;
            setOut(
              Array.from(new Uint8Array(hash), (b) =>
                b.toString(16).padStart(2, '0'),
              ).join(''),
            );
          } catch {
            if (id === revision.current)
              setError('SHA-256 is unavailable in this context.');
          }
        }}
      >
        {' '}
        {tr('Compute token SHA-256 fingerprint')}{' '}
      </button>
    </>
  );
}
