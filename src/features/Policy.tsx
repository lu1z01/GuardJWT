import { useI18n } from '../i18n/context';
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
  const { tr } = useI18n();
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
      <h2>{tr('Policy Studio')}</h2>
      <p>
        {' '}
        {tr(
          'Starting points only. Organizational rules are separate from the Security Auditor.',
        )}{' '}
      </p>
      <label>
        {' '}
        {tr('Preset')}{' '}
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
        {' '}
        {tr('Policy JSON')}{' '}
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
        {' '}
        {tr('Evaluate policy')}{' '}
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
              <th>{tr('Rule')}</th>
              <th>{tr('Result')}</th>
              <th>{tr('Meaning')}</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((c, i) => (
              <tr key={i}>
                <td>{c.rule}</td>
                <td>{tr(c.status)}</td>
                <td>{c.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <details>
        <summary>{tr('Supported fields')}</summary>
        <p>
          allowedAlgorithms, forbiddenAlgorithms, requiredClaims,
          forbiddenClaims, issuerAllowlist, audienceAllowlist, maximumLifetime,
          maximumClockSkew, requireExpiration, requireIssuedAt,
          requireNotBefore, requireJti, requiredScopes, forbiddenScopes,
          requiredRoles, forbiddenRoles, allowedKeyIds, requireSignature,
          forbidEmbeddedJwk, forbidRemoteJku, requireTyp.
        </p>
        <p>
          {' '}
          {tr(
            'Scopes/roles are top-level lists. Forbidden claim names are checked recursively. Policies are kept only in memory.',
          )}{' '}
        </p>
      </details>
    </>
  );
}
