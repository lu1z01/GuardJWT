import { GitHubIcon } from './GitHubIcon';
import { SiteLink } from './SiteLink';
import { Brand } from './Brand';
import { useI18n } from '../i18n/context';
import { repositoryUrl } from '../config/author';
export function Footer({ compact = false }: { compact?: boolean }) {
  const { tr } = useI18n();
  return (
    <footer className={'site-footer' + (compact ? ' compact' : '')}>
      <div>
        <Brand />
        {!compact && <p>{tr('Local JWT & JOSE Security Workbench')}</p>}
      </div>
      <nav aria-label={tr('Project links')}>
        {repositoryUrl && (
          <a
            href={repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <GitHubIcon />
          </a>
        )}
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
