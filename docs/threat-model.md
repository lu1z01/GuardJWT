# Modelo de ameaças

Ativos: tokens, chaves, claims, políticas privadas, análises, integridade dos resultados. Atacante pode fornecer JOSE/JSON/JWK malformado, strings HTML, URLs e payloads grandes; não deve obter execução, rede ou estado persistido.

| Caminho                    | Controle                                                    | Limite residual                                            |
| -------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------- |
| Token → HTML/script        | React text escaping, sem HTML dinâmico/eval, CSP            | Assets comprometidos continuam sendo confiáveis ao browser |
| jku/x5u → rede             | Nunca fazer fetch; chave fornecida localmente               | Usuário precisa escolher fonte de confiança                |
| JSON → objetos             | Limites, duplicatas, bigint, restauração de chaves próprias | Decimais ambíguos exigem Raw                               |
| Header alg → verificação   | Algoritmo independente, tipos/curvas/ops, jose/Web Crypto   | Assinatura não estabelece finalidade ou confiança          |
| Input → indisponibilidade  | Limite 1 MiB/64 níveis, Workers, previews/paginação         | Hardware/browser varia; não é sandbox de CPU absoluta      |
| Export → vazamento         | Allowlist, opt-ins, preview; sanitização separada           | Downloads e clipboard ficam sob controle do usuário        |
| Clear → resultado atrasado | Revisões, cancelamento Workers, descarte após unmount       | RAM não é sobrescrita de modo forense                      |
| Offline → persistência     | Cache allowlist fixo, ignora query/rotas arbitrárias        | Assets antigos persistem até atualização/limpeza           |

Validação executada antes da remoção da suíte: entradas hostis, prototype names, Unicode, assinaturas/chaves erradas, ambiguidades, corpus determinístico, relatórios com sentinelas e navegação DOM. Não foram realizados scan independente completo, pentest remoto ou observação de tráfego em navegador real nesta sessão.
