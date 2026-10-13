import { useI18n } from '../i18n/context';
import { print } from '../core/parsing/json';
import { profile } from '../core/claims/explore';
import { score, type Finding } from '../core/audit/analyze';
import type { Inspection } from '../core/jose/inspect';
import type { CryptoResult } from '../core/crypto/verify';
import type { PolicyCheck } from '../core/policy/evaluate';
export function ContextPanel({
  token: t,
  privateMode,
  cryptoResult,
  checks,
  findings,
}: {
  token?: Inspection;
  privateMode: boolean;
  cryptoResult: CryptoResult;
  checks: PolicyCheck[];
  findings: Finding[];
}) {
  const { tr } = useI18n();
  const detected = t ? profile(t.header, t.payload) : null;
  const axes = score(findings);
  return (
    <aside className="context-panel">
      <h2>{tr('Context')}</h2>
      <dl>
        <dt>{tr('Format')}</dt>
        <dd>{t?.ok ? t.format : '—'}</dd>
        <dt>{tr('Signature')}</dt>
        <dd>{tr(cryptoResult.status)}</dd>
        {!privateMode && (
          <>
            <dt>{tr('Declared algorithm')}</dt>
            <dd>{t?.ok ? print(t.header.alg, false) : '—'}</dd>
            <dt>{tr('Profile estimate')}</dt>
            <dd>
              {detected ? tr(detected.name) : '—'}
              <small>
                {detected
                  ? tr('Confidence: {level}', {
                      level: tr(detected.confidence),
                    })
                  : ''}
              </small>
            </dd>
            <dt>{tr('Profile evidence')}</dt>
            <dd>{detected?.evidence.join(', ') || '—'}</dd>
          </>
        )}
        <dt>{tr('Token hygiene')}</dt>
        <dd>{t?.ok ? axes.hygiene + '/100' : '—'}</dd>
        <dt>{tr('Privacy score')}</dt>
        <dd>{t?.ok ? axes.privacy + '/100' : '—'}</dd>
        <dt>{tr('Policy')}</dt>
        <dd>
          {checks.length
            ? tr('{passed}/{total} passed', {
                passed: checks.filter((c) => c.status === 'Passed').length,
                total: checks.length,
              })
            : tr('Not evaluated')}
        </dd>
      </dl>
      {!privateMode && t?.ok && (
        <>
          <h2>{tr('Size')}</h2>
          {t.segments.map((s) => (
            <div className="stat" key={s.name}>
              <span>{tr(s.name)}</span>
              <code>{s.bytes} B</code>
            </div>
          ))}
        </>
      )}
      <p className="muted">
        {' '}
        {tr(
          'Decoding is not verification. A valid signature does not establish issuer trust or authorization.',
        )}{' '}
      </p>
    </aside>
  );
}
