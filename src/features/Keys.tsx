import { useI18n } from '../i18n/context';
import { useRef, useState } from 'react';
import {
  ALGORITHMS,
  inspectKeys,
  keySet,
  matchKeys,
} from '../core/crypto/keys';
import { CopyButton } from '../components/CopyButton';
export function Keys({ kid }: { kid: unknown }) {
  const { tr } = useI18n();
  const [input, setInput] = useState(''),
    [alg, setAlg] = useState('RS256'),
    [rows, setRows] = useState<Awaited<ReturnType<typeof inspectKeys>>>([]),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false);
  const revision = useRef(0);
  function update(v: string) {
    revision.current++;
    setBusy(false);
    setRows([]);
    setError(v.length > 1048576 ? 'Key input exceeds 1 MiB.' : '');
    setInput(v.length <= 1048576 ? v : '');
  }
  let match = '';
  try {
    if (input.trim().startsWith('{'))
      match = matchKeys(keySet(input), kid).status;
  } catch {
    /* Details shown after explicit inspection. */
  }
  return (
    <>
      <h2>{tr('Key Workbench')}</h2>
      <p>
        {' '}
        {tr(
          'Local metadata only. A thumbprint does not establish trust. Private and symmetric keys remain sensitive.',
        )}{' '}
      </p>
      <label>
        PEM / JWK / JWKS
        <textarea
          value={input}
          spellCheck={false}
          autoComplete="off"
          onChange={(e) => update(e.target.value)}
        />
      </label>
      <label>
        {' '}
        {tr('Import local file')}{' '}
        <input
          type="file"
          accept=".pem,.json,.jwk,.jwks,.txt"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            const id = ++revision.current;
            setBusy(false);
            if (!f) return;
            if (f.size > 1048576) {
              setError('File exceeds 1 MiB.');
              return;
            }
            try {
              const s = await f.text();
              if (id === revision.current) update(s);
            } catch {
              if (id === revision.current)
                setError('Unable to read the local file.');
            }
          }}
        />
      </label>
      <label>
        {' '}
        {tr('PEM algorithm')}{' '}
        <select
          value={alg}
          onChange={(e) => {
            revision.current++;
            setBusy(false);
            setRows([]);
            setAlg(e.target.value);
          }}
        >
          {ALGORITHMS.filter((a) => !a.startsWith('HS')).map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </label>
      <button
        disabled={busy || !input.trim()}
        onClick={async () => {
          const id = ++revision.current;
          setBusy(true);
          try {
            const r = await inspectKeys(input, alg);
            if (id === revision.current) {
              setRows(r);
              setError('');
            }
          } catch {
            if (id === revision.current)
              setError(
                'Invalid or unsupported key. Use a public SPKI PEM, JWK or JWKS with valid key parameters.',
              );
          } finally {
            if (id === revision.current) setBusy(false);
          }
        }}
      >
        {busy ? 'Inspecting locally…' : 'Inspect keys'}
      </button>
      {!input && (
        <p className="muted">
          {' '}
          {tr('Paste a public PEM, JWK or JWKS to inspect key metadata.')}{' '}
        </p>
      )}
      {match && (
        <p>
          {tr('Current token kid:')} {match}
        </p>
      )}
      {error && <p role="alert">{error}</p>}
      <div
        className="table-scroll"
        role="region"
        aria-label="Keys table"
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th>{tr('kid / type')}</th>
              <th>{tr('Algorithm / use')}</th>
              <th>{tr('Size / curve')}</th>
              <th>{tr('SHA-256 thumbprint')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>
                  {r.kid}
                  <small>
                    {r.kty}
                    {r.private ? ' · sensitive key' : ''}
                  </small>
                </td>
                <td>
                  {r.alg}
                  <small>
                    {r.use} · {r.operations}
                  </small>
                </td>
                <td>
                  {r.bits !== undefined ? `${r.bits} bits` : r.curve}
                  {r.bits !== undefined && r.bits < 2048 && (
                    <small className="warning">
                      {' '}
                      {tr('Below 2048-bit RSA minimum')}{' '}
                    </small>
                  )}
                </td>
                <td>
                  <code>{r.thumbprint}</code>
                  {!r.private && <CopyButton value={r.thumbprint} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
