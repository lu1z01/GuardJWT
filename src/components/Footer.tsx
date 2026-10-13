import { author, publicLink, repositoryUrl } from '../config/author';
export function Footer({ compact = false }: { compact?: boolean }) {
  const links = [
    ['GitHub', repositoryUrl || author.github, false],
    ['LinkedIn', author.linkedin, false],
    ['Portfolio', author.portfolio, false],
    ['Instagram', author.instagram, false],
    ['Email', author.email, true],
  ] as const;
  return (
    <footer className={'site-footer' + (compact ? ' compact' : '')}>
      <div>
        <strong>GuardJWT</strong>
        {!compact && <p>Local JWT & JOSE Security Workbench</p>}
        <small>
          Built by {author.name} · © {new Date().getFullYear()} {author.name}
        </small>
      </div>
      <nav aria-label="Project links">
        {links.map(([label, value, email]) => {
          const href = publicLink(value, email);
          return href ? (
            <a
              className={label === 'GitHub' ? 'source-link' : undefined}
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label === 'GitHub' && repositoryUrl
                ? 'View source on GitHub'
                : label}
            </a>
          ) : null;
        })}
        <a href="/docs">Documentation</a>
        <a href="/privacy">Privacy</a>
        <a href="/security">Security</a>
        <a href="/about">About</a>
        <a href="/LICENSE">MIT License</a>
      </nav>
      {!compact && (
        <p className="muted">
          JWTs and cryptographic material are processed locally.
        </p>
      )}
    </footer>
  );
}
