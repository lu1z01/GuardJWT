# Policy Engine

Políticas são objetos JSON locais, validados sem execução de código. Presets são exemplos editáveis (Generic JWT, OAuth Access Token, OIDC ID Token, High Security API, Internal Session, Machine-to-Machine), não configurações universais de produção.

Campos aceitos:

| Tipo                | Campos                                                                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| String              | name (1–100 caracteres), requireTyp                                                                                                                                                        |
| Array de strings    | allowedAlgorithms, forbiddenAlgorithms, requiredClaims, forbiddenClaims, issuerAllowlist, audienceAllowlist, requiredScopes, forbiddenScopes, requiredRoles, forbiddenRoles, allowedKeyIds |
| Boolean             | requireExpiration, requireIssuedAt, requireNotBefore, requireJti, requireSignature, forbidEmbeddedJwk, forbidRemoteJku                                                                     |
| Número não negativo | maximumLifetime (segundos), maximumClockSkew (0–120 segundos)                                                                                                                              |

Arrays têm até 100 entradas, cada string até 500 caracteres. Campos desconhecidos, tipos incorretos e JSON ambíguo são rejeitados. RequiredClaims trata presença no topo; forbiddenClaims procura nomes recursivamente. Audience exige pelo menos um destinatário permitido. Scopes aceitam scope/scp string separada por espaços ou array; roles são do campo roles. Não há linguagem de expressões arbitrárias.

```json
{
  "name": "API de exemplo",
  "allowedAlgorithms": ["RS256"],
  "issuerAllowlist": ["https://issuer.example"],
  "audienceAllowlist": ["api.example"],
  "requireExpiration": true,
  "requireIssuedAt": true,
  "maximumLifetime": 900,
  "maximumClockSkew": 30,
  "requireSignature": true,
  "forbidEmbeddedJwk": true,
  "forbidRemoteJku": true
}
```

Cada check retorna Passed, Warnings ou Failed. requireSignature é Passed somente com verificação criptográfica real; NOT VERIFIED gera Warnings. Uma policy aprovada não valida proveniência de chave/emissor ou o comportamento do servidor. Tempo usa o instante da avaliação; reavalie para atualizar. Resultados são invalidados ao mudar o token. Nenhuma política privada é salva ou transmitida automaticamente.
