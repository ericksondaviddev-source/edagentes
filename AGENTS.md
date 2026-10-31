# AGENT/OS — proyecto personal ED-Dev

Aplica las reglas globales ED-Dev.

Proyecto: AGENT/OS — Academia de Agentes de IA (app web autocontenida: lecciones, quizzes, simulador de terminal, Forja).

Lee MEMORIA.md al empezar y actualízala al terminar.
Puerta 0 antes de codear. Iterar, nunca regenerar. Piezas verificadas con evidencia.
Una carpeta, sin basura. Costo cero, local. Nada público sin el sí de Erickson. Firma ED-Dev.

## Estructura

- `src/agent-os-academy.html` — motor + UI (router, quizzes, simulador, TTS, forja).
- `src/data/modulos.js` — LEVELS + MODULES (contenido editable).
- `src/data/misiones.js` — FALLBACK + MISSIONS (contenido editable).
- `src/data/anims.js` — ANIMS (diagramas SVG animados de lecciones).
- `videos/agent-os-intro/` — proyecto HyperFrames del video introductorio (render en `renders/video.mp4`).
- `docs/` — evidencias y piezas verificadas.

## Reglas de este proyecto

- El contenido se edita en `src/data/*.js` (módulos, misiones, anims) — NUNCA dentro del HTML.
- Los datos se cargan con `<script src="data/…">` en orden: modulos → misiones → anims, ANTES del script del motor.
- El video del hero se referencia con `../videos/…` (la app vive en `src/`).
- localStorage con clave `agentos_v1`: no cambiar la clave sin migración.

## Bug conocido (Pieza 3)

- RESUELTO (2026-10-27): `go('simplay:…')` y `go('forged:…')` ahora mapean a su pantalla (`sim`/`forge`). Verificado con clic real en navegador.
