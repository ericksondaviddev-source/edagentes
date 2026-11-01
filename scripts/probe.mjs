/**
 * probe.mjs — cadena verde permanente AGENT/OS (estándar ED-Dev, pieza AGENT/OS 2026-10-31)
 * Uso:
 *   node scripts/probe.mjs                        → prueba local (abre un servidor propio en 8137)
 *   node scripts/probe.mjs https://edagentes.vercel.app → prueba contra producción (salta servidor)
 * Aserciones: título, datos cargados (MODULES/MISSIONS/ANIMS), rail de módulos (9),
 * XP que marca racha solo con actividad real, 0 errores de consola. Devuelve captura en docs/.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'docs');
const require = createRequire(import.meta.url);
const { chromium } = require(path.join(process.env.NPM_GLOBAL_ROOT || 'C:/Users/USUARIO/AppData/Roaming/npm/node_modules', 'playwright'));

const target = process.argv[2] || null; // URL de producción opcional
let server, base;

if (target) {
  base = target.replace(/\/$/, '');
} else {
  server = createServer(async (q, r) => {
    let f = q.url.split('?')[0];
    if (f === '/') f = '/src/agent-os-academy.html'; // simula el rewrite de Vercel
    try {
      const d = await readFile(path.join(root, decodeURIComponent(f)));
      r.writeHead(200, { 'Content-Type': f.endsWith('.html') ? 'text/html' : 'text/javascript' });
      r.end(d);
    } catch { r.writeHead(404); r.end('404'); }
  }).listen(8137);
  base = 'http://127.0.0.1:8137';
}

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });

  await p.goto(base + '/', { waitUntil: 'load' });
  await p.evaluate(() => localStorage.removeItem('agentos_v1'));
  await p.reload();
  await p.waitForTimeout(1200);

  const title = await p.title();
  const data = await p.evaluate(() => ({
    modulos: typeof MODULES === 'object' ? (MODULES?.length ?? -1) : -1,
    misiones: typeof MISSIONS === 'object' ? (MISSIONS?.length ?? -1) : -1,
    anims: typeof ANIMS === 'object' ? Object.keys(ANIMS ?? {}).length : -1,
  }));
  const rail = await p.evaluate(() => document.querySelectorAll('.mod-rail .mod').length);
  const h1 = await p.evaluate(() => (document.querySelector('.hero h1')?.textContent || '').trim().slice(0, 40));

  // racha honesta: abrir NO marca; XP sí
  const openCold = await p.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('agentos_v1') || '{}');
    return s.streak ? s.streak.count : 0;
  });
  const xp = await p.evaluate(() => {
    addXP(25, 'probe');
    return JSON.parse(localStorage.getItem('agentos_v1'));
  });

  await p.screenshot({ path: path.join(outDir, 'probe-home.png') });
  await b.close();
  if (server) server.close();

  const ok =
    /AGENT\/OS/i.test(title) &&
    data.modulos === 9 && data.misiones === 8 && data.anims > 0 && rail === 9 &&
    openCold === 0 && xp.streak?.count === 1 && errs.length === 0;

  console.log(JSON.stringify({
    base, title, h1, data, rail, racha: { alAbrirEnFrio: openCold, trasXP: xp.streak?.count },
    erroresConsola: errs, RESULTADO: ok ? 'VERDE ✓' : 'ROJO ✗'
  }, null, 1));
  process.exit(ok ? 0 : 1);
})().catch(e => { console.error('FALLO: ' + e.message); process.exit(1); });
