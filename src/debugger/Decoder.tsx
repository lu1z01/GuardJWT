import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/context';
import { useAnalysis } from '../hooks/useAnalysis';
import { decode } from '../core/jose/inspect';
import { verify, type CryptoResult } from '../core/crypto/verify';
import { isHmac } from '../core/debugger/sample';
import type { Finding } from '../core/audit/analyze';
import { Card, CopyIconButton, IconButton, JsonCard } from './JsonCard';
import { TokenEditor } from './TokenEditor';
import { CheckIcon, ClearIcon } from './icons';
export type KeyFormat = 'pem' | 'jwk';
const severityOrder = ['High', 'Medium', 'Low', 'Info'] as const;
export interface DecoderState {
  token: string;
  setToken: (value: string) => void;
  key: string;
  setKey: (value: string) => void;
  format: KeyFormat;
  setFormat: (value: KeyFormat) => void;
  base64: boolean;
  setBase64: (value: boolean) => void;
  autoFocus: boolean;
  setAutoFocus: (value: boolean) => void;
  openWorkbench: () => void;
}
function Status({
  tone,
  children,
}: {
  tone: 'ok' | 'error' | 'warn' | 'muted';
  children: string;
}) {
  return (
    <p className={'dbg-status dbg-status-' + tone} role="status">
      {tone === 'ok' && <CheckIcon />}
      {children}
    </p>
  );
}
export function Decoder({ s }: { s: DecoderState }) {
  const { tr } = useI18n();
  const analysis = useAnalysis(s.token);
  const t = analysis?.token;
  const findings: Finding[] = analysis?.findings ?? [];
  const alg = t?.ok ? t.header.alg : undefined;
  const algText = typeof alg === 'string' ? alg : '';
  const hmac = isHmac(algText);
  let key = s.key;
  let mode: 'secret' | 'key' = hmac ? 'secret' : 'key';
  let secretError = '';
  if (hmac && s.base64 && s.key) {
    try {
      decode(s.key);
      key = JSON.stringify({ kty: 'oct', k: s.key });
      mode = 'key';
    } catch {
      secretError = 'Secret is not valid Base64URL.';
    }
  }
  const verifiable =
    !!t?.ok &&
    t.format !== 'JWE Compact' &&
    algText !== 'none' &&
    !!key &&
    !secretError;
  const signature = JSON.stringify([s.token, key, algText, mode]);
  const [done, setDone] = useState<{
    signature: string;
    result: CryptoResult;
  } | null>(null);
  useEffect(() => {
    if (!verifiable) return;
    let live = true;
    const timer = setTimeout(() => {
      void verify(s.token, key, algText, mode).then((result) => {
        if (live) setDone({ signature, result });
      });
    }, 150);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [verifiable, signature, s.token, key, algText, mode]);
  const result =
    verifiable && done?.signature === signature ? done.result : null;
  const empty = !s.token.trim();
  const jwtOk = t?.ok && t.format !== 'JWE Compact' && !!t.payload;
  let tokenStatus: ReactStatus;
  if (empty) tokenStatus = null;
  else if (!analysis) tokenStatus = ['muted', 'Analyzing locally…'];
  else if (!t?.ok) tokenStatus = ['error', t?.message ?? ''];
  else if (t.format === 'JWE Compact')
    tokenStatus = [
      'warn',
      'JWE: content is encrypted and cannot be decoded here.',
    ];
  else if (!t.payload)
    tokenStatus = ['warn', t.payloadError ?? 'Payload is not a claims object.'];
  else tokenStatus = ['ok', 'Valid JWT'];
  let sigStatus: ReactStatus = null;
  if (!empty) {
    if (!jwtOk && !(t?.ok && t.format === 'JWE Compact'))
      sigStatus = ['muted', 'Please address JWT issues to verify signature.'];
    else if (t?.ok && t.format === 'JWE Compact')
      sigStatus = [
        'muted',
        'JWE inspection does not decrypt or verify authentication tags.',
      ];
    else if (algText === 'none')
      sigStatus = [
        'warn',
        'Unsigned token (alg: none). There is no signature to verify.',
      ];
    else if (secretError) sigStatus = ['error', secretError];
    else if (!key)
      sigStatus = [
        'muted',
        hmac
          ? 'Enter the secret to verify the signature.'
          : 'Enter the public key to verify the signature.',
      ];
    else if (!result) sigStatus = ['muted', 'Verifying locally…'];
    else if (result.status === 'SIGNATURE VALID')
      sigStatus = ['ok', 'Signature Verified'];
    else if (result.status === 'SIGNATURE INVALID')
      sigStatus = ['error', 'Invalid Signature'];
    else sigStatus = ['warn', result.status];
  }
  const visible = findings.filter((f) => f.severity !== 'Pass');
  const counts = severityOrder.map(
    (level) =>
      [level, visible.filter((f) => f.severity === level).length] as const,
  );
  return (
    <div className="dbg-grid">
      <div className="dbg-col">
        <div className="dbg-block-row">
          <h2 className="dbg-block-title">{tr('Encoded Token')}</h2>
          <label className="dbg-check">
            <input
              type="checkbox"
              checked={s.autoFocus}
              onChange={(e) => s.setAutoFocus(e.target.checked)}
            />
            {tr('Enable auto-focus')}
          </label>
        </div>
        <Card
          title={tr('JSON Web Token (JWT)')}
          actions={
            <>
              <CopyIconButton value={s.token} label={tr('Copy token')} />
              <IconButton
                label={tr('Clear token')}
                onClick={() => s.setToken('')}
              >
                <ClearIcon />
              </IconButton>
            </>
          }
          footer={
            <div className="dbg-statuses">
              {tokenStatus && (
                <Status tone={tokenStatus[0]}>{tr(tokenStatus[1])}</Status>
              )}
              {sigStatus && (
                <Status tone={sigStatus[0]}>{tr(sigStatus[1])}</Status>
              )}
              {result && result.status === 'SIGNATURE VALID' && (
                <p className="dbg-hint">
                  {tr(
                    'Issuer trust, claims, authorization and key provenance are not established.',
                  )}
                </p>
              )}
              {result &&
                result.status !== 'SIGNATURE VALID' &&
                result.status !== 'SIGNATURE INVALID' && (
                  <p className="dbg-hint">{tr(result.message)}</p>
                )}
            </div>
          }
        >
          <TokenEditor
            value={s.token}
            onChange={s.setToken}
            label={tr('JWT input')}
            placeholder={tr('Paste a JWT, JWS or JWE')}
            invalid={!empty && !!analysis && !t?.ok}
            autoFocus={s.autoFocus}
          />
        </Card>
      </div>
      <div className="dbg-col">
        <JsonCard
          title={tr('Decoded Header')}
          kind="header"
          value={t?.ok ? t.header : undefined}
          raw={t?.ok ? t.rawHeader : ''}
        />
        <JsonCard
          title={tr('Decoded Payload')}
          kind="payload"
          value={t?.ok ? t.payload : undefined}
          raw={t?.ok ? t.rawPayload : ''}
          emptyMessage={
            t?.ok && t.format === 'JWE Compact'
              ? tr('JWE: content is encrypted and cannot be decoded here.')
              : undefined
          }
        />
        <div className="dbg-block">
          <div className="dbg-block-row">
            <div>
              <h3 className="dbg-block-title">
                {tr('JWT Signature Verification')}{' '}
                <span className="dbg-muted">({tr('Optional')})</span>
              </h3>
              <p className="dbg-sub">
                {hmac
                  ? tr('Enter the secret used to sign the JWT below:')
                  : tr('Enter the public key used to verify the JWT below:')}
              </p>
            </div>
            {hmac ? (
              <label className="dbg-switch">
                <span>{tr('Base64URL encoded')}</span>
                <input
                  type="checkbox"
                  role="switch"
                  checked={s.base64}
                  onChange={(e) => s.setBase64(e.target.checked)}
                />
                <i aria-hidden="true" />
              </label>
            ) : (
              <label className="dbg-select-inline">
                <span>{tr('Public Key Format')}</span>
                <select
                  value={s.format}
                  onChange={(e) => s.setFormat(e.target.value as KeyFormat)}
                >
                  <option value="pem">PEM</option>
                  <option value="jwk">JWK</option>
                </select>
              </label>
            )}
          </div>
          <Card
            title={hmac ? tr('Secret') : tr('Public Key')}
            actions={
              <>
                <CopyIconButton value={s.key} label={tr('Copy')} />
                <IconButton label={tr('Clear')} onClick={() => s.setKey('')}>
                  <ClearIcon />
                </IconButton>
              </>
            }
            footer={
              s.key ? (
                <div className="dbg-statuses">
                  {secretError ? (
                    <Status tone="error">{tr(secretError)}</Status>
                  ) : result?.status === 'KEY INVALID' ||
                    result?.status === 'KEY TYPE MISMATCH' ? (
                    <Status tone="error">{tr(result.message)}</Status>
                  ) : verifiable ? (
                    <Status tone="ok">
                      {hmac ? tr('Secret in use') : tr('Public key in use')}
                    </Status>
                  ) : null}
                </div>
              ) : undefined
            }
          >
            <textarea
              className="dbg-key-input"
              aria-label={hmac ? tr('Secret') : tr('Public Key')}
              value={s.key}
              rows={hmac ? 2 : 5}
              spellCheck={false}
              autoComplete="off"
              placeholder={
                hmac
                  ? tr('your-256-bit-secret')
                  : s.format === 'pem'
                    ? '-----BEGIN PUBLIC KEY-----'
                    : '{"kty":"RSA","n":"…","e":"AQAB"}'
              }
              onChange={(e) => s.setKey(e.target.value)}
            />
          </Card>
        </div>
      </div>
      {!empty && jwtOk && (
        <aside className="dbg-findings" aria-label={tr('Security findings')}>
          <div className="dbg-findings-head">
            <h2>{tr('Security findings')}</h2>
            <div className="dbg-chips">
              {counts.map(([level, n]) => (
                <span
                  key={level}
                  className={'dbg-chip sev-' + level}
                  data-zero={n === 0 || undefined}
                >
                  {tr(level)} · {n}
                </span>
              ))}
            </div>
            <button type="button" className="dbg-btn" onClick={s.openWorkbench}>
              {tr('Open in workbench')}
            </button>
          </div>
          {visible.length ? (
            <ul>
              {visible.slice(0, 4).map((f) => (
                <li key={f.id}>
                  <span className={'dbg-chip sev-' + f.severity}>
                    {tr(f.severity)}
                  </span>
                  <span>{tr(f.title)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="dbg-muted">
              {tr(
                'No findings from the implemented checks. This is not a security guarantee.',
              )}
            </p>
          )}
          {visible.length > 4 && (
            <p className="dbg-muted">
              {tr('{count} more in the workbench.', {
                count: visible.length - 4,
              })}
            </p>
          )}
        </aside>
      )}
    </div>
  );
}
type ReactStatus = ['ok' | 'error' | 'warn' | 'muted', string] | null;
