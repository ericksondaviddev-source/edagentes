// AGENT/OS - datos: mensajes fallback y misiones del simulador
const FALLBACK = [
  'Hmm, eso no encaja con el objetivo de la misión. Prueba un comando de pi (empiezan por /) o teclea <span class="t-acc">pista</span>.',
  'El agente te mira, confundido. Recuerda el objetivo del paso. Puedes pedir una <span class="t-acc">pista</span> cuando quieras.',
  'Comando no reconocido en este contexto. En el simulador, cada paso espera una acción concreta.',
  'Casi. Revisa el objetivo del paso arriba del terminal. <span class="t-acc">pista</span> te da la respuesta exacta.',
];

const MISSIONS = [
/* ============ MISIÓN 1 ============ */
{
  id:'m1', agent:'pi', ac:'#4fe3a5', icon:'🚀', bonus:50,
  title:'Primer despegue',
  desc:'Instala pi, conéctalo y lanza tu primera tarea con contexto de archivo.',
  steps:[
    {
      goal:'Instala pi globalmente con npm',
      ctx:'Terminal del sistema. Node 22.19+ ya está listo. Instala el paquete oficial de pi.',
      accept:[/npm/,/install/,/-g/,/--ignore-scripts/,/pi-coding-agent/],
      hint:'npm install -g --ignore-scripts @earendil-works/pi-coding-agent',
      ok:[['t-dim','added 1 package in 4s'],['t-box','<span class="t-acc">pi instalado correctamente.</span><br><span class="t-dim">Verifica con: pi --version</span>']]
    },
    {
      goal:'Arranca pi en la carpeta del proyecto',
      ctx:'El paquete está instalado. Lanza el agente dentro de tu proyecto.',
      accept:[/^pi( --version)?$/],
      hint:'pi',
      ok:[['t-box','<span class="t-acc">pi v1.x — sesión iniciada</span><br><span class="t-dim">Carpeta: ~/proyectos/api-pagos<br>Modelo: — (sin conectar)</span>']]
    },
    {
      goal:'Conecta un proveedor de modelos',
      ctx:'pi está vivo pero sin cerebro. Conecta una suscripción o API key.',
      accept:[/\/login/],
      hint:'/login',
      ok:[['t-box','<span class="t-acc">Proveedores disponibles:</span><br><span class="t-dim">› Anthropic (suscripción)<br>› OpenAI<br>› Google<br>› llama.cpp (local)<br>› API key custom…</span><br><span class="t-dim">Conectado ✓</span>']]
    },
    {
      goal:'Abre el selector de modelos',
      ctx:'Proveedor conectado. Elige con qué cerebro trabajas hoy.',
      accept:[/\/model/],
      hint:'/model   (atajo: Ctrl+L)',
      ok:[['t-box','<span class="t-acc">Selector de modelo abierto</span><br><span class="t-dim">› claude-sonnet-4.5<br>› gpt-5.2<br>› gemini-3-pro<br>↑↓ navegar · Enter seleccionar</span>']]
    },
    {
      goal:'Pide un resumen de notas-reunion.md usando contexto de archivo',
      ctx:'Modelo activo. Primera tarea real: incluye el archivo con @ en el prompt.',
      accept:[/@/,/notas/,/resum/],
      hint:'Resume @notas-reunion.md y guarda los action items',
      ok:[['t-dim','⊕ read notas-reunion.md (142 líneas)'],['t-box','<span class="t-acc">pi:</span> La reunión cubrió 3 temas: migración de pagos, freeze de viernes y hiring. Guardé 5 action items en tareas.md con responsables y fechas.<br><span class="t-dim">✎ write tareas.md — 12 líneas</span>'],['t-dim','Contexto: 4.2k/200k · Coste: $0.011']]
    }
  ]
},
/* ============ MISIÓN 2 ============ */
{
  id:'m2', agent:'pi', ac:'#ff7a8a', icon:'🔋', bonus:50,
  title:'Combustible local',
  desc:'Conecta pi a un modelo 100% local vía el router de llama.cpp.',
  steps:[
    {
      goal:'Configura el proveedor local llama.cpp',
      ctx:'llama-server ya corre en tu máquina con --jinja y --models-dir. Dile a pi que lo use.',
      accept:[/\/login/,/llama/],
      hint:'/login llama.cpp',
      ok:[['t-box','<span class="t-acc">Proveedor llama.cpp seleccionado</span><br><span class="t-dim">Introduce la URL del router…</span>']]
    },
    {
      goal:'Introduce la URL del router',
      ctx:'El router escucha en localhost, puerto 8080.',
      accept:[/127\.0\.0\.1:8080/],
      hint:'http://127.0.0.1:8080',
      ok:[['t-dim','Conexión guardada ✓  ( Health check: OK, 3 modelos descubiertos )']]
    },
    {
      goal:'Abre el gestor de modelos del router',
      ctx:'Con --no-models-autoload nada está cargado todavía.',
      accept:[/\/llama/],
      hint:'/llama',
      ok:[['t-box','<span class="t-acc">Modelos en ~/models:</span><br><span class="t-dim">› qwen2.5-coder-7b-q4_k_m.gguf  [no cargado]<br>› llama-3.2-1b-q4_k_m.gguf  [no cargado]<br>› ⬇ Download model… (Hugging Face)</span>']]
    },
    {
      goal:'Carga el modelo de código (el que empieza por qwen)',
      ctx:'Para coding, el 7B de Qwen en Q4_K_M es el punto dulce en 16 GB.',
      accept:[/qwen/],
      hint:'Selecciona qwen2.5-coder-7b',
      ok:[['t-dim','loading: llama_model_load  ████████ 100%<br>KV cache: q8_0 · ctx: 8192 · GPU: 33/33 layers'],['t-box','<span class="t-acc">Modelo cargado ✓</span><br><span class="t-dim">Speed: 38 tok/s generación · 210 tok/s prompt</span>']]
    },
    {
      goal:'Selecciónalo para esta sesión',
      ctx:'Cargado pero no seleccionado. Actívalo como modelo de la sesión.',
      accept:[/\/model/],
      hint:'/model',
      ok:[['t-box','<span class="t-acc">Modelo activo: qwen2.5-coder-7b (llama.cpp)</span>'],['t-dim','Footer: ~/proyectos/api-pagos · qwen2.5-coder-7b · contexto 0% · coste $0.00']]
    }
  ]
},
/* ============ MISIÓN 3 ============ */
{
  id:'m3', agent:'pi', ac:'#63d2ff', icon:'🎛️', bonus:60,
  title:'Piloto de sesión',
  desc:'Domina el control fino: abortar, compactar, sesiones y comandos de terminal.',
  steps:[
    {
      goal:'Detén la tarea en curso',
      ctx:'El agente lleva 4 ediciones y el refactor va por MAL camino. Actúa YA.',
      accept:[/^(esc|escape)$/],
      hint:'esc',
      ok:[['t-err','⚠ Task aborted — 4 edits rolled back to review'],['t-dim','Los mensajes encolados vuelven al editor.']]
    },
    {
      goal:'Libera contexto resumiendo la sesión',
      ctx:'Contexto al 92%. El modelo empieza a «olvidar» las reglas.',
      accept:[/\/compact/],
      hint:'/compact',
      ok:[['t-box','<span class="t-acc">Historial resumido: 92% → 31%</span><br><span class="t-dim">Decisions kept: refactor plan, AGENTS rules</span>']]
    },
    {
      goal:'Empieza una tarea totalmente distinta en limpio',
      ctx:'Nuevo dominio, nueva sesión. No arrastres historial.',
      accept:[/\/new/],
      hint:'/new',
      ok:[['t-box','<span class="t-acc">Nueva sesión creada</span> <span class="t-dim">(la anterior queda guardada)</span>']]
    },
    {
      goal:'Ejecuta los tests Y que el modelo vea el resultado',
      ctx:'Fallo intermitente en tests: quieres diagnosticarlo con ayuda del agente.',
      accept:[/^!\s*npm test/],
      hint:'!npm test',
      ok:[['t-dim','$ npm test<br>✗ auth.test.js — 1 failing<br>salida añadida al contexto ✓']]
    },
    {
      goal:'Ejecuta el build SIN ensuciar el contexto',
      ctx:'Build largo con output kilométrico. No aporta nada al modelo.',
      accept:[/^!!\s*npm run build/],
      hint:'!!npm run build',
      ok:[['t-dim','$ npm run build<br>vite v7 building…<br>✓ built in 42.31s'],['t-dim','(salida NO añadida al contexto ✓)']]
    },
    {
      goal:'Comando de terminal para retomar la última sesión mañana',
      ctx:'Cierras por hoy. La sesión quedó guardada automáticamente.',
      accept:[/pi\s+--continue/],
      hint:'pi --continue',
      ok:[['t-box','<span class="t-acc">Sesión restaurada: "refactor pagos"</span><br><span class="t-dim">14 mensajes · 31% contexto · qwen2.5-coder-7b</span>']]
    }
  ]
},
/* ============ MISIÓN 4 ============ */
{
  id:'m4', agent:'pi', ac:'#a78bfa', icon:'📖', bonus:40,
  title:'Manual de vuelo',
  desc:'Personaliza pi: AGENTS.md, skills y thinking. Un agente que trabaja como tú.',
  steps:[
    {
      goal:'¿Qué archivo creas en la raíz para reglas permanentes?',
      ctx:'Quieres que pi respete las convenciones del repo en CADA sesión de esta carpeta.',
      accept:[/agents\.md/],
      hint:'AGENTS.md',
      ok:[['t-box','<span class="t-acc">AGENTS.md creado</span><br><span class="t-dim">pi lo carga al arrancar en esta carpeta.</span>']]
    },
    {
      goal:'Crea la skill de PDFs: ¿qué archivo define una skill?',
      ctx:'Ahora quieres capacidades bajo demanda para trabajar con PDFs.',
      accept:[/skill\.md/],
      hint:'SKILL.md (dentro de una carpeta, ej: pdf-tools/)',
      ok:[['t-box','<span class="t-acc">pdf-tools/</span><br><span class="t-dim">├── SKILL.md<br>├── scripts/extract.sh<br>└── references/formats.md</span>'],['t-dim','Startup: skill anunciada (name + description) — contenido NO cargado aún.']]
    },
    {
      goal:'Fuerza la skill pdf-tools manualmente',
      ctx:'La tarea es claramente de PDFs pero el modelo no cargó la skill.',
      accept:[/\/skill:pdf-tools/],
      hint:'/skill:pdf-tools',
      ok:[['t-box','<span class="t-acc">Skill cargada: pdf-tools</span><br><span class="t-dim">Instrucciones en contexto. Continúa tu petición…</span>']]
    },
    {
      goal:'Sube el nivel de razonamiento (thinking) al máximo',
      ctx:'Tarea de arquitectura: quieres el máximo razonamiento del modelo.',
      accept:[/\/thinking/],
      hint:'/thinking high   (atajo: Shift+Tab cicla niveles)',
      ok:[['t-box','<span class="t-acc">Thinking: high</span> <span class="t-dim">— el borde del editor indica el nivel activo</span>']]
    }
  ]
},
/* ============ MISIÓN 5 ============ */
{
  id:'m5', agent:'opencode', ac:'#ffc46b', icon:'⚡', bonus:50,
  title:'Primer vuelo opencode',
  desc:'Instala opencode, genera AGENTS.md y alterna entre Plan y Build.',
  steps:[
    {
      goal:'Instala opencode (elige tu vía favorita)',
      ctx:'Terminal del sistema. El agente open-source espera.',
      accept:[/opencode\.ai\/install|opencode-ai/],
      hint:'curl -fsSL https://opencode.ai/install | bash   ·   o   npm i -g opencode-ai',
      ok:[['t-dim','opencode 1.x installed ✓']]
    },
    {
      goal:'Conecta tu cuenta de proveedor',
      ctx:'Antes de volar: autentícate con tu proveedor desde el CLI.',
      accept:[/opencode/,/auth/],
      hint:'opencode auth login',
      ok:[['t-box','<span class="t-acc">Provider connected ✓</span><br><span class="t-dim">Catálogo models.dev disponible</span>']]
    },
    {
      goal:'Genera el AGENTS.md del proyecto',
      ctx:'Abriste la TUI en un repo heredado sin instrucciones. Paso cero profesional.',
      accept:[/\/init/],
      hint:'/init',
      ok:[['t-dim','scanning… 47 files · package.json · tsconfig'],['t-box','<span class="t-acc">AGENTS.md generated ✓</span><br><span class="t-dim">Stack detectado: Next.js 15 + Prisma. Revísalo y afínalo a mano.</span>']]
    },
    {
      goal:'Cambia al agente de solo lectura (Plan)',
      ctx:'Vas a diseñar el enfoque de un refactor sin tocar ni un archivo.',
      accept:[/^tab$/],
      hint:'tab',
      ok:[['t-box','<span class="t-amb">Agent: PLAN</span> <span class="t-dim">(read-only)</span>']]
    },
    {
      goal:'Cambia de modelo al vuelo',
      ctx:'El plan está listo. Para Build quieres un modelo más potente.',
      accept:[/\/models?/],
      hint:'/models',
      ok:[['t-box','<span class="t-acc">Model picker</span><br><span class="t-dim">› claude-sonnet-4.5 ← actual<br>› gpt-5.2<br>› qwen2.5-coder-7b (local)</span>']]
    }
  ]
},
/* ============ MISIÓN 6 ============ */
{
  id:'m6', agent:'opencode', ac:'#6fd3ff', icon:'🚦', bonus:40,
  title:'Control de tráfico',
  desc:'Undo, compaction, share y permisos: pilotar opencode en producción.',
  steps:[
    {
      goal:'Revierte los cambios de archivo del último mensaje',
      ctx:'El último mensaje de Build dejó los estilos rotos.',
      accept:[/\/undo/],
      hint:'/undo',
      ok:[['t-box','<span class="t-acc">Reverted: 3 files</span> <span class="t-dim">(styles.css, Card.tsx, theme.ts)</span>']]
    },
    {
      goal:'Comprime el contexto de la sesión',
      ctx:'Arreglado. Pero la sesión arrastra mucho historial.',
      accept:[/\/compact/],
      hint:'/compact',
      ok:[['t-dim','Session summarized · context freed ✓']]
    },
    {
      goal:'Genera un enlace para que tu lead revise la sesión',
      ctx:'Tu tech lead quiere ver cómo llegaste a la solución.',
      accept:[/\/share/],
      hint:'/share',
      ok:[['t-box','<span class="t-acc">Share link created</span><br><span class="t-dim">⚠ La sesión completa se publica: revisa secrets y datos antes.</span>']]
    },
    {
      goal:'¿En qué archivo configuras permisos granulares (gatear git push)?',
      ctx:'Antes de soltar al agente en producción: confirmación para git push, denial para rm -rf.',
      accept:[/opencode\.json/],
      hint:'opencode.json',
      ok:[['t-box','<span class="t-acc">opencode.json</span>'],['t-dim','"permission": { "bash": { "git push": "ask", "rm -rf *": "deny" } }']]
    }
  ]
},
/* ============ MISIÓN 7 ============ */
{
  id:'m7', agent:'pi', ac:'#f0abfc', icon:'🔌', bonus:50,
  title:'Puente MCP',
  desc:'Conecta pi al mundo exterior: añade un servidor, valida, ajusta exposición y autoriza OAuth.',
  steps:[
    {
      goal:'Añade el servidor filesystem (nivel usuario)',
      ctx:'Terminal del sistema. Darás a pi acceso a archivos vía MCP con npx.',
      accept:[/pi/,/mcp/,/add/,/filesystem/],
      hint:'pi mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem .',
      ok:[['t-dim','Added user-level server "filesystem" → ~/.pi/agent/mcp.json'],['t-box','<span class="t-acc">✓ filesystem</span> <span class="t-dim">stdio · npx -y @modelcontextprotocol/server-filesystem .</span>']]
    },
    {
      goal:'Valida la conexión desde el shell',
      ctx:'Antes de entrar a pi: comprueba que el servidor conecta y cuántas tools expone.',
      accept:[/pi/,/mcp/,/list/],
      hint:'pi mcp list',
      ok:[['t-box','<span class="t-acc">filesystem</span> <span class="t-dim">· connected · 11 tools · exposure: codemode</span>']]
    },
    {
      goal:'Comando para inspeccionar servidores dentro de la sesión',
      ctx:'Ya dentro de pi. Quieres ver estado, tools y exposición sin salir.',
      accept:[/^\/mcp/],
      hint:'/mcp',
      ok:[['t-box','<span class="t-acc">Servers</span><br><span class="t-dim">› filesystem · connected · 11 tools · codemode<br>Selecciona uno para inspeccionar, reconectar o cambiar exposure</span>']]
    },
    {
      goal:'¿Qué exposure por defecto deja el contexto magro y descubre tools vía scripts?',
      ctx:'GitHub MCP trae 40+ tools. No quieres declararlas todas al modelo.',
      accept:[/codemode/],
      hint:'codemode',
      ok:[['t-box','<span class="t-acc">exposure: codemode ✓</span><br><span class="t-dim">El modelo usa searchTools()/describeTool() en scripts. Cero schemas inflando el contexto.</span>']]
    },
    {
      goal:'Oculta permanentemente las herramientas destructivas (delete_*)',
      ctx:'Política del equipo: nada de deletes desde el agente.',
      accept:[/hidden/],
      hint:'toolExposure: { "delete_*": "hidden" }',
      ok:[['t-dim','"toolExposure": { "delete_*": "hidden" } ✓'],['t-dim','Registradas pero inalcanzables. pi mcp list las marca.']]
    },
    {
      goal:'Sentry pide OAuth: inicia sesión desde la sesión',
      ctx:'El servidor remoto de Sentry rechaza la conexión sin credenciales.',
      accept:[/mcp/,/login/,/sentry/],
      hint:'/mcp login sentry',
      ok:[['t-dim','Abriendo navegador para autorización…'],['t-box','<span class="t-acc">✓ Sentry autorizado</span><br><span class="t-dim">Tokens en ~/.pi/agent/mcp-auth.json · se renuevan solos</span>']]
    }
  ]
},
/* ============ MISIÓN 8 ============ */
{
  id:'m8', agent:'pi', ac:'#2dd4bf', icon:'🧬', bonus:50,
  title:'Extensión propia',
  desc:'Escribe, prueba e instala una extensión de pi. Y prueba un paquete del catálogo sin instalarlo.',
  steps:[
    {
      goal:'Crea el archivo de la extensión hello.ts',
      ctx:'Terminal. Carpeta de extensiones de usuario: ~/.pi/agent/extensions/. Factory que recibe ExtensionAPI.',
      accept:[/hello\.ts/],
      hint:'hello.ts',
      ok:[['t-dim','✓ ~/.pi/agent/extensions/hello.ts creado'],['t-dim','export default function (pi: ExtensionAPI) { ... }']]
    },
    {
      goal:'Pruébala en desarrollo, sin instalarla',
      ctx:'Carga directa del archivo durante el desarrollo.',
      accept:[/pi/,/--extension/],
      hint:'pi --extension ./hello.ts',
      ok:[['t-box','<span class="t-acc">/hello disponible ✓</span> <span class="t-dim">(jiti: TypeScript sin compilar)</span>']]
    },
    {
      goal:'Comando para recargar extensiones editadas en caliente',
      ctx:'Editaste hello.ts con la sesión abierta.',
      accept:[/\/reload/],
      hint:'/reload',
      ok:[['t-dim','Extensiones recargadas ✓ — el runtime se reemplaza completo']]
    },
    {
      goal:'Instala un paquete de extensiones desde npm',
      ctx:'Quieres el paquete @example/pi-tools, versión pineada.',
      accept:[/pi/,/install/,/npm:/],
      hint:'pi install npm:@example/pi-tools@1.0.0',
      ok:[['t-dim','Installing @example/pi-tools@1.0.0…'],['t-box','<span class="t-acc">✓ Paquete instalado</span> <span class="t-dim">→ ~/.pi/agent/settings.json</span>']]
    },
    {
      goal:'Lista tus paquetes configurados',
      ctx:'Verificación rápida desde el shell.',
      accept:[/pi/,/list/],
      hint:'pi list',
      ok:[['t-box','<span class="t-acc">Packages:</span><br><span class="t-dim">› npm:@example/pi-tools@1.0.0 (pinned)</span>']]
    },
    {
      goal:'Prueba un paquete SIN añadirlo a settings (una invocación)',
      ctx:'Quieres evaluar otro paquete antes de comprometerte.',
      accept:[/pi/,/-e/,/npm:/],
      hint:'pi -e npm:@example/pi-tools',
      ok:[['t-box','<span class="t-acc">Paquete cargado para esta invocación ✓</span> <span class="t-dim">(settings intactos)</span>'],['t-dim','Siguiente parada: publicar el tuyo con keyword "pi-package" → pi.dev/packages']]
    }
  ]
}
];

