import { Footer } from '../components/Footer';
import { Privacy } from './Privacy';
import { author, publicLink, repositoryUrl } from '../config/author';
export function Information({ path }: { path: string }) {
  const repo = publicLink(repositoryUrl);
  return (
    <div className="app-shell institutional">
      <header className="topbar">
        <a className="brand" href="/">
          GuardJWT
        </a>
        <a href="/">← Open workbench</a>
      </header>
      {path === '/privacy' ? (
        <Privacy />
      ) : (
        <main className="docs-page" id="main-content">
          {path === '/about' ? (
            <>
              <h1>About GuardJWT</h1>
              <p>
                GuardJWT is an independent open-source JWT & JOSE security
                workbench, designed for developers, AppSec and security
                professionals.
              </p>
              <p>
                Sensitive JWT processing happens locally in your browser. The
                workbench helps inspect structure, verify signatures with
                supplied keys and investigate observable token properties.
              </p>
              <h2>Project</h2>
              <p>
                Built by {author.name}. Distributed under the{' '}
                <a href="/LICENSE">MIT License</a>.
              </p>
              {repo && (
                <a href={repo} target="_blank" rel="noopener noreferrer">
                  View source on GitHub
                </a>
              )}
            </>
          ) : path === '/security' ? (
            <>
              <h1>Security</h1>
              <h2>Security model</h2>
              <p>
                Tokens and keys are untrusted input. Parsing, auditing and
                cryptographic operations run locally. Token URLs and embedded
                keys are never fetched or trusted automatically. Verification
                requires an independently selected algorithm and supplied key.
              </p>
              <h2>Limits of analysis</h2>
              <p>
                GuardJWT findings analyze observable token properties and do not
                constitute a complete assessment of the issuing/verifying
                system. Signature validity does not establish issuer trust,
                authorization, revocation or replay protection.
              </p>
              <p>
                JWE is inspected only. JWE decryption, full X.509 validation and
                detached JWS verification are not included. Heuristic PII
                detection and sanitization can miss sensitive information.
              </p>
              <h2>Responsible disclosure</h2>
              <p>
                Use synthetic reproductions. A private disclosure channel has
                not yet been configured; request a private channel from the
                maintainer before sharing sensitive details. Do not put real
                tokens or keys in public issues.
              </p>
              <a href="/SECURITY.md">Read SECURITY.md</a>
            </>
          ) : path === '/docs' ? (
            <>
              <h1>Documentation</h1>
              <h2>Inspect and verify</h2>
              <p>
                Paste a token into Decoder. Click a JSON property to open Claims
                Breakdown, then follow related Security findings. Verify uses
                your independently chosen algorithm and trusted key.
              </p>
              <h2>Encode</h2>
              <p>
                Edit header and payload JSON, add claims or expiration helpers,
                then supply signing material. Open the generated JWT in Decoder
                or Verify. Keys remain in the signing panel and are discarded
                when it closes.
              </p>
              <h2>Supported algorithms</h2>
              <p>
                HS256/384/512, RS256/384/512, PS256/384/512, ES256/384/512 and
                EdDSA/Ed25519, subject to browser Web Crypto support.
                Verification accepts public SPKI PEM or JWK/JWKS. Signing
                accepts PKCS8 private PEM or JWK and UTF-8 HMAC secrets.
              </p>
              <h2>Limits and precision</h2>
              <p>
                1 MiB input, 64 JSON levels, 50 tokens per batch and 100 keys
                per JWKS. Large integers are preserved; decimal precision issues
                and duplicate names are flagged. Raw JSON retains the original
                spelling. JWE inspection does not decrypt or validate
                authentication tags.
              </p>
              <h2>Privacy and sharing</h2>
              <p>
                Privacy Mode removes sensitive values from view and closes key
                panels. Clear discards workspace state and pending results.
                Reports exclude raw tokens, values, keys and signature bytes by
                default. Review the preview before exporting. Clipboard history
                and saved downloads are outside the workbench.
              </p>
              <h2>Keyboard shortcuts</h2>
              <dl className="shortcuts">
                <dt>Ctrl / Cmd + K</dt>
                <dd>Open command palette</dd>
                <dt>Ctrl / Cmd + Enter</dt>
                <dd>Analyze current token and open Decoder</dd>
                <dt>Escape</dt>
                <dd>Close command palette</dd>
                <dt>Arrow keys / Home / End</dt>
                <dd>Move between desktop tabs</dd>
              </dl>
              <h2>Offline</h2>
              <p>
                Production builds cache application files after the first
                successful online installation. Workspace data is never cached.
                Close old tabs to activate an installed update. Supabase is not
                connected.
              </p>
              <h2>Analysis context</h2>
              <p>
                GuardJWT analyzes observable JWT/JOSE properties. Some findings
                require server-side verification. Users are responsible for
                analyzing only tokens and cryptographic material they are
                authorized to access.
              </p>
              <h2>Technical references</h2>
              <div className="toolbar">
                {[7515, 7516, 7517, 7518, 7519, 7638, 7797, 8725, 9068].map(
                  (n) => (
                    <a
                      key={n}
                      href={`https://www.rfc-editor.org/rfc/rfc${n}.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      RFC {n}
                    </a>
                  ),
                )}
              </div>
            </>
          ) : (
            <>
              <h1>Page not found</h1>
              <p>
                Return to the <a href="/">workbench</a> or open the{' '}
                <a href="/docs">documentation</a>.
              </p>
            </>
          )}
        </main>
      )}
      <Footer />
    </div>
  );
}
