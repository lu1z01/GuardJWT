import { useI18n } from '../i18n/context';
import { useState } from 'react';
import type { Inspection } from '../core/jose/inspect';
import { print } from '../core/parsing/json';
import { CopyButton } from '../components/CopyButton';
import { JsonTree } from '../components/JsonTree';
export function Inspector({
  token,
  onNested,
  onClaim,
  selectedPointer,
}: {
  token: Inspection;
  onNested: (v: string) => void;
  onClaim?: (pointer: string) => void;
  selectedPointer?: string;
}) {
  const { tr } = useI18n();
  const [view, setView] = useState<'Decoded' | 'Raw' | 'Segments'>('Decoded');
  return (
    <>
      <div className="toolbar">
        <strong>{token.format}</strong>
        {(['Decoded', 'Raw', 'Segments'] as const).map((v) => (
          <button aria-pressed={view === v} onClick={() => setView(v)} key={v}>
            {tr(v)}
          </button>
        ))}
      </div>
      <p className="muted">
        {' '}
        {tr(
          'Decoding is not verification. The signature status is shown separately.',
        )}{' '}
      </p>
      {token.issues.length > 0 && (
        <div className="notice">
          {token.issues.filter((i) => i.kind === 'duplicate').length}{' '}
          {tr('duplicate properties;')}{' '}
          {token.issues.filter((i) => i.kind === 'large-number').length}{' '}
          {tr('large integers;')}{' '}
          {token.issues.filter((i) => i.kind === 'precision').length}{' '}
          {tr(
            'decimal precision warnings. Raw JSON preserves original spelling. Formatted claims use the last duplicate value; decimal precision warnings mean raw JSON is authoritative.',
          )}{' '}
        </div>
      )}
      {token.nested && (
        <div className="notice">
          {' '}
          {tr('Outer JOSE → Inner JWT')}{' '}
          <button onClick={() => onNested(token.nested!)}>
            {' '}
            {tr('Inspect nested token')}{' '}
          </button>
        </div>
      )}
      {view === 'Segments' ? (
        token.segments.map((s, i) => (
          <section key={s.name}>
            <div className="section-title">
              {' '}
              {tr('Segment')} {i + 1} — {tr(s.name)}
              <CopyButton value={s.raw} />
            </div>
            <p>
              {s.raw.length} {tr('encoded characters ·')} {s.bytes}{' '}
              {tr('decoded bytes')}{' '}
            </p>
            <pre>{s.raw || tr('(empty)')}</pre>
            <details>
              <summary>{tr('Hex · first 256 bytes')}</summary>
              <pre>{s.hex}</pre>
            </details>
          </section>
        ))
      ) : (
        <>
          <section aria-label={tr('Header')}>
            <div className="section-title">
              <h2>{tr('Header')}</h2>
              <CopyButton
                value={view === 'Raw' ? token.rawHeader : print(token.header)}
              />
            </div>
            <small>
              {token.segments[0]?.raw.length} {tr('segment characters ·')}{' '}
              {token.segments[0]?.bytes} {tr('decoded bytes')}{' '}
            </small>
            <pre>{view === 'Raw' ? token.rawHeader : print(token.header)}</pre>
            <details>
              <summary>{tr('Header definitions')}</summary>
              {Object.keys(token.header).length > 100 && (
                <p>
                  {tr(
                    'Only the first 100 header fields are shown here. The original JSON above remains complete.',
                  )}
                </p>
              )}
              <div
                className="table-scroll"
                role="region"
                aria-label={tr('Inspector table')}
                tabIndex={0}
              >
                <table>
                  <tbody>
                    {Object.entries(token.header)
                      .slice(0, 100)
                      .map(([k, v]) => (
                        <tr key={k}>
                          <th>{k}</th>
                          <td>
                            {(Object.hasOwn(HEADER, k)
                              ? tr(HEADER[k]!)
                              : undefined) ??
                              tr('Extension or custom parameter; untrusted.')}
                          </td>
                          <td>
                            <code>{print(v, false)}</code>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {'x5c' in token.header && (
                <p>
                  {' '}
                  {tr(
                    'Certificate bytes are available in the header. Certificate subject/issuer parsing and chain validation are not included.',
                  )}{' '}
                </p>
              )}
            </details>
          </section>
          {token.format === 'JWE Compact' ? (
            <section>
              <h2>{tr('Encrypted content')}</h2>
              <p>
                {' '}
                {tr(
                  'Inspected only. Ciphertext is not decoded as JSON. Decryption is not implemented.',
                )}{' '}
              </p>
              <div
                className="table-scroll"
                role="region"
                aria-label={tr('Inspector table')}
                tabIndex={0}
              >
                <table>
                  <tbody>
                    {token.segments.slice(1).map((s) => (
                      <tr key={s.name}>
                        <th>{tr(s.name)}</th>
                        <td>{s.bytes} B</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : (
            <>
              <section aria-label={tr('Payload')}>
                <div className="section-title">
                  <h2>{tr('Payload')}</h2>
                  <CopyButton
                    value={
                      view === 'Raw' || !token.payload
                        ? (token.rawPayload ?? '')
                        : print(token.payload)
                    }
                  />
                </div>
                <small>
                  {token.segments[1]?.raw.length} {tr('segment characters ·')}{' '}
                  {token.segments[1]?.bytes} {tr('decoded bytes')}{' '}
                </small>
                {token.payloadError && (
                  <p className="warning">{tr(token.payloadError)}</p>
                )}
                {view === 'Decoded' && token.payload ? (
                  <JsonTree
                    value={token.payload}
                    selected={selectedPointer}
                    onSelect={onClaim ?? (() => {})}
                  />
                ) : (
                  <pre>
                    {token.rawPayload || tr('(empty or detached payload)')}
                  </pre>
                )}
              </section>
              <section aria-label={tr('Signature')}>
                <div className="section-title">
                  <h2>{tr('Signature')}</h2>
                  <CopyButton value={token.segments[2]!.raw} />
                </div>
                <p>
                  {token.segments[2]!.raw.length} {tr('Base64URL characters ·')}{' '}
                  {token.segments[2]!.bytes} bytes
                </p>
                <pre>{token.segments[2]!.raw || tr('(absent — unsigned)')}</pre>
                <details>
                  <summary>{tr('Signature hex · first 256 bytes')}</summary>
                  <pre>{token.segments[2]!.hex}</pre>
                </details>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
}
const HEADER: Record<string, string> = {
  alg: 'Signing or key management algorithm',
  enc: 'Content encryption algorithm',
  zip: 'Compression algorithm',
  typ: 'Application token type',
  cty: 'Content type; JWT can indicate nesting',
  kid: 'Key identifier; key resolution is server-dependent',
  jku: 'Remote JWK set reference — never fetched',
  jwk: 'Producer-controlled embedded JWK',
  x5u: 'Remote certificate reference — never fetched',
  x5c: 'Certificate chain, not automatically trusted',
  x5t: 'SHA-1 certificate thumbprint',
  'x5t#S256': 'SHA-256 certificate thumbprint',
  crit: 'Critical extensions must be understood',
  b64: 'JWS payload encoding mode (RFC 7797)',
};
