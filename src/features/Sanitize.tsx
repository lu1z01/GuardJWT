import { useState } from 'react';
import { redact, type RedactionProfile } from '../core/sanitizer/redact';
import { print, type Obj } from '../core/parsing/json';
import { CopyButton } from '../components/CopyButton';
export function Sanitize({ payload }: { payload: Obj }) {
  const [profile, setProfile] = useState<RedactionProfile>('Default');
  const value = print(redact(payload, profile));
  return (
    <>
      <h2>Safe Share View</h2>
      <p className="warning">
        Sanitized representation — not a valid JWT. Review before sharing:
        heuristic redaction can miss sensitive data.
      </p>
      <label>
        Redaction profile
        <select
          value={profile}
          onChange={(e) => setProfile(e.target.value as RedactionProfile)}
        >
          {['Default', 'Privacy', 'Support', 'Strict'].map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
      <p>
        Default targets possible PII/secrets. Privacy and Support also remove
        common IDs; Support preserves non-sensitive issuer, audience, roles and
        scope. Strict masks every leaf value.
      </p>
      <pre>{value}</pre>
      <CopyButton value={value} label="Copy sanitized JSON" />
      <details>
        <summary>Original / sanitized diff</summary>
        <div className="split">
          <pre>{print(payload)}</pre>
          <pre>{value}</pre>
        </div>
      </details>
    </>
  );
}
