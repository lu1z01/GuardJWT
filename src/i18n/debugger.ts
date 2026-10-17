// [pt-BR, es]. Application-owned copy for the debugger; never token data.
export const debuggerMessages: Record<string, readonly [string, string]> = {
  'About this tool': ['Sobre a ferramenta', 'Sobre la herramienta'],
  'Algorithm & Token Type': [
    'Algoritmo e tipo do token',
    'Algoritmo y tipo de token',
  ],
  'Base64URL encoded': ['Codificado em Base64URL', 'Codificado en Base64URL'],
  Clear: ['Limpar', 'Borrar'],
  'Clear token': ['Limpar token', 'Borrar token'],
  Close: ['Fechar', 'Cerrar'],
  'Compression applied before encryption.': [
    'Compressão aplicada antes da criptografia.',
    'Compresión aplicada antes del cifrado.',
  ],
  'Content encryption algorithm of a JWE.': [
    'Algoritmo de criptografia do conteúdo de um JWE.',
    'Algoritmo de cifrado del contenido de un JWE.',
  ],
  Copied: ['Copiado', 'Copiado'],
  Copy: ['Copiar', 'Copiar'],
  'Copy token': ['Copiar token', 'Copiar token'],
  'Custom claim': ['Claim personalizada', 'Claim personalizada'],
  'Dark theme': ['Tema escuro', 'Tema oscuro'],
  Data: ['Dados', 'Datos'],
  Debugger: ['Depurador', 'Depurador'],
  debugger: ['depurador', 'depurador'],
  'Decode, verify and generate JSON Web Tokens, an open, industry standard': [
    'Decodifique, verifique e gere JSON Web Tokens, um método aberto e padrão da indústria, definido na',
    'Decodifica, verifica y genera JSON Web Tokens, un método abierto y estándar de la industria, definido en la',
  ],
  'method for representing claims securely between two parties. Everything runs in your browser.':
    [
      'para representar claims com segurança entre duas partes. Tudo roda no seu navegador.',
      'para representar claims de forma segura entre dos partes. Todo se ejecuta en tu navegador.',
    ],
  'Decoded Header': ['Header decodificado', 'Header decodificado'],
  'Decoded Payload': ['Payload decodificado', 'Payload decodificado'],
  Description: ['Descrição', 'Descripción'],
  'Duplicate JSON properties make the object ambiguous.': [
    'Propriedades JSON duplicadas tornam o objeto ambíguo.',
    'Las propiedades JSON duplicadas vuelven ambiguo el objeto.',
  ],
  'Embedded X.509 certificate chain.': [
    'Cadeia de certificados X.509 embutida.',
    'Cadena de certificados X.509 incorporada.',
  ],
  'Enable auto-focus': ['Ativar foco automático', 'Activar foco automático'],
  'Encoded JWT': ['JWT codificado', 'JWT codificado'],
  'Encoded Token': ['Token codificado', 'Token codificado'],
  'Enter a secret to sign the JWT.': [
    'Informe um segredo para assinar o JWT.',
    'Introduce un secreto para firmar el JWT.',
  ],
  'Enter the private key to sign the JWT.': [
    'Informe a chave privada para assinar o JWT.',
    'Introduce la clave privada para firmar el JWT.',
  ],
  'Enter the public key to verify the signature.': [
    'Informe a chave pública para verificar a assinatura.',
    'Introduce la clave pública para verificar la firma.',
  ],
  'Enter the public key used to verify the JWT below:': [
    'Informe a chave pública usada para verificar o JWT:',
    'Introduce la clave pública usada para verificar el JWT:',
  ],
  'Enter the secret to verify the signature.': [
    'Informe o segredo para verificar a assinatura.',
    'Introduce el secreto para verificar la firma.',
  ],
  'Enter the secret used to sign the JWT below:': [
    'Informe o segredo usado para assinar o JWT:',
    'Introduce el secreto usado para firmar el JWT:',
  ],
  Expand: ['Expandir', 'Expandir'],
  'Extensions the recipient must understand to process the token.': [
    'Extensões que o destinatário precisa entender para processar o token.',
    'Extensiones que el destinatario debe entender para procesar el token.',
  ],
  'Fill in the fields below to generate a signed JWT.': [
    'Preencha os campos abaixo para gerar um JWT assinado.',
    'Completa los campos para generar un JWT firmado.',
  ],
  'Generate example': ['Gerar exemplo', 'Generar ejemplo'],
  'Given value is not a valid JSON object representation.': [
    'O valor informado não é um objeto JSON válido.',
    'El valor indicado no es un objeto JSON válido.',
  ],
  'Header must declare a string alg.': [
    'O header deve declarar alg como texto.',
    'El header debe declarar alg como texto.',
  ],
  'Hint indicating which key signed the token. Never trust it by itself.': [
    'Dica de qual chave assinou o token. Nunca confie nela isoladamente.',
    'Pista de qué clave firmó el token. Nunca confíes en ella por sí sola.',
  ],
  'Invalid Signature': ['Assinatura inválida', 'Firma inválida'],
  'Issuer trust, claims, authorization and key provenance are not established.':
    [
      'Confiança no emissor, claims, autorização e origem da chave não foram estabelecidas.',
      'No se establecieron la confianza en el emisor, los claims, la autorización ni el origen de la clave.',
    ],
  'JSON Web Token (JWT)': ['JSON Web Token (JWT)', 'JSON Web Token (JWT)'],
  'JSON Web Token (JWT) Debugger': [
    'Depurador de JSON Web Token (JWT)',
    'Depurador de JSON Web Token (JWT)',
  ],
  'JWE: content is encrypted and cannot be decoded here.': [
    'JWE: o conteúdo é criptografado e não pode ser decodificado aqui.',
    'JWE: el contenido está cifrado y no puede decodificarse aquí.',
  ],
  'JWT Decoder': ['Decodificador JWT', 'Decodificador JWT'],
  'JWT Encoder': ['Codificador JWT', 'Codificador JWT'],
  'JWT Signature': ['Assinatura do JWT', 'Firma del JWT'],
  'JWT Signature Verification': [
    'Verificação da assinatura do JWT',
    'Verificación de la firma del JWT',
  ],
  'Keys must match the token algorithm: PEM or JWK material is never accepted as an HMAC secret, and keys or URLs inside a token are never trusted.':
    [
      'A chave deve combinar com o algoritmo: PEM ou JWK nunca são aceitos como segredo HMAC, e chaves ou URLs dentro do token nunca são consideradas confiáveis.',
      'La clave debe coincidir con el algoritmo: PEM o JWK nunca se aceptan como secreto HMAC, y las claves o URL dentro del token nunca se consideran confiables.',
    ],
  'Learn more': ['Saiba mais', 'Más información'],
  'Light theme': ['Tema claro', 'Tema claro'],
  'Local by design': ['Local por design', 'Local por diseño'],
  Mode: ['Modo', 'Modo'],
  'Need more depth?': [
    'Precisa de mais profundidade?',
    '¿Necesitas más profundidad?',
  ],
  'No claims to explain.': [
    'Nenhuma claim para explicar.',
    'No hay claims para explicar.',
  ],
  'none (unsigned)': ['none (sem assinatura)', 'none (sin firma)'],
  'Open in workbench': ['Abrir no workbench', 'Abrir en el workbench'],
  'Open the workbench': ['Abrir o workbench', 'Abrir el workbench'],
  Optional: ['Opcional', 'Opcional'],
  'Paste a JWT below that you’d like to decode, validate, and verify.': [
    'Cole abaixo um JWT para decodificar, validar e verificar.',
    'Pega abajo un JWT para decodificar, validar y verificar.',
  ],
  'Paste a JWT, JWS or JWE': [
    'Cole um JWT, JWS ou JWE',
    'Pega un JWT, JWS o JWE',
  ],
  'Please address JWT issues to verify signature.': [
    'Corrija os problemas do JWT para verificar a assinatura.',
    'Corrige los problemas del JWT para verificar la firma.',
  ],
  Privacy: ['Privacidade', 'Privacidad'],
  'Private Key': ['Chave privada', 'Clave privada'],
  'Private Key Format': [
    'Formato da chave privada',
    'Formato de la clave privada',
  ],
  'Public Key': ['Chave pública', 'Clave pública'],
  'Public Key Format': [
    'Formato da chave pública',
    'Formato de la clave pública',
  ],
  'Public key embedded in the token. Do not trust it as a verification key.': [
    'Chave pública embutida no token. Não a use como chave de verificação.',
    'Clave pública incorporada en el token. No la uses como clave de verificación.',
  ],
  'Public key in use': ['Chave pública em uso', 'Clave pública en uso'],
  'SHA-1 thumbprint of the signing certificate.': [
    'Impressão digital SHA-1 do certificado de assinatura.',
    'Huella SHA-1 del certificado de firma.',
  ],
  Secret: ['Segredo', 'Secreto'],
  'Secret in use': ['Segredo em uso', 'Secreto en uso'],
  'Secret is not valid Base64URL.': [
    'O segredo não é um Base64URL válido.',
    'El secreto no es un Base64URL válido.',
  ],
  'Security findings': ['Alertas de segurança', 'Alertas de seguridad'],
  'Select signing algorithm': [
    'Selecione o algoritmo',
    'Selecciona el algoritmo',
  ],
  'Sign JWT': ['Assinar JWT', 'Firmar JWT'],
  'Sign JWT: Private Key': [
    'Assinar JWT: chave privada',
    'Firmar JWT: clave privada',
  ],
  'Sign JWT: Secret': ['Assinar JWT: segredo', 'Firmar JWT: secreto'],
  'Signature Verified': ['Assinatura verificada', 'Firma verificada'],
  'Strict verification': ['Verificação rigorosa', 'Verificación estricta'],
  'System theme': ['Tema do sistema', 'Tema del sistema'],
  'The algorithm used to sign the JWT.': [
    'O algoritmo usado para assinar o JWT.',
    'El algoritmo usado para firmar el JWT.',
  ],
  'The content type of the payload, such as JWT for nested tokens.': [
    'O tipo de conteúdo do payload, como JWT em tokens aninhados.',
    'El tipo de contenido del payload, como JWT en tokens anidados.',
  ],
  'The media type of this complete JWT.': [
    'O tipo de mídia deste JWT completo.',
    'El tipo de medio de este JWT completo.',
  ],
  'The signed JWT appears here.': [
    'O JWT assinado aparece aqui.',
    'El JWT firmado aparece aquí.',
  ],
  'The workbench adds claim exploration, policies, key inspection, comparison, batch analysis and safe reports.':
    [
      'O workbench adiciona exploração de claims, políticas, inspeção de chaves, comparação, análise em lote e relatórios seguros.',
      'El workbench añade exploración de claims, políticas, inspección de claves, comparación, análisis por lotes e informes seguros.',
    ],
  Theme: ['Tema', 'Tema'],
  'This browser could not generate a key for the selected algorithm.': [
    'Este navegador não conseguiu gerar uma chave para o algoritmo selecionado.',
    'Este navegador no pudo generar una clave para el algoritmo seleccionado.',
  ],
  'Time claims must be a NumericDate type, representing seconds.': [
    'Claims de tempo devem ser do tipo NumericDate, em segundos.',
    'Los claims de tiempo deben ser de tipo NumericDate, en segundos.',
  ],
  'Tokens, secrets and keys stay in this tab. No analytics, no trackers, no remote fonts and no storage.':
    [
      'Tokens, segredos e chaves ficam nesta aba. Sem analytics, sem rastreadores, sem fontes remotas e sem armazenamento.',
      'Los tokens, secretos y claves permanecen en esta pestaña. Sin analítica, sin rastreadores, sin fuentes remotas y sin almacenamiento.',
    ],
  'URL of a JWK Set. Attacker-controlled when read from an untrusted token.': [
    'URL de um conjunto JWK. Controlada pelo atacante quando lida de um token não confiável.',
    'URL de un conjunto JWK. Controlada por el atacante si proviene de un token no confiable.',
  ],
  'URL of an X.509 certificate chain.': [
    'URL de uma cadeia de certificados X.509.',
    'URL de una cadena de certificados X.509.',
  ],
  'Unable to sign.': ['Não foi possível assinar.', 'No se pudo firmar.'],
  'Unsigned token (alg: none). There is no signature to verify.': [
    'Token sem assinatura (alg: none). Não há assinatura para verificar.',
    'Token sin firma (alg: none). No hay firma que verificar.',
  ],
  'Valid JWT': ['JWT válido', 'JWT válido'],
  'Valid header': ['Header válido', 'Header válido'],
  'Valid payload': ['Payload válido', 'Payload válido'],
  Value: ['Valor', 'Valor'],
  'Whether the payload is Base64URL-encoded (RFC 7797).': [
    'Indica se o payload é codificado em Base64URL (RFC 7797).',
    'Indica si el payload está codificado en Base64URL (RFC 7797).',
  ],
  Workbench: ['Workbench', 'Workbench'],
  'your-256-bit-secret': ['seu-segredo-de-256-bits', 'tu-secreto-de-256-bits'],
  '{count} more in the workbench.': [
    'mais {count} no workbench.',
    '{count} más en el workbench.',
  ],
  '← Open debugger': ['← Abrir depurador', '← Abrir depurador'],
  'Open in Decoder': ['Abrir no Decodificador', 'Abrir en el Decodificador'],
  'Analyzing locally…': ['Analisando localmente…', 'Analizando localmente…'],
  Header: ['Header', 'Header'],
  Payload: ['Payload', 'Payload'],
  Claim: ['Claim', 'Claim'],
  'Claims breakdown': ['Detalhe das claims', 'Detalle de claims'],
  Local: ['Local', 'Local'],
};
