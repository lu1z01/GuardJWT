import { useI18n } from '../i18n/context';
import { useEffect, useMemo, useRef, useState } from 'react';
import { build } from '../core/tools/builder';
import { ALGORITHMS, secretQuality } from '../core/crypto/keys';
import { CopyButton } from '../components/CopyButton';
import { readJson, object, print } from '../core/parsing/json';
import { date } from '../core/timeline/analyze';
const now = () => Math.floor(Date.now() / 1000);
export function Builder({
  onOpen,
}: {
  onOpen?: (token: string, verify?: boolean) => void;
}) {
  const { tr, locale } = useI18n();
  const [header, setHeader] = useState('{"alg":"HS256","typ":"JWT"}'),
    [payload, setPayload] = useState('{"sub":"fictional-user","role":"user"}'),
    [key, setKey] = useState(''),
    [alg, setAlg] = useState('HS256'),
    [show, setShow] = useState(false),
    [out, setOut] = useState(''),
    [error, setError] = useState(''),
    [custom, setCustom] = useState('3600');
  const [allowInsecure, setAllowInsecure] = useState(false);
  const mode = alg.startsWith('HS') ? 'secret' : 'key';
  const quality = mode === 'secret' && key ? secretQuality(key, alg) : null;
  const generation = useRef(0);
  useEffect(
    () => () => {
      generation.current++;
    },
    [],
  );
  function reset() {
    generation.current++;
    setOut('');
    setError('');
  }
  const validation = useMemo(() => {
    try {
      const h = readJson(header),
        p = readJson(payload);
      if (
        !object(h.value) ||
        !object(p.value) ||
        h.issues.length ||
        p.issues.some((i) => i.kind === 'duplicate' || i.kind === 'precision')
      )
        return 'Use unambiguous JSON objects; raw large integers are supported.';
      return '';
    } catch {
      return 'Header or payload JSON is incomplete or invalid.';
    }
  }, [header, payload]);
  async function run(sign: boolean) {
    const id = ++generation.current;
    try {
      const result = await build(
        header,
        payload,
        sign,
        alg,
        key,
        mode,
        allowInsecure,
      );
      if (id === generation.current) {
        setOut(result);
        setError('');
      }
    } catch {
      if (id === generation.current) {
        setOut('');
        setError(
          'Build failed. Check JSON, algorithm and key permissions. Unsigned output requires alg: none.',
        );
      }
    }
  }
  function addClaim(name: string, value: import('../core/parsing/json').Value) {
    try {
      const p = readJson(payload);
      if (
        !object(p.value) ||
        p.issues.some((i) => i.kind === 'duplicate' || i.kind === 'precision')
      )
        throw new Error();
      reset();
      setPayload(print({ ...p.value, [name]: value }));
    } catch {
      setError('Use an unambiguous payload object before adding a claim.');
    }
  }
  let times: Record<string, number> = {};
  try {
    const p = readJson(payload);
    if (object(p.value))
      times = Object.fromEntries(
        ['iat', 'nbf', 'exp'].flatMap((k) =>
          typeof (p.value as import('../core/parsing/json').Obj)[k] === 'number'
            ? [
                [
                  k,
                  (p.value as import('../core/parsing/json').Obj)[k] as number,
                ],
              ]
            : [],
        ),
      );
  } catch {
    /* Live validation is displayed above. */
  }
  return (
    <>
      <h2>{tr('Encoder')}</h2>
      <p>
        {' '}
        {tr(
          'Build and sign JWTs locally. Token Builder is intended for development and testing.',
        )}{' '}
      </p>
      <div className="encoder-editors">
        <label>
          {' '}
          {tr('Header JSON')}{' '}
          <textarea
            value={header}
            spellCheck={false}
            onChange={(e) => {
              reset();
              if (e.target.value.length > 65536) {
                setError('Header exceeds 64 KiB.');
                return;
              }
              setHeader(e.target.value);
            }}
          />
        </label>
        <label>
          {' '}
          {tr('Payload JSON')}{' '}
          <textarea
            value={payload}
            spellCheck={false}
            onChange={(e) => {
              reset();
              if (e.target.value.length > 524288) {
                setError('Payload exceeds 512 KiB.');
                return;
              }
              setPayload(e.target.value);
            }}
          />
        </label>
      </div>
      {validation && (
        <p role="status" className="warning">
          {tr(validation)}
        </p>
      )}
      <div className="toolbar">
        <strong>{tr('Add Claim')}</strong>
        {[
          'iss',
          'sub',
          'aud',
          'iat',
          'nbf',
          'exp',
          'jti',
          'scope',
          'roles',
          'permissions',
          'nonce',
          'azp',
        ].map((claim) => (
          <button
            key={claim}
            onClick={() =>
              addClaim(
                claim,
                claim === 'jti' || claim === 'nonce'
                  ? crypto.randomUUID()
                  : ['iat', 'nbf', 'exp'].includes(claim)
                    ? now() + (claim === 'exp' ? 3600 : 0)
                    : ['roles', 'permissions'].includes(claim)
                      ? ['example']
                      : claim === 'scope'
                        ? 'read:demo'
                        : 'example',
              )
            }
          >
            {claim}
          </button>
        ))}
      </div>
      <div className="toolbar">
        <button onClick={() => addClaim('iat', now())}>{tr('iat: Now')}</button>
        <button onClick={() => addClaim('nbf', now())}>{tr('nbf: Now')}</button>
        {[
          [300, '5 min'],
          [900, '15 min'],
          [1800, '30 min'],
          [3600, '1 hour'],
          [21600, '6 hours'],
          [86400, '24 hours'],
        ].map(([seconds, label]) => (
          <button
            key={seconds}
            onClick={() => addClaim('exp', now() + Number(seconds))}
          >
            exp +{label}
          </button>
        ))}
      </div>
      <div className="toolbar">
        <label>
          {' '}
          {tr('Custom expiration offset (seconds)')}{' '}
          <input
            type="number"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
          />
        </label>
        <button
          onClick={() => {
            const n = Number(custom);
            if (
              !custom.trim() ||
              !Number.isFinite(n) ||
              Math.abs(n) > 315360000
            ) {
              setError('Use a finite offset within ten years.');
              return;
            }
            addClaim('exp', now() + n);
          }}
        >
          {' '}
          {tr('Set custom exp')}{' '}
        </button>
      </div>
      {Object.entries(times).length > 0 && (
        <div
          className="table-scroll"
          role="region"
          aria-label={tr('Builder table')}
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th>{tr('Claim')}</th>
                <th>Unix</th>
                <th>UTC</th>
                <th>{tr('Local')}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(times).map(([k, v]) => (
                <tr key={k}>
                  <td>{k}</td>
                  <td>{v}</td>
                  <td>{date(v)}</td>
                  <td>
                    {Math.abs(v) <= 8.64e12
                      ? new Date(v * 1000).toLocaleString(locale)
                      : tr('Out of range')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <h2>{tr('Signing configuration')}</h2>
      <label>
        {' '}
        {tr('Signing algorithm')}{' '}
        <select
          value={alg}
          onChange={(e) => {
            const value = e.target.value;
            reset();
            setKey('');
            setAllowInsecure(false);
            setAlg(value);
            try {
              const h = readJson(header);
              if (object(h.value) && !h.issues.length)
                setHeader(print({ ...h.value, alg: value }));
            } catch {
              setError('Update the header alg to match your selection.');
            }
          }}
        >
          {ALGORITHMS.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </label>
      <label>
        {mode === 'secret'
          ? tr('Secret (UTF-8)')
          : tr('Private key — PKCS8 PEM or JWK')}
        {mode === 'secret' ? (
          <input
            type={show ? 'text' : 'password'}
            autoComplete="off"
            value={key}
            onChange={(e) => {
              reset();
              setAllowInsecure(false);
              setKey(e.target.value.length <= 1048576 ? e.target.value : '');
            }}
          />
        ) : (
          <textarea
            value={key}
            spellCheck={false}
            autoComplete="off"
            onChange={(e) => {
              reset();
              setAllowInsecure(false);
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
      {quality && (quality.weak || quality.short) && (
        <p className="warning">
          {' '}
          {tr('Development secret warning:')} {quality.bytes} UTF-8 bytes.{' '}
          {quality.short ? tr('Below RFC 7518 minimum length.') + ' ' : ''}
          {quality.weak ? tr('Trivial pattern detected.') + ' ' : ''}
          {tr('Length is not a measurement of entropy.')}{' '}
        </p>
      )}
      {quality && (quality.short || quality.weak) && !allowInsecure && (
        <p className="warning">
          {tr(
            'Signing blocked: use a random HMAC secret of at least the algorithm minimum, or explicitly allow an unsafe development secret below.',
          )}
        </p>
      )}
      <button
        disabled={
          !key ||
          !!validation ||
          (!!quality && (quality.short || quality.weak) && !allowInsecure)
        }
        onClick={() => run(true)}
      >
        {' '}
        {tr('Generate signed JWT')}{' '}
      </button>
      <details>
        <summary>{tr('Advanced / Unsafe Examples')}</summary>
        {mode === 'secret' && (
          <label className="check">
            <input
              type="checkbox"
              checked={allowInsecure}
              onChange={(e) => {
                reset();
                setAllowInsecure(e.target.checked);
              }}
            />
            {tr(
              'Allow insecure development secret — never use the generated token in production.',
            )}
          </label>
        )}
        <p>
          {' '}
          {tr(
            'Unsecured JWTs have no signature. Use only as explicit development fixtures.',
          )}{' '}
        </p>
        <button
          onClick={() => {
            try {
              const h = readJson(header);
              if (!object(h.value) || h.issues.length) throw new Error();
              reset();
              setHeader(print({ ...h.value, alg: 'none' }));
            } catch {
              setError('Use an unambiguous header object.');
            }
          }}
        >
          {' '}
          {tr('Set alg:none')}{' '}
        </button>
        <button disabled={!!validation} onClick={() => run(false)}>
          {' '}
          {tr('Generate unsecured JWT')}{' '}
        </button>
      </details>
      {error && <p role="alert">{tr(error)}</p>}
      {out && (
        <section>
          <h2>{tr('Generated JWT')}</h2>
          <pre>{out}</pre>
          <div className="toolbar">
            <CopyButton value={out} label={tr('Copy JWT')} />
            {onOpen && (
              <>
                <button onClick={() => onOpen(out)}>
                  {tr('Open in Decoder')}
                </button>
                <button onClick={() => onOpen(out, true)}>
                  {' '}
                  {tr('Verify generated JWT')}{' '}
                </button>
              </>
            )}
            <button
              onClick={() => {
                reset();
                setKey('');
                setAllowInsecure(false);
              }}
            >
              {' '}
              {tr('Clear output and key')}{' '}
            </button>
          </div>
        </section>
      )}
    </>
  );
}
