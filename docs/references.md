# Referências técnicas

Consulta em 12/10/2026. Especificações oficiais prevalecem sobre ferramentas. Firecrawl e leitura web direcionada foram usados para pesquisa; nenhuma operação envolve tokens reais. Não foi copiado código do jwt.io.

| Referência                                                                        | Aplicação                                                                         |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [RFC 7515](https://www.rfc-editor.org/rfc/rfc7515.html)                           | JWS compacto, Base64URL, headers críticos e assinatura                            |
| [RFC 7516](https://www.rfc-editor.org/rfc/rfc7516.html)                           | Cinco segmentos JWE; distinguir inspeção e decriptação                            |
| [RFC 7517](https://www.rfc-editor.org/rfc/rfc7517.html)                           | JWK/JWKS, use, key_ops e kid                                                      |
| [RFC 7518](https://www.rfc-editor.org/rfc/rfc7518.html)                           | Algoritmos, parâmetros, curvas e tamanho HMAC/RSA                                 |
| [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519.html)                           | Claims registradas, NumericDate, duplica­tas e validação contextual               |
| [RFC 7638](https://www.rfc-editor.org/rfc/rfc7638.html)                           | Thumbprint público e vetor oficial de teste                                       |
| [RFC 7797](https://www.rfc-editor.org/rfc/rfc7797.html)                           | b64:false, crit e restrições da representação compacta; proibido em JWT           |
| [RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html)                           | Allowlist independente e desconfiança de valores recebidos                        |
| [RFC 9068](https://www.rfc-editor.org/rfc/rfc9068.html)                           | Requisitos do perfil OAuth JWT Access Token                                       |
| [OIDC Core](https://openid.net/specs/openid-connect-core-1_0.html)                | Claims e contexto de ID Tokens                                                    |
| [jose](https://github.com/panva/jose)                                             | importação local, CompactSign, compactVerify e flattenedVerify                    |
| [lossless-json](https://github.com/josdejong/lossless-json)                       | Hooks numéricos e comportamento de duplicatas; código local também inspecionado   |
| [MDN Web Crypto](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) | Runtime e suporte de importação/verificação                                       |
| [Web Crypto W3C](https://www.w3.org/TR/WebCryptoAPI/)                             | Operações e CryptoKey usages                                                      |
| [jwt.io](https://www.jwt.io/)                                                     | Referência funcional Decoder/Encoder/Claims Breakdown; não evidência de segurança |

Metadados locais de provedores usam [Microsoft Entra](https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference), [Supabase JWT fields](https://supabase.com/docs/guides/auth/jwt-fields) e [Amazon Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-access-token.html). Reconhecer uma claim não identifica conclusivamente seu emissor. Não há consulta remota durante o uso.

Referência complementar: [OWASP JWT Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html). A consulta inicial foi bloqueada; decisões normativas baseiam-se nas RFCs e fontes primárias acima.
