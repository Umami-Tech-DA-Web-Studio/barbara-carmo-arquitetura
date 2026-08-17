# Assets gerados — preview Barbara Carmo Arquitetura

| ID | Arquivo | Uso | Origem | Modelo | Seed | Dimensão | Avaliação | Status |
|---|---|---|---|---|---:|---:|---|---|
| IMG-001 | `assets/generated/barbara-hero_00001_.png` | hero e recorte residencial | ComfyUI local, workspace externo `/Users/raphael/Documents/comfy`; prompt registrado abaixo | `v1-5-pruned-emaonly.safetensors` (SD 1.5) | 184203 | 768×512 | sem pessoas, texto, logos ou marca d'água; volumes arquitetônicos legíveis, jardim e contraste suficientes para hero | aprovado para preview exploratório |
| IMG-002 | `assets/generated/barbara-interior_00001_.png` | card de interiores, briefing e modal | ComfyUI local, mesmo workspace | `v1-5-pruned-emaonly.safetensors` (SD 1.5) | 184204 | 512×512 | sem pessoas, texto, logos ou marca d'água; composição calma, materiais naturais e recorte quadrado útil | aprovado para preview exploratório |
| IMG-003 | `assets/generated/barbara-courtyard_00001_.png` | card residencial | ComfyUI local, mesmo workspace | `v1-5-pruned-emaonly.safetensors` (SD 1.5) | 184205 | 512×512 | sem pessoas, texto, logos ou marca d'água; pátio, jardim e luz filtrada coerentes com a direção | aprovado para preview exploratório |

## Registro de geração

- **Data:** 17/08/2026 (BRT).
- **Servidor:** ComfyUI local `127.0.0.1:8188`, versão observada `0.33.0`, dispositivo `mps`; execução via `run_workflow.py` com `env -u PYTHONPATH`.
- **Prompts:**
  - IMG-001: `editorial architectural photography, high-end Brazilian residential interior, Campo Grande warm climate, quiet luxury, natural stone, pale wood, soft late afternoon light, deep shadows, sculptural staircase, layered materiality, restrained composition, photorealistic, no people, no text, no logo`.
  - IMG-002: `editorial interior architecture photograph, sophisticated Brazilian living room, natural stone, warm wood, linen, sculptural furniture, soft sunlight through a large window, muted mineral palette, quiet luxury, high-end residential design, photorealistic, no people, no text, no logo`.
  - IMG-003: `editorial architectural photograph of a contemporary Brazilian courtyard house, native garden, pale concrete, terracotta wall, filtered afternoon light, calm material palette, strong geometry, high-end residential architecture, photorealistic, no people, no text, no logo`.
- **Negative prompt comum:** pessoas, rostos, texto, letras, logo, watermark, distorção, excesso de saturação, baixa qualidade, desfoque, cartoon, ilustração, móveis duplicados/distorcidos.
- **Avaliação visual:** os três assets foram abertos e avaliados visualmente antes da inserção. Nenhum apresentou pessoa identificável, texto, logo ou marca d'água. Foram aceitos somente como material de direção para preview; não representam clientes, obras, portfólio ou resultados reais.
- **Direitos/limitação:** a origem é geração local; os termos do modelo/uso comercial não foram tratados como aprovação de publicação. Uso comercial e substituição por assets autorizados permanecem pendentes.

## IMG-004 a IMG-006 — candidatos Cloudflare Workers AI

| ID | Arquivo | Uso candidato | Origem | Modelo | Seed | Dimensão | Avaliação visual | Status |
|---|---|---|---|---|---:|---:|---|---|
| IMG-004 | `assets/generated/barbara-cloudflare-hero.jpg` | hero candidato | Cloudflare Workers AI via `wrangler dev --remote`; execução remota controlada, sem ComfyUI | `@cf/bytedance/stable-diffusion-xl-lightning` | 20260817 | 768×512 | arquitetura plausível e composição utilizável, porém luz dura/estourada e contraste excessivo; revisar antes de qualquer uso | candidato / não aplicado |
| IMG-005 | `assets/generated/barbara-cloudflare-courtyard.jpg` | card residencial candidato | Cloudflare Workers AI via `wrangler dev --remote`; execução remota controlada | `@cf/bytedance/stable-diffusion-xl-lightning` | 20260818 | 768×768 | pátio coerente, paleta mineral e sem texto/logo/pessoa; detalhe de porta/ferragem requer revisão final | passar para exploração |
| IMG-006 | `assets/generated/barbara-cloudflare-interior.jpg` | card de interiores candidato | Cloudflare Workers AI via `wrangler dev --remote`; execução remota controlada | `@cf/bytedance/stable-diffusion-xl-lightning` | 20260819 | 768×768 | interior coerente e legível, sem texto/logo/pessoa; ainda genérico e com objetos estilizados | passar para exploração |

### Evidência da rodada Cloudflare

- **Data/hora:** 17/08/2026, 00:10–00:14 BRT.
- **Conta:** Account ID canônico confirmado por `wrangler whoami`; nenhum segredo foi registrado.
- **Modelo/documentação:** página oficial informa o modelo como beta e `$0.00 per step`; a política operacional continua sendo limitar o uso à franquia gratuita e não ativar cobrança.
- **Execução:** Worker temporário em `/tmp/umami-cf-ai-test`, `wrangler dev --remote --port 8797`, sem deploy persistente.
- **Resultados:** três respostas HTTP 200; JPEGs legíveis, validados em 768×512, 768×768 e 768×768; avaliação técnica terminou com `technical_verdict: pass` para os três.
- **Proveniência:** prompts, negative prompts, seeds e hashes estão registrados nesta rodada e no histórico de execução local; os arquivos foram copiados também para a raiz publicada do preview.
- **Decisão:** os candidatos Cloudflare não substituíram automaticamente os assets atuais. Nenhum deles foi aplicado no HTML nesta rodada.
- **Limitação de provedores:** ChatGPT via browser recebeu desafio de segurança Cloudflare nesta sessão; Gemini abriu em estado não autenticado com botão “Fazer login”. Não foram digitadas credenciais nem iniciados logins. Esses dois provedores permanecem pendentes de acesso autenticado verificável.
