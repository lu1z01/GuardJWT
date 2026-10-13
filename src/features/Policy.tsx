import { useState } from 'react';
import {
  PRESETS,
  readPolicy,
  evaluate,
  type PolicyCheck,
} from '../core/policy/evaluate';
import type { Inspection } from '../core/jose/inspect';
import type { CryptoStatus } from '../core/crypto/verify';
export function Policy({
  token,
  status,
  onChecks,
}: {
  token: Inspection;
  status: CryptoStatus;
  onChecks: (c: PolicyCheck[]) => void;
}) {
  const [raw, setRaw] = useState(JSON.stringify(PRESETS[0], null, 2));
  const [checks, setChecks] = useState<PolicyCheck[]>([]),
    [error, setError] = useState('');
  function update(s: string) {
    setRaw(s);
    setChecks([]);
    onChecks([]);
    setError('');
  }
  return (
    <>
      <h2>Policy Studio</h2>
      <p>
        Starting points only. Organizational rules are separate from the
        Security Auditor.
      </p>
      <label>
        Preset
        <select
          onChange={(e) =>
            update(JSON.stringify(PRESETS[Number(e.target.value)], null, 2))
          }
        >
          {PRESETS.map((p, i) => (
            <option key={p.name} value={i}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Policy JSON
        <textarea
          value={raw}
          spellCheck={false}
          onChange={(e) =>
            update(e.target.value.length <= 65536 ? e.target.value : '')
          }
        />
      </label>
      <button
        onClick={() => {
          try {
            const c = evaluate(token, readPolicy(raw), status);
            setChecks(c);
            onChecks(c);
            setError('');
          } catch (e) {
            setError(e instanceof Error ? e.message : 'Invalid policy.');
            setChecks([]);
            onChecks([]);
          }
        }}
      >
        Evaluate policy
      </button>
      {error && <p role="alert">{error}</p>}
      <div
        className="table-scroll"
        role="region"
        aria-label="Policy table"
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th>Rule</th>
              <th>Result</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((c, i) => (
              <tr key={i}>
                <td>{c.rule}</td>
                <td>{c.status}</td>
                <td>{c.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <details>
        <summary>Supported fields</summary>
        <p>
          allowedAlgorithms, forbiddenAlgorithms, requiredClaims,
          forbiddenClaims, issuerAllowlist, audienceAllowlist, maximumLifetime,
          maximumClockSkew, requireExpiration, requireIssuedAt,
          requireNotBefore, requireJti, requiredScopes, forbiddenScopes,
          requiredRoles, forbiddenRoles, allowedKeyIds, requireSignature,
          forbidEmbeddedJwk, forbidRemoteJku, requireTyp.
        </p>
        <p>
          Scopes/roles are top-level lists. Forbidden claim names are checked
          recursively. Policies are kept only in memory.
        </p>
      </details>
    </>
  );
}
