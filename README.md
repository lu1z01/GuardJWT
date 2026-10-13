# GuardJWT

**MVP · 1.0.0-alpha.1** — ferramenta de código aberto para ler, criar e investigar tokens JWT/JOSE no navegador. React, TypeScript e Vite; sem conta, backend ou banco de dados obrigatório.

O GuardJWT ajuda a entender o conteúdo de um token, conferir datas, encontrar sinais de risco e verificar uma assinatura com uma chave de confiança. É útil para desenvolvimento, suporte técnico e segurança de aplicações. A interface oferece **português (Brasil), inglês e espanhol**.

> Decodificar revela o conteúdo; não confirma a autenticidade. Uma assinatura válida confirma a correspondência com a chave fornecida, mas não comprova confiança no emissor, autorização, revogação ou proteção contra reutilização.

## Começar em dois minutos

1. Abra a aplicação e escolha o idioma no cabeçalho.
2. Clique em **Experimentar com um exemplo**. O token é fictício e propositalmente sem assinatura; os alertas são esperados.
3. Em **Decodificar**, veja o cabeçalho (formato e algoritmo), o conteúdo (campos chamados _claims_) e a assinatura. Clique em uma propriedade JSON para explorar a claim.
4. Abra **Alertas** para entender os pontos que merecem investigação. Os índices são heurísticas, não uma nota de segurança do sistema.
5. Para um token seu, abra **Verificar assinatura** e informe o algoritmo esperado e uma chave obtida de uma fonte confiável. Sem a chave, é possível ler o conteúdo e as datas, mas não confirmar a assinatura.
6. Ao terminar, use **Limpar tudo**. Para compartilhar a tela, **Ocultar dados** esconde valores sensíveis e fecha os painéis de chaves.

Use somente tokens e material criptográfico que você tem autorização para analisar. Para conhecer a interface, prefira os exemplos fictícios. O destino planejado é `guardjwt.cloud`; este repositório não comprova que o domínio esteja publicado.

## Executar localmente

Requisito: **Node.js 22.22.2 ou superior compatível** e npm. O lockfile fixa as dependências.

```sh
npm ci
npm run dev
```

Abra a URL informada pelo Vite. O servidor local escuta em `127.0.0.1`. Não é necessário criar `.env`, configurar Supabase nem fornecer chaves de serviços externos.

Para gerar e conferir a distribuição:

```sh
npm run check
npm run preview
```

`preview` serve o build de `dist/`. É uma ferramenta local de conferência; para publicar, hospede os arquivos estáticos conforme a seção de hospedagem.

| Comando                | Finalidade                                      |
| ---------------------- | ----------------------------------------------- |
| `npm ci`               | Instalar exatamente as dependências do lockfile |
| `npm run dev`          | Desenvolvimento local                           |
| `npm run check`        | Formatação, lint, TypeScript e build            |
| `npm run build`        | Verificar tipos e gerar `dist/`                 |
| `npm run preview`      | Conferir o build localmente                     |
| `npm run lint`         | Verificar regras de código e React              |
| `npm run typecheck`    | Verificar tipos sem emitir arquivos             |
| `npm run format`       | Aplicar a formatação                            |
| `npm run format:check` | Conferir a formatação sem alterar arquivos      |

## O que o MVP oferece

| Área                 | O que faz                                                                        | Limite importante                                                         |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Decodificar          | Header, payload, assinatura, JSON original e segmentos/hex                       | JWE permite somente inspeção; não há descriptografia                      |
| Dados do token       | Busca, categorias, JSON Pointer, datas, listas e possíveis dados pessoais        | Classificação e PII são heurísticas                                       |
| Alertas              | Verificações JOSE, duplicatas, tempo, exposição e higiene                        | Não audita o servidor que emite ou aceita o token                         |
| Verificar assinatura | Verificação criptográfica local com algoritmo escolhido independentemente        | Não baixa nem confia automaticamente em chaves do token                   |
| Criar token          | Editar JSON, adicionar claims/datas e assinar localmente                         | Voltado a desenvolvimento; exemplos sem assinatura ficam na área avançada |
| Datas                | Expiração, emissão, início de validade e simulação de relógio                    | Validade temporal não confirma autenticidade                              |
| Chaves               | Inspecionar PEM/JWK/JWKS e calcular thumbprints RFC 7638                         | Não valida cadeia X.509 nem confiança na chave                            |
| Política             | Avaliar requisitos locais de algoritmo, claims, emissor, público e outros campos | Modelos são pontos de partida, não políticas universais                   |
| Comparar             | Diferenças estruturais e semânticas entre dois tokens                            | Prévia de valores limitada; sem consulta ao emissor                       |
| Análise em lote      | Analisar até 50 tokens, um por linha                                             | Resultados permanecem em memória                                          |
| Ocultar valores      | Gerar uma representação com valores mascarados                                   | Não gera um JWT válido; revise antes de compartilhar                      |
| Relatórios           | Prévia e exportação JSON, Markdown ou texto                                      | Dados sensíveis são excluídos; nomes e horários exigem escolha explícita  |
| Utilitários          | Base64URL, JSON, datas, tamanho e fingerprint SHA-256                            | Operações locais, sem envio de entrada                                    |

