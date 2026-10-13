# Security Policy

## Escopo

Todo o repositório GuardJWT: parser, UI, Workers, criptografia, políticas, exportação, build, dependências e cache offline. SPA local sem backend, conta de usuário ou Supabase ativo. Não há exclusões gerais aprovadas para classes de vulnerabilidades.

## Fronteiras e invariantes

- JWT processing does not depend on Supabase.
- Tokens e chaves são não confiáveis. Conteúdo é texto; nunca HTML executável.
- Nenhum conteúdo sensível vai para rede, logs, URL, telemetria ou persistência automática.
- Core não depende de React, HTTP ou armazenamento. Offline cacheia somente assets fixos.
- Tamanho/profundidade são limitados; duplicatas e precisão numérica são explícitas.
- Clear descarta referências e invalida resultados assíncronos; Privacy Mode remove evidências/valores do DOM.
- Parsing, assinatura, tempo, políticas, confiança de emissor e autorização são resultados separados.
- Algoritmo permitido é selecionado independentemente; nenhum fetch automático de jku/x5u/JWKS.
- Sem primitivas criptográficas próprias ou reaproveitamento de PEM como secret HMAC.
- Chaves de produção, credenciais e service-role jamais entram em fixtures/Git/frontend.

## Achados reportáveis

Exfiltração alcançável, XSS, confusão de algoritmo/chave, aceitação ambígua, persistência involuntária, restauração após Clear, exportação insegura ou falsos estados de verificação. Severidade deve incluir interação, alcance e impacto; um algoritmo declarado ou finding heurístico não prova vulnerabilidade no emissor.

## Limitações conhecidas

JWE apenas inspeção, sem tag/decriptação. Sem cadeia X.509, detached verification, revogação/replay ou confiança automática em chaves. PII e scores são heurísticos; custom claims são permitidas. Decimais não exatos são sinalizados e Raw preservado. Limites: 1 MiB / 64 níveis / 50 tokens / 100 JWKs. Clear não é apagamento forense. Integridade de distribuição e navegador permanece necessária. Validação visual/rede/PWA em navegador real ainda está pendente.

## Disclosure

Use reproduções sintéticas. Não há canal privado configurado: solicite ao mantenedor um canal privado antes de transmitir detalhes sensíveis. Não coloque tokens reais em issues públicas. Esta política e a validação registrada não equivalem a auditoria independente, scan completo Codex Security ou certificação.
