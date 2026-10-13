# Arquitetura

SPA estática React/TypeScript strict/Vite. Identidade visual em CSS local, sem fontes remotas. O estado sensível pertence ao workspace e aos painéis, sem store persistente. React renderiza conteúdo como texto. Não há `dangerouslySetInnerHTML` ou execução de conteúdo de tokens.

```text
assets estáticos → navegador → estado em memória
                               ├─ Worker → parsing → JOSE → auditoria/PII
                               ├─ jose / Web Crypto → assinatura/verificação
                               ├─ policies / compare / sanitizer / reports
                               └─ React → clipboard/download explícitos
```

`src/core/` contém funções independentes de UI/rede: parsing, jose, claims, audit, pii, timeline, crypto, policy, compare, sanitizer, reports e tools. O parser único é `core/jose/inspect.ts`; a implementação legada sem consumidores de produção foi removida. `features/` coordena cada painel. `workers/` isola análise e batch. `hooks/useAnalysis.ts` termina o Worker anterior, cancela resultados obsoletos e oferece fallback síncrono para ambientes sem Worker.

Trocar o token invalida resultado criptográfico/política e remonta painéis com dados sensíveis. Clear também remonta o campo de entrada, descarta nested-token history e invalida clipboard pendente. Privacy Mode remove conteúdo sensível do DOM e fecha painéis de chaves; o token principal continua em memória até Clear. As operações Web Crypto não são abortáveis; resultados de painéis desmontados são ignorados.

`jose` é carregado sob demanda com Verify/Keys/Encoder; operações criptográficas usam Web Crypto, sem implementação manual de primitivas. O parser tem limites explícitos antes de percorrer estruturas recursivas. Claims e findings têm apresentação limitada/paginada; o processamento mantém a entrada completa dentro do limite global.

`scripts/offline.ts` produz um service worker com lista fixa de arquivos e versão derivada de hash. Não recebe mensagens/dados do workspace, não usa cache runtime de respostas arbitrárias e ignora URLs com query. Registra apenas em builds de produção. Cacheia HTML/JS/CSS/ícone/manifest, incluindo chunks lazy e Workers.

Não há Supabase, backend, analytics, sessão de usuário ou sincronização. A fronteira é reforçada por ESLint e CSP de produção; testes arquiteturais foram executados antes da remoção da suíte. Ela não substitui a integridade dos assets distribuídos.

## Finalização da distribuição

A navegação continua sem router adicional. Rotas institucionais são documentos HTML gerados no build com metadados próprios, servindo o mesmo bundle estático. O workspace permanece somente em memória; navegar para outra página descarta o estado. `src/config/site.ts` centraliza domínio/metadados e `src/config/author.ts` centraliza links reais, ocultos quando vazios. O cache offline seleciona o documento correto por rota, incluindo barra final.

`vercel.json` usa rewrites somente para rotas conhecidas, evitando transformar um JS inexistente em HTML. LICENSE e SECURITY.md são copiados de suas fontes no build. Não há funções, backend, variável secreta ou integração Supabase.
