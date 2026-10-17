import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/context';
import { decode } from '../core/jose/inspect';
import { build } from '../core/tools/builder';
import { object, readJson, type Obj } from '../core/parsing/json';
import { isHmac } from '../core/debugger/sample';
import { secretQuality } from '../core/crypto/keys';
import { Card, CopyIconButton, IconButton } from './JsonCard';
import { TokenEditor } from './TokenEditor';
import { CheckIcon, ClearIcon } from './icons';
import type { KeyFormat } from './Decoder';
export interface EncoderState {
  header: string;
  setHeader: (value: string) => void;
  payload: string;
  setPayload: (value: string) => void;
  key: string;
  setKey: (value: string) => void;
  format: KeyFormat;
  setFormat: (value: KeyFormat) => void;
  base64: boolean;
  setBase64: (value: boolean) => void;
  openInDecoder: (token: string, verifyKey: string) => void;
}
function parse(raw: string): { value?: Obj; error?: string } {
  try {
    const parsed = readJson(raw);
    if (!object(parsed.value))
      return {
        error: 'Given value is not a valid JSON object representation.',
      };
    if (parsed.issues.some((i) => i.kind === 'duplicate'))
      return { error: 'Duplicate JSON properties make the object ambiguous.' };
    return { value: parsed.value };
  } catch {
    return { error: 'Given value is not a valid JSON object representation.' };
  }
}
function Editor({
  title,
  value,
  onChange,
  error,
  validLabel,
}: {
  title: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  validLabel: string;
}) {
  const { tr } = useI18n();
  return (
    <Card
      title={title}
      actions={
        <IconButton label={tr('Clear')} onClick={() => onChange('')}>
          <ClearIcon />
        </IconButton>
      }
      footer={
        <div className="dbg-statuses">
          <p
            className={
              'dbg-status ' + (error ? 'dbg-status-error' : 'dbg-status-ok')
            }
            role="status"
          >
            {!error && <CheckIcon />}
            {tr(error ?? validLabel)}
          </p>
        </div>
      }
    >
      <textarea
        className="dbg-code-input"
        aria-label={title}
        value={value}
        rows={Math.min(14, Math.max(5, value.split('\n').length + 1))}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        onChange={(e) => onChange(e.target.value)}
      />
    </Card>
  );
}
export function Encoder({ s }: { s: EncoderState }) {
  const { tr } = useI18n();
  const header = parse(s.header);
  const payload = parse(s.payload);
  const alg =
    header.value && typeof header.value.alg === 'string'
      ? header.value.alg
      : '';
  const hmac = isHmac(alg);
  const headerError =
    header.error ??
    (header.value && !alg ? 'Header must declare a string alg.' : undefined);
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
  const ready =
    !headerError && !payload.error && !secretError && (alg === 'none' || !!key);
  const signature = JSON.stringify([s.header, s.payload, key, mode]);
  const [done, setDone] = useState<{
    signature: string;
    token?: string;
    error?: string;
  } | null>(null);
  useEffect(() => {
    if (!ready) return;
    let live = true;
    const timer = setTimeout(() => {
      build(s.header, s.payload, alg !== 'none', alg, key, mode, true)
        .then((token) => live && setDone({ signature, token }))
        .catch(
          (e: unknown) =>
            live &&
            setDone({
              signature,
              error: e instanceof Error ? e.message : 'Unable to sign.',
            }),
        );
    }, 150);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [ready, signature, s.header, s.payload, alg, key, mode]);
  const current = ready && done?.signature === signature ? done : null;
  const quality =
    hmac && mode === 'secret' && s.key ? secretQuality(s.key, alg) : null;
  const blocker =
    headerError ??
    payload.error ??
    (secretError || undefined) ??
    (!ready
      ? hmac
        ? 'Enter a secret to sign the JWT.'
        : 'Enter the private key to sign the JWT.'
      : undefined);
  const verifyKey = hmac ? s.key : '';
  return (
    <div className="dbg-grid">
      <div className="dbg-col">
        <div className="dbg-block">
          <h2 className="dbg-block-title">{tr('Header')}</h2>
          <Editor
            title={tr('Algorithm & Token Type')}
            value={s.header}
            onChange={s.setHeader}
            error={headerError}
            validLabel="Valid header"
          />
        </div>
        <div className="dbg-block">
          <h2 className="dbg-block-title">{tr('Payload')}</h2>
          <Editor
            title={tr('Data')}
            value={s.payload}
            onChange={s.setPayload}
            error={payload.error}
            validLabel="Valid payload"
          />
        </div>
        <div className="dbg-block">
          <div className="dbg-block-row">
            <h2 className="dbg-block-title">{tr('Sign JWT')}</h2>
            {alg === 'none' ? null : hmac ? (
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
                <span>{tr('Private Key Format')}</span>
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
          {alg === 'none' ? (
            <p className="dbg-status dbg-status-warn">
              {tr(
                'Unsigned token (alg: none). There is no signature to verify.',
              )}
            </p>
          ) : (
            <Card
              title={
                hmac ? tr('Sign JWT: Secret') : tr('Sign JWT: Private Key')
              }
              actions={
                <IconButton label={tr('Clear')} onClick={() => s.setKey('')}>
                  <ClearIcon />
                </IconButton>
              }
              footer={
                <div className="dbg-statuses">
                  {secretError ? (
                    <p className="dbg-status dbg-status-error" role="status">
                      {tr(secretError)}
                    </p>
                  ) : current?.error ? (
                    <p className="dbg-status dbg-status-error" role="status">
                      {tr(current.error)}
                    </p>
                  ) : quality && (quality.weak || quality.short) ? (
                    <p className="dbg-status dbg-status-warn" role="status">
                      {quality.weak
                        ? tr('Weak test-like secret.')
                        : tr('Below RFC 7518 minimum key length.')}
                    </p>
                  ) : null}
                </div>
              }
            >
              <textarea
                className="dbg-key-input"
                aria-label={hmac ? tr('Secret') : tr('Private Key')}
                value={s.key}
                rows={hmac ? 2 : 6}
                spellCheck={false}
                autoComplete="off"
                placeholder={
                  hmac
                    ? tr('your-256-bit-secret')
                    : s.format === 'pem'
                      ? '-----BEGIN PRIVATE KEY-----'
                      : '{"kty":"RSA", …}'
                }
                onChange={(e) => s.setKey(e.target.value)}
              />
            </Card>
          )}
        </div>
      </div>
      <div className="dbg-col">
        <div className="dbg-block">
          <h2 className="dbg-block-title">{tr('JWT Signature')}</h2>
          <Card
            title={tr('Encoded JWT')}
            actions={
              <CopyIconButton
                value={current?.token ?? ''}
                label={tr('Copy token')}
              />
            }
            footer={
              <div className="dbg-statuses">
                {blocker && !current?.token ? (
                  <p className="dbg-status dbg-status-muted" role="status">
                    {tr(blocker)}
                  </p>
                ) : current?.token ? (
                  <button
                    type="button"
                    className="dbg-btn"
                    onClick={() => s.openInDecoder(current.token!, verifyKey)}
                  >
                    {tr('Open in Decoder')}
                  </button>
                ) : null}
              </div>
            }
          >
            <TokenEditor
              value={current?.token ?? ''}
              label={tr('Encoded JWT')}
              readOnly
              placeholder={tr('The signed JWT appears here.')}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
