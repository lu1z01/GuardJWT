# Engenharia reversa da interface do jwt.io (REA)

Observação passiva e pública de <https://www.jwt.io/> em 17/10/2026, feita com o [REA](https://github.com/morluto/rea) (`rea-agents` 6.5.0: `inspect-web-page`, `analyze-web-bundle`, `capture-web-screenshot`) sobre um Chromium descartável, complementada por Playwright para captura de página inteira, estilos computados e interações. Nenhum token real foi usado; apenas o token de exemplo da própria página e valores digitados (`abc.def.ghi`).

Não foram copiados código-fonte, logotipo, imagens, ilustrações, textos promocionais ou marca. Replicamos **estrutura, hierarquia e comportamento**; a identidade (logo, nome, textos) é do GuardJWT.

## Stack observada

Next.js (App Router, rotas `/[language]`), CSS Modules, fontes Inter (corpo), Roboto Mono (código/botões de cartão) e uma fonte de título própria. Tokens de cor via variáveis CSS (`--functional-gray-0…1000`, `--color_bg_*`, `--color_fg_*`, `--color_code_*`) com tema claro/escuro.

## Anatomia da página (1440 px)

1. **Faixa de anúncio** (handbook) acima do cabeçalho.
2. **Cabeçalho em pílula** arredondada, translúcida: logo à esquerda, navegação central em pílulas (Debugger · Introduction · Libraries · Ask; ativa com fundo cinza), à direita seletor de tema de três posições (sistema · escuro · claro). No mobile vira menu hambúrguer.
3. **Hero**: H1 48/55 px peso 500 centralizado, subtítulo cinza com link para a RFC 7519.
4. **Alternador de modo** em pílula: _JWT Decoder_ / _JWT Encoder_.
5. **Barra de ação**: texto de instrução à esquerda; à direita "Generate example" + dropdown "Select signing algorithm".
6. **Duas colunas**, cartões com cabeçalho "terminal" (`>_ título`) e toolbar de ícones (copiar, limpar):
   - Esquerda — **Encoded Token**: checkbox "Enable auto-focus"; editor de token com segmentos coloridos (header laranja, payload roxo, assinatura verde, pontos neutros); abaixo status "✓ Valid JWT" e "✓ Signature Verified" (verde) ou mensagem de erro em vermelho + "Please address JWT issues to verify signature."
   - Direita — **Decoded Header** e **Decoded Payload**: cada um com abas _JSON_ / _Claims Breakdown_, botões copiar e expandir. JSON com chaves sublinhadas (tracejado) que explicam o claim e timestamps azuis com tooltip de data local. Claims Breakdown é tabela _claim · valor · descrição + "Learn more"_ (datas legíveis para `iat/exp/nbf`, nota sobre `NumericDate`).
   - Direita (baixo) — **JWT Signature Verification (Optional)**: segredo HMAC com toggle _BASE64URL ENCODED_; para algoritmos assimétricos troca por _Public Key Format_ (PEM/JWK) + textarea "Public Key". Mensagens "Valid secret / Valid public key".
7. **Encoder**: coluna esquerda com _Header_ (Algorithm & Token Type), _Payload_ (Data), _Sign JWT_ (segredo ou _Private Key Format_ + chave privada), cada editor com "Valid header/payload" e botão limpar; coluna direita _JWT Signature → Encoded JWT_ colorido com copiar.
8. **Seções promocionais** (handbook, bibliotecas, CTA Auth0, "AI agents skills") e **rodapé** de quatro colunas.

## Estados e comportamentos

| Comportamento            | Observação                                                                                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Decodificação            | Em tempo real a cada digitação, sem botão "Decode".                                                                                                 |
| Token inválido           | Borda do editor realçada, header/payload em "N/A", erro citando JWS Compact Serialization e RFC 7515.                                               |
| Algoritmos do dropdown   | none, HS256/384/512, RS256/384/512, ES256/384/512, PS256/384/512, Ed25519, ML-DSA-44/65/87.                                                         |
| "Generate example"       | Gera token + chave/segredo coerentes com o algoritmo e já mostra "Signature Verified".                                                              |
| Chave assimétrica        | Campo muda para "Public Key" com formato PEM/JWK.                                                                                                   |
| Hover em `iat`/`exp`     | Tooltip com data local completa.                                                                                                                    |
| Editor ↔ Encoder         | Troca de modo preserva o exemplo; Encoder recalcula o JWT a cada edição e mostra erro quando header/payload não são JSON válidos.                   |
| Temas                    | Claro/escuro com tokens equivalentes; cinzas neutros, segmentos de token mantêm matiz.                                                              |
| Rede (3 s de observação) | 100+ requisições de terceiros (ads, pixels, analytics, consentimento). O token digitado não aparece nelas, mas o contexto é de rastreamento pesado. |

Tokens de design medidos (claro): fundo `#f6f6f6`, texto `#191919`, cartões `#f1f1f1` com campo interno branco, raio 8–16 px (botões de ícone 4–8 px), corpo 16 px Inter, botões/código 13 px Roboto Mono, sombras muito suaves e bordas de 1 px translúcidas.

## Mapa para o GuardJWT

| jwt.io                  | GuardJWT (`/`, `src/debugger/`)                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| Cabeçalho em pílula     | `Debugger.tsx`: marca, pílulas Debugger/Workbench/Docs/Privacidade, idioma e tema (3 modos)   |
| Decoder / Encoder       | `Decoder.tsx` / `Encoder.tsx`, mesmas abas                                                    |
| Editor colorido         | `TokenEditor.tsx` (textarea transparente sobre camada colorida; sem contenteditable)          |
| JSON / Claims Breakdown | `JsonCard.tsx` + `ClaimsTable.tsx` (reusa `claims()`/`claimDetails()`)                        |
| Verificação             | `core/crypto/verify.ts`, com Base64URL para segredo HMAC (JWK `oct`)                          |
| Generate example        | `core/debugger/sample.ts`: gera par de chaves local com Web Crypto/jose                       |
| —                       | Extras do GuardJWT: achados de segurança no próprio Debugger e abertura do token no Workbench |

Diferenças deliberadas: **sem** anúncios, rastreadores, consentimento de terceiros, fontes remotas ou persistência (a CSP e o modelo de privacidade continuam valendo; tema e token ficam só em memória). ML-DSA não é oferecido: `jose` e a Web Crypto estável ainda não o suportam.

## Limites da análise

Capturas e DOM não provam o que o servidor faz com dados; a observação de rede cobriu apenas carga inicial e as interações citadas. Estilos medidos são os computados no Chromium 131 do Playwright. Não houve auditoria do código do jwt.io além de metadados de bundle.