No celular, as ferramentas adicionais ficam em **Mais**. No desktop, as abas rolam horizontalmente. **Detalhes técnicos** abre o painel de formato, algoritmo, perfil estimado e índices; ele começa recolhido.

## Entender a verificação

A interface traduz os rótulos, mas os identificadores internos e os relatórios mantêm estados estáveis:

| Estado              | Significado                                                           |
| ------------------- | --------------------------------------------------------------------- |
| `NOT VERIFIED`      | A assinatura ainda não foi verificada ou a entrada é ambígua          |
| `SIGNATURE VALID`   | A assinatura corresponde à chave fornecida e ao algoritmo selecionado |
| `SIGNATURE INVALID` | A assinatura não corresponde à chave fornecida                        |
| `KEY INVALID`       | Não foi possível usar a chave ou os parâmetros fornecidos             |
| `KEY TYPE MISMATCH` | Algoritmo ou tipo de chave incompatível com a operação                |
| `UNSUPPORTED`       | Formato, extensão ou algoritmo não suportado nesse contexto           |

Algoritmos implementados: **HS256/384/512, RS256/384/512, PS256/384/512, ES256/384/512 e EdDSA/Ed25519**, sujeitos ao suporte Web Crypto do navegador.

- HMAC usa um segredo em UTF-8. A geração bloqueia segredos abaixo de 32/48/64 bytes para HS256/384/512, respectivamente, e padrões triviais detectados. Exemplos inseguros exigem uma opção explícita na área avançada, que é desativada ao mudar a chave ou o algoritmo. O verificador continua aceitando segredos curtos para diagnóstico. Tamanho não mede entropia.
- Verificação assimétrica aceita chave pública SPKI PEM ou JWK/JWKS compatível.
- Assinatura aceita chave privada PKCS8 PEM ou JWK compatível.
- A seleção em JWKS exige uma chave elegível sem ambiguidade e respeita tipo, algoritmo e permissões.
- Uma chave pública PEM nunca é reinterpretada como segredo HMAC.
- `jku`, `x5u` e chaves embutidas não são buscados ou aceitos como fonte de confiança automática.

Veja [criptografia](docs/cryptography.md) e [parsing](docs/parsing.md).

Quando uma política exige assinatura, apenas `SIGNATURE VALID` satisfaz a regra. `SIGNATURE INVALID` resulta em `Failed`; ausência de verificação, algoritmo não suportado ou problemas de chave resultam em `Inconclusive`. Avisos continuam separados. Os relatórios contam resultados inconclusivos explicitamente e usam a versão de `package.json`.

### Perfis de ocultação

| Perfil  | Comportamento                                                                                  |
| ------- | ---------------------------------------------------------------------------------------------- |
| Default | Oculta dados pessoais e segredos detectados                                                    |
| Support | Acrescenta IDs comuns; preserva contexto de diagnóstico que não foi classificado como sensível |
| Privacy | Acrescenta emissor, público, roles, scopes e metadados conhecidos de tenant/sessão             |
| Strict  | Oculta todos os valores finais                                                                 |

As regras são recursivas e heurísticas. Nomes de campos e a estrutura ainda podem revelar contexto. Revise qualquer saída antes de compartilhar.

## Idiomas e acessibilidade

O idioma inicial segue a lista de preferências do navegador, com fallback para inglês. O seletor permite trocar entre português, inglês e espanhol sem apagar o token nem reiniciar os formulários. A escolha fica apenas em memória; a navegação interna mantém a escolha. Ao recarregar ou abrir outra aba, as preferências do navegador voltam a ser usadas.

A tradução usa catálogos locais de interface, diagnósticos e referências em `src/i18n/`, reunidos por `messages.ts`. Não há API de tradução. Navegação, instruções, formulários, alertas, explicações técnicas e páginas institucionais são traduzidos. As buscas aceitam os rótulos do idioma selecionado e ignoram acentos. Exportações mantêm seus identificadores e textos técnicos estáveis em inglês; referências externas continuam no idioma original. Consulte o [guia de localização](docs/localization.md). Claims, tokens, chaves, nomes de algoritmos, JSON Pointer e valores do usuário não são traduzidos.

