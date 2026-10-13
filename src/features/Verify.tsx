import { useI18n } from '../i18n/context';
import { algorithmInfo } from '../core/crypto/algorithms';
import { useEffect, useRef, useState } from 'react';
import { ALGORITHMS, secretQuality } from '../core/crypto/keys';
import { verify, type CryptoResult } from '../core/crypto/verify';
export function Verify({
  token,
  onResult,
}: {
  token: string;
  onResult: (result: CryptoResult) => void;
}) {
  const { tr } = useI18n();
  const [key, setKey] = useState(''),
    [alg, setAlg] = useState('HS256'),
    [mode, setMode] = useState<'secret' | 'key'>('secret'),
    [show, setShow] = useState(false),
    [busy, setBusy] = useState(false),
    [result, setResult] = useState<CryptoResult | null>(null);
  const generation = useRef(0);
  useEffect(
    () => () => {
      generation.current++;
    },
    [],
  );
  function reset() {
    generation.current++;
    setResult(null);
    setBusy(false);
    onResult({ status: 'NOT VERIFIED', message: '' });
  }
  const info = algorithmInfo(alg);
  const quality = mode === 'secret' && key ? secretQuality(key, alg) : null;
  return (
    <>
      <h2>{tr('Signature Verification')}</h2>
      <p>
        {' '}
        {tr(
          'Choose the expected algorithm independently. Token-provided keys and URLs are never trusted automatically.',
        )}{' '}
      </p>
      <p className="muted">
        {tr(
          'No key? You can still read the token and review its dates. Do not use an unknown key just to get a valid result.',
        )}
      </p>
      <label>
        {' '}
        {tr('Expected algorithm')}{' '}
        <select
          value={alg}
          onChange={(e) => {
            reset();
            setAlg(e.target.value);
          }}
        >
          {ALGORITHMS.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </label>
      <details>
        <summary>
          {tr('Algorithm reference —')} {alg}
        </summary>
        <p>
          {info.family} · {info.hash} · {info.key}
        </p>
        <p>{info.note}</p>
        <a
          href="https://www.rfc-editor.org/rfc/rfc7518.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          {tr('JOSE algorithm requirements')}{' '}
        </a>
      </details>
      <label>
        {' '}
        {tr('Key input type')}{' '}
        <select
          value={mode}
          onChange={(e) => {
            reset();
            setMode(e.target.value as 'secret' | 'key');
            setKey('');
          }}
        >
          <option value="secret">{tr('HMAC secret (UTF-8)')}</option>
          <option value="key">{tr('Public PEM / JWK / JWKS')}</option>
        </select>
      </label>
      <label>
        {mode === 'secret' ? tr('HMAC secret') : tr('Verification key')}
        {mode === 'secret' ? (
          <input
            type={show ? 'text' : 'password'}
            value={key}
            autoComplete="off"
            onChange={(e) => {
              reset();
              setKey(e.target.value);
            }}
          />
        ) : (
          <textarea
            value={key}
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => {
              reset();
              setKey(e.target.value.length <= 1048576 ? e.target.value : '');
            }}
          />
        )}
      </label>
      {mode === 'secret' && (
        <button onClick={() => setShow(!show)}>
          {show ? tr('Hide') : tr('Show')} {tr('secret')}{' '}
        </button>
      )}
      {quality && (
        <p className={quality.weak || quality.short ? 'warning' : 'muted'}>
          {quality.bytes} bytes. {quality.weak ? 'Weak test-like secret. ' : ''}
          {quality.short ? 'Below RFC 7518 minimum key length. ' : ''}
          {tr('Length is not a measurement of entropy.')}{' '}
        </p>
      )}
      <button
        className="button-primary"
        disabled={busy || !key}
        onClick={async () => {
          const id = ++generation.current;
          setBusy(true);
          const r = await verify(token, key, alg, mode);
          if (id !== generation.current) return;
          setResult(r);
          onResult(r);
          setBusy(false);
        }}
      >
        {busy ? tr('Verifying locally…') : tr('Verify signature')}
      </button>
      {result && (
        <div role="status" className="notice">
          <strong>{tr(result.status)}</strong>
          <p>{tr(result.message)}</p>
        </div>
      )}
    </>
  );
}
