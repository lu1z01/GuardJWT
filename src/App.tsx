import { useEffect, useRef, useState } from 'react';
import { Workspace } from './app/Workspace';
import { Debugger } from './debugger/Debugger';
import { Information } from './pages/Information';
import { pages, site } from './config/site';
import { useI18n } from './i18n/context';
const currentPath = () => window.location.pathname.replace(/\/+$/, '') || '/';
export default function App() {
  const [path, setPath] = useState(currentPath);
  const previousPath = useRef(path);
  const { tr } = useI18n();
  useEffect(() => {
    const navigate = () => setPath(currentPath());
    window.addEventListener('popstate', navigate);
    return () => window.removeEventListener('popstate', navigate);
  }, []);
  useEffect(() => {
    const page = Object.hasOwn(pages, path)
      ? pages[path as keyof typeof pages]
      : undefined;
    document.title = page
      ? tr(page.title)
      : tr('Page not found') + ' — GuardJWT';
    if (page) {
      const description = tr(page.description);
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', description);
      document
        .querySelector('link[rel="canonical"]')
        ?.setAttribute('href', site.origin + path);
      for (const [selector, content] of [
        ['meta[property="og:title"]', document.title],
        ['meta[property="og:description"]', description],
        ['meta[property="og:url"]', site.origin + path],
        ['meta[name="twitter:title"]', document.title],
        ['meta[name="twitter:description"]', description],
      ])
        document.querySelector(selector!)?.setAttribute('content', content!);
    }
    if (previousPath.current !== path) {
      previousPath.current = path;
      const main = document.querySelector('main');
      main?.setAttribute('tabindex', '-1');
      main?.focus();
    }
  }, [path, tr]);
  if (path === '/') return <Debugger />;
  if (path === '/workbench') return <Workspace />;
  return <Information path={path} />;
}
