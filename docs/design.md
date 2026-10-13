# UI/UX da alpha

[Arquivo editável no Figma](https://www.figma.com/design/6kR28pKvKQQX3xJeIsxjLw).

Telas: desktop escuro (1440 px), desktop claro (1440 px) e mobile (390 px). Contêm textos editáveis, auto-layout, componentes locais de botão, estilos tipográficos e variáveis de cor. São especificações de design, não screenshots da aplicação executada. A captura automática do aplicativo não pôde ser concluída sem navegador conectado.

A referência funcional [jwt.io](https://www.jwt.io/) orientou a proximidade entre entrada e conteúdo decodificado, separação Decoder/Encoder, ações de cópia e destaque para a verificação. Não foram importados seu código, logotipo, imagens, textos promocionais ou identidade visual.

GuardJWT usa superfícies grafite, esmeralda para processamento local/estado válido e cyan discreto para informação, seleção e foco. Avisos usam âmbar; erros usam vermelho suave. O CSS centraliza os tokens e tem tema claro correspondente, sem fontes remotas. Inter e Roboto Mono no Figma representam as fontes de sistema usadas no navegador; as métricas variam conforme o sistema operacional.

Na aplicação: JSON com destaque por tipo, entrada com contador e controle de quebra de linha, assinatura com ação principal, filtro de findings por severidade, listas extensas limitadas e navegação mobile compacta. Os controles mantêm rótulos acessíveis e foco visível. A inspeção visual real em todas as larguras e com leitor de tela ainda faz parte do checklist da alpha.

## Logo fornecida pelo responsável

A marca exibida no workspace, páginas institucionais e rodapé usa `public/logo.png`, preservando o arquivo fornecido. O componente `Brand` centraliza o link de início e o texto alternativo. O CSS enquadra as margens vazias sem deformar ou alterar a imagem e mantém o fundo branco nos dois temas. O asset é local e incluído automaticamente no cache estático do build.
