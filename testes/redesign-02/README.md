# QA executável do preview Barbara

## Pré-requisito

O projeto declara Playwright em `package.json`.

```bash
npm ci --ignore-scripts
```

## Execução local

Servir o artefato publicado:

```bash
python3.11 -m http.server 8330 -d preview-dist
```

Em outro Terminal:

```bash
npm run qa:preview
npm run qa:parity
```

O override `PLAYWRIGHT_MODULE=/caminho/node_modules/playwright` continua disponível quando o teste for executado fora do `node_modules` local.

## Execução externa

```bash
BASE_URL=https://preview.example.pages.dev/ npm run qa:preview
```

O teste cobre desktop `1440×900`, mobile `390×844`, lazy images, DOM, `lang`, `h1`, `main`, noindex, overflow, reduced motion, `aria-describedby`, erros de formulário, filtro, modal, menu mobile, Escape, clique externo, foco, console, pageerror e requests falhos.

O teste de paridade confirma que HTML, CSS e JavaScript da fonte do mockup permanecem iguais ao artefato `preview-dist`.

O teste não envia formulário nem realiza contato externo.
