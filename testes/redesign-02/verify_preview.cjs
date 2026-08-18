const assert = require('node:assert/strict');

const playwrightModule = process.env.PLAYWRIGHT_MODULE;
if (!playwrightModule) throw new Error('PLAYWRIGHT_MODULE is required');
const { chromium } = require(playwrightModule);
const base = process.env.BASE_URL || 'http://127.0.0.1:8330/';

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of [
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'mobile', width: 390, height: 844 },
    ]) {
      const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
      const consoleErrors = [];
      const pageErrors = [];
      const failedRequests = [];
      page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
      page.on('pageerror', error => pageErrors.push(String(error)));
      page.on('requestfailed', request => failedRequests.push(request.url()));
      await page.goto(base, { waitUntil: 'networkidle' });

      await page.locator('img').evaluateAll(async images => {
        for (const image of images) {
          if (image.closest('dialog:not([open])')) continue;
          image.scrollIntoView({ block: 'center' });
          if (!image.complete) await Promise.race([
            new Promise(resolve => { image.addEventListener('load', resolve, { once: true }); image.addEventListener('error', resolve, { once: true }); }),
            new Promise(resolve => setTimeout(resolve, 10000)),
          ]);
        }
      });
      const state = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        main: Boolean(document.querySelector('main')),
        h1: Boolean(document.querySelector('h1')),
        robots: document.querySelector('meta[name="robots"]')?.content || '',
        overflow: document.documentElement.scrollWidth <= window.innerWidth,
        reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
        images: [...document.images].filter(image => !image.closest('dialog:not([open])')).map(image => ({ naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight, alt: image.alt, loading: image.loading })),
        formErrors: [...document.querySelectorAll('[data-error-for]')].map(error => ({ id: error.id, role: error.getAttribute('role') })),
        described: [...document.querySelectorAll('input, textarea')].map(field => ({ id: field.id, describedby: field.getAttribute('aria-describedby') })),
      }));
      assert.equal(state.lang, 'pt-BR');
      assert.equal(state.main, true);
      assert.equal(state.h1, true);
      assert.match(state.robots, /noindex/i);
      assert.equal(state.overflow, true);
      assert.equal(state.reduced, true);
      assert.ok(state.images.length >= 5);
      assert.ok(state.images.every(image => image.naturalWidth > 0 && image.naturalHeight > 0 && image.alt.length > 0));
      assert.ok(state.formErrors.some(error => error.id === 'erro-nome' && error.role === 'alert'));
      assert.ok(state.described.some(field => field.id === 'nome' && field.describedby === 'erro-nome'));
      assert.ok(state.described.some(field => field.id === 'email' && field.describedby === 'erro-email'));
      assert.ok(state.described.some(field => field.id === 'mensagem' && field.describedby === 'erro-mensagem'));

      const filter = page.getByRole('button', { name: /EXPLORAÇÕES/i });
      await filter.click();
      assert.equal(await page.locator('[data-empty-state]').isVisible(), true);
      await page.locator('button[data-filter="todos"]').click();
      await page.getByRole('button', { name: /Pátio Norte/i }).click();
      assert.equal(await page.locator('dialog[open]').count(), 1);
      await page.waitForFunction(() => document.querySelector('dialog[open] [data-dialog-image]')?.naturalWidth > 0);
      await page.getByRole('button', { name: 'Fechar detalhes' }).click();
      await page.locator('#nome').fill('Ana');
      await page.locator('#email').fill('ana@example.com');
      await page.locator('#mensagem').fill('Uma pista válida para o exercício.');
      await page.getByRole('button', { name: 'Validar briefing' }).click();
      assert.equal(await page.locator('#consentimento').getAttribute('aria-invalid'), 'true');
      assert.equal(await page.locator('#erro-consentimento').innerText(), 'Confirme que esta é uma demonstração local.');
      await page.locator('#consentimento').check();
      assert.equal(await page.locator('#consentimento').getAttribute('aria-invalid'), 'false');

      if (viewport.name === 'mobile') {
        const menu = page.locator('[data-menu-toggle]');
        const nav = page.locator('#site-nav');
        assert.equal(await menu.getAttribute('aria-label'), 'Abrir menu');
        await menu.click();
        assert.equal(await menu.getAttribute('aria-expanded'), 'true');
        assert.equal(await menu.getAttribute('aria-label'), 'Fechar menu');
        await page.keyboard.press('Escape');
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        assert.equal(await menu.getAttribute('aria-label'), 'Abrir menu');
        assert.equal(await page.evaluate(() => document.activeElement?.matches('[data-menu-toggle]')), true);
        await menu.click();
        await page.mouse.click(5, 800);
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        assert.equal(await menu.getAttribute('aria-label'), 'Abrir menu');
        assert.equal(await nav.getAttribute('class').then(value => value.includes('is-open')), false);
      }
      assert.equal(consoleErrors.length, 0, consoleErrors.join('\n'));
      assert.equal(pageErrors.length, 0, pageErrors.join('\n'));
      assert.equal(failedRequests.length, 0, failedRequests.join('\n'));
      await page.screenshot({ path: `/tmp/barbara-versioned-${viewport.name}.png`, fullPage: true });
      await page.close();
    }
    console.log(JSON.stringify({ status: 'pass', viewports: ['desktop', 'mobile'], lazy_images_checked: true, form_accessibility_checked: true, menu_dismissal_checked: true }));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error.stack || error); process.exit(1); });
