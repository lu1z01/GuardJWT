import { ContextPanel } from './ContextPanel';
import { CommandPalette } from './CommandPalette';
import { useI18n } from '../i18n/context';
import { LanguageSelector } from '../i18n';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Brand } from '../components/Brand';
import { SiteLink } from '../components/SiteLink';
import { session } from './session';
import { Footer } from '../components/Footer';
import { publicLink, repositoryUrl } from '../config/author';
import { useAnalysis } from '../hooks/useAnalysis';
import { EXAMPLE_TOKEN } from '../core/jwt/example';
import { MAX_INPUT } from '../core/parsing/json';
import { EXAMPLES, example } from '../core/jose/examples';
import type { CryptoResult } from '../core/crypto/verify';
import type { PolicyCheck } from '../core/policy/evaluate';
import { Inspector } from '../features/Inspector';
import { Claims } from '../features/Claims';
import { Timeline } from '../features/Timeline';
import { Security } from '../features/Security';
import { Resizer } from '../components/Resizer';
import { CopyButton } from '../components/CopyButton';
const Verify = lazy(() =>
  import('../features/Verify').then((m) => ({ default: m.Verify })),
);
const Keys = lazy(() =>
  import('../features/Keys').then((m) => ({ default: m.Keys })),
);
const Policy = lazy(() =>
  import('../features/Policy').then((m) => ({ default: m.Policy })),
);
const Compare = lazy(() =>
  import('../features/Compare').then((m) => ({ default: m.Compare })),
);
const Sanitize = lazy(() =>
  import('../features/Sanitize').then((m) => ({ default: m.Sanitize })),
);
const Reports = lazy(() =>
  import('../features/Reports').then((m) => ({ default: m.Reports })),
);
const Batch = lazy(() =>
  import('../features/Batch').then((m) => ({ default: m.Batch })),
);
const Builder = lazy(() =>
  import('../features/Builder').then((m) => ({ default: m.Builder })),
);
const Tools = lazy(() =>
  import('../features/Tools').then((m) => ({ default: m.Tools })),
);
const TABS = [
  'Decoder',
  'Claims Breakdown',
  'Security',
  'Verify',
  'Encoder',
  'Timeline',
  'Keys',
  'Policy',
  'Compare',
  'Batch',
  'Sanitize',
  'Reports',
  'Tools',
] as const;
type Tab = (typeof TABS)[number];
export function Workspace() {
  const { tr, locale } = useI18n();
  const [token, setToken] = useState(() => session.peekToken()),
    [tab, setTab] = useState<Tab>('Decoder'),
    [message, setMessage] = useState(''),
    [version, setVersion] = useState(0),
    [inputEpoch, setInputEpoch] = useState(0),
    [privateMode, setPrivateMode] = useState(false),
    [showInput, setShowInput] = useState(true),
    [wrapInput, setWrapInput] = useState(true),
    [showContext, setShowContext] = useState(false),
    [width, setWidth] = useState(300),
    [light, setLight] = useState(false),
    [palette, setPalette] = useState(false),
    [command, setCommand] = useState(''),
    [outer, setOuter] = useState<string | null>(null);
  const [cryptoResult, setCryptoResult] = useState<CryptoResult>({
      status: 'NOT VERIFIED',
      message: '',
    }),
    [checks, setChecks] = useState<PolicyCheck[]>([]);
  const [selectedPointer, setSelectedPointer] = useState('');
  const [findingPointer, setFindingPointer] = useState('');
  const revision = useRef(0);
  const paletteReturn = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const analyzeButton = useRef<HTMLButtonElement>(null);
  const source = publicLink(repositoryUrl);
  const analysis = useAnalysis(token, version);
  const t = analysis?.token;
  const findings = analysis?.findings ?? [];
  function invalidate() {
    revision.current++;
    setVersion((v) => v + 1);
    setCryptoResult({ status: 'NOT VERIFIED', message: '' });
    setChecks([]);
    setSelectedPointer('');
    setFindingPointer('');
  }
  function update(value: string) {
    invalidate();
    setMessage(
      value.length > MAX_INPUT
        ? 'Input too large for interactive analysis (1 MiB limit).'
        : '',
    );
    setToken(value.length > MAX_INPUT ? '' : value);
    setOuter(null);
  }
  function clear() {
    setInputEpoch((v) => v + 1);
    update('');
    setPrivateMode(false);
    setCommand('');
    setPalette(false);
  }
  async function paste() {
    const id = ++revision.current;
    try {
      const value = await navigator.clipboard.readText();
      if (id === revision.current) update(value);
    } catch {
      if (id === revision.current)
        setMessage(
          'Clipboard access unavailable. Use Ctrl+V or ⌘V in the JWT field.',
        );
    }
  }
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (!document.querySelector('[role=dialog]'))
          paletteReturn.current = document.activeElement as HTMLElement;
        setPalette((v) => !v);
      }
      if (e.key === 'Escape') setPalette(false);
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key === 'Enter' &&
        !document.querySelector('[role=dialog]')
      ) {
        e.preventDefault();
        analyzeButton.current?.click();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  useEffect(() => {
    session.clearToken();
  }, []);
  useEffect(() => {
    if (!palette) paletteReturn.current?.focus();
  }, [palette]);
  useEffect(() => {
    panelRef.current?.scrollTo?.(0, 0);
  }, [tab]);
  const commands = [
    ...TABS,
    'Paste Token',
    'Load Example',
    'Privacy Mode',
    'Clear Workspace',
  ];
  function choose(name: string) {
    setPalette(false);
    setCommand('');
    if (TABS.includes(name as Tab)) setTab(name as Tab);
    else if (name === 'Paste Token') void paste();
    else if (name === 'Load Example') update(EXAMPLE_TOKEN);
    else if (name === 'Clear Workspace') clear();
    else if (name === 'Privacy Mode') setPrivateMode((v) => !v);
  }
  const signatureStatus = (r: CryptoResult) => {
    setCryptoResult(r);
    setChecks([]);
  };
  return (
    <div className={'app-shell ' + (light ? 'light' : '')}>
      <a className="skip-link" href="#active-panel">
        {' '}
        {tr('Skip to analysis')}{' '}
      </a>
      <header className="topbar">
        <Brand />
        <nav aria-label={tr('Main navigation')}>
          <LanguageSelector />
          <SiteLink href="/">{tr('Debugger')}</SiteLink>
          <button
            ref={analyzeButton}
            aria-keyshortcuts="Control+Enter Meta+Enter"
            onClick={() => {
              invalidate();
              setTab('Decoder');
            }}
          >
            {' '}
            {tr('Workspace')}{' '}
          </button>
          <button
            onClick={(e) => {
              paletteReturn.current = e.currentTarget;
              setPalette(true);
            }}
            aria-keyshortcuts="Control+k Meta+k"
          >
            {' '}
            {tr('Commands')}{' '}
          </button>
          {source && (
            <a href={source} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          <button
            aria-label={tr('Toggle light theme')}
            aria-pressed={light}
            onClick={() => setLight(!light)}
          >
            {' '}
            {tr('Theme')}{' '}
          </button>
        </nav>
      </header>
      <div className="workspace-toolbar">
        <div>
          <button
            aria-pressed={showInput}
            onClick={() => setShowInput(!showInput)}
          >
            {showInput ? tr('Hide input') : tr('Show input')}
          </button>
          <button
            className="context-toggle"
            aria-pressed={showContext}
            onClick={() => setShowContext(!showContext)}
          >
            {showContext ? tr('Hide context') : tr('Show context')}
          </button>
        </div>
        <div>
          <button
            aria-pressed={privateMode}
            onClick={() => setPrivateMode(!privateMode)}
          >
            {privateMode ? tr('Privacy Mode ON') : tr('Privacy Mode')}
          </button>
          <button onClick={clear}>{tr('Clear workspace')}</button>
        </div>
      </div>
      <div
        className={
          'workspace ' +
          (!showInput || privateMode ? 'no-input' : '') +
          (!showContext ? ' no-context' : '')
        }
        style={{
          gridTemplateColumns: `${showInput && !privateMode ? width + 'px 5px ' : ''}minmax(0,1fr)${showContext ? ' 230px' : ''}`,
        }}
      >
        {showInput && !privateMode && (
          <>
            <aside className="input-panel">
              <h2>{tr('Token input')}</h2>
              <label className="sr-only" htmlFor="jwt-input">
                {' '}
                {tr('JWT input')}{' '}
              </label>
              <textarea
                id="jwt-input"
                wrap={wrapInput ? 'soft' : 'off'}
                key={inputEpoch}
                value={token}
                onChange={(e) => update(e.target.value)}
                onPaste={(e) => {
                  const value = e.clipboardData.getData('text');
                  if (value.length > MAX_INPUT) {
                    e.preventDefault();
                    update(value);
                  }
                }}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                placeholder={tr('Paste JWT, JWS or JWE')}
              />
              <div className="editor-meta">
                <span>
                  {token.length.toLocaleString(locale)} {tr('characters')}
                </span>
                <button
                  aria-pressed={wrapInput}
                  onClick={() => setWrapInput(!wrapInput)}
                >
                  {' '}
                  {tr('Wrap token')}{' '}
                </button>
              </div>
              <div className="toolbar">
                <button onClick={paste}>{tr('Paste')}</button>
                <button
                  onClick={() => {
                    invalidate();
                    setTab('Decoder');
                  }}
                >
                  {' '}
                  {tr('Decode')}{' '}
                </button>
                <CopyButton value={token} label={tr('Copy Token')} />
                <button onClick={() => update(EXAMPLE_TOKEN)}>
                  {' '}
                  {tr('Load example')}{' '}
                </button>
              </div>
              <label>
                {' '}
                {tr('Fixture lab')}{' '}
                <select
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) update(example(e.target.value));
                    e.target.value = '';
                  }}
                >
                  <option value="">{tr('Choose fictitious example…')}</option>
                  {EXAMPLES.map((n) => (
                    <option key={n} value={n}>
                      {tr(n)}
                    </option>
                  ))}
                </select>
              </label>
              <small>
                {' '}
                {tr(
                  'Fixtures are fictitious. Algorithm examples have illustrative signatures, not verified credentials.',
                )}{' '}
              </small>
              <p className="muted">
                {' '}
                {tr('1 MiB input limit')} <br />{' '}
                {tr('Memory only. No uploads or history.')}{' '}
              </p>
              {outer && (
                <button
                  onClick={() => {
                    const value = outer;
                    update(value);
                  }}
                >
                  {' '}
                  {tr('Return to outer JOSE')}{' '}
                </button>
              )}
            </aside>
            <Resizer
              label={tr('Resize input panel')}
              value={width}
              onChange={setWidth}
            />
          </>
        )}
        <main className="main-inspector">
          <div
            className="tabs desktop-tabs"
            role="tablist"
            aria-label={tr('Workbench areas')}
          >
            {TABS.map((name) => (
              <button
                role="tab"
                aria-selected={tab === name}
                aria-controls="active-panel"
                id={'tab-' + name.replaceAll(' ', '-')}
                tabIndex={tab === name ? 0 : -1}
                onKeyDown={(e) => {
                  if (
                    ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)
                  ) {
                    e.preventDefault();
                    const index =
                      e.key === 'Home'
                        ? 0
                        : e.key === 'End'
                          ? TABS.length - 1
                          : (TABS.indexOf(name) +
                              (e.key === 'ArrowRight' ? 1 : -1) +
                              TABS.length) %
                            TABS.length;
                    const next = TABS[index]!;
                    setTab(next);
                    document
                      .getElementById('tab-' + next.replaceAll(' ', '-'))
                      ?.focus();
                  }
                }}
                key={name}
                onClick={() => setTab(name)}
              >
                {tr(name)}
                {name === 'Security' && findings.length
                  ? ' (' + findings.length + ')'
                  : ''}
              </button>
            ))}
          </div>
          <nav
            className="mobile-areas"
            aria-label={tr('Mobile workbench areas')}
          >
            {(
              ['Decoder', 'Claims Breakdown', 'Security', 'Verify'] as const
            ).map((name, i) => (
              <button
                key={name}
                aria-label={tr(name)}
                aria-current={tab === name ? 'page' : undefined}
                onClick={() => setTab(name)}
              >
                {tr(['Decode', 'Claims', 'Security', 'Verify'][i]!)}
              </button>
            ))}
            <label className="more-tools">
              <span className="sr-only">{tr('More tools')}</span>
              <select
                value={TABS.indexOf(tab) >= 4 ? tab : ''}
                onChange={(e) => {
                  if (e.target.value) setTab(e.target.value as Tab);
                }}
              >
                <option value="" disabled>
                  {' '}
                  {tr('More')}{' '}
                </option>
                {TABS.slice(4).map((name) => (
                  <option key={name} value={name}>
                    {tr(name)}
                  </option>
                ))}
              </select>
            </label>
          </nav>
          <div
            ref={panelRef}
            tabIndex={-1}
            className="panel-content"
            role="tabpanel"
            id="active-panel"
            aria-label={tr(tab)}
          >
            {token === EXAMPLE_TOKEN && !privateMode && (
              <p className="demo-note">
                {tr(
                  'Demo token: unsigned on purpose. Explore its contents; security warnings are expected.',
                )}
              </p>
            )}
            {token && !privateMode && (
              <details className="usage-help">
                <summary>{tr('How to use')}</summary>
                <p>
                  {tr(
                    'To check who signed a token, you need the expected algorithm and a trusted key. Reading the contents alone cannot confirm authenticity.',
                  )}
                </p>
                <p>
                  {tr(
                    'Technical names and exported JSON stay unchanged. Your token data is never translated.',
                  )}
                </p>
              </details>
            )}
            {message && (
              <p role="alert" className="notice">
                {tr(message)}
              </p>
            )}
            {privateMode ? (
              <section>
                <h2>{tr('Privacy / Screenshare Mode')}</h2>
                <p>
                  {' '}
                  {tr(
                    'Token, keys, claim values and finding evidence are hidden. Sensitive tool panels are closed.',
                  )}{' '}
                </p>
                <p>
                  {' '}
                  {tr('Showing up to 100 of')} {findings.length}{' '}
                  {tr('findings; values hidden.')}{' '}
                </p>
                <table>
                  <tbody>
                    {findings.slice(0, 100).map((f, i) => (
                      <tr key={i}>
                        <td>{tr(f.severity)}</td>
                        <td>{tr(f.title)}</td>
                        <td>{tr(f.category)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ) : (
              <Suspense
                fallback={<p role="status">{tr('Loading local tool…')}</p>}
              >
                <div key={version}>
                  {tab === 'Keys' ? (
                    <Keys kid={t?.ok ? t.header.kid : undefined} />
                  ) : tab === 'Tools' ? (
                    <Tools token={token} />
                  ) : tab === 'Encoder' ? (
                    <Builder
                      onOpen={(value, verify = false) => {
                        update(value);
                        setTab(verify ? 'Verify' : 'Decoder');
                      }}
                    />
                  ) : tab === 'Batch' ? (
                    <Batch />
                  ) : !token ? (
                    <section className="empty welcome">
                      <h1>{tr('Inspect a token, one step at a time')}</h1>
                      <p>
                        {tr(
                          'A JWT is a compact text used by applications to carry information. Paste one to read its contents, or start with a made-up example.',
                        )}
                      </p>
                      <div className="toolbar">
                        <button
                          className="button-primary"
                          onClick={() => update(EXAMPLE_TOKEN)}
                        >
                          {tr('Try an example')}
                        </button>
                        <button onClick={() => void paste()}>
                          {tr('Paste token')}
                        </button>
                      </div>
                      <ol className="getting-started">
                        <li>
                          <h2>{tr('Read the contents')}</h2>
                          <p>
                            {tr(
                              'The header describes the format. The payload contains fields called claims, such as who issued the token and when it expires.',
                            )}
                          </p>
                        </li>
                        <li>
                          <h2>{tr('Understand the warnings')}</h2>
                          <p>
                            {tr(
                              'Warnings are clues to investigate, not a verdict on the application. The sample is deliberately unsigned, so a warning is expected.',
                            )}
                          </p>
                        </li>
                        <li>
                          <h2>{tr('Check the signature')}</h2>
                          <p>
                            {tr(
                              'To check who signed a token, you need the expected algorithm and a trusted key. Reading the contents alone cannot confirm authenticity.',
                            )}
                          </p>
                        </li>
                      </ol>
                      <p className="muted">
                        {tr(
                          'Everything is processed in this browser. Use a sample if you are just exploring.',
                        )}
                      </p>
                    </section>
                  ) : !t ? (
                    <p role="status">{tr('Analyzing locally…')}</p>
                  ) : !t.ok ? (
                    <div role="alert" className="notice">
                      <p>
                        {tr(
                          'We could not read this token. Check that you pasted the complete token, without quotation marks.',
                        )}
                      </p>
                      <details>
                        <summary>{tr('Technical details')}</summary>
                        <p>{tr(t.message)}</p>
                      </details>
                    </div>
                  ) : (
                    <>
                      {tab === 'Decoder' && (
                        <Inspector
                          token={t}
                          selectedPointer={selectedPointer}
                          onClaim={(pointer) => {
                            setSelectedPointer(pointer);
                            setTab('Claims Breakdown');
                          }}
                          onNested={(v) => {
                            const parent = token;
                            update(v);
                            setOuter(parent);
                          }}
                        />
                      )}
                      {tab === 'Security' && (
                        <Security
                          findings={findings}
                          pointer={findingPointer}
                          onClearFilter={() => setFindingPointer('')}
                          onClaim={(p) => {
                            setSelectedPointer(p);
                            setTab('Claims Breakdown');
                          }}
                        />
                      )}{' '}
                      {tab === 'Verify' && (
                        <Verify token={token} onResult={signatureStatus} />
                      )}{' '}
                      {tab === 'Claims Breakdown' &&
                        (t.payload ? (
                          <Claims
                            payload={t.payload}
                            selectedPointer={selectedPointer}
                            onDecoder={(pointer) => {
                              setSelectedPointer(pointer);
                              setTab('Decoder');
                            }}
                            onSecurity={(p) => {
                              setFindingPointer(p);
                              setTab('Security');
                            }}
                          />
                        ) : (
                          <p>
                            {tr(
                              'No JWT claims available for this JOSE format.',
                            )}
                          </p>
                        ))}{' '}
                      {tab === 'Timeline' &&
                        (t.payload ? (
                          <Timeline payload={t.payload} />
                        ) : (
                          <p>{tr('No temporal claims available.')}</p>
                        ))}{' '}
                      {tab === 'Policy' && (
                        <Policy
                          key={cryptoResult.status}
                          token={t}
                          status={cryptoResult.status}
                          onChecks={setChecks}
                        />
                      )}{' '}
                      {tab === 'Compare' && <Compare token={t} />}{' '}
                      {tab === 'Sanitize' &&
                        (t.payload ? (
                          <Sanitize payload={t.payload} />
                        ) : (
                          <p>{tr('No decoded claims to sanitize.')}</p>
                        ))}{' '}
                      {tab === 'Reports' && (
                        <Reports
                          token={t}
                          findings={findings}
                          status={cryptoResult.status}
                          checks={checks}
                        />
                      )}
                    </>
                  )}
                </div>
              </Suspense>
            )}
          </div>
        </main>
        {showContext && (
          <ContextPanel
            token={t?.ok ? t : undefined}
            privateMode={privateMode}
            cryptoResult={cryptoResult}
            checks={checks}
            findings={findings}
          />
        )}
      </div>
      <div className="statusbar" aria-label={tr('Workspace status')}>
        <span>
          {t?.ok ? t.format : 'JOSE'} ·{' '}
          {privateMode
            ? tr('Values hidden')
            : t?.ok
              ? String(t.header.alg)
              : '—'}{' '}
          · {t?.ok ? t.segments.length : 0} {tr('segments ·')}{' '}
          {t?.ok ? t.totalBytes : 0} B
        </span>
        <span>
          {!privateMode && t?.ok && t.format !== 'JWE Compact'
            ? `${t.segments[2]?.bytes ?? 0} bytes · ${t.segments[2]?.bytes ? (cryptoResult.status === 'NOT VERIFIED' ? tr('present, not verified') : tr(cryptoResult.status)) : tr('absent — unsigned')}`
            : tr('Sensitive processing stays local')}{' '}
          · LOCAL
        </span>
      </div>
      <Footer compact />
      {palette && (
        <CommandPalette
          command={command}
          setCommand={setCommand}
          commands={commands}
          onChoose={choose}
          onClose={() => setPalette(false)}
        />
      )}
    </div>
  );
}
