# Evidencias verificadas

Cierre de cada pieza: captura, grabación o test en verde. Solo lo que la evidencia muestra.

| Fecha | Pieza | Evidencia | Resultado |
|---|---|---|---|
| 2026-10-27 | 1 · Andamio + movimiento de app | Escritura de AGENTS/MEMORIA/README + `src/agent-os-academy.html` | ✅ Archivos en su sitio, ruta de video corregida |
| 2026-10-27 | 2 · Datos separados del motor | `node --check` en verde en los 3 archivos; servidor local en 8137 + Playwright: 9 módulos en home, quiz OK, lección OK (23 bloques), forja 5 generadores, simulador OK | ✅ |
| 2026-10-27 | 2 · Captura de pantalla | `docs/pieza2-home-final.png` — Home idéntico con datos externos | ✅ |
| 2026-10-27 | 3 · Reparaciones | Playwright, clic real: lista 8 misiones → misión abre sin crash (router OK); quiz blank acepta 'PI ' espaciado; video dura 9.5 s y reproduce; **consola: 0 errores, 0 warnings** → `docs/pieza3-verificado.png` | ✅ |
| 2026-10-27 | 4 · Pulido (personal+portafolio) | Video 4,2 MB → **0,38 MB** (CRF 23, 1280px, master archivado como `video-master.mp4`); blur eliminado en móvil (backward `none` verificado a 390px); firma ED-Dev visible en perfil; 33 decoros `aria-hidden`; favicon inline; **consola: 0 errores** → `docs/pieza4-movil.png`, `docs/pieza4-perfil-firma.png` | ✅ |
| 2026-10-27 | 5+6 · Rail horizontal + tipografía | Rail con snap (`x mandatory`), 9 tarjetas, scroll real **2738px > 376px** a 390px; numerote "01" con trazo como marca de agua; hero clamp hasta 40px; stats con gradiente, 4ª stat (insignias) cierra el bento desktop; **consola: 0 errores** → `docs/pieza5-rail.png`, `docs/pieza5-desktop.png` | ✅ |
| 2026-10-27 | 7+8 · Profundidad + vuelo de XP | Resplandor de acento en toda card (radial superior-derecha, verificado visualmente en móvil y desktop); chip "+45" vuela al contador con WAAPI (900ms, cubic-bezier), respeta `prefers-reduced-motion`, aterrizaje confirma con bump + anillo del hero; vuelo congelado al 44% como evidencia; **consola: 0 errores** → `docs/pieza8-vuelo-mitad.png` | ✅ |
| 2026-10-31 | 9 · Despliegue público | Repo `ericksondaviddev-source/edagentes` (commits `b0c469d`, `7a00b88`) + workflow `deploy.yml` en verde (run `41260264328`: título local OK, deploy prod OK, título servido OK); título en vivo verificado con fetch: **`AGENT/OS — Academia de Agentes de IA`**, firma ED-Dev presente, 200 OK → URL entregada: **https://edagentes.vercel.app** | ✅ |

## Pieza 2 (verificada en navegador)

- Home con 9 tarjetas de módulo — los datos vienen de `data/modulos.js`.
- Quiz arrancado con contenido (pregunta 1 legible).
- Lección MCP abierta: 23 bloques pintados (incluye `anims.js`).
- Forja: 5 generadores visibles.
- Simulador: `startMission('m1')` arranca misión con 5 pasos.
- Ese día se documentó el fallo del router (`go('simplay:…')`), que la Pieza 3 reparó y re-verificó.
