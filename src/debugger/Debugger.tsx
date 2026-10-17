import { useCallback, useEffect, useRef, useState } from 'react';
import { Brand } from '../components/Brand';
import { Footer } from '../components/Footer';
import { SiteLink } from '../components/SiteLink';
import { LanguageSelector } from '../i18n';
import { useI18n } from '../i18n/context';
import { session, type Theme } from '../app/session';
import { SAMPLE_ALGORITHMS, generateSample } from '../core/debugger/sample';
import { Decoder, type KeyFormat } from './Decoder';
import { Encoder } from './Encoder';
import {
  ChevronIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  SystemIcon,
} from './icons';
type Mode = 'decoder' | 'encoder';
const NAV = [
  ['/', 'Debugger'],
  ['/workbench', 'Workbench'],
  ['/docs', 'Documentation'],
  ['/privacy', 'Privacy'],
] as const;
function navigate(path: string) {
  window.history.pushState(null, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'instant' });
}
export function Debugger() {
  const { tr } = useI18n();
  const [theme, setThemeState] = useState<Theme>(() => session.getTheme());
  const [menu, setMenu] = useState(false);
  const [mode, setMode] = useState<Mode>('decoder');
  const [handoff] = useState(() => session.peekToken());
  const [token, setToken] = useState(handoff);
  const [key, setKey] = useState('');
  const [format, setFormat] = useState<KeyFormat>('pem');
  const [base64, setBase64] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signKey, setSignKey] = useState('');
  const [signFormat, setSignFormat] = useState<KeyFormat>('pem');
  const [signBase64, setSignBase64] = useState(false);
  const [sampleAlg, setSampleAlg] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const generation = useRef(0);
  const generate = useCallback(async (alg: string) => {
    const id = ++generation.current;
    setBusy(true);
    setError('');
    try {
      const sample = await generateSample(alg);
      if (id !== generation.current) return;
      setToken(sample.token);
      setKey(sample.verifyKey);
      setFormat('pem');
      setBase64(false);
      setHeader(sample.header);
      setPayload(sample.payload);
      setSignKey(sample.signKey);
      setSignFormat('pem');
      setSignBase64(false);
    } catch {
      if (id === generation.current)
        setError(
          'This browser could not generate a key for the selected algorithm.',
        );
    } finally {
      if (id === generation.current) setBusy(false);
    }
  }, []);
  useEffect(() => {
    session.clearToken();
    const latest = generation;
    const timer = setTimeout(() => {
      if (!handoff) void generate('HS256');
    }, 0);
    return () => {
      clearTimeout(timer);
      latest.current++;
    };
  }, [generate, handoff]);
  function setTheme(value: Theme) {
    session.setTheme(value);
    setThemeState(value);
  }
  const themes = [
    ['system', 'System theme', <SystemIcon key="s" />],
    ['dark', 'Dark theme', <MoonIcon key="d" />],
    ['light', 'Light theme', <SunIcon key="l" />],
  ] as const;
  return (
    <div className="dbg" data-theme={theme}>
      <a className="skip-link" href="#debugger">
        {tr('Skip to analysis')}
      </a>
      <header className="dbg-header">
        <Brand />
        <button
          type="button"
          className="dbg-menu-btn"
          aria-expanded={menu}
          aria-controls="dbg-nav"
          aria-label={tr('Main navigation')}
          onClick={() => setMenu(!menu)}
        >
          <MenuIcon />
        </button>
        <nav
          id="dbg-nav"
          className={'dbg-nav' + (menu ? ' open' : '')}
          aria-label={tr('Main navigation')}
        >
          {NAV.map(([href, label]) => (
            <SiteLink
              key={href}
              href={href}
              aria-current={href === '/' ? 'page' : undefined}
            >
              {tr(label)}
            </SiteLink>
          ))}
        </nav>
        <div className="dbg-header-end">
          <LanguageSelector />
          <div className="dbg-theme" role="radiogroup" aria-label={tr('Theme')}>
            {themes.map(([value, label, icon]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={theme === value}
                aria-label={tr(label)}
                title={tr(label)}
                onClick={() => setTheme(value)}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </header>
      <main id="debugger" className="dbg-main">
        <section className="dbg-hero">
          <h1>{tr('JSON Web Token (JWT) Debugger')}</h1>
          <p>
            {tr(
              'Decode, verify and generate JSON Web Tokens, an open, industry standard',
            )}{' '}
            <a
              href="https://www.rfc-editor.org/rfc/rfc7519.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              RFC 7519
            </a>{' '}
            {tr(
              'method for representing claims securely between two parties. Everything runs in your browser.',
            )}
          </p>
        </section>
        <div className="dbg-toolbar">
          <div
            className="dbg-tabs dbg-tabs-lg"
            role="tablist"
            aria-label={tr('Mode')}
          >
            {(['decoder', 'encoder'] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                aria-controls={'dbg-panel-' + m}
                id={'dbg-tab-' + m}
                onClick={() => setMode(m)}
              >
                {m === 'decoder' ? tr('JWT Decoder') : tr('JWT Encoder')}
              </button>
            ))}
          </div>
          <div className="dbg-actions">
            <p>
              {mode === 'decoder'
                ? tr(
                    'Paste a JWT below that you’d like to decode, validate, and verify.',
                  )
                : tr('Fill in the fields below to generate a signed JWT.')}
            </p>
            <label className="dbg-generate">
              <span>{tr('Generate example')}</span>
              <span className="dbg-select">
                <select
                  value={sampleAlg}
                  disabled={busy}
                  aria-label={tr('Select signing algorithm')}
                  onChange={(e) => {
                    setSampleAlg(e.target.value);
                    if (e.target.value) void generate(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    {tr('Select signing algorithm')}
                  </option>
                  {SAMPLE_ALGORITHMS.map((a) => (
                    <option key={a} value={a}>
                      {a === 'none' ? tr('none (unsigned)') : a}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </span>
            </label>
          </div>
        </div>
        {error && (
          <p className="dbg-status dbg-status-error dbg-banner" role="alert">
            {tr(error)}
          </p>
        )}
        <div
          role="tabpanel"
          id="dbg-panel-decoder"
          aria-labelledby="dbg-tab-decoder"
          hidden={mode !== 'decoder'}
        >
          <Decoder
            s={{
              token,
              setToken,
              key,
              setKey,
              format,
              setFormat,
              base64,
              setBase64,
              autoFocus,
              setAutoFocus,
              openWorkbench: () => {
                session.putToken(token);
                navigate('/workbench');
              },
            }}
          />
        </div>
        <div
          role="tabpanel"
          id="dbg-panel-encoder"
          aria-labelledby="dbg-tab-encoder"
          hidden={mode !== 'encoder'}
        >
          <Encoder
            s={{
              header,
              setHeader,
              payload,
              setPayload,
              key: signKey,
              setKey: setSignKey,
              format: signFormat,
              setFormat: setSignFormat,
              base64: signBase64,
              setBase64: setSignBase64,
              openInDecoder: (value, verifyKey) => {
                setToken(value);
                if (verifyKey) setKey(verifyKey);
                setBase64(signBase64);
                setMode('decoder');
              },
            }}
          />
        </div>
        <section className="dbg-info" aria-label={tr('About this tool')}>
          {(
            [
              [
                'Local by design',
                'Tokens, secrets and keys stay in this tab. No analytics, no trackers, no remote fonts and no storage.',
              ],
              [
                'Strict verification',
                'Keys must match the token algorithm: PEM or JWK material is never accepted as an HMAC secret, and keys or URLs inside a token are never trusted.',
              ],
              [
                'Need more depth?',
                'The workbench adds claim exploration, policies, key inspection, comparison, batch analysis and safe reports.',
              ],
            ] as const
          ).map(([title, text]) => (
            <article key={title}>
              <h2>{tr(title)}</h2>
              <p>{tr(text)}</p>
            </article>
          ))}
          <SiteLink
            className="dbg-btn dbg-btn-primary"
            href="/workbench"
            onClick={() => session.putToken(token)}
          >
            {tr('Open the workbench')}
          </SiteLink>
        </section>
      </main>
      <Footer />
    </div>
  );
}
