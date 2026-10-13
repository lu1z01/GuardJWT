export const diagnosticMessages: Record<string, readonly [string, string]> = {
  'Unsigned algorithm declared': [
    'O token declara que não tem assinatura',
    'El token declara que no tiene firma',
  ],
  'Unsigned tokens can be dangerous if accepted for authentication. This does not prove a server vulnerability.':
    [
      'Aceitar um token sem assinatura na autenticação pode ser perigoso. Este alerta, sozinho, não comprova uma falha no servidor.',
      'Aceptar un token sin firma en la autenticación puede ser peligroso. Esta alerta, por sí sola, no demuestra un fallo en el servidor.',
    ],
  'Check the verifier’s explicit algorithm allowlist.': [
    'Confira quais algoritmos o verificador permite explicitamente.',
    'Comprueba qué algoritmos permite explícitamente el verificador.',
  ],
  'Unrecognized signing algorithm': [
    'Algoritmo de assinatura não reconhecido',
    'Algoritmo de firma no reconocido',
  ],
  'Inspection is supported; cryptographic support is separate.': [
    'É possível ler o token, mas isso não significa que seu algoritmo possa ser verificado.',
    'Es posible leer el token, pero eso no significa que se pueda verificar su algoritmo.',
  ],
  'Algorithm not in the supported verification set.': [
    'O algoritmo não está entre os disponíveis para verificação.',
    'El algoritmo no está entre los disponibles para verificación.',
  ],
  'Check JOSE registry and verifier support.': [
    'Consulte o registro JOSE e os algoritmos aceitos pelo verificador.',
    'Consulta el registro JOSE y los algoritmos que admite el verificador.',
  ],
  'Signature is absent': ['Token sem assinatura', 'Token sin firma'],
  'No signature bytes were provided.': [
    'O segmento da assinatura está vazio.',
    'El segmento de la firma está vacío.',
  ],
  '0 signature bytes': ['0 bytes de assinatura', '0 bytes de firma'],
  'Use signed tokens when the application requires integrity.': [
    'Use tokens assinados quando a aplicação precisar garantir a integridade dos dados.',
    'Usa tokens firmados cuando la aplicación necesite garantizar la integridad de los datos.',
  ],
  'Duplicate JSON property': ['Campo JSON duplicado', 'Campo JSON duplicado'],
  'Large integer detected': [
    'Número inteiro grande detectado',
    'Número entero grande detectado',
  ],
  'Numeric precision warning': [
    'Atenção à precisão numérica',
    'Atención a la precisión numérica',
  ],
  'Parsers may disagree about duplicate members. Raw text preserves every occurrence.':
    [
      'Diferentes parsers podem interpretar campos duplicados de formas distintas. O texto original preserva todas as ocorrências.',
      'Distintos parsers pueden interpretar los campos duplicados de forma diferente. El texto original conserva todas las apariciones.',
    ],
  'The original numeric text is retained; large integers are represented exactly. Inspect raw JSON for decimal precision.':
    [
      'O texto numérico original foi preservado, e inteiros grandes são representados sem perda. Para conferir a precisão de decimais, consulte o JSON original.',
      'Se conserva el texto numérico original, y los enteros grandes se representan sin pérdida. Para comprobar la precisión decimal, consulta el JSON original.',
    ],
  'Numeric value requires attention.': [
    'Confira a representação deste número.',
    'Revisa la representación de este número.',
  ],
  'Avoid ambiguous JSON and use strings for identifiers outside safe numeric ranges.':
    [
      'Evite JSON ambíguo. Para IDs fora da faixa numérica segura, use strings.',
      'Evita JSON ambiguo. Para ID fuera del rango numérico seguro, usa strings.',
    ],
  'Invalid critical header list': [
    'Lista de extensões críticas inválida',
    'Lista de extensiones críticas no válida',
  ],
  'JOSE Header': ['Header JOSE', 'Header JOSE'],
  'crit must be a nonempty list of unique extension names.': [
    'crit deve ser uma lista não vazia, sem nomes de extensão repetidos.',
    'crit debe ser una lista no vacía, sin nombres de extensión repetidos.',
  ],
  'crit shape is invalid.': [
    'O formato de crit é inválido.',
    'El formato de crit no es válido.',
  ],
  'Correct crit before verification.': [
    'Corrija crit antes de verificar a assinatura.',
    'Corrige crit antes de verificar la firma.',
  ],
  'Unsupported critical header parameter': [
    'Extensão crítica não suportada',
    'Extensión crítica no compatible',
  ],
  'Critical extensions must be understood and present. Inspection does not imply support.':
    [
      'Extensões críticas precisam estar presentes e ser compreendidas pelo verificador. Conseguir inspecioná-las não significa suportá-las.',
      'Las extensiones críticas deben estar presentes y ser reconocidas por el verificador. Poder inspeccionarlas no significa admitirlas.',
    ],
  'Reject unsupported extensions at verification.': [
    'Na verificação, rejeite extensões que não forem suportadas.',
    'Durante la verificación, rechaza las extensiones no compatibles.',
  ],
  'Unencoded payload missing critical declaration': [
    'Payload sem codificação: falta declarar b64 em crit',
    'Payload sin codificación: falta declarar b64 en crit',
  ],
  'RFC 7797 requires b64 in crit; this is JWS, not JWT.': [
    'A RFC 7797 exige b64 em crit. Esse formato é JWS, não JWT.',
    'La RFC 7797 exige b64 en crit. Este formato es JWS, no JWT.',
  ],
  'Include b64 in crit.': [
    'Inclua b64 na lista crit.',
    'Incluye b64 en la lista crit.',
  ],
  'Potentially unsafe key identifier handling': [
    'O identificador da chave exige cuidado',
    'El identificador de la clave requiere atención',
  ],
  'Key Management': ['Gerenciamento de chaves', 'Gestión de claves'],
  'Security impact depends on how the verifier resolves keys.': [
    'O risco depende de como o verificador encontra a chave a partir desse identificador.',
    'El riesgo depende de cómo el verificador encuentra la clave a partir de ese identificador.',
  ],
  'kid is empty, long, non-string or contains unusual characters.': [
    'kid está vazio, é longo demais, não é uma string ou contém caracteres incomuns.',
    'kid está vacío, es demasiado largo, no es un string o contiene caracteres inusuales.',
  ],
  'Resolve only against a trusted key map; never concatenate into paths or queries.':
    [
      'Busque apenas em um conjunto de chaves confiáveis. Não use o valor diretamente para montar caminhos ou consultas.',
      'Busca solo en un conjunto de claves de confianza. No uses el valor directamente para construir rutas o consultas.',
    ],
  'Invalid URL': ['URL inválida', 'URL no válida'],
  'local/private-looking host': [
    'endereço aparentemente local ou privado',
    'dirección aparentemente local o privada',
  ],
  'host requires server-side allowlist': [
    'endereço exige uma lista de permissões no servidor',
    'la dirección requiere una lista de permitidos en el servidor',
  ],
  'embedded credentials': ['credenciais na URL', 'credenciales en la URL'],
  'Remote key reference detected': [
    'Referência a uma chave remota',
    'Referencia a una clave remota',
  ],
  'The URL is never requested. Host classification is heuristic; DNS resolution is not performed.':
    [
      'A URL não é acessada. A classificação do endereço é aproximada e não faz consulta DNS.',
      'No se accede a la URL. La clasificación de la dirección es aproximada y no realiza consultas DNS.',
    ],
  'Use a trusted allowlist; do not trust token-provided URLs.': [
    'Use uma lista de endereços confiáveis. Não confie em URLs apenas porque estão no token.',
    'Usa una lista de direcciones de confianza. No confíes en una URL solo porque aparece en el token.',
  ],
  'Embedded JWK is untrusted': [
    'A JWK incluída no token não é uma fonte de confiança',
    'La JWK incluida en el token no es una fuente de confianza',
  ],
  'An embedded key is controlled by the token producer.': [
    'Quem criou o token também controla a chave incluída nele.',
    'Quien creó el token también controla la clave incluida en él.',
  ],
  'jwk is present.': [
    'O campo jwk está presente.',
    'El campo jwk está presente.',
  ],
  'Trust only keys independently provisioned by the verifier.': [
    'Confie apenas em chaves obtidas por um canal independente e configuradas no verificador.',
    'Confía solo en claves obtenidas por un canal independiente y configuradas en el verificador.',
  ],
  'Compression declared': ['Compressão declarada', 'Compresión declarada'],
  'Compression can create confidentiality risks depending on context.': [
    'Dependendo do uso, a compressão pode comprometer a confidencialidade.',
    'Según el uso, la compresión puede comprometer la confidencialidad.',
  ],
  'zip is present.': [
    'O campo zip está presente.',
    'El campo zip está presente.',
  ],
  'Review compression requirements and threat model.': [
    'Reavalie a necessidade de compressão considerando as ameaças da aplicação.',
    'Revisa si la compresión es necesaria teniendo en cuenta las amenazas de la aplicación.',
  ],
  'Large token': ['Token grande', 'Token grande'],
  Structure: ['Estrutura', 'Estructura'],
  Interoperability: ['Interoperabilidade', 'Interoperabilidad'],
  'May exceed practical limits in some cookie or proxy configurations. There is no universal limit.':
    [
      'O tamanho pode exceder os limites de cookies ou proxies da sua infraestrutura. Não existe um limite universal.',
      'El tamaño puede superar los límites de cookies o proxies de tu infraestructura. No existe un límite universal.',
    ],
  'Check actual infrastructure limits and reduce unnecessary claims.': [
    'Confira os limites da sua infraestrutura e remova claims desnecessárias.',
    'Comprueba los límites de tu infraestructura y elimina los claims innecesarios.',
  ],
  'Payload is not a JWT claims object': [
    'O payload não contém um objeto de claims JWT',
    'El payload no contiene un objeto de claims JWT',
  ],
  'JWS content retained.': [
    'O conteúdo JWS foi preservado.',
    'Se ha conservado el contenido JWS.',
  ],
  'Use raw inspection for non-JWT JWS content.': [
    'Use a visualização original para analisar conteúdo JWS que não seja JWT.',
    'Usa la vista original para analizar contenido JWS que no sea JWT.',
  ],
  'No expiration claim': [
    'O token não informa quando expira',
    'El token no indica cuándo caduca',
  ],
  'Expiration is optional in generic JWT; many application profiles require it.':
    [
      'A expiração é opcional no formato JWT genérico, mas muitas aplicações a exigem.',
      'La caducidad es opcional en el formato JWT genérico, pero muchas aplicaciones la exigen.',
    ],
  'exp absent': ['O campo exp está ausente.', 'Falta el campo exp.'],
  'Define an expiration policy for the application.': [
    'Defina uma política de expiração adequada à aplicação.',
    'Define una política de caducidad adecuada para la aplicación.',
  ],
  'Invalid temporal claim': [
    'Claim de data ou horário inválida',
    'Claim de fecha u hora no válido',
  ],
  'NumericDate must be numeric and within the supported date range.': [
    'NumericDate deve ser um número dentro do intervalo de datas suportado.',
    'NumericDate debe ser un número dentro del intervalo de fechas admitido.',
  ],
  'Use a NumericDate in seconds.': [
    'Use NumericDate em segundos, não em milissegundos.',
    'Usa NumericDate en segundos, no en milisegundos.',
  ],
  'Token has expired': ['O token expirou', 'El token ha caducado'],
  'Current time is on or after expiration with selected skew.': [
    'O horário da análise atingiu ou ultrapassou a expiração, considerando a tolerância de relógio escolhida.',
    'La hora del análisis alcanzó o superó la caducidad, teniendo en cuenta la tolerancia de reloj elegida.',
  ],
  'exp boundary exceeded': [
    'O limite de expiração foi atingido.',
    'Se ha alcanzado el límite de caducidad.',
  ],
  'Obtain a fresh token; check server clock.': [
    'Obtenha um novo token e confira o relógio do servidor.',
    'Obtén un nuevo token y comprueba el reloj del servidor.',
  ],
  'Token is not yet valid': [
    'O token ainda não entrou em vigor',
    'El token aún no está vigente',
  ],
  'Current time is before nbf with selected skew.': [
    'O horário da análise é anterior a nbf, considerando a tolerância escolhida.',
    'La hora del análisis es anterior a nbf, teniendo en cuenta la tolerancia elegida.',
  ],
  'nbf boundary not reached': [
    'O horário definido em nbf ainda não chegou.',
    'Aún no se ha alcanzado la hora definida en nbf.',
  ],
  'Check intended activation time and clock skew.': [
    'Confira o início de validade esperado e a tolerância de relógio.',
    'Comprueba el inicio de vigencia esperado y la tolerancia de reloj.',
  ],
  'Issued-at time is in the future': [
    'A data de emissão está no futuro',
    'La fecha de emisión está en el futuro',
  ],
  'This may indicate clock differences or unexpected issuance.': [
    'Isso pode indicar relógios dessincronizados ou uma data de emissão inesperada.',
    'Esto puede indicar relojes desincronizados o una fecha de emisión inesperada.',
  ],
  'iat > analysis time': [
    'iat é posterior ao horário da análise',
    'iat es posterior a la hora del análisis',
  ],
  'Check issuer and verifier clocks.': [
    'Confira os relógios do emissor e do verificador.',
    'Comprueba los relojes del emisor y del verificador.',
  ],
  'Expiration precedes issuance': [
    'A expiração é anterior à emissão',
    'La caducidad es anterior a la emisión',
  ],
  'Long token lifetime': ['Prazo de validade longo', 'Plazo de validez largo'],
  'The one-day threshold is a workbench heuristic, not a universal RFC limit.':
    [
      'O limite de um dia é uma referência desta ferramenta, não uma exigência universal das RFCs.',
      'El límite de un día es una referencia de esta herramienta, no una exigencia universal de las RFC.',
    ],
  'Choose lifetime for the application threat model.': [
    'Defina a duração do token de acordo com as ameaças da aplicação.',
    'Define la duración del token según las amenazas de la aplicación.',
  ],
  'Unexpected registered claim type': [
    'Tipo inesperado em uma claim padronizada',
    'Tipo inesperado en un claim estandarizado',
  ],
  'This registered claim is expected to be a string.': [
    'Essa claim padronizada deve conter uma string.',
    'Este claim estandarizado debe contener un string.',
  ],
  'Use the RFC-defined claim type.': [
    'Use o tipo definido na RFC para essa claim.',
    'Usa el tipo definido en la RFC para este claim.',
  ],
  'Unexpected audience type': [
    'Tipo inesperado no campo aud',
    'Tipo inesperado en el campo aud',
  ],
  'aud should be a string or array of strings.': [
    'aud deve ser uma string ou uma lista de strings.',
    'aud debe ser un string o una lista de strings.',
  ],
  'Use the RFC-defined audience type.': [
    'Use o tipo definido na RFC para aud.',
    'Usa el tipo definido en la RFC para aud.',
  ],
  'JWT payloads are encoded, not hidden. This is a heuristic, not a confirmed data leak.':
    [
      'O payload de um JWT é codificado, mas continua legível. Este alerta é uma estimativa, não a confirmação de um vazamento.',
      'El payload de un JWT está codificado, pero sigue siendo legible. Esta alerta es una estimación, no la confirmación de una filtración.',
    ],
  'Remove unnecessary sensitive data or use an appropriate opaque token.': [
    'Remova dados sensíveis desnecessários ou considere um token opaco adequado ao caso.',
    'Elimina los datos sensibles innecesarios o considera un token opaco adecuado al caso.',
  ],
  'Access token profile claim missing': [
    'Falta uma claim exigida pelo perfil de access token',
    'Falta un claim exigido por el perfil de access token',
  ],
  'The declared at+jwt profile requires this claim.': [
    'O perfil at+jwt declarado no token exige essa claim.',
    'El perfil at+jwt declarado en el token exige este claim.',
  ],
  'Review RFC 9068 issuer requirements.': [
    'Confira os requisitos para o emissor na RFC 9068.',
    'Consulta los requisitos para el emisor en la RFC 9068.',
  ],
  'Embedded key metadata': [
    'Metadados da chave incluída no token',
    'Metadatos de la clave incluida en el token',
  ],
  'Metadata is observed, not trusted.': [
    'Esses metadados foram apenas lidos; não receberam confiança.',
    'Estos metadatos solo se han leído; no se consideran de confianza.',
  ],
  'Inspect the key separately.': [
    'Inspecione a chave separadamente.',
    'Inspecciona la clave por separado.',
  ],
  'Possible secret': ['Possível segredo', 'Posible secreto'],
  'Possible secret material': [
    'Possível material criptográfico sensível',
    'Posible material criptográfico sensible',
  ],
  'Possible email': [
    'Possível endereço de e-mail',
    'Posible dirección de correo electrónico',
  ],
  'Possible identity number': [
    'Possível número de documento',
    'Posible número de documento de identidad',
  ],
  'Possible phone number': [
    'Possível número de telefone',
    'Posible número de teléfono',
  ],
  'Possible API key': ['Possível API key', 'Posible API key'],
  'Possible payment card': [
    'Possível número de cartão',
    'Posible número de tarjeta',
  ],
  'server-dependent': ['depende do servidor', 'depende del servidor'],
  cryptographic: ['criptografia', 'criptografía'],
  'Input too large for interactive analysis.': [
    'A entrada excede o tamanho permitido para análise interativa.',
    'La entrada supera el tamaño permitido para el análisis interactivo.',
  ],
  'Invalid Base64URL. Padding and whitespace are not permitted.': [
    'Base64URL inválido. Remova espaços e padding (=).',
    'Base64URL no válido. Elimina los espacios y el padding (=).',
  ],
  'Invalid Base64URL: non-canonical padding bits.': [
    'Base64URL inválido: os bits finais não seguem a codificação canônica.',
    'Base64URL no válido: los bits finales no siguen la codificación canónica.',
  ],
  'Payload or protected header is not valid UTF-8.': [
    'O payload ou o header protegido não contém UTF-8 válido.',
    'El payload o el header protegido no contiene UTF-8 válido.',
  ],
  'Paste a token to begin local inspection.': [
    'Cole um token para começar a análise local.',
    'Pega un token para empezar el análisis local.',
  ],
  'Compact JOSE requires exactly three segments (JWS) or five segments (JWE).':
    [
      'JOSE compacto exige exatamente três segmentos para JWS ou cinco para JWE, separados por pontos.',
      'JOSE compacto requiere exactamente tres segmentos para JWS o cinco para JWE, separados por puntos.',
    ],
  'Protected header must be a JSON object with a string alg.': [
    'O header protegido deve ser um objeto JSON com alg do tipo string.',
    'El header protegido debe ser un objeto JSON con alg de tipo string.',
  ],
  'JWE protected header must declare enc.': [
    'O header protegido de um JWE deve informar enc.',
    'El header protegido de un JWE debe indicar enc.',
  ],
  'b64 must be a boolean.': [
    'b64 deve ser true ou false.',
    'b64 debe ser true o false.',
  ],
  'Unencoded compact JWS payload must use printable ASCII without periods.': [
    'O payload JWS compacto sem codificação deve usar caracteres ASCII imprimíveis, sem pontos.',
    'El payload JWS compacto sin codificación debe usar caracteres ASCII imprimibles, sin puntos.',
  ],
  'Payload is not valid UTF-8; inspect bytes in Raw view.': [
    'O payload não contém UTF-8 válido. Confira os bytes na visualização original.',
    'El payload no contiene UTF-8 válido. Revisa los bytes en la vista original.',
  ],
  'JWS payload is not a JWT claims object.': [
    'O payload JWS não é um objeto de claims JWT.',
    'El payload JWS no es un objeto de claims JWT.',
  ],
  'JWS payload is not valid JSON claims. Raw content remains available.': [
    'O payload JWS não contém claims em JSON válido. O conteúdo original continua disponível.',
    'El payload JWS no contiene claims en JSON válido. El contenido original sigue disponible.',
  ],
  'Unable to inspect JOSE input.': [
    'Não foi possível analisar a entrada JOSE.',
    'No se pudo analizar la entrada JOSE.',
  ],
  'JSON exceeds the 64-level inspection limit.': [
    'O JSON ultrapassa o limite de 64 níveis de profundidade.',
    'El JSON supera el límite de 64 niveles de profundidad.',
  ],
  'Invalid JSON.': ['JSON inválido.', 'JSON no válido.'],
  'Invalid JSON or non-finite number.': [
    'JSON inválido ou número não finito.',
    'JSON no válido o número no finito.',
  ],
  'Ambiguous numeric values or duplicate properties in key input.': [
    'A chave contém números ambíguos ou campos duplicados.',
    'La clave contiene números ambiguos o campos duplicados.',
  ],
  'Expected a JWK or JWKS object.': [
    'Informe um objeto JWK ou JWKS.',
    'Introduce un objeto JWK o JWKS.',
  ],
  'Expected 1–100 JWK objects.': [
    'Informe de 1 a 100 objetos JWK.',
    'Introduce de 1 a 100 objetos JWK.',
  ],
  'Invalid key object.': [
    'O objeto da chave é inválido.',
    'El objeto de la clave no es válido.',
  ],
  'JWK metadata and key parameters must have the expected string types.': [
    'Os metadados e parâmetros da JWK devem usar os tipos string esperados.',
    'Los metadatos y parámetros de la JWK deben usar los tipos string esperados.',
  ],
  'Invalid key_ops list.': [
    'A lista key_ops é inválida.',
    'La lista key_ops no es válida.',
  ],
  'Invalid ext flag.': [
    'O campo ext é inválido.',
    'El campo ext no es válido.',
  ],
  'Missing kid': ['kid não informado', 'kid no indicado'],
  'Exact match': ['Uma chave correspondente', 'Una clave coincidente'],
  'Multiple candidates': [
    'Mais de uma chave corresponde',
    'Coincide más de una clave',
  ],
  'No matching key': ['Nenhuma chave corresponde', 'No coincide ninguna clave'],
  'JWK alg does not match the selected algorithm.': [
    'O campo alg da JWK difere do algoritmo selecionado.',
    'El campo alg de la JWK es distinto del algoritmo seleccionado.',
  ],
  'JWK use must permit signatures.': [
    'O campo use da JWK deve permitir assinaturas.',
    'El campo use de la JWK debe permitir firmas.',
  ],
  'JWK key_ops does not permit this operation.': [
    'O campo key_ops da JWK não permite essa operação.',
    'El campo key_ops de la JWK no permite esta operación.',
  ],
  'EC curve does not match the selected algorithm.': [
    'A curva EC não corresponde ao algoritmo selecionado.',
    'La curva EC no coincide con el algoritmo seleccionado.',
  ],
  'Only Ed25519 is supported for EdDSA here.': [
    'Para EdDSA, esta versão suporta apenas Ed25519.',
    'Para EdDSA, esta versión solo admite Ed25519.',
  ],
  'Provide a public JWK for verification; private key input is unnecessary.': [
    'Use uma JWK pública para verificar. Não é necessário fornecer a chave privada.',
    'Usa una JWK pública para verificar. No hace falta proporcionar la clave privada.',
  ],
  'Select a supported JOSE algorithm.': [
    'Selecione um dos algoritmos JOSE disponíveis.',
    'Selecciona uno de los algoritmos JOSE disponibles.',
  ],
  'Key input is empty or exceeds 1 MiB.': [
    'A chave está vazia ou ultrapassa 1 MiB.',
    'La clave está vacía o supera 1 MiB.',
  ],
  'Raw secrets can only be used with HMAC algorithms.': [
    'Segredos em texto só podem ser usados com algoritmos HMAC.',
    'Los secretos en texto solo se pueden usar con algoritmos HMAC.',
  ],
  'PEM/JWK material must not be interpreted as a raw HMAC secret.': [
    'Uma chave PEM ou JWK não pode ser usada como se fosse um segredo HMAC em texto.',
    'Una clave PEM o JWK no se puede usar como si fuera un secreto HMAC en texto.',
  ],
  'HMAC requires a raw secret or oct JWK, never a PEM key.': [
    'HMAC exige um segredo em texto ou uma JWK oct, nunca uma chave PEM.',
    'HMAC requiere un secreto en texto o una JWK oct, nunca una clave PEM.',
  ],
  'Use SPKI PUBLIC KEY PEM, JWK or JWKS; builder signing also accepts PKCS8 PRIVATE KEY.':
    [
      'Use SPKI PUBLIC KEY em PEM, JWK ou JWKS. Para assinar no criador, também é aceito PKCS8 PRIVATE KEY.',
      'Usa SPKI PUBLIC KEY en PEM, JWK o JWKS. Para firmar en el creador, también se admite PKCS8 PRIVATE KEY.',
    ],
  'Not displayed for symmetric secrets': [
    'Não exibido para segredos simétricos',
    'No se muestra para secretos simétricos',
  ],
  'Policy must have an unambiguous name (1–100 characters).': [
    'A política deve ter um nome sem ambiguidade, com 1 a 100 caracteres.',
    'La política debe tener un nombre sin ambigüedad, de 1 a 100 caracteres.',
  ],
  'Policy lists must contain at most 100 strings.': [
    'As listas da política aceitam até 100 strings.',
    'Las listas de la política admiten hasta 100 strings.',
  ],
  'Policy flags must be boolean.': [
    'As opções booleanas da política devem ser true ou false.',
    'Las opciones booleanas de la política deben ser true o false.',
  ],
  'Invalid lifetime or skew; skew must be 0–120 seconds.': [
    'Duração ou tolerância inválida. A tolerância de relógio deve estar entre 0 e 120 segundos.',
    'Duración o tolerancia no válida. La tolerancia de reloj debe estar entre 0 y 120 segundos.',
  ],
  'requireTyp must be a string.': [
    'requireTyp deve ser uma string.',
    'requireTyp debe ser un string.',
  ],
  'Unknown policy field. Check the documented schema.': [
    'Campo de política desconhecido. Consulte os campos aceitos na documentação.',
    'Campo de política desconocido. Consulta los campos admitidos en la documentación.',
  ],
  'claims applicability': [
    'Aplicabilidade das claims',
    'Aplicabilidad de los claims',
  ],
  'No JWT claims are available. JWE ciphertext is not evaluated.': [
    'Não há claims JWT disponíveis. O conteúdo criptografado de JWE não é avaliado.',
    'No hay claims JWT disponibles. No se evalúa el contenido cifrado de JWE.',
  ],
  'Declared algorithm compared with policy.': [
    'O algoritmo declarado foi comparado com a política.',
    'El algoritmo declarado se ha comparado con la política.',
  ],
  'Top-level claim presence.': [
    'Verifica a presença da claim no nível principal.',
    'Comprueba la presencia del claim en el nivel principal.',
  ],
  'Checked recursively.': [
    'Verificado também nos níveis internos.',
    'Comprobado también en los niveles internos.',
  ],
  'A numeric claim is required.': [
    'É necessária uma claim numérica.',
    'Se necesita un claim numérico.',
  ],
  'Nonempty string jti required.': [
    'jti deve ser uma string não vazia.',
    'jti debe ser un string no vacío.',
  ],
  'Issuer compared locally; authenticity not implied.': [
    'O emissor foi comparado localmente. Isso não confirma a autenticidade.',
    'El emisor se ha comparado localmente. Esto no confirma la autenticidad.',
  ],
  'At least one allowed recipient required.': [
    'É necessário pelo menos um destinatário permitido.',
    'Se necesita al menos un destinatario permitido.',
  ],
  'Key ID compared with policy.': [
    'O ID da chave foi comparado com a política.',
    'El ID de la clave se ha comparado con la política.',
  ],
  'Exact scope/role membership.': [
    'Confere a presença exata do scope ou role.',
    'Comprueba la presencia exacta del scope o role.',
  ],
  'Requires numeric iat and exp within the configured lifetime.': [
    'Exige iat e exp numéricos, com duração dentro do limite configurado.',
    'Requiere iat y exp numéricos, con una duración dentro del límite configurado.',
  ],
  'temporal window': ['Intervalo de validade', 'Intervalo de validez'],
  'Evaluated with policy clock skew.': [
    'Avaliado com a tolerância de relógio definida na política.',
    'Evaluado con la tolerancia de reloj definida en la política.',
  ],
  'Requires actual verification with a supplied trusted key, not signature presence.':
    [
      'Exige verificação criptográfica com uma chave de confiança. Ter um segmento de assinatura não basta.',
      'Requiere verificación criptográfica con una clave de confianza. Tener un segmento de firma no basta.',
    ],
  'Embedded key must be absent.': [
    'O token não deve conter uma chave embutida.',
    'El token no debe contener una clave incrustada.',
  ],
  'Remote JWK reference must be absent.': [
    'O token não deve conter referência a uma JWK remota.',
    'El token no debe contener una referencia a una JWK remota.',
  ],
  'Exact type match.': [
    'O tipo deve corresponder exatamente ao exigido.',
    'El tipo debe coincidir exactamente con el exigido.',
  ],
  'Invalid temporal claims': [
    'Há claims de tempo inválidas',
    'Hay claims de tiempo no válidos',
  ],
  'Inconsistent time window': [
    'Intervalo de validade inconsistente',
    'Intervalo de validez incoherente',
  ],
  'No expiration bound': ['Sem limite de expiração', 'Sin límite de caducidad'],
  'Within temporal window': [
    'Dentro do intervalo de validade',
    'Dentro del intervalo de validez',
  ],
  Expired: ['Expirado', 'Caducado'],
  'Not yet valid': ['Ainda não entrou em vigor', 'Aún no está vigente'],
  'Batch exceeds 1 MiB.': ['O lote ultrapassa 1 MiB.', 'El lote supera 1 MiB.'],
  'Batch limit: 50 tokens.': [
    'O limite é de 50 tokens por lote.',
    'El límite es de 50 tokens por lote.',
  ],
  'Decoded · not verified': [
    'Decodificado · assinatura não verificada',
    'Decodificado · firma sin verificar',
  ],
  'Batch limit exceeded.': [
    'O lote excede o limite permitido.',
    'El lote supera el límite permitido.',
  ],
  'Batch worker failed.': [
    'A análise em lote falhou. Tente novamente.',
    'El análisis por lotes ha fallado. Inténtalo de nuevo.',
  ],
  'Local analysis worker failed. Reload and retry.': [
    'A análise local falhou. Recarregue a página e tente novamente.',
    'El análisis local ha fallado. Recarga la página e inténtalo de nuevo.',
  ],
  'Batch must contain at most 50 tokens and 1 MiB.': [
    'O lote deve ter até 50 tokens e no máximo 1 MiB.',
    'El lote debe tener hasta 50 tokens y un máximo de 1 MiB.',
  ],
};
