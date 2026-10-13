import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Information } from './pages/Information';
import { Footer } from './components/Footer';
import { publicLink, repositoryUrl } from './config/author';
import { useAnalysis } from './hooks/useAnalysis';
import { EXAMPLE_TOKEN } from './core/jwt/example';
import { MAX_INPUT, print } from './core/parsing/json';
import { EXAMPLES, example } from './core/jose/examples';
import { profile } from './core/claims/explore';
import { score } from './core/audit/analyze';
import type { CryptoResult } from './core/crypto/verify';
import type { PolicyCheck } from './core/policy/evaluate';
import { Inspector } from './features/Inspector';
import { Claims } from './features/Claims';
import { Timeline } from './features/Timeline';
import { Security } from './features/Security';
import { Resizer } from './components/Resizer';
import { CopyButton } from './components/CopyButton';
const Verify = lazy(() =>
  import('./features/Verify').then((m) => ({ default: m.Verify })),
);
const Keys = lazy(() =>
  import('./features/Keys').then((m) => ({ default: m.Keys })),
);
const Policy = lazy(() =>
  import('./features/Policy').then((m) => ({ default: m.Policy })),
);
const Compare = lazy(() =>
  import('./features/Compare').then((m) => ({ default: m.Compare })),
);
const Sanitize = lazy(() =>
  import('./features/Sanitize').then((m) => ({ default: m.Sanitize })),
);
const Reports = lazy(() =>
  import('./features/Reports').then((m) => ({ default: m.Reports })),
);
const Batch = lazy(() =>
  import('./features/Batch').then((m) => ({ default: m.Batch })),
);
const Builder = lazy(() =>
  import('./features/Builder').then((m) => ({ default: m.Builder })),
);
const Tools = lazy(() =>
  import('./features/Tools').then((m) => ({ default: m.Tools })),
);
const TABS = [
  'Decoder',
  'Encoder',
  'Claims Breakdown',
  'Security',
  'Verify',
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
function Workspace() {
  const [token, setToken] = useState(''),
    [tab, setTab] = useState<Tab>('Decoder'),
    [message, setMessage] = useState(''),
    [version, setVersion] = useState(0),
    [inputEpoch, setInputEpoch] = useState(0),
    [privateMode, setPrivateMode] = useState(false),
    [showInput, setShowInput] = useState(true),
    [wrapInput, setWrapInput] = useState(true),
    [showContext, setShowContext] = useState(true),
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
    if (!palette) paletteReturn.current?.focus();
  }, [palette]);
  useEffect(() => {
    panelRef.current?.scrollTo?.(0, 0);
  }, [tab]);
  const detected = t?.ok ? profile(t.header, t.payload) : null;
  const axes = score(findings);
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
        Skip to analysis
      </a>
      <header className="topbar">
        <a className="brand" href="/">
          <ShieldCheck size={19} />
          GuardJWT
        </a>
        <nav aria-label="Main navigation">
          <button
            ref={analyzeButton}
            aria-keyshortcuts="Control+Enter Meta+Enter"
            onClick={() => {
              invalidate();
              setTab('Decoder');
            }}
          >
            Workspace
          </button>
          <button
            onClick={(e) => {
              paletteReturn.current = e.currentTarget;
              setPalette(true);
            }}
            aria-keyshortcuts="Control+k Meta+k"
          >
            Commands
          </button>
          <span
            className="local"
            title="JWTs and cryptographic material are processed locally in your browser."
          >
            LOCAL
          </span>
          {source && (
            <a href={source} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          <button
            aria-label="Toggle light theme"
            aria-pressed={light}
            onClick={() => setLight(!light)}
          >
            Theme
          </button>
        </nav>
      </header>
      <div className="workspace-toolbar">
        <div>
          <button
            aria-pressed={showInput}
            onClick={() => setShowInput(!showInput)}
          >
            {showInput ? 'Hide input' : 'Show input'}
          </button>
          <button
            className="context-toggle"
            aria-pressed={showContext}
            onClick={() => setShowContext(!showContext)}
          >
            {showContext ? 'Hide context' : 'Show context'}
          </button>
        </div>
        <div>
          <button
            aria-label="Privacy Mode"
            aria-pressed={privateMode}
            onClick={() => setPrivateMode(!privateMode)}
          >
            {privateMode ? 'Privacy Mode ON' : 'Privacy Mode'}
          </button>
          <button onClick={clear}>Clear workspace</button>
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
              <h2>Token input</h2>
              <label className="sr-only" htmlFor="jwt-input">
                JWT input
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
                placeholder="Paste JWT, JWS or JWE"
              />
              <div className="editor-meta">
                <span>{token.length.toLocaleString()} characters</span>
                <button
                  aria-pressed={wrapInput}
                  onClick={() => setWrapInput(!wrapInput)}
                >
                  Wrap token
                </button>
              </div>
              <div className="toolbar">
                <button onClick={paste}>Paste</button>
                <button
                  onClick={() => {
                    invalidate();
                    setTab('Decoder');
                  }}
                >
                  Decode
                </button>
                <CopyButton value={token} label="Copy Token" />
                <button onClick={() => update(EXAMPLE_TOKEN)}>
                  Load example
                </button>
              </div>
              <label>
                Fixture lab
                <select
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) update(example(e.target.value));
                    e.target.value = '';
                  }}
                >
                  <option value="">Choose fictitious example…</option>
                  {EXAMPLES.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
              <small>
                Fixtures are fictitious. Algorithm examples have illustrative
                signatures, not verified credentials.
              </small>
              <p className="muted">
                1 MiB input limit
                <br />
                Memory only. No uploads or history.
              </p>
              {outer && (
                <button
                  onClick={() => {
                    const value = outer;
                    update(value);
                  }}
                >
                  Return to outer JOSE
                </button>
              )}
            </aside>
            <Resizer
              label="Resize input panel"
              value={width}
              onChange={setWidth}
            />
          </>
        )}
        <main className="main-inspector">
          <div
            className="tabs desktop-tabs"
            role="tablist"
            aria-label="Workbench areas"
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
                {name}
                {name === 'Security' && findings.length
                  ? ' (' + findings.length + ')'
                  : ''}
              </button>
            ))}
          </div>
          <nav className="mobile-areas" aria-label="Mobile workbench areas">
            {(
              ['Decoder', 'Encoder', 'Claims Breakdown', 'Security'] as const
            ).map((name, i) => (
              <button
                key={name}
                aria-label={'Open ' + name}
                aria-current={tab === name ? 'page' : undefined}
                onClick={() => setTab(name)}
              >
                {['Decode', 'Encode', 'Claims', 'Security'][i]}
              </button>
            ))}
            <label className="more-tools">
              <span className="sr-only">More tools</span>
              <select
                value={TABS.indexOf(tab) >= 4 ? tab : ''}
                onChange={(e) => {
                  if (e.target.value) setTab(e.target.value as Tab);
                }}
              >
                <option value="" disabled>
                  More
                </option>
                {TABS.slice(4).map((name) => (
                  <option key={name}>{name}</option>
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
            aria-labelledby={'tab-' + tab.replaceAll(' ', '-')}
          >
            {message && (
              <p role="alert" className="notice">
                {message}
              </p>
            )}
            {privateMode ? (
              <section>
                <h2>Privacy / Screenshare Mode</h2>
                <p>
                  Token, keys, claim values and finding evidence are hidden.
                  Sensitive tool panels are closed.
                </p>
                <p>
                  Showing up to 100 of {findings.length} findings; values
                  hidden.
                </p>
                <table>
                  <tbody>
                    {findings.slice(0, 100).map((f, i) => (
                      <tr key={i}>
                        <td>{f.severity}</td>
                        <td>{f.title}</td>
                        <td>{f.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ) : (
              <Suspense fallback={<p role="status">Loading local tool…</p>}>
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
                    <section className="empty">
                      <h1>No token loaded</h1>
                      <p>
                        Paste a JWT to inspect its header, claims and signature
                        metadata.
                      </p>
                      <button onClick={() => void paste()}>Paste token</button>
                    </section>
                  ) : !t ? (
                    <p role="status">Analyzing locally…</p>
                  ) : !t.ok ? (
                    <p role="alert" className="notice">
                      {t.message}
                    </p>
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
                          <p>No JWT claims available for this JOSE format.</p>
                        ))}{' '}
                      {tab === 'Timeline' &&
                        (t.payload ? (
                          <Timeline payload={t.payload} />
                        ) : (
                          <p>No temporal claims available.</p>
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
                          <p>No decoded claims to sanitize.</p>
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
          <aside className="context-panel">
            <h2>Context</h2>
            <dl>
              <dt>Format</dt>
              <dd>{t?.ok ? t.format : '—'}</dd>
              <dt>Signature</dt>
              <dd>{cryptoResult.status}</dd>
              {!privateMode && (
                <>
                  <dt>Declared algorithm</dt>
                  <dd>{t?.ok ? print(t.header.alg, false) : '—'}</dd>
                  <dt>Profile estimate</dt>
                  <dd>
                    {detected?.name ?? '—'}
                    <small>
                      {detected ? detected.confidence + ' confidence' : ''}
                    </small>
                  </dd>
                  <dt>Profile evidence</dt>
                  <dd>{detected?.evidence.join(', ') || '—'}</dd>
                </>
              )}
              <dt>Token hygiene</dt>
              <dd>{t?.ok ? axes.hygiene + '/100' : '—'}</dd>
              <dt>Privacy score</dt>
              <dd>{t?.ok ? axes.privacy + '/100' : '—'}</dd>
              <dt>Policy</dt>
              <dd>
                {checks.length
                  ? checks.filter((c) => c.status === 'Passed').length +
                    '/' +
                    checks.length +
                    ' passed'
                  : 'Not evaluated'}
              </dd>
            </dl>
            {!privateMode && t?.ok && (
              <>
                <h2>Size</h2>
                {t.segments.map((s) => (
                  <div className="stat" key={s.name}>
                    <span>{s.name}</span>
                    <code>{s.bytes} B</code>
                  </div>
                ))}
              </>
            )}
            <p className="muted">
              Decoding is not verification. A valid signature does not establish
              issuer trust or authorization.
            </p>
          </aside>
        )}
      </div>
      <div className="statusbar" aria-label="Workspace status">
        <span>
          {t?.ok ? t.format : 'JOSE'} ·{' '}
          {privateMode ? 'Values hidden' : t?.ok ? String(t.header.alg) : '—'} ·{' '}
          {t?.ok ? t.segments.length : 0} segments · {t?.ok ? t.totalBytes : 0}{' '}
          B
        </span>
        <span>
          {!privateMode && t?.ok && t.format !== 'JWE Compact'
            ? `${t.segments[2]?.bytes ?? 0} bytes · ${t.segments[2]?.bytes ? (cryptoResult.status === 'NOT VERIFIED' ? 'present, not verified' : cryptoResult.status) : 'absent — unsigned'}`
            : 'Sensitive processing stays local'}{' '}
          · LOCAL
        </span>
      </div>
      <Footer compact />
      {palette && (
        <div className="modal-backdrop" onClick={() => setPalette(false)}>
          <div
            className="command-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                const controls =
                  e.currentTarget.querySelectorAll<HTMLElement>('input,button');
                const first = controls[0],
                  last = controls[controls.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                  e.preventDefault();
                  last?.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                  e.preventDefault();
                  first?.focus();
                }
              }
            }}
          >
            <input
              autoFocus
              aria-label="Find command"
              placeholder="Find a command…"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
            />
            {commands
              .filter((n) => n.toLowerCase().includes(command.toLowerCase()))
              .map((n) => (
                <button key={n} onClick={() => choose(n)}>
                  {n}
                </button>
              ))}
            <button onClick={() => setPalette(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return path === '/' ? <Workspace /> : <Information path={path} />;
}
