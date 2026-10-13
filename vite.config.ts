import { defineConfig } from 'vite';
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { serviceWorker } from './scripts/offline.ts';
import { pages, site } from './src/config/site.ts';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'site-metadata',
      transformIndexHtml() {
        return [
          {
            tag: 'link',
            attrs: { rel: 'canonical', href: site.origin + '/' },
            injectTo: 'head' as const,
          },
          ...Object.entries({
            'og:type': 'website',
            'og:site_name': 'GuardJWT',
            'og:title': site.title,
            'og:description': site.description,
            'og:url': site.origin + '/',
            ...(site.socialImage
              ? { 'og:image': site.origin + site.socialImage }
              : {}),
          }).map(([property, content]) => ({
            tag: 'meta',
            attrs: { property, content },
            injectTo: 'head' as const,
          })),
          ...Object.entries({
            'twitter:card': site.socialImage
              ? 'summary_large_image'
              : 'summary',
            'twitter:title': site.title,
            'twitter:description': site.description,
            ...(site.socialImage
              ? { 'twitter:image': site.origin + site.socialImage }
              : {}),
          }).map(([name, content]) => ({
            tag: 'meta',
            attrs: { name, content },
            injectTo: 'head' as const,
          })),
        ];
      },
    },
    {
      name: 'offline-static-only',
      apply: 'build',
      writeBundle(options) {
        const root = resolve(options.dir ?? 'dist');
        const shell = readFileSync(resolve(root, 'index.html'), 'utf8');
        for (const [path, metadata] of Object.entries(pages)) {
          if (path === '/') continue;
          const folder = resolve(root, path.slice(1));
          mkdirSync(folder, { recursive: true });
          writeFileSync(
            resolve(folder, 'index.html'),
            shell
              .replaceAll(
                site.title.replaceAll('&', '&amp;'),
                metadata.title.replaceAll('&', '&amp;'),
              )
              .replaceAll(site.title, metadata.title.replaceAll('&', '&amp;'))
              .replaceAll(site.description, metadata.description)
              .replaceAll(
                '"' + site.origin + '/"',
                '"' + site.origin + path + '"',
              ),
          );
        }
        for (const name of ['LICENSE', 'SECURITY.md'])
          writeFileSync(resolve(root, name), readFileSync(resolve(name)));
        function files(dir: string): string[] {
          return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
            e.isDirectory()
              ? files(resolve(dir, e.name))
              : [resolve(dir, e.name)],
          );
        }
        const paths = files(root)
          .filter(
            (p) =>
              (/\.(html|js|css|svg|png|ico|webmanifest|md)$/.test(p) ||
                p.endsWith('/LICENSE')) &&
              !p.endsWith('/sw.js'),
          )
          .sort();
        const hash = createHash('sha256');
        paths.forEach((p) => {
          hash.update(relative(root, p));
          hash.update(readFileSync(p));
        });
        writeFileSync(
          resolve(root, 'sw.js'),
          serviceWorker(
            paths.map((p) => '/' + relative(root, p)),
            hash.digest('hex').slice(0, 16),
          ),
        );
      },
    },
    {
      name: 'production-csp',
      apply: 'build',
      transformIndexHtml() {
        return [
          {
            tag: 'meta',
            attrs: {
              'http-equiv': 'Content-Security-Policy',
              content:
                "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; manifest-src 'self'; worker-src 'self'; base-uri 'none'; form-action 'none'; object-src 'none'",
            },
            injectTo: 'head-prepend',
          },
        ];
      },
    },
  ],
});
