export const referenceMessages: Record<string, readonly [string, string]> = {
  'Expiration Time': ['Expiração', 'Caducidad'],
  'The JWT must not be accepted at or after this time (subject to configured clock skew).':
    [
      'O JWT não deve ser aceito a partir desse horário, considerando a tolerância de relógio configurada.',
      'El JWT no debe aceptarse a partir de esta hora, teniendo en cuenta la tolerancia de reloj configurada.',
    ],
  'Issued At': ['Data de emissão', 'Fecha de emisión'],
  'When the token was issued; not a universal activation condition.': [
    'Informa quando o token foi emitido. Esse campo, sozinho, não define o início de validade.',
    'Indica cuándo se emitió el token. Este campo, por sí solo, no define el inicio de vigencia.',
  ],
  'Not Before': ['Início de validade', 'Inicio de vigencia'],
  'The JWT must not be accepted before this time.': [
    'O JWT não deve ser aceito antes desse horário.',
    'El JWT no debe aceptarse antes de esta hora.',
  ],
  'Authentication Time': ['Horário da autenticação', 'Hora de autenticación'],
  'When end-user authentication occurred.': [
    'Informa quando o usuário se autenticou.',
    'Indica cuándo se autenticó el usuario.',
  ],
  'Identifies the issuing principal. Compare with the issuer your application trusts.':
    [
      'Identifica quem emitiu o token. Compare esse valor com o emissor em que sua aplicação confia.',
      'Identifica quién emitió el token. Compara este valor con el emisor en el que confía tu aplicación.',
    ],
  'Identifies intended recipients. Your application must be an intended recipient.':
    [
      'Identifica os destinatários do token. Sua aplicação deve estar entre eles.',
      'Identifica los destinatarios del token. Tu aplicación debe estar entre ellos.',
    ],
  Subject: ['Identidade representada', 'Identidad representada'],
  'Identifies the token subject within the issuer context.': [
    'Identifica a pessoa ou entidade representada pelo token no contexto do emissor.',
    'Identifica a la persona o entidad representada por el token en el contexto del emisor.',
  ],
  'JWT ID': ['ID do JWT', 'ID del JWT'],
  'Unique token identifier; replay protection still needs verifier-side state.':
    [
      'Identificador único do token. Impedir a reutilização ainda exige controle de estado no verificador.',
      'Identificador único del token. Impedir la reutilización sigue requiriendo un control de estado en el verificador.',
    ],
  'Binds an ID token to a client authentication request.': [
    'Vincula um ID token à solicitação de autenticação do cliente.',
    'Vincula un ID token a la solicitud de autenticación del cliente.',
  ],
  'Authorized Party': ['Parte autorizada', 'Parte autorizada'],
  'Identifies the party to which the ID token was issued.': [
    'Identifica a parte para a qual o ID token foi emitido.',
    'Identifica a la parte para la que se emitió el ID token.',
  ],
  'Authentication Context Class': [
    'Classe do contexto de autenticação',
    'Clase del contexto de autenticación',
  ],
  'Authentication context; interpret according to the application agreement.': [
    'Descreve o contexto de autenticação. Interprete conforme as regras acordadas pela aplicação.',
    'Describe el contexto de autenticación. Interprétalo según las reglas acordadas por la aplicación.',
  ],
  'Authentication Methods': [
    'Métodos de autenticação',
    'Métodos de autenticación',
  ],
  'Methods used for authentication, not proof of current session state.': [
    'Métodos usados na autenticação. Não comprovam o estado atual da sessão.',
    'Métodos usados en la autenticación. No demuestran el estado actual de la sesión.',
  ],
  'Access Token Hash': ['Hash do access token', 'Hash del access token'],
  'Access-token binding value; needs contextual validation.': [
    'Valor que vincula o access token; exige validação no contexto do protocolo.',
    'Valor que vincula el access token; requiere validación en el contexto del protocolo.',
  ],
  'Code Hash': ['Hash do código', 'Hash del código'],
  'Authorization-code binding value.': [
    'Valor que vincula o código de autorização.',
    'Valor que vincula el código de autorización.',
  ],
  'Session ID': ['ID da sessão', 'ID de sesión'],
  'Session correlation identifier. Do not expose unnecessarily.': [
    'Identificador usado para correlacionar a sessão. Evite expô-lo sem necessidade.',
    'Identificador usado para correlacionar la sesión. Evita exponerlo sin necesidad.',
  ],
  'Identifies proof-of-possession key information. Presence is not proof of possession.':
    [
      'Descreve a chave de prova de posse. A presença do campo não comprova que alguém possui a chave.',
      'Describe la clave de prueba de posesión. La presencia del campo no demuestra que alguien posea la clave.',
    ],
  'JWK Thumbprint': ['Thumbprint da JWK', 'Thumbprint de la JWK'],
  'Key thumbprint used for key binding; verify protocol context.': [
    'Thumbprint usado para vincular a chave. Confira as regras do protocolo.',
    'Thumbprint usado para vincular la clave. Comprueba las reglas del protocolo.',
  ],
  'Tenant ID': ['ID do tenant', 'ID del tenant'],
  'Common in Microsoft Entra identity tokens; does not itself authorize a tenant.':
    [
      'Comum em tokens do Microsoft Entra. O campo, sozinho, não autoriza acesso a um tenant.',
      'Habitual en tokens de Microsoft Entra. El campo, por sí solo, no autoriza el acceso a un tenant.',
    ],
  'Object ID': ['ID do objeto', 'ID del objeto'],
  'Common Microsoft identity object identifier.': [
    'Identificador de objeto comum no sistema de identidade da Microsoft.',
    'Identificador de objeto habitual en el sistema de identidad de Microsoft.',
  ],
  'Authenticator Assurance Level': [
    'Nível de garantia da autenticação',
    'Nivel de garantía de autenticación',
  ],
  'Common in Supabase authentication tokens.': [
    'Comum em tokens de autenticação do Supabase.',
    'Habitual en tokens de autenticación de Supabase.',
  ],
  'Common Supabase session identifier.': [
    'Identificador de sessão comum no Supabase.',
    'Identificador de sesión habitual en Supabase.',
  ],
  'User Metadata': ['Metadados do usuário', 'Metadatos del usuario'],
  'Common Supabase metadata. User-editable metadata must not be trusted for authorization.':
    [
      'Metadados comuns no Supabase. Dados que o usuário pode editar não devem ser usados como fonte de confiança para autorização.',
      'Metadatos habituales en Supabase. Los datos que puede editar el usuario no deben usarse como fuente de confianza para la autorización.',
    ],
  'Cognito Groups': ['Grupos do Cognito', 'Grupos de Cognito'],
  'Group memberships commonly emitted by Amazon Cognito.': [
    'Grupos de que o usuário participa, normalmente informados pelo Amazon Cognito.',
    'Grupos a los que pertenece el usuario, normalmente indicados por Amazon Cognito.',
  ],
  'Token Use': ['Finalidade do token', 'Finalidad del token'],
  'Common Amazon Cognito token classification; still verify issuer and audience.':
    [
      'Classificação comum do Amazon Cognito. Ainda é necessário verificar emissor e destinatários.',
      'Clasificación habitual de Amazon Cognito. Sigue siendo necesario verificar el emisor y los destinatarios.',
    ],
  'Out of supported range': [
    'Fora do intervalo suportado',
    'Fuera del intervalo admitido',
  ],
  'Before expiration': ['Ainda não expirou', 'Aún no ha caducado'],
  'Activation reached': [
    'O início de validade já foi atingido',
    'Ya se alcanzó el inicio de vigencia',
  ],
  'Informational time': ['Horário informativo', 'Hora informativa'],
  'All values are untrusted until signature, issuer, audience and application context are validated.':
    [
      'Trate os valores como não confiáveis até validar a assinatura, o emissor, os destinatários e o contexto da aplicação.',
      'Trata los valores como no confiables hasta validar la firma, el emisor, los destinatarios y el contexto de la aplicación.',
    ],
  'Intended audience': ['Destinatários previstos', 'Destinatarios previstos'],
  'Token identifier': ['Identificador do token', 'Identificador del token'],
  'Expiration NumericDate': [
    'Expiração em NumericDate',
    'Caducidad en NumericDate',
  ],
  'Issued-at NumericDate': ['Emissão em NumericDate', 'Emisión en NumericDate'],
  'Not-before NumericDate': [
    'Início de validade em NumericDate',
    'Inicio de vigencia en NumericDate',
  ],
  'Authentication time': ['Horário da autenticação', 'Hora de autenticación'],
  'Request binding nonce': [
    'Nonce que vincula a solicitação',
    'Nonce que vincula la solicitud',
  ],
  'Authorized party': ['Parte autorizada', 'Parte autorizada'],
  'Authentication context': [
    'Contexto de autenticação',
    'Contexto de autenticación',
  ],
  'Authentication methods': [
    'Métodos de autenticação',
    'Métodos de autenticación',
  ],
  'Access token hash': ['Hash do access token', 'Hash del access token'],
  'Authorization code hash': [
    'Hash do código de autorização',
    'Hash del código de autorización',
  ],
  'State hash': ['Hash do state', 'Hash del state'],
  'Confirmation key': ['Chave de confirmação', 'Clave de confirmación'],
  'JWK thumbprint': ['Thumbprint da JWK', 'Thumbprint de la JWK'],
  'Acting party': ['Parte que está atuando', 'Parte que actúa'],
  'Authorized actor': ['Ator autorizado', 'Actor autorizado'],
  'Space-delimited scopes': [
    'Scopes separados por espaços',
    'Scopes separados por espacios',
  ],
  Scopes: ['Scopes', 'Scopes'],
  Roles: ['Roles', 'Roles'],
  Permissions: ['Permissões', 'Permisos'],
  Groups: ['Grupos', 'Grupos'],
  'Client identifier': [
    'Identificador do cliente',
    'Identificador del cliente',
  ],
  'Email address': ['Endereço de e-mail', 'Dirección de correo electrónico'],
  'Display name': ['Nome de exibição', 'Nombre para mostrar'],
  'Phone number': ['Número de telefone', 'Número de teléfono'],
  Address: ['Endereço', 'Dirección'],
  'Session identifier': ['Identificador da sessão', 'Identificador de sesión'],
  'Session state': ['Estado da sessão', 'Estado de sesión'],
  Tenant: ['Tenant', 'Tenant'],
  'Tenant identifier': ['Identificador do tenant', 'Identificador del tenant'],
  'Token type': ['Tipo de token', 'Tipo de token'],
  'Custom claim; not inherently invalid.': [
    'Claim personalizada; isso não significa que seja inválida.',
    'Claim personalizado; eso no significa que sea inválido.',
  ],
  'JOSE object': ['Objeto JOSE', 'Objeto JOSE'],
  'Likely DPoP proof': ['Provável prova DPoP', 'Probable prueba DPoP'],
  'Likely OAuth 2.0 Access Token': [
    'Provável access token OAuth 2.0',
    'Probable access token OAuth 2.0',
  ],
  'Possible OpenID Connect ID Token': [
    'Possível ID token OpenID Connect',
    'Posible ID token OpenID Connect',
  ],
  'Possible OAuth 2.0 Access Token': [
    'Possível access token OAuth 2.0',
    'Posible access token OAuth 2.0',
  ],
  'Possible session token': [
    'Possível token de sessão',
    'Posible token de sesión',
  ],
  'Possible service token': [
    'Possível token de serviço',
    'Posible token de servicio',
  ],
  'Generic JWT': ['JWT genérico', 'JWT genérico'],
  'Symmetric secret': ['Segredo simétrico', 'Secreto simétrico'],
  'RSA, at least 2048 bits': [
    'RSA, no mínimo 2048 bits',
    'RSA, al menos 2048 bits',
  ],
  'JOSE salt length equals digest length.': [
    'Em JOSE, o salt tem o mesmo tamanho do digest.',
    'En JOSE, el salt tiene el mismo tamaño que el digest.',
  ],
  'Public key verifies; private key signs.': [
    'A chave pública verifica; a chave privada assina.',
    'La clave pública verifica; la clave privada firma.',
  ],
  'Unsupported curve': ['Curva não suportada', 'Curva no compatible'],
  'JOSE uses a fixed-width R || S signature, not ASN.1 DER.': [
    'JOSE usa uma assinatura R || S de tamanho fixo, não ASN.1 DER.',
    'JOSE usa una firma R || S de tamaño fijo, no ASN.1 DER.',
  ],
  'Intrinsic to Ed25519': ['Próprio do Ed25519', 'Propio de Ed25519'],
  'Support depends on the browser Web Crypto implementation.': [
    'O suporte depende da implementação de Web Crypto do navegador.',
    'La compatibilidad depende de la implementación de Web Crypto del navegador.',
  ],
  'Protected Header': ['Header protegido', 'Header protegido'],
  'Encrypted Key': ['Chave criptografada', 'Clave cifrada'],
  'Initialization Vector': [
    'Vetor de inicialização',
    'Vector de inicialización',
  ],
  'Authentication Tag': ['Tag de autenticação', 'Tag de autenticación'],
  'Header segment': ['Segmento do header', 'Segmento del header'],
  'Payload segment': ['Segmento do payload', 'Segmento del payload'],
  'Signature segment': ['Segmento da assinatura', 'Segmento de la firma'],
  Ciphertext: ['Conteúdo criptografado', 'Contenido cifrado'],
  'Signing or key management algorithm': [
    'Algoritmo de assinatura ou gerenciamento de chaves',
    'Algoritmo de firma o gestión de claves',
  ],
  'Content encryption algorithm': [
    'Algoritmo de criptografia do conteúdo',
    'Algoritmo de cifrado del contenido',
  ],
  'Compression algorithm': [
    'Algoritmo de compressão',
    'Algoritmo de compresión',
  ],
  'Application token type': [
    'Tipo de token definido pela aplicação',
    'Tipo de token definido por la aplicación',
  ],
  'Content type; JWT can indicate nesting': [
    'Tipo de conteúdo; JWT pode indicar um token interno',
    'Tipo de contenido; JWT puede indicar un token interno',
  ],
  'Key identifier; key resolution is server-dependent': [
    'Identificador da chave; a busca da chave depende do servidor',
    'Identificador de la clave; la búsqueda de la clave depende del servidor',
  ],
  'Remote JWK set reference — never fetched': [
    'Referência a um conjunto JWK remoto — nunca acessado',
    'Referencia a un conjunto JWK remoto — nunca consultado',
  ],
  'Producer-controlled embedded JWK': [
    'JWK incluída e controlada por quem criou o token',
    'JWK incluida y controlada por quien creó el token',
  ],
  'Remote certificate reference — never fetched': [
    'Referência a certificado remoto — nunca acessado',
    'Referencia a un certificado remoto — nunca consultado',
  ],
  'Certificate chain, not automatically trusted': [
    'Cadeia de certificados, sem confiança automática',
    'Cadena de certificados, sin confianza automática',
  ],
  'SHA-1 certificate thumbprint': [
    'Thumbprint SHA-1 do certificado',
    'Thumbprint SHA-1 del certificado',
  ],
  'SHA-256 certificate thumbprint': [
    'Thumbprint SHA-256 do certificado',
    'Thumbprint SHA-256 del certificado',
  ],
  'Critical extensions must be understood': [
    'O verificador precisa compreender as extensões críticas',
    'El verificador debe reconocer las extensiones críticas',
  ],
  'JWS payload encoding mode (RFC 7797)': [
    'Modo de codificação do payload JWS (RFC 7797)',
    'Modo de codificación del payload JWS (RFC 7797)',
  ],
  'Extension or custom parameter; untrusted.': [
    'Extensão ou parâmetro personalizado; não confiável.',
    'Extensión o parámetro personalizado; no confiable.',
  ],
};
