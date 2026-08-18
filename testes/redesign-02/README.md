# QA executável do preview Barbara

## Pré-requisito

O teste usa Playwright instalado em um workspace local. A variável `PLAYWRIGHT_MODULE` deve apontar para o diretório do pacote `playwright`.

## Execução local

Servir o artefato publicado:

```bash
python3.11 -m http.server 8330 -d preview-dist
```

Em outro Terminal:

```bash
PLAYWRIGHT_MODULE=/caminho/node_modules/playwright \
node testes/redesign-02/verify_preview.cjs
```

## Execução externa

```bash
BASE_URL=https://preview.example.pages.dev/ \
PLAYWRIGHT_MODULE=/caminho/node_modules/playwright \
node testes/redesign-02/verify_preview.cjs
```

O teste cobre desktop `1440×900`, mobile `390×844`, lazy images, DOM, `lang`, `h1`, `main`, noindex, overflow, reduced motion, `aria-describedby`, erros de formulário, filtro, modal, menu mobile, Escape, clique externo, foco, console, pageerror e requests falhos.

O teste não envia formulário nem realiza contato externo.
