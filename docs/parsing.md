# Parsing e representação

O workspace aceita compact JOSE com 3 segmentos JWS ou 5 JWE. Faz trim externo, exige Base64URL canônico sem `=`, valida bits finais e decodifica texto via UTF-8 fatal. Header deve ser objeto JSON com alg textual. JWE exige enc textual, mostra segmentos binários e não interpreta ciphertext como JSON ou valida tag.

Payload JWS JSON objeto é apresentado como JWT / JWS; payload não objeto ou texto é apresentado como JWS Compact com diagnóstico, sem fingir claims. `cty:JWT` permite abrir nested token textual localmente. Payload cifrado não é acessível sem decriptação, que não foi implementada.

`b64:false` é representado como payload não codificado: suporta o subconjunto compacto ASCII imprimível sem ponto, exige compreensão de `crit` para verificar e usa flattenedVerify preservando a entrada. RFC 7797 proíbe essa opção para JWT; o auditor sinaliza o contexto. Detached payload pode ser inspecionado estruturalmente, mas não verificado.

Limites do produto: 1.048.576 unidades de código por entrada, 64 níveis JSON, 50 linhas por batch, 100 JWKs. Segment bytes são bytes decodificados, não tamanho do texto Base64URL. Hex tem preview de 256 bytes e identifica a limitação. O JSON interativo tem 500 nós; Raw e cópia preservam todo o conteúdo aceito.

`lossless-json` recebe nomes de propriedades prefixados internamente; a restauração cria propriedades próprias com Object.fromEntries. Isso evita o setter legado `__proto__`. Um scanner de strings/escopos identifica duplicatas antes do parse, inclusive nomes escapados e valores iguais. A representação visual usa o último membro, mas Raw preserva todas as ocorrências. Verify/Encoder/políticas rejeitam ambiguidades conforme contrato.

Inteiros fora de Number.MAX_SAFE_INTEGER são bigint e usam serializador próprio. Números não finitos são recusados; decimais que não cabem exatamente no modelo são sinalizados, não apresentados como precisão garantida. Raw é a fonte de verdade. Transformações de JSON e Encoder UI recusam decimais com alerta de precisão; o core do Encoder preserva os bytes originais do payload. NumericDate é interpretado apenas como número finito; valores fora da faixa de Date são sinalizados.

Algoritmo desconhecido não impede inspeção, mas não implica suporte criptográfico. Nenhum erro de parsing reflete o token ou stack trace para o usuário.
