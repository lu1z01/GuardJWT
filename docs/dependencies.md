# Dependências — v1.0.0-alpha.1

Versões exatas no package.json e package-lock.json. Licenças, datas de publicação, tamanhos descompactados e requisitos de Node foram consultados no registro npm antes da instalação em 2026-10-12. O ambiente usa Node 22.22.2. TypeScript 6.0.3 foi escolhido porque typescript-eslint exige versão <6.1.0; não se forçou a instalação incompatível de TypeScript 7.

## Justificativas

| Grupo     | Pacotes                                                                                                          | Necessidade                                                                  |
| --------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Interface | react, react-dom                                                                                                 | Componentes, estado local e renderização segura de texto                     |
| Ícones    | lucide-react                                                                                                     | Ícones acessíveis sem assets externos; somente ícones usados entram no build |
| Build     | vite, @vitejs/plugin-react, typescript                                                                           | Servidor local, compilação e tipagem strict                                  |
| Estilos   | tailwindcss, @tailwindcss/vite                                                                                   | Pipeline de estilos da stack pedida; CSS estático em produção                |
| Qualidade | eslint, @eslint/js, typescript-eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, prettier | Lint, fronteiras e formatação                                                |
| Tipos     | @types/react, @types/react-dom, @types/node                                                                      | Tipos de UI e configuração de desenvolvimento                                |

## Inventário direto

| Pacote                      | Versão  | Licença    | Uso             |
| --------------------------- | ------- | ---------- | --------------- |
| jose                        | 6.2.12  | MIT        | browser, lazy   |
| lossless-json               | 4.3.1   | MIT        | parser/workers  |
| react                       | 19.3.0  | MIT        | browser         |
| react-dom                   | 19.3.0  | MIT        | browser         |
| lucide-react                | 1.55.0  | ISC        | browser         |
| vite                        | 8.3.4   | MIT        | desenvolvimento |
| @vitejs/plugin-react        | 6.1.2   | MIT        | desenvolvimento |
| typescript                  | 6.0.3   | Apache-2.0 | desenvolvimento |
| tailwindcss                 | 4.3.3   | MIT        | desenvolvimento |
| @tailwindcss/vite           | 4.3.3   | MIT        | desenvolvimento |
| eslint                      | 10.12.0 | MIT        | desenvolvimento |
| @eslint/js                  | 10.0.1  | MIT        | desenvolvimento |
| typescript-eslint           | 8.71.2  | MIT        | desenvolvimento |
| eslint-plugin-react-hooks   | 7.1.1   | MIT        | desenvolvimento |
| eslint-plugin-react-refresh | 0.5.7   | MIT        | desenvolvimento |
| globals                     | 17.13.0 | MIT        | desenvolvimento |
| prettier                    | 3.9.10  | MIT        | desenvolvimento |
| @types/react                | 19.3.0  | MIT        | desenvolvimento |
| @types/react-dom            | 19.3.0  | MIT        | desenvolvimento |
| @types/node                 | 26.6.5  | MIT        | desenvolvimento |

## Compatibilidade, tamanho e manutenção

React/React DOM, Lucide, lossless-json e jose são bibliotecas locais, não serviços externos. Vite remove exports não usados; o build não inclui todos os ícones. A instalação foi resolvida sem forçar peer dependencies.

Adições avaliadas em 12/10/2026:

- `jose@6.2.12`: MIT, sem dependências de runtime, distribuição npm ~210 kB descompactada. Implementa JOSE sobre Web Crypto e evita criptografia própria. Importações por recurso e chunks lazy; publicado em setembro de 2026.
- `lossless-json@4.3.1`: MIT, ~332 kB descompactada, publicado em julho de 2026. Permite preservar o texto de números durante parsing. O wrapper do projeto protege nomes de propriedades e identifica também duplicatas de mesmo valor; esses casos foram validados antes da remoção da suíte.

Tamanhos npm não são o custo transferido: o build v0.2 medido tem entrada JS ~260 kB / 82 kB gzip, CSS ~13 kB / 3,8 kB gzip, workers ~21/22 kB e chunk de keys/JOSE ~21 kB / 7,4 kB gzip. O relatório de build é a referência exata. O cache offline inclui chunks lazy para uso após instalação.

Não foram adicionados SDK Supabase, cliente HTTP, parser ASN.1, router ou biblioteca de componentes. Certificados X.509 permanecem fora desta entrega para não acrescentar uma dependência sem validação adequada.

A auditoria npm na instalação retornou zero vulnerabilidades conhecidas; isso não é garantia de segurança. Atualizações devem repetir testes e avaliação de compatibilidade/licença/bundle.

## Revisão da alpha

Foram removidos vitest, jsdom e os três pacotes @testing-library, junto da suíte e de sua configuração, após 116 testes aprovados. O parser legado sem uso, a função matchClaim sem consumidores e a codificação Base64URL duplicada do exemplo também foram retirados. As dependências de runtime mantêm as versões exatas anteriores. Build, lint, tipos e formatação continuam disponíveis. Nenhum SDK remoto foi adicionado.
