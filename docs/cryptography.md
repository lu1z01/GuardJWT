# Criptografia

Implementação JOSE por `jose@6.2.12` sobre Web Crypto. Nenhuma primitiva criptográfica foi escrita no projeto. Encoder e Verify são operações explícitas, somente locais.

| Família        | Algoritmos          | Entrada                                                |
| -------------- | ------------------- | ------------------------------------------------------ |
| HMAC           | HS256, HS384, HS512 | secret UTF-8 ou JWK oct                                |
| RSA PKCS1 v1.5 | RS256, RS384, RS512 | RSA JWK / SPKI público / PKCS8 privado para assinatura |
| RSA-PSS        | PS256, PS384, PS512 | RSA                                                    |
| ECDSA          | ES256, ES384, ES512 | P-256, P-384, P-521 respectivamente                    |
| Edwards        | EdDSA, Ed25519      | Ed25519 conforme suporte do runtime                    |

O algoritmo esperado é selecionado independentemente do token; incompatibilidade não vira fallback automático. `kty`, `alg`, `use`, `key_ops` e curva são checados. JWKS seleciona exatamente um candidato por kid; ausência de kid permite somente um candidato. Metadados de chave têm tipos validados. URLs e chaves embutidas nunca são fontes automáticas de confiança.

Verify requer chave pública para algoritmos assimétricos e recusa JWK privado. PEM precisa ser SPKI PUBLIC KEY; assinatura aceita PKCS8 PRIVATE KEY. Não há suporte a PKCS1 PEM, certificados X.509 ou cadeias. Não se implementou ASN.1 artesanal. Key Workbench mostra metadata, tamanho RSA e thumbprint público RFC 7638; material oct não tem thumbprint exposto.

HMAC fica mascarado por padrão, pode ser revelado explicitamente e não tem estimativa falsa de entropia. Avisos usam comprimento de bytes e padrões triviais, comparados com o mínimo de RFC 7518. Comprimento sozinho não comprova qualidade. Materiais com aparência PEM/JWK não são reinterpretados como secret UTF-8.

`SIGNATURE VALID` significa somente que bytes e chave fornecida correspondem. Não valida automaticamente exp, iss, aud, finalidade, revogação ou confiança na chave. Falha com chave errada é `SIGNATURE INVALID`; problemas de formato/tipo/suporte têm estados distintos. A origem/proveniência da chave é responsabilidade do contexto de uso.

A suíte executada antes de sua remoção usou chaves sintéticas geradas localmente, todas as famílias, round-trips pelo Encoder/Decoder, b64:false, confusão algoritmo/chave, JWKS ambíguo, key_ops, chave errada e vetor oficial RFC 7638. EdDSA testado no Node não garante suporte em todos os browsers. Nenhum teste usou tokens de produção.
