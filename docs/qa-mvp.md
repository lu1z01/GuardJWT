# QA do MVP — 13/10/2026

Revisão da alpha 1.0.0-alpha.1, a partir do commit local `6a72cb7`. Alterações permanecem no workspace; esta revisão não publicou aplicação nem enviou commits.

## Jornada de primeiro uso

A revisão cognitiva do fluxo identificou: tela inicial sem explicação para iniciantes, exemplo sem assinatura que podia parecer uma falha inesperada, excesso de detalhes técnicos logo na entrada, verificação pouco visível no celular e ausência de seleção de idioma.

Foram adicionados início guiado, botão de exemplo fictício, aviso contextual para o exemplo, explicação sobre decodificar versus verificar e orientação para quem não tem a chave. O painel técnico começa recolhido. A ordem principal agora é decodificar → dados → alertas → verificar; ferramentas adicionais seguem disponíveis. O seletor PT-BR/EN/ES acompanha o cabeçalho nas páginas institucionais. As abas usam identificadores internos estáveis e o painel ativo tem um nome acessível independente da navegação desktop.

A revisão foi feita pelo código e por renderização estática. Não é um teste de usabilidade com participantes nem uma sessão interativa de navegador. `cua.listBrowsers()` retornou uma lista vazia; não foi possível validar visualmente cliques, foco, quebra de layout ou o teclado virtual.

## Segurança e correções

O scan Codex Security `2105d5c0-84f4-4b2c-bf77-6be3b24c2e18` registrou um achado de baixa severidade: consumo superlinear de CPU na heurística de e-mail em `src/core/pii/scan.ts` (CWE-1333). Uma claim com `a@`, muitos pontos e um espaço final causava backtracking antes de qualquer verificação de assinatura. O impacto observado é a disponibilidade da análise local; sem Worker, o caminho também roda na thread da interface.

A expressão original levou aproximadamente 7,46 / 29,09 / 118,22 / 468,97 ms para entradas com 2.000 / 4.000 / 8.000 / 16.000 pontos. A correção usa buscas lineares por separadores e uma passagem para espaços. Em validação posterior, 9.338 entradas pequenas mantiveram o comportamento da heurística, e a entrada malformada de 780.003 caracteres foi rejeitada em aproximadamente 3,58 ms no Node 22 deste ambiente. São medições locais, não garantias de desempenho em outros dispositivos.

Também foram limitadas a 100 as linhas de definições do cabeçalho, preservando o JSON completo, e substituídas buscas repetidas por conjuntos na comparação semântica de listas.

A revisão estática cobriu parsing, verificação/chaves, renderização de entrada, workers, estado sensível e exportação. Não houve confirmação de exfiltração, injeção HTML ou confusão de chaves nos caminhos revisados. Isso não prova ausência de vulnerabilidades. O scan foi encerrado com **cobertura parcial**: revisões independentes não produziram relatórios completos, e não houve navegador real, auditoria de implementação das dependências ou inspeção de hospedagem publicada. O relatório canônico descreve o snapshot anterior às correções, não certifica esta versão modificada.

## Verificações executadas

| Verificação          | Resultado e alcance                                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Heurística de e-mail | 9.338 entradas comparadas à implementação anterior; entrada malformada próxima ao limite rejeitada com custo linear        |
| Comparação           | Objeto vazio versus null e diferenças semânticas de roles preservados                                                      |
| Traduções            | Catálogo local com dois destinos completos por entrada; nenhum serviço externo                                             |
| Renderização         | 5 rotas × 3 idiomas = 15 renderizações estáticas de React aprovadas                                                        |
| Dados sensíveis      | Uma claim cujo valor é `Signature` permanece intacta; texto com `<script>` é escapado                                      |
| Verificador          | Valores internos de algoritmo e tipo de chave preservados nos três idiomas                                                 |
| Qualidade            | `npm run check`: Prettier, ESLint, TypeScript e build                                                                      |
| Distribuição HTTP    | 5 rotas e 28 arquivos da lista de precache retornaram 200 no preview local; sem arquivos de teste ou sourcemaps nos assets |
| Limpeza              | Nenhum arquivo idêntico por conteúdo em src, public e docs                                                                 |
| Dependências         | `npm audit --json`: zero vulnerabilidades conhecidas em 13/10/2026                                                         |

