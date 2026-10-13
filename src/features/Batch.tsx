import { useI18n } from '../i18n/context';
import { useEffect, useRef, useState } from 'react';
import { batch } from '../core/tools/batch';
export function Batch() {
  const { tr } = useI18n();
  const [raw, setRaw] = useState(''),
    [rows, setRows] = useState<ReturnType<typeof batch>>([]),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false);
  const worker = useRef<Worker | null>(null);
  useEffect(
    () => () => {
      worker.current?.terminate();
      worker.current = null;
    },
    [],
  );
  function cancel() {
    worker.current?.terminate();
    worker.current = null;
    setBusy(false);
    setRows([]);
    setError('');
  }
  return (
    <>
      <h2>{tr('Batch Analyzer')}</h2>
      <p>
        {' '}
        {tr(
          'Up to 50 tokens, one per line; 1 MiB total. Rows use indexes instead of raw tokens. Results are not persisted.',
        )}{' '}
      </p>
      <label>
        {' '}
        {tr('Batch input')}{' '}
        <textarea
          value={raw}
          onChange={(e) => {
            cancel();
            if (e.target.value.length > 1048576) {
              setRaw('');
              setError('Batch exceeds 1 MiB.');
            } else setRaw(e.target.value);
          }}
          spellCheck={false}
        />
      </label>
      <button
        disabled={busy}
        onClick={() => {
          cancel();
          setBusy(true);
          if (typeof Worker === 'undefined') {
            try {
              setRows(batch(raw));
            } catch {
              setError('Batch limit exceeded.');
            }
            setBusy(false);
            return;
          }
          const w = new Worker(
            new URL('../workers/batch.ts', import.meta.url),
            { type: 'module' },
          );
          worker.current = w;
          w.onmessage = (
            e: MessageEvent<{
              rows?: ReturnType<typeof batch>;
              error?: string;
            }>,
          ) => {
            if (worker.current !== w) return;
            setRows(e.data.rows ?? []);
            setError(e.data.error ?? '');
            setBusy(false);
            w.terminate();
          };
          w.onerror = () => {
            if (worker.current !== w) return;
            setError('Batch worker failed.');
            setBusy(false);
            w.terminate();
          };
          w.postMessage(raw);
        }}
      >
        {' '}
        {tr('Analyze batch')}{' '}
      </button>
      {busy && <span role="status">{tr('Analyzing locally…')}</span>}
      {error && <p role="alert">{tr(error)}</p>}
      <div
        className="table-scroll"
        role="region"
        aria-label={tr('Batch table')}
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              {[
                '#',
                'Algorithm',
                'Issuer',
                'Audience',
                'exp',
                'Status',
                'Hygiene',
                'Size',
              ].map((h) => (
                <th key={h}>{tr(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.index}>
                <td>{r.index}</td>
                <td>{r.algorithm}</td>
                <td>{r.issuer}</td>
                <td>{r.audience}</td>
                <td>{r.expiration}</td>
                <td>{tr(r.status)}</td>
                <td>{r.score ?? '—'}</td>
                <td>{r.size} B</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