Há temas claro/escuro, foco visível, labels de formulário, atalhos e respeito à preferência de movimento reduzido. A revisão com leitores de tela e dispositivos reais continua pendente.

| Atalho            | Ação                                       |
| ----------------- | ------------------------------------------ |
| Ctrl/Cmd + K      | Abrir comandos; a busca acompanha o idioma |
| Ctrl/Cmd + Enter  | Reanalisar e abrir o decodificador         |
| Escape            | Fechar comandos                            |
| Setas, Home e End | Navegar pelas abas no desktop              |

## Privacidade e dados

```text
Entrada / arquivo / clipboard
            ↓
Parsing e análise local → Web Worker / Web Crypto
            ↓
Tela → cópia ou download somente por ação do usuário
```

O navegador baixa os arquivos da aplicação do servidor de hospedagem. Tokens, chaves, claims, políticas e relatórios não são enviados a um serviço, incluídos em URL, gravados em logs da aplicação ou persistidos em localStorage, IndexedDB ou cookies. Não há analytics, gravação de sessão ou fontes remotas.

**Limpar tudo** descarta referências e invalida resultados pendentes; não garante apagamento forense da memória do navegador. O clipboard do sistema, extensões, downloads já salvos e o histórico de área de transferência estão fora do controle da aplicação. Ocultar dados é uma proteção visual, não substitui limpar o workspace.

Supabase não está conectado nem é necessário para executar o MVP. Não existem bancos, migrations ou serviços remotos a provisionar.

### Offline

O build de produção registra um service worker com uma lista fixa de arquivos estáticos. Após uma instalação online bem-sucedida em HTTPS ou localhost, esses arquivos podem ser usados offline. Dados do workspace não entram no cache. Atualizações instaladas passam a controlar a aplicação depois que as abas antigas são fechadas. Desenvolvimento não registra esse service worker.

## Limites e precisão

| Entrada ou visualização                           | Limite                                                                    |
| ------------------------------------------------- | ------------------------------------------------------------------------- |
| Token / entrada interativa                        | 1 MiB em unidades de código JavaScript; JOSE compacto normalmente é ASCII |
| Profundidade JSON                                 | 64 níveis                                                                 |
| Lote                                              | 50 tokens e 1 MiB de entrada total                                        |
| JWKS                                              | 100 chaves                                                                |
| Cabeçalho no criador                              | 64 KiB                                                                    |
| Payload no criador                                | 512 KiB                                                                   |
| Política JSON                                     | 64 KiB                                                                    |
| Claims por página                                 | 100 linhas                                                                |
| Itens na claim selecionada / definições do header | 100; o JSON original e a cópia integral permanecem disponíveis            |
| Árvore JSON interativa                            | 500 nós                                                                   |

Duplicatas são sinalizadas mesmo com nomes escapados ou valores iguais; a verificação rejeita a ambiguidade. A visualização formatada pode mostrar o último valor duplicado: consulte o original. Inteiros grandes são preservados com `bigint`; possíveis perdas em decimais geram avisos e mantêm o texto original como referência.

Ficam fora deste MVP: decriptação JWE, verificação de JWS com payload separado, validação completa X.509, obtenção remota de JWKS, histórico, sincronização, revogação e proteção contra replay. Nenhum índice equivale a uma garantia de segurança.

## Estrutura do projeto

```text
src/
  app/          Workspace, contexto e paleta de comandos
  core/         Parsing, JOSE, criptografia, claims, políticas e relatórios
  features/     Ferramentas da interface
  components/   Controles compartilhados e árvore JSON
  hooks/        Coordenação da análise local
  workers/      Análise e processamento em lote
  i18n/         Contexto de idioma e catálogo local
  pages/        Documentação, privacidade, segurança e sobre
  config/       Autor, links e metadados públicos
  styles/       Estilos e temas
public/         Ícone e manifest
docs/          Documentação técnica e registro de QA
```

O core não depende de React nem de rede ou persistência. Ferramentas criptográficas e painéis adicionais são carregados sob demanda. Os arquivos do service worker e das páginas estáticas são preparados pelo build em `vite.config.ts`.

## QA e situação da alpha

A revisão encontrou consumo excessivo de CPU no detector heurístico de e-mails. O trecho foi substituído por verificações lineares. A comparação de listas usa conjuntos, e a prévia de definições do cabeçalho foi limitada para evitar controles demais na tela.

