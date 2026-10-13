import { useState } from 'react';
import { timeline, date } from '../core/timeline/analyze';
import type { Obj } from '../core/parsing/json';
export function Timeline({ payload }: { payload: Obj }) {
  const [base, setBase] = useState(() => Date.now() / 1000),
    [offset, setOffset] = useState(0),
    [skew, setSkew] = useState(0);
  const t = timeline(payload, base + offset, skew);
  const events = [
    { name: 'iat', time: t.iat },
    { name: 'nbf', time: t.nbf },
    { name: 'NOW', time: t.now },
    { name: 'exp', time: t.exp },
  ]
    .filter((e) => e.time !== undefined)
    .sort((a, b) => a.time! - b.time!);
  return (
    <>
      <h2>Timeline / Time Simulator</h2>
      <p className="notice">
        {t.status} — temporal checks only; this does not verify authenticity.
      </p>
      <div className="timeline">
        {events.map((e) => (
          <div key={e.name}>
            <strong>{e.name}</strong>
            <span>│</span>
            <time>{date(e.time)}</time>
          </div>
        ))}
      </div>
      <label>
        Simulation offset: {offset} sec
        <input
          aria-label="Simulation offset"
          type="range"
          min="-86400"
          max="86400"
          step="30"
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
        />
      </label>
      <label>
        Analysis time (Unix seconds)
        <input
          type="number"
          value={base + offset}
          onChange={(e) => {
            setBase(Number(e.target.value));
            setOffset(0);
          }}
        />
      </label>
      <label>
        Clock skew
        <select value={skew} onChange={(e) => setSkew(Number(e.target.value))}>
          {[0, 30, 60, 120].map((n) => (
            <option value={n} key={n}>
              {n} seconds
            </option>
          ))}
        </select>
      </label>
      <button
        onClick={() => {
          setBase(Date.now() / 1000);
          setOffset(0);
        }}
      >
        Reset to current time
      </button>
      <dl>
        <dt>Lifetime</dt>
        <dd>{t.lifetime ?? '—'} seconds</dd>
        <dt>Remaining</dt>
        <dd>
          {t.remaining === undefined
            ? '—'
            : Math.round(t.remaining) + ' seconds'}
        </dd>
        <dt>Invalid dates</dt>
        <dd>{t.invalid.join(', ') || 'None'}</dd>
      </dl>
    </>
  );
}
