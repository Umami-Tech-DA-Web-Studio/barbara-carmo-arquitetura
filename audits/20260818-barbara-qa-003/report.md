# Auditoria multiagente — barbara-carmo-arquitetura

- Run: `20260818-barbara-qa-003`
- Criada: `2026-08-18T01:24:36.193340-03:00`
- Preview: `https://redesign-20260817.barbara-carmo-arquitetura-4ga.pages.dev/`

## Estado dos agentes

- `codex`: **pass_with_findings** — exit `0`
- `antigravity`: **pass** — exit `0`

## Evidência determinística

- Browser capture: **pass** — viewports `2`
- HTTP probe: statuses `[200, 200, 200, 200]`

## Findings consolidados

### CODEX-001 — Ênfase terracota do H1 falha contraste sobre o fundo escuro
- Severidade: `medium`
- Categoria: `accessibility`
- Agentes: `codex`
- Evidência: `[{"type": "line", "path": "preview-dist/styles.css", "locator": "linhas 1 e 4", "quote_or_observation": "--clay:#b45e43; --ink:#1c2b27; .hero h1 i,h2 i{color:var(--clay)}. O contraste calculado entre #b45e43 e #1c2b27 é 2.02:1, abaixo de 3:1 para texto grande."}]`
- Recomendações: Usar uma variante mais clara do terracota no hero escuro e validar contraste mínimo de 3:1 para o H1.
- Aprovação humana: `False`

### CODEX-002 — Nome acessível do botão de menu permanece como “Abrir menu” quando o menu está aberto
- Severidade: `low`
- Categoria: `accessibility`
- Agentes: `codex`
- Evidência: `[{"type": "line", "path": "preview-dist/index.html", "locator": "linha 27; preview-dist/app.js:12-15", "quote_or_observation": "O botão inicia com aria-label=\"Abrir menu\". O JavaScript altera aria-expanded, mas nunca atualiza aria-label para o estado aberto."}]`
- Recomendações: Alternar o aria-label entre “Abrir menu” e “Fechar menu” junto com aria-expanded.
- Aprovação humana: `False`

### CODEX-003 — Texto de placeholder tem contraste reduzido
- Severidade: `low`
- Categoria: `accessibility`
- Agentes: `codex`
- Evidência: `[{"type": "line", "path": "preview-dist/styles.css", "locator": "linha 7", "quote_or_observation": "::placeholder{color:#7f887d}. O contraste calculado contra #f1ede3 é 3.14:1, abaixo de 4.5:1 para texto normal."}]`
- Recomendações: Escurecer o placeholder ou fornecer instruções visíveis fora do campo.
- Aprovação humana: `False`

### CODEX-004 — Imagens raster não têm variantes responsivas ou formato moderno
- Severidade: `low`
- Categoria: `performance`
- Agentes: `codex`
- Evidência: `[{"type": "line", "path": "preview-dist/index.html", "locator": "linhas 53, 83, 90, 97, 114 e 121; inventário em audits/20260818-barbara-qa-003/input/inventory.json", "quote_or_observation": "As imagens usam PNGs fixos de 512/768px, sem srcset ou sizes. Os três PNGs aplicados somam 1.343.376 bytes; no viewport móvel de 390px o hero ainda usa o PNG de 768px."}]`
- Recomendações: Gerar WebP/AVIF e variantes responsivas com srcset e sizes, mantendo o hero otimizado para o maior uso real.
- Aprovação humana: `False`

### CODEX-005 — Assets candidatos não utilizados permanecem no artefato publicado
- Severidade: `low`
- Categoria: `code`
- Agentes: `codex`
- Evidência: `[{"type": "file", "path": "audits/20260818-barbara-qa-003/input/inventory.json", "locator": "preview-dist/assets/generated/barbara-cloudflare-*.jpg; busca de referências em preview-dist", "quote_or_observation": "Os três JPGs Cloudflare têm zero referências em HTML, CSS ou JavaScript e ocupam 177.938 bytes no diretório publicado."}]`
- Recomendações: Manter candidatos apenas no arquivo de exploração e publicar somente assets referenciados.
- Aprovação humana: `True`

### CODEX-006 — Teste versionado depende de caminho externo e não possui comando reproduzível no projeto
- Severidade: `low`
- Categoria: `code`
- Agentes: `codex`
- Evidência: `[{"type": "test", "path": "testes/redesign-02/verify_preview.cjs", "locator": "linhas 3-6; ausência de package.json", "quote_or_observation": "O teste exige PLAYWRIGHT_MODULE e BASE_URL por variável de ambiente. Não há package.json ou script de execução versionado no repositório."}]`
- Recomendações: Adicionar configuração mínima de execução, dependência/lockfile ou documentação de um comando único reproduzível.
- Aprovação humana: `False`

### CODEX-007 — Fonte de HTML e CSS está pré-minificada
- Severidade: `low`
- Categoria: `code`
- Agentes: `codex`
- Evidência: `[{"type": "line", "path": "preview-dist/styles.css", "locator": "linhas 1-10; preview-dist/index.html:108,111,115,119,121", "quote_or_observation": "O CSS inteiro está condensado em dez linhas e várias seções HTML excedem 600 caracteres por linha."}]`
- Recomendações: Manter fonte formatada e minificar somente no empacotamento final.
- Aprovação humana: `False`

