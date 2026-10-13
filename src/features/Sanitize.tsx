import { useI18n } from '../i18n/context';
import { useState } from 'react';
import { redact, type RedactionProfile } from '../core/sanitizer/redact';
import { print, type Obj } from '../core/parsing/json';
import { CopyButton } from '../components/CopyButton';
export function Sanitize({ payload }: { payload: Obj }) {
  const { tr } = useI18n();
  const [profile, setProfile] = useState<RedactionProfile>('Default');
  const value = print(redact(payload, profile));
  return (
    <>
      <h2>{tr('Safe Share View')}</h2>
      <p className="warning">
        {' '}
        {tr(
          'Sanitized representation — not a valid JWT. Review before sharing: heuristic redaction can miss sensitive data.',
        )}{' '}
      </p>
      <label>
        {' '}
        {tr('Redaction profile')}{' '}
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
        {' '}
        {tr(
          'Default masks detected personal data and secrets. Support also masks common IDs. Privacy additionally masks issuer, audience, roles, scopes, tenant and session metadata. Strict masks every leaf value.',
        )}{' '}
      </p>
      <pre>{value}</pre>
      <CopyButton value={value} label="Copy sanitized JSON" />
      <details>
        <summary>{tr('Original / sanitized diff')}</summary>
        <div className="split">
          <pre>{print(payload)}</pre>
          <pre>{value}</pre>
        </div>
      </details>
    </>
  );
}
