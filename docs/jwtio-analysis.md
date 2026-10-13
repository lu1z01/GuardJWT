# Análise do jwt.io e aplicação ao GuardJWT

Referência observada em 12/10/2026: [jwt.io](https://www.jwt.io/). A coleta via Firecrawl incluiu conteúdo e screenshot da página pública. Não envolveu tokens reais, exploração de segurança ou inspeção de tráfego de tokens.

## Observações

A aplicação apresenta Decoder, Encoder e Claims Breakdown como áreas principais. A disposição associa token codificado e JSON decodificado lado a lado; ações como copiar, limpar e escolher exemplo/algoritmo ficam próximas dos campos. Header e payload têm identificação clara. A verificação é uma operação adicional ao entendimento do conteúdo.

Essa organização oferece um caminho curto para a tarefa principal: colar → entender header/payload → entender claims → verificar ou gerar. O texto introdutório e espaços amplos favorecem descoberta, mas ocupam área que um usuário técnico recorrente pode preferir dedicar a dados.

## Decisões implementadas

| Referência funcional                      | GuardJWT                                                                                          |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Decoder/Encoder/Claims Breakdown visíveis | Três primeiras abas, sem submenus                                                                 |
| Encoded vs decoded                        | Workspace denso, painel de entrada redimensionável, contexto lateral                              |
| Header/payload                            | Decoded, Raw e Segments, bytes e cópia explícita                                                  |
| Explicação de claims                      | JSON clicável ↔ detalhe, datas, listas, PII, referências e findings relacionados                  |
| Geração                                   | JSON editável, helpers temporais, escolha de algoritmo, assinatura local, abrir no Decoder/Verify |
| Exemplos                                  | Corpus fictício de JWS/JWE, Unicode, duplicatas, limites e headers problemáticos                  |

O GuardJWT mantém identidade própria: tipografia e espaçamento compactos, temas claro/escuro, ênfase em auditoria, limites de inferência, política, privacidade e fluxo local. Não replica marca, layout exato, assets ou código do jwt.io.

## O que a observação não demonstra

Conteúdo/screenshot não confirmam ausência de transmissão, armazenamento ou telemetria no jwt.io. Não foi feita auditoria de código/dependências, teste da implementação criptográfica ou comparação de segurança entre produtos. A implementação GuardJWT é avaliada pelos próprios testes e contratos; não herda garantias da referência visual.

A inspeção visual interativa do GuardJWT ficou pendente porque Browser não disponibilizou navegador nesta sessão. Os fluxos DOM foram testados; responsividade real, foco visual, instalação offline e tráfego em DevTools ainda exigem navegador disponível.
