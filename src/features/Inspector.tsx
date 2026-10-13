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
  const [view, setView] = useState<'Decoded' | 'Raw' | 'Segments'>('Decoded');
  return (
    <>
      <div className="toolbar">
        <strong>{token.format}</strong>
        {(['Decoded', 'Raw', 'Segments'] as const).map((v) => (
          <button aria-pressed={view === v} onClick={() => setView(v)} key={v}>
            {v}
          </button>
        ))}
      </div>
      <p className="muted">
        Decoding is not verification. The signature status is shown separately.
      </p>
      {token.issues.length > 0 && (
        <div className="notice">
          {token.issues.filter((i) => i.kind === 'duplicate').length} duplicate
          properties;{' '}
          {token.issues.filter((i) => i.kind === 'large-number').length} large
          integers; {token.issues.filter((i) => i.kind === 'precision').length}{' '}
          decimal precision warnings. Raw JSON preserves original spelling.
          Formatted claims use the last duplicate value; decimal precision
          warnings mean raw JSON is authoritative.
        </div>
      )}
      {token.nested && (
        <div className="notice">
          Outer JOSE → Inner JWT{' '}
          <button onClick={() => onNested(token.nested!)}>
            Inspect nested token
          </button>
        </div>
      )}
      {view === 'Segments' ? (
        token.segments.map((s, i) => (
          <section key={s.name}>
            <div className="section-title">
              Segment {i + 1} — {s.name}
              <CopyButton value={s.raw} />
            </div>
            <p>
              {s.raw.length} encoded characters · {s.bytes} decoded bytes
            </p>
            <pre>{s.raw || '(empty)'}</pre>
            <details>
              <summary>Hex · first 256 bytes</summary>
              <pre>{s.hex}</pre>
            </details>
          </section>
        ))
      ) : (
        <>
          <section aria-label="Header">
            <div className="section-title">
              <h2>Header</h2>
              <CopyButton
                value={view === 'Raw' ? token.rawHeader : print(token.header)}
              />
            </div>
            <small>
              {token.segments[0]?.raw.length} segment characters ·{' '}
              {token.segments[0]?.bytes} decoded bytes
            </small>
            <pre>{view === 'Raw' ? token.rawHeader : print(token.header)}</pre>
            <details>
              <summary>Header definitions</summary>
              <div
                className="table-scroll"
                role="region"
                aria-label="Inspector table"
                tabIndex={0}
              >
                <table>
                  <tbody>
                    {Object.entries(token.header).map(([k, v]) => (
                      <tr key={k}>
                        <th>{k}</th>
                        <td>
                          {(Object.hasOwn(HEADER, k) ? HEADER[k] : undefined) ??
                            'Extension or custom parameter; untrusted.'}
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
                  Certificate bytes are available in the header. Certificate
                  subject/issuer parsing and chain validation are not included.
                </p>
              )}
            </details>
          </section>
          {token.format === 'JWE Compact' ? (
            <section>
              <h2>Encrypted content</h2>
              <p>
                Inspected only. Ciphertext is not decoded as JSON. Decryption is
                not implemented.
              </p>
              <div
                className="table-scroll"
                role="region"
                aria-label="Inspector table"
                tabIndex={0}
              >
                <table>
                  <tbody>
                    {token.segments.slice(1).map((s) => (
                      <tr key={s.name}>
                        <th>{s.name}</th>
                        <td>{s.bytes} B</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : (
            <>
              <section aria-label="Payload">
                <div className="section-title">
                  <h2>Payload</h2>
                  <CopyButton
                    value={
                      view === 'Raw' || !token.payload
                        ? (token.rawPayload ?? '')
                        : print(token.payload)
                    }
                  />
                </div>
                <small>
                  {token.segments[1]?.raw.length} segment characters ·{' '}
                  {token.segments[1]?.bytes} decoded bytes
                </small>
                {token.payloadError && (
                  <p className="warning">{token.payloadError}</p>
                )}
                {view === 'Decoded' && token.payload ? (
                  <JsonTree
                    value={token.payload}
                    selected={selectedPointer}
                    onSelect={onClaim ?? (() => {})}
                  />
                ) : (
                  <pre>{token.rawPayload || '(empty or detached payload)'}</pre>
                )}
              </section>
              <section aria-label="Signature">
                <div className="section-title">
                  <h2>Signature</h2>
                  <CopyButton value={token.segments[2]!.raw} />
                </div>
                <p>
                  {token.segments[2]!.raw.length} Base64URL characters ·{' '}
                  {token.segments[2]!.bytes} bytes
                </p>
                <pre>{token.segments[2]!.raw || '(absent — unsigned)'}</pre>
                <details>
                  <summary>Signature hex · first 256 bytes</summary>
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
