const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pairs = [
  ['opendesign/mockups/barbara-carmo-prospeccao/index.html', 'preview-dist/index.html'],
  ['opendesign/mockups/barbara-carmo-prospeccao/styles.css', 'preview-dist/styles.css'],
  ['opendesign/mockups/barbara-carmo-prospeccao/app.js', 'preview-dist/app.js'],
];
for (const [source, dist] of pairs) {
  assert.equal(fs.readFileSync(source, 'utf8'), fs.readFileSync(dist, 'utf8'), `${source} differs from ${dist}`);
}
const sourceAssets = fs.readdirSync('opendesign/mockups/barbara-carmo-prospeccao/assets/generated').filter(name => !name.startsWith('barbara-cloudflare-'));
for (const asset of sourceAssets) {
  assert.ok(fs.existsSync(path.join('preview-dist/assets/generated', asset)), `missing published asset: ${asset}`);
}
console.log(JSON.stringify({ status: 'pass', synchronized: pairs.length, assets_checked: sourceAssets.length }));
