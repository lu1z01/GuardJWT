# GuardJWT 1.0.0-alpha.1 — registro de QA

Esta entrega é alpha. Os checks locais passaram; ainda não há evidência de renderização, acessibilidade assistiva, clipboard/permissões ou ciclo PWA em navegador/dispositivo real. O conector Browser não disponibilizou navegador. As telas Figma foram revisadas como design editável, sem substituir QA visual da aplicação.

## Última validação antes da remoção dos testes

- **116 testes em 11 arquivos passaram**, incluindo parsing JOSE, todas as famílias criptográficas implementadas, workers, privacidade, fluxos DOM e regressões da revisão final.
- Comparação agora detecta objetos vazios adicionados/removidos; fingerprints antigos não sobrescrevem ações novas; a claim selecionada mostra até 100 controles de item e preserva a cópia integral.
- A verificação HTTP local passou para 5 rotas, metadados por página, manifest, licença, CSP e 28 arquivos estáticos do precache. Headers Vercel foram verificados como configuração, não em hospedagem publicada.
- ESLint, TypeScript strict e build passaram antes da remoção.

Por solicitação explícita do responsável, todos os testes, setup, scripts de smoke/benchmark e dependências exclusivas de testes foram removidos depois dessa execução. Os 116 testes são um resultado histórico desta entrega, não uma suíte presente no repositório. Não há mais comando npm test. Permanecem apenas código da aplicação, assets, configuração de build/hospedagem, ferramentas de qualidade e documentação.

## Verificação depois da limpeza

Uma instalação limpa com npm ci passou. npm run check aprovou Prettier, ESLint, TypeScript e build. O build final foi novamente servido e verificado por HTTP: 5 rotas e 28 arquivos de precache aprovados. npm audit retornou 0 vulnerabilidades conhecidas. O .gitignore foi conferido para node_modules, dist, arquivos .env, caches e configuração local de hospedagem.

Bundle final de entrada: 268,58 kB / 84,53 kB gzip; CSS: 16,67 kB / 4,66 kB gzip. Os arquivos de teste não aparecem na distribuição. Nenhum remoto Git está configurado; não foi feito push ou deploy.

## Limpeza e preparação

Parser legado sem consumidores de produção e helper matchClaim sem uso removidos. Codificação de exemplo reutiliza a implementação Base64URL do core. CSS consolidado, configuração .env sem consumidor removida, .gitignore cobre dependências, build, caches, logs e arquivos locais. Versões de runtime preservadas; 74 pacotes foram retirados da árvore ao remover as ferramentas de teste.

Design: [Figma GuardJWT Alpha](https://www.figma.com/design/6kR28pKvKQQX3xJeIsxjLw), desktop claro/escuro e mobile. Tokens próprios e componentes editáveis, sem captura de tokens reais.

## Ainda depende de teste manual

| Área                    | Teste necessário                                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Responsividade          | 320, 375, 390, 430, 768, 1024, 1280, 1440 e 1920 px; sem overflow da página, texto cortado ou controles inalcançáveis; zoom 200%                              |
| Browsers                | Chrome/Edge/Firefox e Safari; Android/iOS, teclado virtual, rotação e safe areas                                                                              |
| Acessibilidade          | Tab/Shift+Tab, foco visível, screen reader, dialog/retorno de foco, cores nos dois temas, reduced motion                                                      |
| Fluxo                   | Decoder ↔ Claims ↔ Findings, Encoder → Decoder/Verify, policies, compare, batch e reports com fixtures sintéticas                                             |
| Privacidade             | Privacy Mode em todas as abas; Clear durante operações; reload; clipboard negado/permitido; verificar ausência de valores em DOM/URL/rede/armazenamento       |
| Criptografia no browser | Web Crypto em contexto seguro; HS/RS/PS/ES/Ed25519 conforme suporte; feedback UNSUPPORTED coerente                                                            |
| PWA                     | Instalar, reabrir offline em todas as rotas e ferramentas; atualizar entre versões com abas abertas; inspecionar cache e confirmar somente arquivos estáticos |
| Hospedagem              | Vercel preview: headers efetivos, refresh direto, arquivos inexistentes com 404, MIME, HTTPS, cache e domínio canônico                                        |
| Compartilhamento        | Prévia real de links em GitHub/LinkedIn/Discord; preencher redes reais; adicionar OG e screenshots reais somente se disponíveis                               |

Antes de promover a versão, concluir as verificações manuais, corrigir falhas e executar os checks disponíveis. JWE decryption e full X.509 validation continuam explicitamente fora do escopo desta versão.
