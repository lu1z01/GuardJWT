# Privacidade

Dados sensíveis: token compacto, header, claims, assinaturas, secrets, chaves, políticas privadas, comparações e relatórios. Permanecem na memória da página/Workers. Sem localStorage, sessionStorage, IndexedDB, cookies, URLs, console, analytics ou replay. Sem salvamento automático e sem histórico de sessão.

A rede carrega assets próprios; o service worker cacheia apenas arquivos fixos do build. Conteúdo de token não é comunicado ao worker de cache. O worker de análise é separado, recebe input via postMessage em memória e é terminado ao substituir/limpar input. HMR/WebSocket existe somente no desenvolvimento Vite.

Clipboard é lido somente por Paste; cópias e downloads são explícitos. URLs em tokens são texto. Links de referências públicas são acionados pelo usuário e usam noreferrer. Key Workbench pode ler arquivo local após seleção. Nenhum input vai para Supabase; a integração está ausente.

Privacy Mode retira tokens, chaves, valores e evidências do DOM e fecha painéis sensíveis. Clear também descarta referências e invalida operações atrasadas. Não promete apagar RAM, clipboard, downloads já salvos, extensões ou histórico do sistema operacional.

Reports usam allowlist: formato/algoritmo conhecido, contagens, scores, categorias/títulos/referências e resultados agregados. Não exportam token, assinatura, chaves, evidência, valores ou paths PII por padrão. Nomes de claims e timestamps exigem opt-in e aparecem no preview. Nomes customizados podem conter dados pessoais; revisar antes de exportar.

Sanitizer não altera o input original. Default remove exposições heurísticas; Privacy/Support também removem identificadores conhecidos (nesta versão esses dois perfis são equivalentes); Strict mascara todas as folhas. Saída é uma representação, nunca uma assinatura preservada. Heurísticas não garantem remoção de todo dado sensível.
