# Localização do GuardJWT

A interface oferece português do Brasil, inglês e espanhol. Os textos são adaptados ao contexto de uso: instruções diretas, explicações de segurança claras e nomes consistentes entre botões, alertas e documentação interna.

## Organização

| Arquivo                             | Responsabilidade                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------- |
| `src/i18n/interface.ts`             | Navegação, formulários, orientações, páginas institucionais e títulos de página |
| `src/i18n/diagnostics.ts`           | Alertas de segurança, erros de entrada e resultados de verificações             |
| `src/i18n/reference.ts`             | Significado de claims, parâmetros JOSE e referências de algoritmos              |
| `src/i18n/messages.ts`              | Reúne os catálogos, sem duplicar as entradas                                    |
| `src/i18n/translate.ts`             | Seleção de idioma, interpolação e normalização da busca                         |
| `src/i18n/context.ts` e `index.tsx` | Contexto React e seletor de idioma                                              |

O texto de origem é a chave em inglês. Cada entrada contém as versões PT-BR e ES; `englishMessages` permite aprimorar os rótulos em inglês sem alterar os identificadores usados pelos componentes. Novas mensagens devem ser adicionadas ao catálogo correspondente, incluindo os mesmos parâmetros nas três versões. Mensagens desconhecidas preservam o texto original.

## Vocabulário e dados preservados

Mantemos JWT, JOSE, JWS, JWE, JWK, JWKS, Header, Payload, claims, scopes, roles, fingerprint e thumbprint quando são termos técnicos. A introdução explica Header e Payload. Traduzimos instruções e significados: por exemplo, `audience` aparece como “destinatários” em português e “destinatarios” em espanhol.

Nomes de propriedades (`iss`, `aud`, `exp`), algoritmos, JSON Pointer, valores de claims, tokens, chaves, hashes e evidências técnicas permanecem intactos. A tradução ocorre na apresentação, sem alterar o parser, a política ou a criptografia. Exportações mantêm o esquema, estados e textos técnicos em inglês para evitar mudanças de formato entre idiomas. Referências externas permanecem no idioma original.

Não passe conteúdo livre do usuário à função de tradução. Resultados de conversão, como Base64URL e JSON, são dados; a mensagem “JSON válido” é tratada separadamente. Parâmetros são substituídos uma única vez e renderizados como texto pelo React.

## Comportamento

- O idioma inicial acompanha as preferências do navegador; inglês é o fallback.
- A troca pelo seletor preserva o token e os formulários abertos.
- A navegação interna mantém o contexto de idioma. Sair do workspace descarta seus dados em memória; voltar não recupera os tokens ou as chaves.
- Recarregar ou abrir uma nova aba aplica novamente as preferências do navegador. Não há cookie nem armazenamento persistente de idioma ou tokens.
- Busca de comandos, claims e alertas aceita rótulos traduzidos e ignora acentos.
- Datas locais e a contagem de caracteres acompanham o idioma selecionado. Datas UTC, Unix e identificadores de protocolo preservam seu formato técnico.
- Tradução e busca funcionam localmente, sem serviços externos.

## Validação desta revisão

Foram verificadas 802 entradas de catálogo (1.604 traduções PT-BR/ES), consistência de parâmetros, ausência de chaves duplicadas entre catálogos, 15 renderizações estáticas de páginas e nove renderizações de componentes com dados sintéticos. Foram conferidos o link e o símbolo do GitHub, mensagens dinâmicas, escape e preservação dos valores do token, busca sem acentos e regras de navegação interna, incluindo links externos e clique com modificadores.

Os scripts de validação são temporários e ficam fora do repositório, conforme a decisão do MVP. Compilação e verificações estáticas não substituem QA visual e interação em navegador real; essa etapa continua pendente nesta sessão, sem navegador disponível.