As verificações temporárias foram executadas fora do repositório. A suíte histórica de 116 testes foi removida na revisão anterior por solicitação explícita do responsável. Não há suíte de testes ou dependências de testes reintroduzidas. A documentação histórica está em [release-readiness.md](release-readiness.md).

## Correções da análise anexada

- **HMAC:** geração bloqueada no core e na UI para segredos curtos (HS256/384/512: 32/48/64 bytes) e padrões triviais em entrada UTF-8. A API do core exige opt-in explícito para exemplos inseguros. A área avançada oferece essa exceção; editar chave/algoritmo a desativa. O verificador permanece capaz de diagnosticar tokens com segredo curto. Verificações temporárias cobriram limite exato, um byte abaixo, JWK oct curto, assinatura válida e exceção explícita para as três variantes.
- **Sanitização:** Privacy passou a ocultar também iss/aud/roles/scope e metadados conhecidos de tenant/sessão, inclusive aninhados. Support mantém esse contexto quando não sensível. Verificados dados pessoais, IDs, preservação do original e comportamento Strict.
- **Política:** requireSignature distingue Inconclusive de Failed e Passed. Verificados ausência de verificação, chave inválida, algoritmo não suportado, assinatura inválida e válida. O relatório conta inconclusivos sem aprová-los.
- **Versão:** relatório lê a versão de package.json; correspondência validada.
- **Arquitetura:** App passou a selecionar a página; Workspace, ContextPanel e CommandPalette ficam em src/app. O estado e os controles de cancelamento permanecem no workspace.
- **CI:** workflow com actions fixadas por SHA, permissões de leitura, sem credenciais persistidas, instalação limpa, checks e npm audit. Configurado localmente, ainda não executado no GitHub. Referências oficiais: [checkout](https://github.com/actions/checkout) e [setup-node](https://github.com/actions/setup-node).
- **Testes:** a decisão de mantê-los fora do repositório foi reconfirmada pelo responsável. CI de qualidade e auditoria não substitui regressões funcionais reproduzíveis.
- **CSP:** continua pendência real de navegador. Não foi flexibilizada nem classificada como vulnerabilidade comprovada.

## Idiomas e limites da tradução

Interface, orientações, formulários e páginas institucionais usam PT-BR, EN e ES. Valores do token, algoritmos e estruturas JSON não são traduzidos. Diagnósticos avançados, referências técnicas e relatórios podem manter inglês. O idioma é selecionado localmente e não é persistido; abrir outra página ou recarregar volta à preferência do navegador. Trocar o seletor no workspace não altera os identificadores das ferramentas nem suas chaves de montagem.

## Pendências reais antes de promover a alpha

- Percorrer o roteiro do README em cada idioma com pessoa iniciante: exemplo, token inválido, leitura de claim, alerta, verificação com chave e limpeza.
- Conferir larguras de 320 a 1920 px, zoom de 200%, temas claro/escuro, tabulação, leitor de tela e textos longos em português/espanhol.
- Trocar idioma com token/chave preenchidos e durante operações assíncronas; confirmar preservação de estado, foco e resultados.
- Conferir clipboard permitido/negado, Clear durante análise/assinatura e privacidade visual em todos os painéis.
- Verificar Web Crypto nos navegadores alvo e o ciclo real de instalação, uso offline e atualização do service worker.
- Conferir headers HTTP, HTTPS, rotas diretas, MIME e cache no provedor de hospedagem.

Essas pendências não foram marcadas como aprovadas. O Figma documenta a base visual; não substitui o QA da aplicação em execução.
