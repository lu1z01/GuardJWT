export function Privacy() {
  return (
    <main className="privacy" id="main-content">
      <h1>Privacy</h1>
      <p>
        JWTs and cryptographic material are not sent to GuardJWT for remote
        processing.
      </p>
      <h2>Local processing</h2>
      <p>
        Decoding, signing, signature verification, claim analysis, policies and
        reports run locally in page memory or local workers. Inputs are never
        written to localStorage, IndexedDB, cookies, URLs, analytics, or
        application logs.
      </p>
      <h2>Network boundary</h2>
      <p>
        The browser loads application assets from the hosting server. No JWT
        content is sent. URLs inside tokens are rendered as text and are never
        fetched. There are no analytics, remote fonts, or session replay tools.
      </p>
      <h2>Offline assets</h2>
      <p>
        Production builds cache only a fixed list of application assets. Tokens,
        keys, reports and policies are never stored in this cache. Offline use
        requires one successful installation over HTTPS or localhost. An update
        activates after existing application tabs close.
      </p>
      <h2>Optional public content</h2>
      <p>
        A future milestone may load public policy presets, security references
        and release information from Supabase. Supabase is not connected in this
        release. Sensitive processing will remain independent of it.
      </p>
      <h2>Clearing your workspace</h2>
      <p>
        Clear workspace removes input and decoded output from application state.
        Reloading or leaving the page also resets the workspace. JavaScript
        cannot guarantee forensic erasure of browser memory; browser extensions
        and clipboard history are outside the application's control.
      </p>
    </main>
  );
}
