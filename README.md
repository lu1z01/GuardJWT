# GuardJWT

Local JWT / JOSE Security Workbench — **v1.0.0-alpha.1**. SPA React/TypeScript/Vite, sem backend obrigatório. Todo processamento sensível ocorre no navegador. Decodificar não equivale a verificar assinatura; uma assinatura correta não prova confiança no emissor ou autorização.

## Usar na web

Abra o workspace, cole um token e use Decoder → Claims → Security → Verify. O destino planejado é `guardjwt.cloud`; este repositório não comprova que o domínio esteja publicado. No ambiente local, `npm run preview` informa a URL para testar o build.

## Executar

Node.js 22.22.2 ou superior compatível com o lockfile.

```sh
npm ci
npm run dev
```

Para testar a distribuição de produção:

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

`npm run check` executa formatação, lint, tipagem e build. A suíte e os scripts de teste foram removidos após a validação final, por solicitação do responsável. O registro está em [QA da alpha](docs/release-readiness.md).

`npm run format:check` verifica formatação. `dist/` é a distribuição estática. Não há deploy automático neste repositório.

## Recursos

- Decoder com split view redimensionável, Header/Payload/Signature, Raw/Decoded/Segments, UTF-8, JWS de três segmentos e JWE de cinco segmentos. JWE não é descriptografado.
- Encoder com validação JSON, helpers de claims/tempo, assinatura local, abertura no Decoder e Verify. `alg:none` somente em Advanced / Unsafe Examples.
- Claims Breakdown com caminhos/JSON Pointer, categorias, busca, ordenação, PII, datas UTC/local e listas de audience/scopes/roles. JSON clicável e navegação claims ↔ findings.
- Auditoria JOSE, timeline/simulador, detecção heurística de perfis e PII, scores separados de higiene e privacidade com penalidades explícitas.
- Verificação independente de algoritmo: HS256/384/512, RS256/384/512, PS256/384/512, ES256/384/512, EdDSA/Ed25519 conforme Web Crypto do navegador. PEM SPKI/PKCS8, JWK/JWKS, thumbprints RFC 7638 e seleção de `kid` sem ambiguidade.
- Políticas locais, comparação estrutural/semântica, batch, sanitização, relatórios seguros JSON/Markdown/texto com preview e opt-ins, utilitários Base64URL/JSON/tempo/tamanho/fingerprint.
- Privacy/Screenshare Mode, Clear workspace, temas claro/escuro, comando Ctrl/Cmd+K, navegação por teclado, Workers de análise/batch e módulos de criptografia carregados sob demanda.
- Manifest e service worker de produção com cache exclusivo de assets. Primeira instalação online; atualizações ativam após fechar as abas antigas. Nunca persiste workspace ou histórico.

## Fluxo principal

Encoder → Generate → Open in Decoder → clique em uma claim → Claims Breakdown → Related Security Findings. Para verificar: Verify generated JWT abre o verificador; selecione independentemente o algoritmo e forneça a chave de confiança. Chaves privadas não são transferidas entre painéis. Os estados `SIGNATURE VALID`, `SIGNATURE INVALID`, `NOT VERIFIED`, `UNSUPPORTED`, `KEY INVALID` e `KEY TYPE MISMATCH` são distintos.

## Privacidade e Supabase

Nenhum token, chave, claim, política privada ou relatório é enviado, salvo automaticamente, colocado em URL ou escrito em logs. Clipboard, arquivos e downloads exigem ação explícita. `jku`, `x5u` e URLs em claims não são acessados automaticamente. O core não importa UI, rede ou armazenamento. O cache offline recebe somente a lista de arquivos produzidos pelo build.

Supabase não está conectado e não é necessário. Não foram criados bancos, migrations ou serviços remotos. Uma futura camada auxiliar poderá carregar conteúdo público, com fallback local e sem acesso ao workspace. A configuração de ambiente sem uso foi removida.

## Limites explícitos

1 MiB de entrada (unidades de código; JOSE compacto comum é ASCII), 64 níveis JSON, 50 tokens por batch e 100 chaves por JWKS. Claims paginadas em 100 linhas; árvore interativa limitada a 500 nós; Raw preserva a entrada. Duplicatas são sinalizadas, incluindo nomes escapados e valores iguais. Inteiros grandes são exatos via bigint; decimais com perda de precisão geram aviso e mantêm o texto original. Veja [parsing](docs/parsing.md).

Não inclui decriptação JWE, validação de cadeia X.509, verificação de payload detached, obtenção remota de JWKS, revogação/replay ou comprovação da configuração de servidores. Não há histórico nem salvamento de preferências. Scanner PII, classificação de perfis e scores são heurísticos. Clear remove referências; não garante apagamento forense de RAM, clipboard ou extensões.

## Validação e documentação

[Arquitetura](docs/architecture.md), [modelo de ameaças](docs/threat-model.md), [privacidade](docs/privacy-model.md), [criptografia](docs/cryptography.md), [políticas](docs/policy-engine.md), [referências](docs/references.md), [dependências](docs/dependencies.md) e [análise do jwt.io](docs/jwtio-analysis.md).

Antes da remoção da suíte, 116 testes passaram, incluindo algoritmos, parsing, privacidade, workers e fluxos DOM. A inspeção real de layout, DevTools e instalação PWA permanece pendente por indisponibilidade do navegador conectado.

## Alpha e licença

A licença é [MIT](LICENSE). A versão **1.0.0-alpha.1** está preparada para publicação como alpha; não declara estabilidade nem auditoria independente. Consulte o [registro de QA e checklist manual](docs/release-readiness.md).

Os links reais do autor e do repositório podem ser preenchidos em `src/config/author.ts`; valores vazios não aparecem. Metadados, domínio canônico e caminho opcional da imagem social ficam em `src/config/site.ts`. Não há imagem OG fictícia nem links de redes inventados.

## Design e screenshots

[Design editável no Figma](https://www.figma.com/design/6kR28pKvKQQX3xJeIsxjLw): desktop escuro, desktop claro e mobile, com tokens próprios. Veja [decisões de UI/UX](docs/design.md).

Ainda não há captura real da aplicação validada. Após a revisão em navegador, salvar screenshots sem dados sensíveis em `docs/screenshots/` e vinculá-los aqui. Não é usado mockup como evidência visual.

## Hospedagem

`vercel.json` prepara build, rotas institucionais, CSP, headers e cache. Consulte [deploy](docs/deploy.md). Nenhum DNS ou projeto remoto foi alterado.

Servir `dist/` via HTTPS, com as rotas institucionais resolvendo para seus próprios documentos `index.html`. Servir `/sw.js` sem cache prolongado; assets com hash podem ser imutáveis. A CSP de produção permite somente recursos da mesma origem (`connect-src 'self'` é necessário para instalação do cache). Nenhum endpoint de dados é chamado pela aplicação. A configuração Vercel acrescenta CSP `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff` e `Referrer-Policy: no-referrer`; `frame-ancestors` não funciona via meta HTML. Não publicar conteúdo de terceiros executável na mesma origem.
