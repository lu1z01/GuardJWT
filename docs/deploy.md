# Preparação de deploy — Vercel / guardjwt.cloud

A configuração está pronta no repositório; nenhum deploy, repositório remoto ou DNS foi criado/alterado nesta sessão.

## Build

Node compatível com package.json (ambiente testado: 22.22.2). Vercel preset Vite, raiz do repositório, instalação `npm ci`, build `npm run build`, output `dist`. Não há backend nem variáveis obrigatórias. Não configure secrets, service role ou token de API no frontend.

Antes de publicar:

```sh
npm ci
npm run lint
npm run typecheck
npm run build
npm run format:check
```

A validação HTTP local foi executada antes da remoção dos scripts de testes. Confira o registro em release-readiness.md. Os headers de uma hospedagem real ainda precisam de verificação após o deploy.

## Rotas e cache

`/` é o workspace. `/docs`, `/privacy`, `/security` e `/about` são documentos de build com título, description, canonical, Open Graph e Twitter card próprios. Rewrites apontam somente essas rotas para seus documentos; requests de assets inexistentes não devem receber o shell. `/LICENSE` e `/SECURITY.md` expõem cópias exatas dos arquivos do repositório.

Assets com hash têm cache imutável. HTML, service worker, manifest e documentos de política/licença revalidam. O SW cacheia somente uma lista fixa de arquivos; não escreve dados do workspace. URLs com query, origens externas e requests não GET não são interceptados. Atualizações aguardam o fechamento de abas antigas; não há skipWaiting forçado que descarte uma sessão sensível.

## Headers

CSP restritiva, `frame-ancestors 'none'`, X-Frame-Options DENY, nosniff, no-referrer e restrição de câmera/microfone/geolocalização. `connect-src 'self'` permite instalar o cache de assets; o aplicativo não tem endpoints de processamento remoto. CSP de meta HTML protege também o preview local, mas frame-ancestors depende do header HTTP Vercel. Não adicionar scripts, fontes, analytics ou toolbar de terceiros sem revisar essa fronteira.

A configuração segue a [referência de vercel.json](https://vercel.com/docs/project-configuration/vercel-json) e [Cache-Control](https://vercel.com/docs/caching/cache-control-headers). Na preview hospedada, confirmar os headers HTTP efetivos; o servidor local Vite não aplica vercel.json.

## Publicação e domínio

1. Preencher o URL real do repositório/redes em `src/config/author.ts` quando conhecidos. Links vazios permanecem ocultos.
2. Publicar o repositório e importar o projeto no time Vercel pretendido. Conferir raiz, comando/output e runtime.
3. Criar preview e executar o checklist de [release-readiness](release-readiness.md), incluindo refresh direto e DevTools Network.
4. Só então publicar produção e conectar `guardjwt.cloud` conforme os registros apresentados pela Vercel. Mudanças DNS são manuais/autorizadas separadamente.
5. Confirmar HTTPS, canonical, domínio preferido, ausência de backend/telemetria e cache após update.

O domínio canônico em `src/config/site.ts` é a configuração do destino planejado, não evidência de DNS ativo. Nenhum endpoint de dados depende desse domínio. A imagem social é opcional: colocar um asset real em `public/og-image.png` e preencher socialImage somente quando existir. Sem imagem, cards usam título/description.

Rollback deve restaurar o build anterior na hospedagem. Reabrir o app online para o navegador instalar a versão correspondente do SW; não prometer atualização instantânea de abas já abertas.
