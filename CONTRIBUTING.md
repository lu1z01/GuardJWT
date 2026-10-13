# Contribuir

Use Node compatível com `package.json`, `npm ci` e branches pequenas. Não adicione tokens/chaves reais, logs de input, telemetria ou persistência sensível. Fixtures devem ser sintéticas.

Antes de entregar: `npm run check`. A suíte foi removida por solicitação do responsável após a QA da alpha; não há comando npm test. Valide comportamento e fronteiras em cada alteração. Para criptografia use jose/Web Crypto e vetor oficial ou round-trip com testes negativos. Leia SECURITY.md.

Inspecione a produção no browser: desktop/mobile, teclado, Decoder ↔ Claims ↔ Findings, Encoder → Decoder/Verify, Privacy Mode, Clear durante operação, downloads/clipboard, console/rede e offline após instalação. Nunca envie tokens reais a ferramentas de screenshot externas.

Mudanças em dependências precisam de motivo, licença, manutenção, compatibilidade e efeito no bundle. Mudanças em cache/CSP exigem comprovar que somente assets são persistidos. Não relaxe invariantes para acomodar um serviço opcional.
