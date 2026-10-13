# Medições locais

Registro histórico da medição anterior à alpha; o script de benchmark foi removido junto dos artefatos de teste por solicitação do responsável. Fixtures sintéticas; nenhuma impressão de conteúdo de token. Node v22.22.2, AMD Ryzen 7 7735HS, 12/10/2026. Dez amostras após uma chamada de aquecimento; mediana (amostra central superior) e maior tempo observado, apenas core analyze, sem DOM ou transporte de Worker.

| Entrada          | Caracteres |   Mediana |    Máximo | Resultado                |
| ---------------- | ---------: | --------: | --------: | ------------------------ |
| Normal           |        476 |   0,54 ms |   0,90 ms | Aceita                   |
| ~100 KB          |    100.076 |  28,79 ms |  30,29 ms | Aceita                   |
| Próxima de 1 MiB |  1.048.543 | 253,73 ms | 689,84 ms | Aceita                   |
| Acima do limite  |  1.048.577 |   0,01 ms |   0,03 ms | Rejeitada antes do parse |

O teste usa uma string longa, não uma garantia de pior caso para qualquer árvore. O browser real varia, incluindo GC, layout, renderização e velocidade de CPU. O custo próximo ao limite justifica o Worker e o debounce de 120 ms. Sem Worker há fallback síncrono; evite entradas grandes nesse ambiente. Novos inputs terminam o Worker anterior. Claims têm paginação e árvore JSON tem limite de nós.

Build de referência: entrada JS ~260 kB/82 kB gzip, CSS ~13 kB/3,8 kB gzip; Workers ~21 e 22 kB; criptografia em chunks lazy. Valores exatos variam com alterações e aparecem em `npm run build`. Não foram medidos FPS ou latência visual no navegador porque Browser estava indisponível.
