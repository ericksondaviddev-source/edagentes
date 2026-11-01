# Memoria del proyecto

## Qué es (1 línea)
Academia web gamificada (HTML autocontenido) para aprender a dirigir agentes de IA: 9 módulos, 8 misiones simuladas de terminal, quizzes, TTS, Forja de artefactos y XP.

## Decisiones (con fecha)
- 2026-10-31 — Despliegue decidido vía GitHub Actions (`.github/workflows/deploy.yml`, ejecución manual): la red local BLOQUEA `api.vercel.com` (TCP 443 rechazado, sin proxy ni firewall outbound — filtro de red del ISP/antivirus), así que el CLI de Vercel no puede ni loguear ni desplegar aquí. El workflow además verifica el `<title>` de `edagentes.vercel.app` antes de dar por bueno el deploy (regla verificada de la casa). Repo: `ericksondaviddev-source/edagentes`.
- 2026-10-27 — Auditoría completa (Pieza 0): reporte con 4 piezas de mejora. Orden acordado: 1) andamio+memoria, 2) separar datos del motor, 3) reparar bugs, 4) pulido de venta (video, blur móvil, firma, contacto).
- 2026-10-27 — Pieza 1: andamio creado (AGENTS.md, MEMORIA.md, README.md, src/, docs/) y la app movida a `src/agent-os-academy.html` (ruta del video ajustada a `../videos/…`). El diseño y el motor NO se tocan: la app es la base congelada; todo lo que viene es editar.

- 2026-10-27 — Pieza 2: contenido separado del motor. `src/data/modulos.js` (LEVELS+MODULES), `src/data/misiones.js` (FALLBACK+MISSIONS), `src/data/anims.js` (ANIMS). HTML quedó en 87 KB (antes 158 KB). Cargados con `<script src>` antes del motor. Verificado en navegador con servidor local: home 9 módulos, quiz OK, lección OK (23 bloques), forja 5 generadores, simulador OK (startMission directo). Bug pre-existente documentado: `go('simplay:…')` sin pantalla destino (queda para Pieza 3).

- 2026-10-27 — Pieza 3: three fixes acotados. 1) Router: `go('simplay'/'forged')` mapea a su pantalla real — misión abre con clic real. 2) Quiz `blank`: normaliza espacios dobles. 3) Video hero con `poster.jpg` (5 KB, gratis) — el video reproduce (9.5 s), consola con 0 errores. Racha-por-apertura: decisión de diseño intacta (por validar con Erickson).

## Lecciones verificadas
- 2026-10-31 — (primer hallazgo) La sesión de Vercel CLI vive en `%APPDATA%\com.vercel.cli\Data\auth.json` (APPDATA\Roaming, no `~/.vercel` ni LOCALAPPDATA). El defecto: el token guardado ahí **expira** (el de esta máquina venció 2026-10-29). Un token guardado en otro proyecto `.vercel/project.json` solo trae IDs, no credencial.
- (pendiente: ninguna verificada dos veces todavía)

## Vara actual (qué subió 1% y cuándo)
- 2026-10-31 — **APP PUBLICADA: https://edagentes.vercel.app** ✓ (título verificado en vivo: `AGENT/OS — Academia de Agentes de IA`; firma ED-Dev presente; 200 OK). Pipeline activo: `gh workflow run deploy.yml` → GitHub Actions (nube, salta el bloqueo local de api.vercel.com) → deploy `--prod` → verificación de `<title>` integrada en el workflow. Vara nueva: re-publicar es un solo comando de mi lado, con verificación automática de dominio.
- 2026-10-27 — Subió 1%: contenido separado del motor (`src/data/`, 3 archivos editables) + proyecto con memoria viva y evidencias en docs/. La vara ahora: editar una lección NO requiere tocar el HTML; y todo cierre de pieza lleva captura verificada en navegador.
- 2026-10-27 — Subió otro 1% (Piezas 3-4): 0 errores de consola como estándar de cierre; video de portada en 0,38 MB sin perder calidad visible; móvil sin blur caro; firma ED-Dev en el producto. Cargando en móvil el home abre sin rectángulo negro (poster) y con todo el videorchive archivado para re-ediciones.
- 2026-10-27 — Subió otro 1% (Piezas 5-6): **la vara del sello está activa** — scroll horizontal con snap y numerotes de trazo Editorial + tipografía de imprenta en el hero. La app ya se distingue a primera vista como ED-Dev, repite esa fórmula en lo que venga.
- 2026-10-27 — Subió otro 1% (Piezas 7-8): profundidad de color en TODO el sistema de cards (un solo radial según acento: barato y uniforme) + el momento de firma de XP: la ganancia vuela al contador. Nueva vara: toda XP ganada se ve aterrizar, y toda card respira con su acento.

## Pendientes
- Erickson borrar el token `edagentes-deploy` del panel (vercel.com/account/tokens) porque se pegó en el chat — el deploy NO se cae al borrarlo.
- Racha por apertura (solo con actividad real vs. apertura): decisión de diseño pendiente.
- Publicarlo como portafolio (dominio/GitHub): solo con el sí explícito de Erickson.
- 2026-10-27 — Pieza 3 hecha y verificada (router, quiz blank, poster).
- 2026-10-27 — Pieza 4 hecha y verificada: video comprimido a 0,38 MB (master de 4,2 MB archivado en `renders/video-master.mp4`, CRF 23 a 1280px); blur desactivado en móvil verificado a 390px (`backdrop-filter: none`); firma ED-Dev visible en el perfil (decisión: es proyecto personal + portafolio, sin botón de venta — si se convierte en producto, AHÍ sí WhatsApp/agenda); 33 iconos decorativos con `aria-hidden`; favicon inline. Consola: 0 errores.
- 2026-10-27 — Pieza 5+6 hecha y verificada (sello ED-Dev en la app): carrusel horizontal de módulos con scroll-snap (scroll real 2738px > 376px a 390px), numerote de trazo "01" como marca de agua, hero tipográfico subido a clamp(26-40px), stats con gradiente de profundidad + 4ª stat "Insignias" cerrando el bento desktop, features en bento propio bajo el rail. Consola: 0 errores. Capturas: `docs/pieza5-*.png` (4).
- 2026-10-27 — Pieza 7+8 hecha y verificada: TODA card lleva resplandor de acento (radial superior-derecha según --ac — profundidad en lecciones, quiz, forja y misiones con una sola regla CSS); chip "+XP" vuela desde el centro hasta el contador (WAAPI 900ms), aterrizando con bump del contador + pulso del anillo de progreso; el vuelo se desactiva con `prefers-reduced-motion`. Consola: 0 errores. Capturas: `docs/pieza8-vuelo-mitad.png` (vuelo congelado al 44%) y `docs/pieza8-vuelo.png` (aterrizaje).

## Archivo (lo viejo, sin borrar)
- 2026-10-27 — Versión original: app única en la raíz (`agent-os-academy.html`, 2.568 líneas), contenido hardcodeado dentro del HTML, sin andamio de proyecto. Movida a `src/`.
