import { GitHubIcon } from './GitHubIcon';
import { SiteLink } from './SiteLink';
import { Brand } from './Brand';
import { useI18n } from '../i18n/context';
import { author, publicLink, repositoryUrl } from '../config/author';
export function Footer({ compact = false }: { compact?: boolean }) {
  const { tr } = useI18n();
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
        <Brand />
        {!compact && <p>{tr('Local JWT & JOSE Security Workbench')}</p>}
        <small>
          {' '}
          {tr('Built by')} {author.name} · © {new Date().getFullYear()}{' '}
          {author.name}
        </small>
      </div>
      <nav aria-label={tr('Project links')}>
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
              {label === 'GitHub' && <GitHubIcon />}
              {label === 'GitHub' && repositoryUrl
                ? tr('View source on GitHub')
                : label}
            </a>
          ) : null;
        })}
        <SiteLink href="/docs">{tr('Documentation')}</SiteLink>
        <SiteLink href="/privacy">{tr('Privacy')}</SiteLink>
        <SiteLink href="/security">{tr('Security policy')}</SiteLink>
        <SiteLink href="/about">{tr('About')}</SiteLink>
        <a href="/LICENSE">{tr('MIT License')}</a>
      </nav>
      {!compact && (
        <p className="muted">
          {' '}
          {tr('JWTs and cryptographic material are processed locally.')}{' '}
        </p>
      )}
    </footer>
  );
}
