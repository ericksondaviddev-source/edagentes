/**
 * gen-fonts.mjs — localiza fuentes de Google Fonts (estándar ED-Dev; pieza AGENT/OS 2026-10-31)
 * Descarga los woff2 del subconjunto latino de la lista `fams` y genera src/fonts/fonts.css
 * con @font-face en rutas absolutas (sin CDN externo). Reutilizable: edita `fams` por proyecto.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36' };
const fams = [
  ['Unbounded', 'family=Unbounded:wght@700;800'],
  ['Outfit', 'family=Outfit:wght@400;500;600;700;800'],
  ['JetBrains Mono', 'family=JetBrains+Mono:wght@400;600;700'],
];

const cssOut = [];
for (const [name, q] of fams) {
  const res = await fetch('https://fonts.googleapis.com/css2?' + q + '&display=swap', { headers: UA });
  const css = await res.text();
  const blocks = css.split('/* ').filter(b => b.startsWith('latin */') && !b.startsWith('latin-ext */'));
  for (const b of blocks) {
    const fam = (b.match(/font-family: '([^']+)'/) || [])[1];
    const w = (b.match(/font-weight: (\d+)/) || [])[1];
    const url = (b.match(/url\((https:[^)]+\.woff2)\)/) || [])[1];
    if (!fam || !w || !url) continue;
    const fname = fam.replace(/ /g, '') + '-' + w + '.woff2';
    const dir = path.join(root, 'src', 'fonts');
    fs.mkdirSync(dir, { recursive: true });
    const buf = Buffer.from(await (await fetch(url, { headers: UA })).arrayBuffer());
    fs.writeFileSync(path.join(dir, fname), buf);
    cssOut.push(
      `@font-face{font-family:"${fam}";font-style:normal;font-weight:${w};font-display:swap;` +
      `src:url(/src/fonts/${fname}) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153}` +
      ` /* ${Math.round(buf.length / 1024)}KB */`
    );
  }
}
fs.writeFileSync(
  path.join(root, 'src', 'fonts', 'fonts.css'),
  '/* Fuentes locales (subconjunto latino) — sin CDN externo (estándar ED-Dev) — genera con scripts/gen-fonts.mjs */\n' + cssOut.join('\n') + '\n'
);
console.log('fonts.css + woff2 listos (latin):', fs.readdirSync(path.join(root, 'src', 'fonts')));
