# Changelog

## 1.0.0-alpha.1 — 2026-10-12

Primeira entrega alpha do workbench local JWT/JOSE, com Decoder, Encoder, Claims, Security, Verify, Timeline, Keys, Policy, Compare, Batch, Sanitize, Reports e Tools.

- Identidade própria grafite/esmeralda, tema claro, UI compacta, destaque JSON, wrap do token e filtro por severidade. Design desktop/mobile editável no Figma.
- Corrigida comparação de objetos vazios, invalidação de fingerprint assíncrono e renderização sem limite de itens da claim selecionada.
- Corrigida substituição de URLs de metadados que poderia corromper uma imagem social opcional.
- CSS consolidado; removidos parser legado, helper sem consumidores e implementação duplicada de Base64URL no exemplo.
- .gitignore ampliado, versão alpha alinhada, documentação de publicação e QA atualizada.
- Após 116 testes aprovados, suíte, scripts de testes/benchmark, dependências exclusivas e configuração de ambiente sem uso removidos por solicitação do responsável. Build, tipos, lint e formatação permanecem.
- Páginas institucionais, MIT, metadados por rota, CSP, cache offline de assets e configuração de hospedagem mantidos.

Inspeção em navegador/dispositivos reais, acessibilidade assistiva e instalação/atualização PWA ainda pendentes. Nenhum deploy ou DNS alterado. Sem decriptação JWE ou validação completa de cadeia X.509.