A validação desta revisão inclui equivalência da heurística em **9.338 entradas**, rejeição de uma entrada malformada de aproximadamente 780 mil caracteres, renderização estática de **15 páginas em três idiomas**, preservação/escape de valores do token e checks de comparação. Isso não substitui interação em um navegador real.

A suíte anterior de **116 testes** foi executada antes de ser removida por solicitação do responsável. Não há suíte ou comando `npm test` no repositório. As verificações temporárias desta revisão também ficam fora da distribuição. `npm run check` continua sendo o comando de qualidade disponível.

O workflow `.github/workflows/quality.yml` executa instalação limpa, `npm run check` e auditoria de dependências em push e pull request, com permissões somente de leitura. Ele não inclui testes funcionais, não publica builds e ainda não foi executado no GitHub nesta revisão.

A auditoria de dependências retornou **0 vulnerabilidades conhecidas em 13/10/2026**. A revisão de segurança teve cobertura parcial e não é certificação independente. O conector de navegador não disponibilizou uma sessão: QA visual, teclado/clipboard reais, compatibilidade Web Crypto e ciclo de instalação/atualização PWA ainda precisam ser concluídos antes da promoção da alpha.

Veja [QA desta revisão](docs/qa-mvp.md), [registro anterior](docs/release-readiness.md) e [SECURITY.md](SECURITY.md).

## Hospedagem

1. Execute `npm ci` e `npm run check`.
2. Publique **somente `dist/`** em hospedagem estática com HTTPS.
3. Configure as rotas `/docs`, `/privacy`, `/security` e `/about` para seus documentos gerados. Confira também a abertura direta e o refresh de cada rota.
4. Aplique os headers definidos em `vercel.json` ou equivalentes na sua hospedagem. A configuração inclui CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer` e bloqueio de enquadramento.
5. Sirva `/sw.js` sem cache prolongado; assets com hash podem ter cache imutável.
6. Preencha links reais em `src/config/author.ts` e metadados/canônico em `src/config/site.ts` antes da publicação.

`frame-ancestors` exige header HTTP; não funciona apenas na meta CSP. `connect-src 'self'` permite o carregamento dos assets locais do cache, sem autorizar serviços externos. Não hospede conteúdo executável de terceiros na mesma origem. O servidor `preview` local não comprova os headers efetivos do provedor.

O `.gitignore` exclui dependências, `dist/`, caches, logs, arquivos `.env`, diretórios privados e configurações locais de hospedagem. Não coloque tokens ou chaves reais no código ou na documentação. Nenhum push, deploy ou alteração de DNS foi realizado nesta revisão. [Detalhes de deploy](docs/deploy.md).

## Problemas comuns

| Sintoma                               | O que conferir                                                                                                 |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Não consigo colar pelo botão          | Use Ctrl+V ou Cmd+V no campo; o navegador pode negar a permissão de clipboard                                  |
| O token não abre                      | Cole o token completo, sem aspas; confira três segmentos JWS ou cinco JWE e o limite de entrada                |
| Assinatura válida, mas token expirado | São verificações diferentes; confira as datas e a política da aplicação                                        |
| A chave não funciona                  | Confira o algoritmo esperado, tipo PEM/JWK, curva, tamanho e permissões; não troque por uma chave desconhecida |
| Algoritmo não suportado               | Use HTTPS/localhost e um navegador com o suporte Web Crypto necessário                                         |
| O idioma volta após recarregar        | Preferências não são persistidas; ajuste a preferência do navegador ou selecione novamente                     |
| Offline ainda não funciona            | Primeiro carregue o build de produção online e aguarde a instalação do service worker                          |
| Uma atualização não aparece           | Feche as abas antigas para permitir que o service worker instalado seja ativado                                |

## Referências, design e licença

[Arquitetura](docs/architecture.md) · [ameaças](docs/threat-model.md) · [privacidade](docs/privacy-model.md) · [políticas](docs/policy-engine.md) · [dependências](docs/dependencies.md) · [referências técnicas](docs/references.md).

A interface usa tokens visuais próprios, com foco em conteúdo técnico legível e um início guiado. O jwt.io foi referência de fluxo, sem reprodução integral do design: [análise](docs/jwtio-analysis.md). [Design editável no Figma](https://www.figma.com/design/6kR28pKvKQQX3xJeIsxjLw) e [decisões visuais](docs/design.md). Os frames existentes documentam a base visual; não são capturas do aplicativo nem evidência de QA da revisão multilíngue.

Licença [MIT](LICENSE). A versão alpha é um MVP funcional com as limitações acima; não declara estabilidade nem auditoria independente.
