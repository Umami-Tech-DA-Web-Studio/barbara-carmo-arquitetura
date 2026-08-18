# Auditoria multiagente — barbara-carmo-arquitetura

- Run: `20260817-barbara-qa-001`
- Criada: `2026-08-17T21:47:49.443004-03:00`
- Preview: `https://redesign-20260817.barbara-carmo-arquitetura-4ga.pages.dev/`

## Estado dos agentes

- `gemini`: **blocked** — exit `41`
- `codex`: **blocked** — exit `1`
- `antigravity`: **pass_with_findings** — exit `0`

## Evidência determinística

- Browser capture: **pass** — viewports `2`
- HTTP probe: statuses `[200, 200, 200, 200]`

## Findings consolidados

### AGY-001 — Ausência de fechamento do menu mobile por clique externo ou tecla Escape
- Severidade: `low`
- Categoria: `ux`
- Agentes: `antigravity`
- Evidência: `[{"type": "dom", "path": "preview-dist/app.js", "locator": ".site-nav.is-open", "quote_or_observation": "O menu mobile abre via data-menu-toggle e fecha ao selecionar uma âncora, mas não possui listeners para clique fora da área do menu ou pressionamento da tecla Escape."}]`
- Recomendações: Adicionar listeners no document para fechar a navegação móvel ao detectar clique fora de `.site-nav`/`[data-menu-toggle]` ou ao pressionar a tecla Escape.
- Aprovação humana: `False`

### AGY-002 — Contraste da cor de acento --clay em microtipografia monoespaçada sobre fundo claro
- Severidade: `note`
- Categoria: `accessibility`
- Agentes: `antigravity`
- Evidência: `[{"type": "dom", "path": "preview-dist/styles.css", "locator": ".filter-button span, .service-number, .process-list li > span", "quote_or_observation": "A variável --clay (#b45e43) sobre fundo --paper (#f1ede3) atinge razão de contraste de aproximadamente 3.54:1 em fontes mono de 10px-11px."}]`
- Recomendações: Utilizar a variável já existente --clay-dark (#874331, contraste 5.9:1) para pequenos rótulos monoespaciados e numerações menores que 12px.
- Aprovação humana: `False`