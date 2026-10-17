export const interfaceMessages: Record<string, readonly [string, string]> = {
  'Heuristic indicator based on visible token findings; it is not a validated security rating and does not assess the server or issuer. Unverified signatures are not counted as failed.': [
    'Indicador heurístico baseado nos achados visíveis do token; não é uma classificação de segurança validada e não avalia o servidor ou o emissor. Assinaturas não verificadas não são consideradas falhas.',
    'Indicador heurístico basado en los hallazgos visibles del token; no es una calificación de seguridad validada y no evalúa el servidor ni el emisor. Las firmas no verificadas no se consideran fallidas.',
  ],
  'Required claim: {name}': [
    'Claim obrigatória: {name}',
    'Claim obligatoria: {name}',
  ],
  'Forbidden claim: {name}': [
    'Claim proibida: {name}',
    'Claim prohibida: {name}',
  ],
  'Signing blocked: use a random HMAC secret of at least the algorithm minimum, or explicitly allow an unsafe development secret below.':
    [
      'Assinatura bloqueada: use um segredo HMAC aleatório com o tamanho mínimo do algoritmo ou autorize explicitamente um exemplo inseguro abaixo.',
      'Firma bloqueada: usa un secreto HMAC aleatorio con el tamaño mínimo del algoritmo o autoriza explícitamente un ejemplo inseguro abajo.',
    ],
  'Allow insecure development secret — never use the generated token in production.':
    [
      'Permitir segredo inseguro de desenvolvimento — nunca use o token gerado em produção.',
      'Permitir secreto inseguro de desarrollo — nunca uses el token generado en producción.',
    ],
  'Default masks detected personal data and secrets. Support also masks common IDs. Privacy additionally masks issuer, audience, roles, scopes, tenant and session metadata. Strict masks every leaf value.':
    [
      'Padrão oculta dados pessoais e segredos detectados. Suporte também oculta IDs comuns. Privacidade oculta ainda emissor, destinatários, roles, scopes e metadados de tenant e sessão. Restrito oculta todos os valores finais.',
      'Predeterminado oculta datos personales y secretos detectados. Soporte también oculta los identificadores habituales. Privacidad oculta además el emisor, los destinatarios, roles, scopes y metadatos de tenant y sesión. Estricto oculta todos los valores finales.',
    ],
  Inconclusive: ['Inconclusivo', 'Inconcluso'],
  Passed: ['Aprovado', 'Aprobado'],
  Failed: ['Reprovado', 'Fallido'],
  Warnings: ['Avisos', 'Advertencias'],
  'Security policy': ['Segurança', 'Seguridad'],
  Language: ['Idioma', 'Idioma'],
  'Skip to analysis': ['Ir para a análise', 'Ir al análisis'],
  Workspace: ['Área de trabalho', 'Área de trabajo'],
  Commands: ['Comandos', 'Comandos'],
  Theme: ['Tema', 'Tema'],
  'Clear workspace': ['Limpar tudo', 'Borrar todo'],
  'Token input': ['Seu token', 'Tu token'],
  'JWT input': ['Token JWT', 'Token JWT'],
  characters: ['caracteres', 'caracteres'],
  'Wrap token': ['Quebrar linhas', 'Ajustar líneas'],
  Paste: ['Colar', 'Pegar'],
  Decode: ['Decodificar', 'Decodificar'],
  'Load example': ['Carregar exemplo', 'Cargar ejemplo'],
  'Fixture lab': ['Outros exemplos', 'Otros ejemplos'],
  'Choose fictitious example…': [
    'Escolha um exemplo fictício…',
    'Elige un ejemplo ficticio…',
  ],
  'Fixtures are fictitious. Algorithm examples have illustrative signatures, not verified credentials.':
    [
      'Os exemplos são fictícios. As assinaturas são ilustrativas e não são credenciais válidas.',
      'Los ejemplos son ficticios. Las firmas son ilustrativas y no son credenciales válidas.',
    ],
  '1 MiB input limit': ['Limite de entrada: 1 MiB', 'Límite de entrada: 1 MiB'],
  'Memory only. No uploads or history.': [
    'Somente na memória. Sem envio ou histórico.',
    'Solo en memoria. Sin envíos ni historial.',
  ],
  'Return to outer JOSE': ['Voltar ao JOSE externo', 'Volver al JOSE externo'],
  'More tools': ['Mais ferramentas', 'Más herramientas'],
  More: ['Mais', 'Más'],
  'Privacy / Screenshare Mode': [
    'Modo de privacidade / compartilhamento de tela',
    'Modo de privacidad / compartir pantalla',
  ],
  'Token, keys, claim values and finding evidence are hidden. Sensitive tool panels are closed.':
    [
      'Token, chaves, valores e evidências estão ocultos. Os painéis com dados sensíveis foram fechados.',
      'El token, las claves, los valores y las evidencias están ocultos. Los paneles con datos sensibles están cerrados.',
    ],
  'Showing up to 100 of': ['Exibindo até 100 de', 'Mostrando hasta 100 de'],
  'findings; values hidden.': [
    'alertas; valores ocultos.',
    'alertas; valores ocultos.',
  ],
  'Loading local tool…': [
    'Carregando ferramenta local…',
    'Cargando herramienta local…',
  ],
  'Paste token': ['Colar token', 'Pegar token'],
  'Analyzing locally…': [
    'Analisando no navegador…',
    'Analizando en el navegador…',
  ],
  'No JWT claims available for this JOSE format.': [
    'Este formato JOSE não contém claims JWT acessíveis.',
    'Este formato JOSE no contiene claims JWT accesibles.',
  ],
  'No temporal claims available.': [
    'Nenhuma informação de tempo disponível.',
    'No hay información temporal disponible.',
  ],
  'No decoded claims to sanitize.': [
    'Nenhuma claim decodificada para ocultar.',
    'No hay claims decodificados para ocultar.',
  ],
  Context: ['Detalhes técnicos', 'Detalles técnicos'],
  Format: ['Formato', 'Formato'],
  Signature: ['Assinatura', 'Firma'],
  'Declared algorithm': ['Algoritmo declarado', 'Algoritmo declarado'],
  'Profile estimate': ['Perfil estimado', 'Perfil estimado'],
  'Profile evidence': ['Indícios do perfil', 'Indicios del perfil'],
  'Token hygiene': ['Verificações do token', 'Comprobaciones del token'],
  'Privacy score': ['Privacidade do token', 'Privacidad del token'],
  Policy: ['Política', 'Política'],
  Size: ['Tamanho', 'Tamaño'],
  'Decoding is not verification. A valid signature does not establish issuer trust or authorization.':
    [
      'Decodificar não verifica a assinatura. Uma assinatura válida não comprova a confiança no emissor nem a autorização.',
      'Decodificar no verifica la firma. Una firma válida no demuestra la confianza en el emisor ni la autorización.',
    ],
  Close: ['Fechar', 'Cerrar'],
  'Hide input': ['Ocultar entrada', 'Ocultar entrada'],
  'Show input': ['Mostrar entrada', 'Mostrar entrada'],
  'Hide context': ['Ocultar detalhes', 'Ocultar detalles'],
  'Show context': ['Detalhes técnicos', 'Detalles técnicos'],
  'Privacy Mode': ['Ocultar dados', 'Ocultar datos'],
  'Privacy Mode ON': ['Mostrar dados', 'Mostrar datos'],
  'Toggle light theme': ['Alternar tema claro', 'Cambiar tema claro'],
  'Main navigation': ['Navegação principal', 'Navegación principal'],
  'JWTs and cryptographic material are processed locally in your browser.': [
    'Tokens e chaves são processados somente no seu navegador.',
    'Los tokens y las claves se procesan solo en tu navegador.',
  ],
  'Paste JWT, JWS or JWE': [
    'Cole um JWT, JWS ou JWE',
    'Pega un JWT, JWS o JWE',
  ],
  'Copy Token': ['Copiar token', 'Copiar token'],
  'Resize input panel': ['Redimensionar entrada', 'Cambiar tamaño de entrada'],
  'Workbench areas': ['Ferramentas', 'Herramientas'],
  'Mobile workbench areas': ['Ferramentas', 'Herramientas'],
  'Workspace status': ['Estado da análise', 'Estado del análisis'],
  'Command palette': ['Paleta de comandos', 'Paleta de comandos'],
  'Find command': ['Buscar comando', 'Buscar comando'],
  'Find a command…': ['Busque um comando…', 'Busca un comando…'],
  Decoder: ['Decodificar', 'Decodificar'],
  Encoder: ['Criar token', 'Crear token'],
  'Claims Breakdown': ['Explorar claims', 'Explorar claims'],
  Security: ['Alertas', 'Alertas'],
  Verify: ['Verificar assinatura', 'Verificar firma'],
  Timeline: ['Datas', 'Fechas'],
  Keys: ['Chaves', 'Claves'],
  Compare: ['Comparar', 'Comparar'],
  Batch: ['Análise em lote', 'Análisis por lotes'],
  Sanitize: ['Ocultar valores', 'Ocultar valores'],
  Reports: ['Relatórios', 'Informes'],
  Tools: ['Utilitários', 'Utilidades'],
  Claims: ['Claims', 'Claims'],
  Encode: ['Criar', 'Crear'],
  'Paste Token': ['Colar token', 'Pegar token'],
  'Load Example': ['Carregar exemplo', 'Cargar ejemplo'],
  'Clear Workspace': ['Limpar tudo', 'Borrar todo'],
  'Not evaluated': ['Não avaliada', 'Sin evaluar'],
  'Values hidden': ['Valores ocultos', 'Valores ocultos'],
  'Sensitive processing stays local': [
    'Processamento sensível no navegador',
    'Procesamiento sensible en el navegador',
  ],
  'Input too large for interactive analysis (1 MiB limit).': [
    'Entrada muito grande. O limite é 1 MiB; cole um token menor.',
    'Entrada demasiado grande. El límite es 1 MiB; pega un token más pequeño.',
  ],
  'Clipboard access unavailable. Use Ctrl+V or ⌘V in the JWT field.': [
    'Não foi possível ler a área de transferência. Use Ctrl+V ou ⌘V no campo do token.',
    'No se pudo leer el portapapeles. Usa Ctrl+V o ⌘V en el campo del token.',
  ],
  Copy: ['Copiar', 'Copiar'],
  Copied: ['Copiado', 'Copiado'],
  'Copy unavailable; select text manually.': [
    'Não foi possível copiar; selecione o texto manualmente.',
    'No se pudo copiar; selecciona el texto manualmente.',
  ],
  'Local JWT & JOSE Security Workbench': [
    'Análise local de JWT e JOSE',
    'Análisis local de JWT y JOSE',
  ],
  'Built by': ['Criado por', 'Creado por'],
  Documentation: ['Documentação', 'Documentación'],
  Privacy: ['Privacidade', 'Privacidad'],
  About: ['Sobre', 'Acerca de'],
  'MIT License': ['Licença MIT', 'Licencia MIT'],
  'JWTs and cryptographic material are processed locally.': [
    'Tokens e chaves são processados localmente.',
    'Los tokens y las claves se procesan localmente.',
  ],
  'Wrap lines': ['Quebrar linhas', 'Ajustar líneas'],
  'Interactive view limited to 500 nodes. Raw JSON and Claims search retain the full input.':
    [
      'A árvore exibe até 500 nós. O JSON original e a busca de claims mantêm a entrada completa.',
      'El árbol muestra hasta 500 nodos. El JSON original y la búsqueda de claims conservan la entrada completa.',
    ],
  Decoded: ['Decodificado', 'Decodificado'],
  Raw: ['Original', 'Original'],
  Segments: ['Segmentos', 'Segmentos'],
  'Decoding is not verification. The signature status is shown separately.': [
    'Você está lendo os dados do token. Isso ainda não confirma quem o assinou. Use Verificar assinatura com uma chave de confiança.',
    'Estás leyendo los datos del token. Esto aún no confirma quién lo firmó. Usa Verificar firma con una clave de confianza.',
  ],
  'Inspect nested token': ['Abrir token interno', 'Abrir token interno'],
  Segment: ['Segmento', 'Segmento'],
  'encoded characters ·': [
    'caracteres codificados ·',
    'caracteres codificados ·',
  ],
  'decoded bytes': ['bytes decodificados', 'bytes decodificados'],
  'Hex · first 256 bytes': [
    'Hex · primeiros 256 bytes',
    'Hex · primeros 256 bytes',
  ],
  Header: ['Header', 'Header'],
  Payload: ['Payload', 'Payload'],
  'segment characters ·': [
    'caracteres no segmento ·',
    'caracteres en el segmento ·',
  ],
  'Header definitions': [
    'O que significa cada campo',
    'Qué significa cada campo',
  ],
  'Encrypted content': ['Conteúdo criptografado', 'Contenido cifrado'],
  'Inspected only. Ciphertext is not decoded as JSON. Decryption is not implemented.':
    [
      'Somente inspeção. O conteúdo está criptografado; esta versão não o descriptografa.',
      'Solo inspección. El contenido está cifrado; esta versión no lo descifra.',
    ],
  'Signature hex · first 256 bytes': [
    'Assinatura em hex · primeiros 256 bytes',
    'Firma en hex · primeros 256 bytes',
  ],
  'Signature Verification': ['Verificar a assinatura', 'Verificar la firma'],
  'Choose the expected algorithm independently. Token-provided keys and URLs are never trusted automatically.':
    [
      'Informe o algoritmo e a chave fornecidos por uma fonte de confiança, como a documentação do emissor. Não escolha apenas com base no que o token declara.',
      'Introduce el algoritmo y la clave de una fuente de confianza, como la documentación del emisor. No los elijas solo por lo que declara el token.',
    ],
  'Expected algorithm': ['Algoritmo esperado', 'Algoritmo esperado'],
  'Algorithm reference —': [
    'Referência do algoritmo —',
    'Referencia del algoritmo —',
  ],
  'JOSE algorithm requirements': [
    'Requisitos dos algoritmos JOSE',
    'Requisitos de los algoritmos JOSE',
  ],
  'Key input type': ['Tipo de chave', 'Tipo de clave'],
  'HMAC secret (UTF-8)': ['Segredo HMAC (UTF-8)', 'Secreto HMAC (UTF-8)'],
  'Public PEM / JWK / JWKS': [
    'Chave pública PEM / JWK / JWKS',
    'Clave pública PEM / JWK / JWKS',
  ],
  'HMAC secret': ['Segredo HMAC', 'Secreto HMAC'],
  'Verification key': ['Chave de verificação', 'Clave de verificación'],
  Hide: ['Ocultar', 'Ocultar'],
  Show: ['Mostrar', 'Mostrar'],
  secret: ['segredo', 'secreto'],
  'Verifying locally…': [
    'Verificando no navegador…',
    'Verificando en el navegador…',
  ],
  'Verify signature': ['Verificar assinatura', 'Verificar firma'],
  'Length is not a measurement of entropy.': [
    'O tamanho não mede a imprevisibilidade do segredo.',
    'El tamaño no mide la imprevisibilidad del secreto.',
  ],
  'NOT VERIFIED': ['NÃO VERIFICADA', 'SIN VERIFICAR'],
  'SIGNATURE VALID': ['ASSINATURA VÁLIDA', 'FIRMA VÁLIDA'],
  'SIGNATURE INVALID': ['ASSINATURA INVÁLIDA', 'FIRMA INVÁLIDA'],
  UNSUPPORTED: ['NÃO SUPORTADO', 'NO COMPATIBLE'],
  'KEY INVALID': ['CHAVE INVÁLIDA', 'CLAVE INVÁLIDA'],
  'KEY TYPE MISMATCH': [
    'TIPO DE CHAVE INCOMPATÍVEL',
    'TIPO DE CLAVE INCOMPATIBLE',
  ],
  Standard: ['Padrão', 'Estándar'],
  Custom: ['Personalizadas', 'Personalizados'],
  Temporal: ['Tempo', 'Tiempo'],
  'Possible PII': ['Possíveis dados pessoais', 'Posibles datos personales'],
  All: ['Todas', 'Todos'],
  Claim: ['Claim', 'Claim'],
  'is absent from this payload.': [
    'não está presente neste conteúdo.',
    'no está presente en este contenido.',
  ],
  Local: ['Local', 'Local'],
  'Relative to analysis time': [
    'Em relação ao horário da análise',
    'Respecto a la hora del análisis',
  ],
  seconds: ['segundos', 'segundos'],
  'Temporal status only': ['Somente estado temporal', 'Solo estado temporal'],
  'Items:': ['Itens:', 'Elementos:'],
  'Show in Decoder': ['Ver no decodificador', 'Ver en el decodificador'],
  'Related Security Findings': [
    'Ver alertas relacionados',
    'Ver alertas relacionados',
  ],
  Reference: ['Referência', 'Referencia'],
  'No claims match the current search and filters.': [
    'Nenhuma claim corresponde à busca e aos filtros.',
    'Ningún claim coincide con la búsqueda y los filtros.',
  ],
  'Claim / path / type': ['Claim / caminho / tipo', 'Claim / ruta / tipo'],
  'Current value': ['Valor atual', 'Valor actual'],
  Category: ['Categoria', 'Categoría'],
  Previous: ['Anterior', 'Anterior'],
  Page: ['Página', 'Página'],
  'matching claims': ['claims encontradas', 'claims encontrados'],
  Next: ['Próxima', 'Siguiente'],
  'Security Auditor': ['Alertas do token', 'Alertas del token'],
  'Privacy exposure score': ['Privacidade do token', 'Privacidad del token'],
  'Observable properties only, not the security of the issuing application. Unverified signatures are not counted as failed.':
    [
      'Os alertas se referem ao token, não à segurança de todo o sistema. Assinaturas ainda não verificadas não são consideradas inválidas.',
      'Las alertas se refieren al token, no a la seguridad de todo el sistema. Las firmas sin verificar no se consideran inválidas.',
    ],
  'Score calculation': [
    'Como o índice é calculado',
    'Cómo se calcula el índice',
  ],
  Severity: ['Gravidade', 'Gravedad'],
  'All severities': ['Todas as gravidades', 'Todas las gravedades'],
  'Related to': ['Relacionado a', 'Relacionado con'],
  'Show all findings': [
    'Mostrar todos os alertas',
    'Mostrar todas las alertas',
  ],
  'matching findings': ['alertas encontrados', 'alertas encontradas'],
  'View claim': ['Ver claim', 'Ver claim'],
  'What to check:': ['O que verificar:', 'Qué verificar:'],
  'Confidence:': ['Confiança:', 'Confianza:'],
  'Technical reference': ['Referência técnica', 'Referencia técnica'],
  'Show more findings': ['Mostrar mais alertas', 'Mostrar más alertas'],
  'No findings from the implemented checks. This is not a security guarantee.':
    [
      'As verificações disponíveis não encontraram alertas. Isso não garante a segurança do token.',
      'Las comprobaciones disponibles no encontraron alertas. Esto no garantiza la seguridad del token.',
    ],
  High: ['Alta', 'Alta'],
  Medium: ['Média', 'Media'],
  Low: ['Baixa', 'Baja'],
  Info: ['Informação', 'Información'],
  Pass: ['Aprovado', 'Aprobado'],
  'Batch Analyzer': ['Análise em lote', 'Análisis por lotes'],
  'Batch input': ['Tokens para análise', 'Tokens para analizar'],
  'Analyze batch': ['Analisar lote', 'Analizar lote'],
  'Build and sign JWTs locally. Token Builder is intended for development and testing.':
    [
      'Crie e assine JWTs no navegador para desenvolvimento e testes.',
      'Crea y firma JWT en el navegador para desarrollo y pruebas.',
    ],
  'Header JSON': ['Header (JSON)', 'Header (JSON)'],
  'Payload JSON': ['Payload (JSON)', 'Payload (JSON)'],
  'Add Claim': ['Adicionar claim', 'Añadir claim'],
  'Signing configuration': [
    'Configuração da assinatura',
    'Configuración de firma',
  ],
  'Signing algorithm': ['Algoritmo da assinatura', 'Algoritmo de firma'],
  'Generate signed JWT': ['Gerar JWT assinado', 'Generar JWT firmado'],
  'Advanced / Unsafe Examples': [
    'Avançado / exemplos inseguros',
    'Avanzado / ejemplos inseguros',
  ],
  'Generated JWT': ['JWT gerado', 'JWT generado'],
  'Open in Decoder': ['Abrir no decodificador', 'Abrir en el decodificador'],
  'Verify generated JWT': ['Verificar JWT gerado', 'Verificar JWT generado'],
  'Clear output and key': [
    'Limpar resultado e chave',
    'Borrar resultado y clave',
  ],
  'Key Workbench': ['Inspecionar chaves', 'Inspeccionar claves'],
  'Import local file': ['Abrir arquivo local', 'Abrir archivo local'],
  'PEM algorithm': ['Algoritmo PEM', 'Algoritmo PEM'],
  'Policy Studio': ['Avaliar uma política', 'Evaluar una política'],
  Preset: ['Modelo', 'Plantilla'],
  'Policy JSON': ['Política JSON', 'Política JSON'],
  'Evaluate policy': ['Avaliar política', 'Evaluar política'],
  Rule: ['Regra', 'Regla'],
  Result: ['Resultado', 'Resultado'],
  Meaning: ['Significado', 'Significado'],
  'Supported fields': ['Campos aceitos', 'Campos admitidos'],
  'Safe report': ['Exportar relatório', 'Exportar informe'],
  'Download preview': ['Baixar prévia', 'Descargar vista previa'],
  'Safe Share View': ['Preparar para compartilhar', 'Preparar para compartir'],
  'Redaction profile': ['Perfil de ocultação', 'Perfil de ocultación'],
  'Original / sanitized diff': [
    'Original / valores ocultados',
    'Original / valores ocultos',
  ],
  'Timeline / Time Simulator': [
    'Datas e simulação de tempo',
    'Fechas y simulación de tiempo',
  ],
  'Simulation offset:': ['Deslocamento simulado:', 'Desplazamiento simulado:'],
  'Analysis time (Unix seconds)': [
    'Horário da análise (segundos Unix)',
    'Hora del análisis (segundos Unix)',
  ],
  'Clock skew': ['Tolerância de relógio', 'Tolerancia de reloj'],
  'Reset to current time': [
    'Voltar ao horário atual',
    'Volver a la hora actual',
  ],
  Lifetime: ['Duração', 'Duración'],
  Remaining: ['Tempo restante', 'Tiempo restante'],
  'Invalid dates': ['Datas inválidas', 'Fechas inválidas'],
  'Local developer tools': ['Utilitários locais', 'Utilidades locales'],
  Input: ['Entrada', 'Entrada'],
  'Base64URL encode': ['Codificar Base64URL', 'Codificar Base64URL'],
  'Base64URL decode': ['Decodificar Base64URL', 'Decodificar Base64URL'],
  'Current token utilities': [
    'Utilitários do token atual',
    'Utilidades del token actual',
  ],
  'Compute token SHA-256 fingerprint': [
    'Calcular fingerprint SHA-256',
    'Calcular fingerprint SHA-256',
  ],
  'Inspect a token, one step at a time': [
    'Entenda seu token, passo a passo',
    'Entiende tu token, paso a paso',
  ],
  'A JWT is a compact text used by applications to carry information. Paste one to read its contents, or start with a made-up example.':
    [
      'Um JWT é um texto compacto usado por aplicações para transportar informações. Cole um token para ler o conteúdo ou comece com um exemplo fictício.',
      'Un JWT es un texto compacto usado por aplicaciones para transportar información. Pega uno para leer su contenido o empieza con un ejemplo ficticio.',
    ],
  'Try an example': ['Experimentar com um exemplo', 'Probar un ejemplo'],
  'How to use': ['Como usar', 'Cómo usar'],
  'Read the contents': ['Leia o conteúdo', 'Lee el contenido'],
  'The header describes the format. The payload contains fields called claims, such as who issued the token and when it expires.':
    [
      'O Header descreve o formato. O Payload contém os dados, em campos chamados claims, como quem emitiu o token e quando ele expira.',
      'El Header describe el formato. El Payload contiene los datos, en campos llamados claims, como quién emitió el token y cuándo caduca.',
    ],
  'Understand the warnings': ['Entenda os alertas', 'Entiende las alertas'],
  'Warnings are clues to investigate, not a verdict on the application. The sample is deliberately unsigned, so a warning is expected.':
    [
      'Os alertas são pontos para investigar, não um veredito sobre a aplicação. O exemplo não tem assinatura de propósito, por isso um aviso é esperado.',
      'Las alertas son puntos para investigar, no un veredicto sobre la aplicación. El ejemplo no lleva firma a propósito, por lo que se espera un aviso.',
    ],
  'Check the signature': ['Confira a assinatura', 'Comprueba la firma'],
  'To check who signed a token, you need the expected algorithm and a trusted key. Reading the contents alone cannot confirm authenticity.':
    [
      'Para conferir quem assinou um token, você precisa do algoritmo esperado e de uma chave de confiança. Ler o conteúdo não confirma a autenticidade.',
      'Para comprobar quién firmó un token, necesitas el algoritmo esperado y una clave de confianza. Leer el contenido no confirma la autenticidad.',
    ],
  'Everything is processed in this browser. Use a sample if you are just exploring.':
    [
      'Tudo é processado neste navegador. Use um exemplo se você só quer conhecer a ferramenta.',
      'Todo se procesa en este navegador. Usa un ejemplo si solo quieres conocer la herramienta.',
    ],
  'Demo token: unsigned on purpose. Explore its contents; security warnings are expected.':
    [
      'Token de exemplo: sem assinatura de propósito. Explore o conteúdo; os alertas são esperados.',
      'Token de ejemplo: sin firma a propósito. Explora el contenido; las alertas son esperadas.',
    ],
  'Only the first 100 header fields are shown here. The original JSON above remains complete.':
    [
      'Esta lista mostra os primeiros 100 campos. O JSON original acima permanece completo.',
      'Esta lista muestra los primeros 100 campos. El JSON original de arriba sigue completo.',
    ],
  'No key? You can still read the token and review its dates. Do not use an unknown key just to get a valid result.':
    [
      'Não tem a chave? Você ainda pode ler o token e conferir as datas. Não use uma chave desconhecida só para obter um resultado válido.',
      '¿No tienes la clave? Aún puedes leer el token y revisar las fechas. No uses una clave desconocida solo para obtener un resultado válido.',
    ],
  '← Open workbench': ['← Abrir ferramenta', '← Abrir herramienta'],
  'Find in visible JSON': [
    'Buscar no JSON visível',
    'Buscar en el JSON visible',
  ],
  'JSON payload viewer': [
    'Visualizador do conteúdo JSON',
    'Visor del contenido JSON',
  ],
  'Search claims': ['Buscar claims', 'Buscar claims'],
  'Search names, paths, values or categories': [
    'Buscar nomes, caminhos, valores ou categorias',
    'Buscar nombres, rutas, valores o categorías',
  ],
  'Claim category': ['Categoria da claim', 'Categoría del claim'],
  'Claim sorting': ['Ordenar claims', 'Ordenar claims'],
  'Selected claim': ['Claim selecionada', 'Claim seleccionado'],
  'Claims table': ['Tabela de claims', 'Tabla de claims'],
  'Copy item': ['Copiar item', 'Copiar elemento'],
  'Copy Path': ['Copiar caminho', 'Copiar ruta'],
  'Copy JSON Pointer': ['Copiar JSON Pointer', 'Copiar JSON Pointer'],
  'Copy Value': ['Copiar valor', 'Copiar valor'],
  Path: ['Caminho', 'Ruta'],
  Value: ['Valor', 'Valor'],
  'Collapse all': ['Recolher tudo', 'Contraer todo'],
  'Expand all': ['Expandir tudo', 'Expandir todo'],
  'Showing the first 100 items. Copy Value retains the full claim; use Claims search to inspect other items.':
    [
      'Exibindo os primeiros 100 itens. Copiar valor mantém a claim completa; use a busca para encontrar outros itens.',
      'Se muestran los primeros 100 elementos. Copiar valor conserva el claim completo; usa la búsqueda para encontrar otros elementos.',
    ],
  'Compare · current token A vs token B': [
    'Comparar o token atual (A) com outro (B)',
    'Comparar el token actual (A) con otro (B)',
  ],
  'Token B': ['Token B', 'Token B'],
  'changed fields. Value previews are limited to 2500 characters.': [
    'campos alterados. As prévias mostram até 2.500 caracteres.',
    'campos cambiados. Las vistas previas muestran hasta 2500 caracteres.',
  ],
  'Path / change': ['Caminho / alteração', 'Ruta / cambio'],
  'Semantic change': ['Alteração semântica', 'Cambio semántico'],
  'Added:': ['Adicionado:', 'Añadido:'],
  'Removed:': ['Removido:', 'Eliminado:'],
  'Show more differences': [
    'Mostrar mais diferenças',
    'Mostrar más diferencias',
  ],
  'No differences in compared fields.': [
    'Nenhuma diferença nos campos comparados.',
    'No hay diferencias en los campos comparados.',
  ],
  'Up to 50 tokens, one per line; 1 MiB total. Rows use indexes instead of raw tokens. Results are not persisted.':
    [
      'Até 50 tokens, um por linha, com limite total de 1 MiB. As linhas mostram índices em vez de tokens. Os resultados não são salvos.',
      'Hasta 50 tokens, uno por línea, con un límite total de 1 MiB. Las filas muestran índices en lugar de tokens. Los resultados no se guardan.',
    ],
  'iat: Now': ['iat: agora', 'iat: ahora'],
  'nbf: Now': ['nbf: agora', 'nbf: ahora'],
  'Custom expiration offset (seconds)': [
    'Expiração personalizada (segundos)',
    'Caducidad personalizada (segundos)',
  ],
  'Set custom exp': ['Definir expiração', 'Definir caducidad'],
  'Development secret warning:': [
    'Aviso sobre o segredo de desenvolvimento:',
    'Aviso sobre el secreto de desarrollo:',
  ],
  'Unsecured JWTs have no signature. Use only as explicit development fixtures.':
    [
      'JWTs sem proteção não têm assinatura. Use somente como exemplos de desenvolvimento.',
      'Los JWT sin protección no tienen firma. Úsalos solo como ejemplos de desarrollo.',
    ],
  'Set alg:none': ['Definir alg:none', 'Definir alg:none'],
  'Generate unsecured JWT': [
    'Gerar JWT sem assinatura',
    'Generar JWT sin firma',
  ],
  'Local metadata only. A thumbprint does not establish trust. Private and symmetric keys remain sensitive.':
    [
      'Somente metadados locais. Uma impressão digital não comprova confiança. Chaves privadas e simétricas continuam sendo sensíveis.',
      'Solo metadatos locales. Una huella no demuestra confianza. Las claves privadas y simétricas siguen siendo sensibles.',
    ],
  'Paste a public PEM, JWK or JWKS to inspect key metadata.': [
    'Cole uma chave pública PEM, JWK ou JWKS para examinar seus metadados.',
    'Pega una clave pública PEM, JWK o JWKS para examinar sus metadatos.',
  ],
  'Current token kid:': ['kid do token atual:', 'kid del token actual:'],
  'kid / type': ['kid / tipo', 'kid / tipo'],
  'Algorithm / use': ['Algoritmo / uso', 'Algoritmo / uso'],
  'Size / curve': ['Tamanho / curva', 'Tamaño / curva'],
  'SHA-256 thumbprint': ['Thumbprint SHA-256', 'Thumbprint SHA-256'],
  'Below 2048-bit RSA minimum': [
    'Abaixo do mínimo RSA de 2.048 bits',
    'Por debajo del mínimo RSA de 2048 bits',
  ],
  'Starting points only. Organizational rules are separate from the Security Auditor.':
    [
      'Os modelos são pontos de partida. As regras da sua organização são avaliadas separadamente dos alertas do token.',
      'Las plantillas son puntos de partida. Las reglas de tu organización se evalúan por separado de las alertas del token.',
    ],
  'Scopes/roles are top-level lists. Forbidden claim names are checked recursively. Policies are kept only in memory.':
    [
      'Scopes e roles são listas do nível principal. Nomes de claims proibidos são verificados também nos níveis internos. Políticas ficam apenas na memória.',
      'Scopes y roles son listas del nivel principal. Los nombres de claims prohibidos también se comprueban en niveles internos. Las políticas quedan solo en memoria.',
    ],
  'Review the exact export below. Values, evidence, token, keys and signature bytes are excluded. Claim names and timestamps may identify a user or system; include them only deliberately.':
    [
      'Revise a prévia abaixo. Valores, evidências, token, chaves e bytes da assinatura são excluídos. Nomes de claims e horários podem identificar pessoas ou sistemas; inclua-os apenas se necessário.',
      'Revisa la vista previa. Se excluyen valores, evidencias, token, claves y bytes de firma. Los nombres de claims y las fechas pueden identificar personas o sistemas; inclúyelos solo si es necesario.',
    ],
  'Sanitized representation — not a valid JWT. Review before sharing: heuristic redaction can miss sensitive data.':
    [
      'Representação com valores ocultados; não é um JWT válido. Revise antes de compartilhar: a detecção automática pode deixar dados sensíveis visíveis.',
      'Representación con valores ocultos; no es un JWT válido. Revisa antes de compartir: la detección automática puede dejar datos sensibles visibles.',
    ],
  'Each axis starts at 100. High −20, Medium −10, Low −3; Info/Pass 0. Minimum 0. Privacy findings affect only privacy.':
    [
      'Cada índice começa em 100. Alta −20, média −10, baixa −3; informação/aprovado 0. Mínimo 0. Alertas de privacidade afetam apenas esse índice.',
      'Cada índice empieza en 100. Alta −20, media −10, baja −3; información/aprobado 0. Mínimo 0. Las alertas de privacidad afectan solo a ese índice.',
    ],
  '— temporal checks only; this does not verify authenticity.': [
    '— somente verificações de tempo; isso não confirma a autenticidade.',
    '— solo comprobaciones de tiempo; esto no confirma la autenticidad.',
  ],
  'Do not share production tokens. Copying is an explicit local action.': [
    'Não compartilhe tokens de produção. Copiar é uma ação local explícita.',
    'No compartas tokens de producción. Copiar es una acción local explícita.',
  ],
  'Authorization header: ~': [
    'Cabeçalho Authorization: ~',
    'Cabecera Authorization: ~',
  ],
  'bytes. Cookie value: ~': [
    'bytes. Valor do cookie: ~',
    'bytes. Valor de cookie: ~',
  ],
  'bytes, excluding attributes. Actual limits depend on your infrastructure.': [
    'bytes, sem atributos. Os limites reais dependem da sua infraestrutura.',
    'bytes, sin atributos. Los límites reales dependen de tu infraestructura.',
  ],
  'Certificate bytes are available in the header. Certificate subject/issuer parsing and chain validation are not included.':
    [
      'Os bytes do certificado estão no cabeçalho. Esta versão não interpreta o titular ou emissor nem valida a cadeia de certificados.',
      'Los bytes del certificado están en la cabecera. Esta versión no interpreta el titular o emisor ni valida la cadena de certificados.',
    ],
  'We could not read this token. Check that you pasted the complete token, without quotation marks.':
    [
      'Não foi possível ler este token. Confira se você colou o texto completo, sem aspas.',
      'No se pudo leer este token. Comprueba que pegaste el texto completo, sin comillas.',
    ],
  'Technical details': ['Detalhes técnicos', 'Detalles técnicos'],
  'About GuardJWT': ['Sobre o GuardJWT', 'Acerca de GuardJWT'],
  Project: ['Projeto', 'Proyecto'],
  'View source on GitHub': ['Ver código no GitHub', 'Ver código en GitHub'],
  'Security model': ['Modelo de segurança', 'Modelo de seguridad'],
  'Limits of analysis': ['Limites da análise', 'Límites del análisis'],
  'Responsible disclosure': [
    'Comunicação responsável',
    'Divulgación responsable',
  ],
  'Read SECURITY.md': ['Ler SECURITY.md', 'Leer SECURITY.md'],
  'Inspect and verify': ['Inspecionar e verificar', 'Inspeccionar y verificar'],
  'Supported algorithms': ['Algoritmos aceitos', 'Algoritmos admitidos'],
  'Limits and precision': ['Limites e precisão', 'Límites y precisión'],
  'Privacy and sharing': [
    'Privacidade e compartilhamento',
    'Privacidad y uso compartido',
  ],
  'Keyboard shortcuts': ['Atalhos de teclado', 'Atajos de teclado'],
  'Open command palette': [
    'Abrir paleta de comandos',
    'Abrir paleta de comandos',
  ],
  'Analyze current token and open Decoder': [
    'Analisar token atual e abrir decodificador',
    'Analizar token actual y abrir decodificador',
  ],
  'Close command palette': [
    'Fechar paleta de comandos',
    'Cerrar paleta de comandos',
  ],
  'Arrow keys / Home / End': ['Setas / Home / End', 'Flechas / Inicio / Fin'],
  'Move between desktop tabs': [
    'Navegar entre abas no desktop',
    'Navegar entre pestañas en escritorio',
  ],
  Offline: ['Sem conexão', 'Sin conexión'],
  'Analysis context': ['Contexto da análise', 'Contexto del análisis'],
  'Technical references': ['Referências técnicas', 'Referencias técnicas'],
  'Page not found': ['Página não encontrada', 'Página no encontrada'],
  'Return to the': ['Volte para a', 'Vuelve al'],
  workbench: ['ferramenta', 'área de trabajo'],
  'or open the': ['ou abra a', ' o abre la'],
  documentation: ['documentação', 'documentación'],
  'Local processing': ['Processamento local', 'Procesamiento local'],
  'Network boundary': ['Limite de rede', 'Límite de red'],
  'Offline assets': ['Arquivos offline', 'Archivos sin conexión'],
  'Optional public content': [
    'Conteúdo público opcional',
    'Contenido público opcional',
  ],
  'Clearing your workspace': ['Limpando seus dados', 'Borrar tus datos'],
  'JWTs and cryptographic material are not sent to GuardJWT for remote processing.':
    [
      'Tokens e chaves não são enviados ao GuardJWT para processamento remoto.',
      'Los tokens y las claves no se envían a GuardJWT para procesamiento remoto.',
    ],
  'Original order': ['Ordem original', 'Orden original'],
  Alphabetical: ['Ordem alfabética', 'Orden alfabético'],
  Risk: ['Risco', 'Riesgo'],
  Authorization: ['Autorização', 'Autorización'],
  Identity: ['Identidade', 'Identidad'],
  'Issuer / Audience': ['Emissor / destinatários', 'Emisor / destinatarios'],
  Session: ['Sessão', 'Sesión'],
  Confirmation: ['Confirmação', 'Confirmación'],
  PII: ['Dados pessoais', 'Datos personales'],
  'duplicate properties;': [
    'propriedades duplicadas;',
    'propiedades duplicadas;',
  ],
  'large integers;': ['inteiros grandes;', 'enteros grandes;'],
  'decimal precision warnings. Raw JSON preserves original spelling. Formatted claims use the last duplicate value; decimal precision warnings mean raw JSON is authoritative.':
    [
      'avisos de precisão decimal. O JSON original mantém a escrita exata. A visualização formatada usa o último valor de campos duplicados. Em caso de perda de precisão, consulte o JSON original.',
      'avisos de precisión decimal. El JSON original conserva la escritura exacta. La vista formateada usa el último valor de campos duplicados. Si se pierde precisión, consulta el JSON original.',
    ],
  'segments ·': ['segmentos ·', 'segmentos ·'],
  'Base64URL characters ·': [
    'caracteres Base64URL ·',
    'caracteres Base64URL ·',
  ],
  'GuardJWT is an independent open-source JWT & JOSE security workbench, designed for developers, AppSec and security professionals.':
    [
      'O GuardJWT é uma ferramenta independente de código aberto para analisar JWT e JOSE, criada para desenvolvimento e segurança de aplicações.',
      'GuardJWT es una herramienta independiente de código abierto para analizar JWT y JOSE, creada para desarrollo y seguridad de aplicaciones.',
    ],
  'Sensitive JWT processing happens locally in your browser. The workbench helps inspect structure, verify signatures with supplied keys and investigate observable token properties.':
    [
      'Os dados sensíveis são processados no seu navegador. A ferramenta permite inspecionar a estrutura, verificar assinaturas com chaves fornecidas e investigar propriedades visíveis do token.',
      'Los datos sensibles se procesan en tu navegador. La herramienta permite inspeccionar la estructura, verificar firmas con claves proporcionadas e investigar propiedades visibles del token.',
    ],
  '. Distributed under the': ['. Distribuído sob a', '. Distribuido bajo la'],
  'Tokens and keys are untrusted input. Parsing, auditing and cryptographic operations run locally. Token URLs and embedded keys are never fetched or trusted automatically. Verification requires an independently selected algorithm and supplied key.':
    [
      'Tokens e chaves são tratados como dados não confiáveis. Análise e criptografia são locais. URLs do token nunca são acessadas automaticamente, e chaves embutidas não recebem confiança automática. Para verificar, escolha o algoritmo e forneça uma chave de confiança.',
      'Los tokens y las claves se tratan como datos no confiables. El análisis y la criptografía son locales. Las URL del token nunca se consultan automáticamente, y las claves incluidas no reciben confianza automática. Para verificar, elige el algoritmo y proporciona una clave de confianza.',
    ],
  'GuardJWT findings analyze observable token properties and do not constitute a complete assessment of the issuing/verifying system. Signature validity does not establish issuer trust, authorization, revocation or replay protection.':
    [
      'Os alertas analisam propriedades visíveis do token; não são uma avaliação completa do sistema que o emite ou verifica. Uma assinatura válida não comprova confiança no emissor, autorização, revogação ou proteção contra reutilização.',
      'Las alertas analizan propiedades visibles del token; no son una evaluación completa del sistema que lo emite o verifica. Una firma válida no demuestra confianza en el emisor, autorización, revocación o protección contra reutilización.',
    ],
  'JWE is inspected only. JWE decryption, full X.509 validation and detached JWS verification are not included. Heuristic PII detection and sanitization can miss sensitive information.':
    [
      'JWE permite apenas inspeção. Não estão incluídas descriptografia JWE, validação completa X.509 ou verificação de JWS com conteúdo separado. A detecção e a ocultação de dados pessoais podem deixar informações sensíveis passar.',
      'JWE solo permite inspección. No se incluyen descifrado JWE, validación completa X.509 ni verificación de JWS con contenido separado. La detección y ocultación de datos personales pueden omitir información sensible.',
    ],
  'Use synthetic reproductions. A private disclosure channel has not yet been configured; request a private channel from the maintainer before sharing sensitive details. Do not put real tokens or keys in public issues.':
    [
      'Use exemplos fictícios para reproduzir falhas. Ainda não há canal privado configurado; solicite um ao mantenedor antes de compartilhar detalhes sensíveis. Não publique tokens ou chaves reais em issues.',
      'Usa ejemplos ficticios para reproducir fallos. Todavía no hay un canal privado configurado; solicita uno al mantenedor antes de compartir detalles sensibles. No publiques tokens o claves reales en issues.',
    ],
  'Paste a token into Decoder. Click a JSON property to open Claims Breakdown, then follow related Security findings. Verify uses your independently chosen algorithm and trusted key.':
    [
      'Cole um token em Decodificar. Clique em uma propriedade JSON para abrir os dados do token e consultar os alertas relacionados. Verificar assinatura usa o algoritmo escolhido por você e uma chave de confiança.',
      'Pega un token en Decodificar. Haz clic en una propiedad JSON para abrir los datos del token y consultar las alertas relacionadas. Verificar firma usa el algoritmo que elegiste y una clave de confianza.',
    ],
  'Edit header and payload JSON, add claims or expiration helpers, then supply signing material. Open the generated JWT in Decoder or Verify. Keys remain in the signing panel and are discarded when it closes.':
    [
      'Edite o header e o payload em JSON, adicione claims ou uma data de expiração e forneça a chave de assinatura. Abra o JWT gerado no decodificador ou verificador. As chaves ficam no painel de assinatura e são descartadas quando ele fecha.',
      'Edita el header y el payload en JSON, añade claims o una fecha de caducidad y proporciona la clave de firma. Abre el JWT generado en el decodificador o verificador. Las claves quedan en el panel de firma y se descartan cuando se cierra.',
    ],
  'HS256/384/512, RS256/384/512, PS256/384/512, ES256/384/512 and EdDSA/Ed25519, subject to browser Web Crypto support. Verification accepts public SPKI PEM or JWK/JWKS. Signing accepts PKCS8 private PEM or JWK and UTF-8 HMAC secrets.':
    [
      'HS256/384/512, RS256/384/512, PS256/384/512, ES256/384/512 e EdDSA/Ed25519, conforme o suporte Web Crypto do navegador. A verificação aceita PEM público SPKI ou JWK/JWKS. A assinatura aceita PEM privado PKCS8 ou JWK e segredos HMAC UTF-8.',
      'HS256/384/512, RS256/384/512, PS256/384/512, ES256/384/512 y EdDSA/Ed25519, según el soporte Web Crypto del navegador. La verificación acepta PEM público SPKI o JWK/JWKS. La firma acepta PEM privado PKCS8 o JWK y secretos HMAC UTF-8.',
    ],
  '1 MiB input, 64 JSON levels, 50 tokens per batch and 100 keys per JWKS. Large integers are preserved; decimal precision issues and duplicate names are flagged. Raw JSON retains the original spelling. JWE inspection does not decrypt or validate authentication tags.':
    [
      'Entrada de 1 MiB, 64 níveis JSON, 50 tokens por lote e 100 chaves por JWKS. Inteiros grandes são preservados; problemas de precisão decimal e nomes duplicados geram avisos. O JSON original mantém a escrita exata. A inspeção JWE não descriptografa nem valida tags de autenticação.',
      'Entrada de 1 MiB, 64 niveles JSON, 50 tokens por lote y 100 claves por JWKS. Se conservan enteros grandes; los problemas de precisión decimal y nombres duplicados generan avisos. El JSON original conserva la escritura exacta. La inspección JWE no descifra ni valida etiquetas de autenticación.',
    ],
  'Privacy Mode removes sensitive values from view and closes key panels. Clear discards workspace state and pending results. Reports exclude raw tokens, values, keys and signature bytes by default. Review the preview before exporting. Clipboard history and saved downloads are outside the workbench.':
    [
      'Ocultar dados remove valores sensíveis da tela e fecha os painéis de chaves. Limpar tudo descarta o estado e os resultados pendentes. Relatórios excluem tokens originais, valores, chaves e bytes da assinatura por padrão. Revise a prévia antes de exportar. Histórico da área de transferência e downloads salvos ficam fora do controle da ferramenta.',
      'Ocultar datos quita los valores sensibles de la pantalla y cierra los paneles de claves. Borrar todo descarta el estado y los resultados pendientes. Los informes excluyen tokens originales, valores, claves y bytes de firma por defecto. Revisa la vista previa antes de exportar. El historial del portapapeles y las descargas guardadas quedan fuera del control de la herramienta.',
    ],
  'Production builds cache application files after the first successful online installation. Workspace data is never cached. Close old tabs to activate an installed update. Supabase is not connected.':
    [
      'A versão de produção armazena os arquivos da aplicação após a primeira instalação online. Os dados de trabalho nunca entram nesse cache. Feche abas antigas para ativar uma atualização instalada. O Supabase não está conectado.',
      'La versión de producción almacena los archivos de la aplicación tras la primera instalación en línea. Los datos de trabajo nunca entran en esa caché. Cierra las pestañas antiguas para activar una actualización instalada. Supabase no está conectado.',
    ],
  'GuardJWT analyzes observable JWT/JOSE properties. Some findings require server-side verification. Users are responsible for analyzing only tokens and cryptographic material they are authorized to access.':
    [
      'O GuardJWT analisa propriedades visíveis de JWT/JOSE. Alguns alertas exigem verificação no servidor. Analise apenas tokens e chaves que você tem autorização para acessar.',
      'GuardJWT analiza propiedades visibles de JWT/JOSE. Algunas alertas requieren comprobaciones en el servidor. Analiza solo tokens y claves a los que tienes autorización para acceder.',
    ],
  'Decoding, signing, signature verification, claim analysis, policies and reports run locally in page memory or local workers. Inputs are never written to localStorage, IndexedDB, cookies, URLs, analytics, or application logs.':
    [
      'Decodificação, assinatura, verificação, análise de claims, políticas e relatórios rodam na memória da página ou em workers locais. As entradas nunca são gravadas em localStorage, IndexedDB, cookies, URLs, ferramentas de análise de uso ou logs da aplicação.',
      'La decodificación, firma, verificación, análisis de claims, políticas e informes se ejecutan en la memoria de la página o en workers locales. Las entradas nunca se guardan en localStorage, IndexedDB, cookies, URL, herramientas de analítica ni registros de la aplicación.',
    ],
  'The browser loads application assets from the hosting server. No JWT content is sent. URLs inside tokens are rendered as text and are never fetched. There are no analytics, remote fonts, or session replay tools.':
    [
      'O navegador carrega os arquivos da aplicação do servidor de hospedagem. Nenhum conteúdo JWT é enviado. URLs dentro de tokens são exibidas como texto e nunca são acessadas. Não há análise de uso, fontes remotas ou gravação de sessões.',
      'El navegador carga los archivos de la aplicación desde el servidor de alojamiento. No se envía contenido JWT. Las URL dentro de tokens se muestran como texto y nunca se consultan. No hay analítica, fuentes remotas ni grabación de sesiones.',
    ],
  'Production builds cache only a fixed list of application assets. Tokens, keys, reports and policies are never stored in this cache. Offline use requires one successful installation over HTTPS or localhost. An update activates after existing application tabs close.':
    [
      'A produção mantém em cache somente uma lista fixa de arquivos da aplicação. Tokens, chaves, relatórios e políticas nunca entram nesse cache. O uso offline exige uma instalação bem-sucedida em HTTPS ou localhost. Uma atualização é ativada depois que as abas antigas são fechadas.',
      'La producción mantiene en caché solo una lista fija de archivos de la aplicación. Los tokens, claves, informes y políticas nunca entran en esa caché. El uso sin conexión requiere una instalación correcta en HTTPS o localhost. Una actualización se activa cuando se cierran las pestañas antiguas.',
    ],
  'A future milestone may load public policy presets, security references and release information from Supabase. Supabase is not connected in this release. Sensitive processing will remain independent of it.':
    [
      'Uma versão futura poderá carregar modelos públicos de políticas, referências de segurança e informações de versões pelo Supabase. Ele não está conectado nesta versão. O processamento sensível continuará independente dele.',
      'Una versión futura podría cargar plantillas públicas de políticas, referencias de seguridad e información de versiones desde Supabase. No está conectado en esta versión. El procesamiento sensible seguirá siendo independiente de él.',
    ],
  "Clear workspace removes input and decoded output from application state. Reloading or leaving the page also resets the workspace. JavaScript cannot guarantee forensic erasure of browser memory; browser extensions and clipboard history are outside the application's control.":
    [
      'Limpar tudo remove a entrada e o resultado decodificado do estado da aplicação. Recarregar ou sair da página também limpa os dados. JavaScript não garante apagamento forense da memória; extensões e histórico da área de transferência estão fora do controle da aplicação.',
      'Borrar todo elimina la entrada y el resultado decodificado del estado de la aplicación. Recargar o salir de la página también borra los datos. JavaScript no garantiza el borrado forense de la memoria; las extensiones y el historial del portapapeles están fuera del control de la aplicación.',
    ],
  'Inspect a structurally readable token first.': [
    'Primeiro, abra um token com estrutura legível no decodificador.',
    'Primero, abre un token con estructura legible en el decodificador.',
  ],
  'JWE inspection does not decrypt or verify authentication tags.': [
    'A inspeção JWE não descriptografa nem verifica tags de autenticação.',
    'La inspección JWE no descifra ni verifica etiquetas de autenticación.',
  ],
  'Declared algorithm differs from the independently selected algorithm.': [
    'O algoritmo declarado no token é diferente do algoritmo esperado que você selecionou.',
    'El algoritmo declarado en el token es distinto del algoritmo esperado que seleccionaste.',
  ],
  'Ambiguous duplicate JSON properties must be resolved before verification.': [
    'Resolva os campos JSON duplicados antes de verificar a assinatura.',
    'Resuelve los campos JSON duplicados antes de verificar la firma.',
  ],
  'Detached or empty payload verification is not supported.': [
    'A verificação de conteúdo separado ou vazio não é suportada.',
    'No se admite la verificación de contenido separado o vacío.',
  ],
  'Signature matches the supplied key and selected algorithm. Issuer trust, claims, authorization and key provenance are not established.':
    [
      'A assinatura corresponde à chave fornecida e ao algoritmo escolhido. Isso não comprova a confiança no emissor, os dados do token, a autorização ou a origem da chave.',
      'La firma coincide con la clave proporcionada y el algoritmo elegido. Esto no demuestra la confianza en el emisor, los datos del token, la autorización ni el origen de la clave.',
    ],
  'Signature does not match the supplied key.': [
    'A assinatura não corresponde à chave fornecida.',
    'La firma no coincide con la clave proporcionada.',
  ],
  'Algorithm or critical header extension is not supported by this runtime.': [
    'Este navegador não suporta o algoritmo ou uma extensão crítica do cabeçalho.',
    'Este navegador no admite el algoritmo o una extensión crítica de la cabecera.',
  ],
  'Unable to use the supplied key or JOSE parameters. Check format, curve, key size and operation permissions.':
    [
      'Não foi possível usar a chave ou os parâmetros JOSE. Confira o formato, a curva, o tamanho da chave e as permissões de operação.',
      'No se pudo usar la clave o los parámetros JOSE. Comprueba el formato, la curva, el tamaño de la clave y los permisos de operación.',
    ],
  Algorithm: ['Algoritmo', 'Algoritmo'],
  Issuer: ['Emissor', 'Emisor'],
  Audience: ['Destinatários', 'Destinatarios'],
  Status: ['Estado', 'Estado'],
  Hygiene: ['Higiene', 'Higiene'],
  'Pretty print': ['Formatar', 'Formatear'],
  Minify: ['Compactar', 'Compactar'],
  Validate: ['Validar', 'Validar'],
  algorithm: ['Algoritmo', 'Algoritmo'],
  claimNames: ['Nomes das claims', 'Nombres de claims'],
  temporal: ['Datas e horários', 'Fechas y horas'],
  findings: ['Alertas', 'Alertas'],
  policy: ['Política', 'Política'],
  signature: ['Assinatura', 'Firma'],
  pii: ['Categorias de dados pessoais', 'Categorías de datos personales'],
  'Project links': ['Links do projeto', 'Enlaces del proyecto'],
  'Inspect claim {pointer}': [
    'Explorar claim {pointer}',
    'Explorar claim {pointer}',
  ],
  'Basic JWT (unsigned)': [
    'JWT básico (sem assinatura)',
    'JWT básico (sin firma)',
  ],
  'Expired JWT': ['JWT expirado', 'JWT caducado'],
  'Missing exp': ['Sem expiração (exp)', 'Sin caducidad (exp)'],
  'Future nbf': [
    'Início de validade no futuro (nbf)',
    'Inicio de vigencia en el futuro (nbf)',
  ],
  'Nested claims': ['Claims aninhadas', 'Claims anidados'],
  'Unicode JWT': ['JWT com Unicode', 'JWT con Unicode'],
  'Large JWT': ['JWT grande', 'JWT grande'],
  'Duplicate claim': ['Claim duplicada', 'Claim duplicado'],
  'JWE example': ['Exemplo JWE', 'Ejemplo JWE'],
  'OAuth access-like': [
    'Exemplo semelhante a access token OAuth',
    'Ejemplo similar a un access token OAuth',
  ],
  'Embedded JWK': ['JWK incluída no token', 'JWK incluida en el token'],
  'jku header': ['Header com jku', 'Header con jku'],
  'crit header': ['Header com crit', 'Header con crit'],
  'Nested JWT': ['JWT interno', 'JWT interno'],
  'High Security API': [
    'API com requisitos rigorosos',
    'API con requisitos estrictos',
  ],
  'Internal Session': ['Sessão interna', 'Sesión interna'],
  'Machine-to-Machine': [
    'Entre serviços (Machine-to-Machine)',
    'Entre servicios (Machine-to-Machine)',
  ],
  'Use unambiguous header and payload JSON objects.': [
    'Use objetos JSON sem ambiguidade no header e no payload.',
    'Usa objetos JSON sin ambigüedad en el header y el payload.',
  ],
  'Builder does not support critical extensions.': [
    'O criador não suporta extensões críticas.',
    'El creador no admite extensiones críticas.',
  ],
  'Unsigned development tokens must explicitly declare alg: none.': [
    'Exemplos sem assinatura precisam declarar alg: none explicitamente.',
    'Los ejemplos sin firma deben declarar alg: none explícitamente.',
  ],
  'Header algorithm must equal the selected signing algorithm.': [
    'O alg do header deve ser igual ao algoritmo escolhido para assinar.',
    'El alg del header debe coincidir con el algoritmo elegido para firmar.',
  ],
  'Insecure HMAC secret. Use a sufficiently long random secret or explicitly allow an unsafe development example.':
    [
      'Segredo HMAC inseguro. Use um segredo aleatório com tamanho suficiente ou autorize explicitamente um exemplo inseguro de desenvolvimento.',
      'Secreto HMAC inseguro. Usa un secreto aleatorio suficientemente largo o autoriza explícitamente un ejemplo inseguro de desarrollo.',
    ],
  'Use unambiguous JSON objects; raw large integers are supported.': [
    'Use objetos JSON sem ambiguidade. Inteiros grandes são aceitos na forma original.',
    'Usa objetos JSON sin ambigüedad. Se admiten enteros grandes en su forma original.',
  ],
  'Header or payload JSON is incomplete or invalid.': [
    'O JSON do header ou do payload está incompleto ou inválido.',
    'El JSON del header o del payload está incompleto o no es válido.',
  ],
  'Build failed. Check JSON, algorithm and key permissions. Unsigned output requires alg: none.':
    [
      'Não foi possível gerar o token. Confira o JSON, o algoritmo e as permissões da chave. Para gerar sem assinatura, use alg: none.',
      'No se pudo generar el token. Revisa el JSON, el algoritmo y los permisos de la clave. Para generarlo sin firma, usa alg: none.',
    ],
  'Use an unambiguous payload object before adding a claim.': [
    'Corrija as ambiguidades do payload antes de adicionar uma claim.',
    'Corrige las ambigüedades del payload antes de añadir un claim.',
  ],
  'Header exceeds 64 KiB.': [
    'O header ultrapassa 64 KiB.',
    'El header supera 64 KiB.',
  ],
  'Payload exceeds 512 KiB.': [
    'O payload ultrapassa 512 KiB.',
    'El payload supera 512 KiB.',
  ],
  'Use a finite offset within ten years.': [
    'Informe um intervalo numérico finito de até dez anos, positivo ou negativo.',
    'Introduce un intervalo numérico finito de hasta diez años, positivo o negativo.',
  ],
  'Builder table': ['Tabela de datas do token', 'Tabla de fechas del token'],
  'Out of range': ['Fora do intervalo', 'Fuera de rango'],
  'Update the header alg to match your selection.': [
    'Atualize alg no header para corresponder à sua seleção.',
    'Actualiza alg en el header para que coincida con tu selección.',
  ],
  'Secret (UTF-8)': ['Segredo (UTF-8)', 'Secreto (UTF-8)'],
  'Private key — PKCS8 PEM or JWK': [
    'Chave privada — PKCS8 PEM ou JWK',
    'Clave privada — PKCS8 PEM o JWK',
  ],
  'Below RFC 7518 minimum length.': [
    'Abaixo do tamanho mínimo da RFC 7518.',
    'Por debajo del tamaño mínimo de la RFC 7518.',
  ],
  'Trivial pattern detected.': [
    'Foi detectado um padrão fácil de adivinhar.',
    'Se ha detectado un patrón fácil de adivinar.',
  ],
  'Use an unambiguous header object.': [
    'Use um objeto de header sem ambiguidades.',
    'Usa un objeto de header sin ambigüedades.',
  ],
  'Copy JWT': ['Copiar JWT', 'Copiar JWT'],
  '· Possible PII': [
    '· Possíveis dados pessoais',
    '· Posibles datos personales',
  ],
  'from now': ['a partir de agora', 'a partir de ahora'],
  ago: ['atrás', 'antes'],
  'Comparison input exceeds 1 MiB.': [
    'O token de comparação ultrapassa 1 MiB.',
    'El token de comparación supera 1 MiB.',
  ],
  'Search differences': ['Buscar diferenças', 'Buscar diferencias'],
  'Filter paths': ['Filtrar caminhos', 'Filtrar rutas'],
  'Compare table': ['Tabela de comparação', 'Tabla de comparación'],
  'Inspector table': ['Tabela de inspeção', 'Tabla de inspección'],
  'Batch table': ['Tabela do lote', 'Tabla del lote'],
  'Keys table': ['Tabela de chaves', 'Tabla de claves'],
  'Policy table': ['Tabela de política', 'Tabla de política'],
  'Outer JOSE → Inner JWT': [
    'JOSE externo → JWT interno',
    'JOSE externo → JWT interno',
  ],
  '(empty or detached payload)': [
    '(payload vazio ou separado)',
    '(payload vacío o separado)',
  ],
  '(empty)': ['(vazio)', '(vacío)'],
  '(absent — unsigned)': [
    '(ausente — sem assinatura)',
    '(ausente — sin firma)',
  ],
  'absent — unsigned': ['ausente — sem assinatura', 'ausente — sin firma'],
  'present, not verified': [
    'presente, ainda não verificada',
    'presente, aún sin verificar',
  ],
  'Key input exceeds 1 MiB.': [
    'A chave ultrapassa 1 MiB.',
    'La clave supera 1 MiB.',
  ],
  'File exceeds 1 MiB.': [
    'O arquivo ultrapassa 1 MiB.',
    'El archivo supera 1 MiB.',
  ],
  'Unable to read the local file.': [
    'Não foi possível ler o arquivo local.',
    'No se pudo leer el archivo local.',
  ],
  'Invalid or unsupported key. Use a public SPKI PEM, JWK or JWKS with valid key parameters.':
    [
      'Chave inválida ou não suportada. Use SPKI PEM público, JWK ou JWKS com parâmetros válidos.',
      'Clave no válida o no compatible. Usa SPKI PEM público, JWK o JWKS con parámetros válidos.',
    ],
  'Inspecting locally…': [
    'Analisando no navegador…',
    'Analizando en el navegador…',
  ],
  'Inspect keys': ['Inspecionar chaves', 'Inspeccionar claves'],
  '· sensitive key': ['· chave sensível', '· clave sensible'],
  'Invalid policy.': ['Política inválida.', 'Política no válida.'],
  'Plain Text': ['Texto simples', 'Texto sin formato'],
  'Copy report': ['Copiar relatório', 'Copiar informe'],
  'Copy sanitized JSON': [
    'Copiar JSON com valores ocultos',
    'Copiar JSON con valores ocultos',
  ],
  'Search findings': ['Buscar alertas', 'Buscar alertas'],
  'Filter findings': ['Filtrar alertas', 'Filtrar alertas'],
  'Simulation offset': [
    'Deslocamento da simulação',
    'Desplazamiento de la simulación',
  ],
  'Invalid input or unsupported conversion. JSON must be unambiguous for formatting.':
    [
      'Entrada inválida ou conversão não suportada. Para formatar, o JSON precisa estar sem ambiguidades.',
      'Entrada no válida o conversión no compatible. Para formatear, el JSON debe estar libre de ambigüedades.',
    ],
  'Tool input exceeds 1 MiB.': [
    'A entrada ultrapassa 1 MiB.',
    'La entrada supera 1 MiB.',
  ],
  'Valid JSON': ['JSON válido', 'JSON válido'],
  'ISO date → Unix': ['Data ISO → Unix', 'Fecha ISO → Unix'],
  'Output appears here.': [
    'O resultado aparecerá aqui.',
    'El resultado aparecerá aquí.',
  ],
  'Copy Authorization header': [
    'Copiar header Authorization',
    'Copiar header Authorization',
  ],
  'SHA-256 is unavailable in this context.': [
    'SHA-256 não está disponível neste contexto.',
    'SHA-256 no está disponible en este contexto.',
  ],
  'Weak test-like secret.': [
    'O segredo parece fraco, típico de exemplos de teste.',
    'El secreto parece débil, típico de ejemplos de prueba.',
  ],
  'Below RFC 7518 minimum key length.': [
    'Abaixo do tamanho mínimo de chave da RFC 7518.',
    'Por debajo del tamaño mínimo de clave de la RFC 7518.',
  ],
  None: ['Nenhum', 'Ninguno'],
  NOW: ['AGORA', 'AHORA'],
  Added: ['Adicionado', 'Añadido'],
  Removed: ['Removido', 'Eliminado'],
  Changed: ['Alterado', 'Modificado'],
  Default: ['Padrão', 'Predeterminado'],
  Support: ['Suporte', 'Soporte'],
  Strict: ['Restrito', 'Estricto'],
  unspecified: ['não informado', 'no indicado'],
  '{count} characters': ['{count} caracteres', '{count} caracteres'],
  '{passed}/{total} passed': [
    '{passed}/{total} aprovadas',
    '{passed}/{total} aprobadas',
  ],
  'Confidence: {level}': ['Confiança: {level}', 'Confianza: {level}'],
  'At least {bits} bits of key material; length does not prove entropy.': [
    'Use pelo menos {bits} bits de chave. O tamanho, sozinho, não garante imprevisibilidade.',
    'Usa al menos {bits} bits de clave. El tamaño, por sí solo, no garantiza imprevisibilidad.',
  ],
  'Expected {type} key for {algorithm}.': [
    'O algoritmo {algorithm} exige uma chave do tipo {type}.',
    'El algoritmo {algorithm} requiere una clave de tipo {type}.',
  ],
  '{status} — exactly one trusted key is required.': [
    '{status} — é necessária exatamente uma chave de confiança.',
    '{status} — se necesita exactamente una clave de confianza.',
  ],
  'GuardJWT — Local JWT & JOSE Security Workbench': [
    'GuardJWT — Análise local de JWT e JOSE',
    'GuardJWT — Análisis local de JWT y JOSE',
  ],
  'Documentation — GuardJWT': [
    'Documentação — GuardJWT',
    'Documentación — GuardJWT',
  ],
  'Privacy — GuardJWT': ['Privacidade — GuardJWT', 'Privacidad — GuardJWT'],
  'Security — GuardJWT': ['Segurança — GuardJWT', 'Seguridad — GuardJWT'],
  'About — GuardJWT': ['Sobre — GuardJWT', 'Acerca de — GuardJWT'],
  'Decode, inspect, verify and audit JWT and JOSE data locally in your browser.':
    [
      'Decodifique, explore e verifique tokens JWT e JOSE no seu navegador.',
      'Decodifica, explora y verifica tokens JWT y JOSE en tu navegador.',
    ],
  'Workflows, supported algorithms, keyboard shortcuts and limits of the local JWT and JOSE workbench.':
    [
      'Guia de uso, algoritmos disponíveis, atalhos de teclado e limites do GuardJWT.',
      'Guía de uso, algoritmos disponibles, atajos de teclado y límites de GuardJWT.',
    ],
  'How GuardJWT processes JWTs and cryptographic material locally, handles exports and caches application assets.':
    [
      'Como o GuardJWT processa tokens e chaves localmente, exporta resultados e mantém arquivos offline.',
      'Cómo procesa GuardJWT los tokens y las claves localmente, exporta resultados y mantiene archivos sin conexión.',
    ],
  'GuardJWT security model, trust boundaries, supported verification and responsible disclosure.':
    [
      'Modelo de segurança do GuardJWT, limites de confiança, verificação e comunicação responsável de falhas.',
      'Modelo de seguridad de GuardJWT, límites de confianza, verificación y comunicación responsable de fallos.',
    ],
  'An independent open-source JWT and JOSE security workbench built by Luiz Gustavo.':
    [
      'Uma ferramenta independente e de código aberto para JWT e JOSE, criada por Luiz Gustavo.',
      'Una herramienta independiente y de código abierto para JWT y JOSE, creada por Luiz Gustavo.',
    ],
  'Technical names and exported JSON stay unchanged. Your token data is never translated.':
    [
      'Termos técnicos e o JSON exportado mantêm os nomes originais. Os dados do seu token nunca são traduzidos.',
      'Los términos técnicos y el JSON exportado conservan sus nombres originales. Los datos de tu token nunca se traducen.',
    ],
  standard: ['padronizada', 'estandarizado'],
  custom: ['personalizada', 'personalizado'],
  security: ['segurança', 'seguridad'],
  authorization: ['autorização', 'autorización'],
  identity: ['identidade', 'identidad'],
};
export const englishMessages: Record<string, string> = {
  'Claims Breakdown': 'Explore claims',
  'Security Auditor': 'Token warnings',
  'Fixture lab': 'More examples',
  'Token hygiene': 'Token checks',
  'Privacy exposure score': 'Privacy checks',
  'Privacy score': 'Privacy checks',
  'Key Workbench': 'Inspect keys',
  'Policy Studio': 'Check a policy',
  'Safe Share View': 'Prepare a redacted copy',
  'Local developer tools': 'Utilities',
};
