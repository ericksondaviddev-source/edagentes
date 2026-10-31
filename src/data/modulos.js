// AGENT/OS - datos: niveles y modulos (contenido editable)
const LEVELS = [
  {xp:0,    name:'Novato'},
  {xp:150,  name:'Operador'},
  {xp:350,  name:'Domador de contexto'},
  {xp:650,  name:'Arquitecto de agentes'},
  {xp:1000, name:'Agente Pro'},
  {xp:1500, name:'Leyenda del terminal'},
  {xp:2000, name:'Maestro de agentes'},
];

const MODULES = [
/* ============ MÓDULO 1 ============ */
{
  id:'fundamentos', num:'01', tag:'Nivel 1', ac:'#4fe3a5', icon:'🧠',
  title:'Fundamentos de agentes',
  desc:'Qué es realmente un agente, el bucle pensar → actuar → observar, y por qué el contexto lo es todo.',
  blocks:[
    {t:'h', x:'¿Qué es exactamente un agente de IA?'},
    {t:'p', x:'Un chatbot <b>responde</b>. Un agente <b>actúa</b>. Pi, opencode y similares combinan un LLM con herramientas reales — leer archivos, ejecutar comandos, editar código — dentro de un bucle que se repite hasta cumplir tu objetivo.'},
    {t:'code', x:'while (objetivo no cumplido) {\n  razonar(contexto)\n  accion = elegir_herramienta()  // leer | buscar | editar | ejecutar\n  resultado = ejecutar(accion)\n  contexto += resultado          // observa y corrige\n}'},
    {t:'h', x:'Los 3 ingredientes'},
    {t:'list', items:[
      '<b>Modelo</b> — el cerebro que razona (cloud como Claude, o local como Qwen2.5-Coder).',
      '<b>Herramientas</b> — las manos: filesystem, terminal, búsqueda, edición.',
      '<b>Contexto</b> — la memoria de trabajo: instrucciones, archivos con @, historial.'
    ]},
    {t:'tip', x:'El 80% de tus resultados vienen de la <b>calidad del contexto</b>, no de la marca del modelo. Un profesional alimenta al agente; no solo le habla.'},
    {t:'h', x:'El bucle en la práctica'},
    {t:'p', x:'Cuando pides algo a <code>pi</code>, ves cada lectura de archivo, cada búsqueda y cada edición en el transcript. El agente <b>no pide permiso antes de cada llamada</b>: tú supervisas el resultado, como un tech lead revisando el trabajo de un junior brillante y muy rápido.'},
    {t:'anim', v:'loop'},
    {t:'warn', x:'Con gran poder viene gran responsabilidad: revisa los comandos que ejecuta y los diffs que produce. Nunca lo dejes suelto en carpetas no confiables sin un sandbox o contenedor.'},
    {t:'h', x:'Glosario rápido'},
    {t:'table', rows:[
      ['provider','Servicio que te da acceso a un modelo (API, suscripción o local).'],
      ['token','Unidad de texto (~4 caracteres). El contexto y el coste se miden en tokens.'],
      ['contexto','Cuántos tokens "cabeza" el modelo a la vez. Es un recurso finito: adminístralo.'],
      ['AGENTS.md','Archivo de instrucciones persistentes que el agente carga en cada sesión.'],
      ['MCP','Protocolo para conectar herramientas externas al agente.']
    ]}
  ],
  quiz:[
    {type:'single', q:'¿Cuál es la diferencia esencial entre un chatbot y un agente de código?',
     opts:['El agente usa herramientas y actúa en un bucle hasta cumplir el objetivo','El agente siempre responde más rápido','El agente no necesita contexto para funcionar','El chatbot puede editar archivos y el agente no'],
     a:0, ex:'Un agente combina LLM + herramientas + bucle de observación. La velocidad no define a un agente, y ambos necesitan contexto.'},
    {type:'tf', q:'pi pide confirmación antes de cada llamada a herramientas por defecto.', a:false,
     ex:'Falso: pi muestra cada tool call y resultado en el transcript, pero no pide permiso en cada paso. La supervisión es tu trabajo.'},
    {type:'single', q:'En la analogía "cerebro / manos / memoria de trabajo", ¿qué componente son las manos?',
     opts:['El modelo','Las herramientas','El contexto','El tokenizer'],
     a:1, ex:'Las herramientas (leer, buscar, editar, ejecutar) son lo que permite al agente ACTUAR sobre tu sistema.'},
    {type:'multi', q:'¿Cuáles de estos forman parte del contexto de un agente?',
     opts:['Las instrucciones de AGENTS.md','Los archivos que añades con @','El historial de la sesión actual','Los GHz de tu procesador'],
     a:[0,1,2], ex:'El contexto es toda la información que el modelo ve: instrucciones persistentes, archivos referenciados y la conversación acumulada. Tu hardware no.'},
    {type:'order', q:'Ordena el bucle agéntico:',
     items:['Razona sobre el objetivo','Elige una herramienta','Ejecuta la acción','Observa el resultado','Repite hasta cumplir'],
     ex:'Razona → elige → ejecuta → observa → repite. Este ciclo es el corazón de cualquier agente, de pi a opencode.'}
  ]
},
/* ============ MÓDULO 2 ============ */
{
  id:'pi-basico', num:'02', tag:'Nivel 2', ac:'#63d2ff', icon:'🛩️',
  title:'pi: primer contacto',
  desc:'Instala pi, conecta un modelo, domina @, ! y los atajos que separan a un novato de un piloto.',
  blocks:[
    {t:'h', x:'Conoce a pi'},
    {t:'p', x:'pi es un agente <b>minimalista y extensible</b> que vive en tu terminal. Le das un objetivo y una carpeta de trabajo, y él inspecciona archivos, ejecuta comandos y edita contenido en tareas de varios pasos. La filosofía: <b>adapta pi a tu flujo, no al revés</b>.'},
    {t:'code', x:'# Requiere Node.js 22.19 o superior\nnpm install -g --ignore-scripts @earendil-works/pi-coding-agent\n\n# En macOS / Linux también existe:\ncurl -fsSL https://pi.dev/install.sh | sh'},
    {t:'h', x:'Tu primer despegue'},
    {t:'code', x:'cd /ruta/a/tu/proyecto\npi'},
    {t:'p', x:'pi usa esa carpeta para descubrir archivos, instrucciones y configuración, y para agrupar tus sesiones. Dentro, ejecuta <code>/login</code> para conectar un proveedor (suscripción o API key) y <code>/model</code> para elegir modelo.'},
    {t:'h', x:'Habla con archivos, no de archivos'},
    {t:'p', x:'Teclea <code>@</code> para buscar archivos e incluirlos directamente en el prompt. <code>Tab</code> autocompleta rutas. Esto es contexto quirúrgico: le das exactamente lo que necesita.'},
    {t:'code', x:'Resume @notas-reunion.md y guarda los action items en tareas.md'},
    {t:'h', x:'Comandos de terminal sin salir de pi'},
    {t:'code', x:'!git status      # ejecuta Y envía la salida al modelo\n!!npm test       # ejecuta SIN contaminar el contexto'},
    {t:'h', x:'Atajos de piloto'},
    {t:'list', items:[
      '<b>Enter</b> — envía; se encola y guía la siguiente respuesta aunque pi esté ocupado.',
      '<b>Alt+Enter</b> — encola trabajo para DESPUÉS de la tarea actual.',
      '<b>Esc</b> — aborta la tarea en curso. El freno de mano.',
      '<b>Ctrl+O</b> — expande la salida de herramientas. <b>Ctrl+T</b> — muestra el razonamiento.',
      '<b>Ctrl+L</b> — selector de modelo al instante. <b>Ctrl+G</b> — escribe prompts largos en tu editor.',
      '<b>Shift+Tab</b> — cicla el nivel de thinking del modelo.'
    ]},
    {t:'h', x:'Sesiones: tu historia es valiosa'},
    {t:'p', x:'pi guarda sesiones automáticamente: <code>/new</code>, <code>/resume</code>, <code>/name</code>, <code>/session</code>. Al salir, retoma con <code>pi --continue</code>. Para explorar otro enfoque sin perder el hilo: <code>/tree</code>, <code>/fork</code>, <code>/clone</code>. Y cuando el contexto crece: <code>/compact</code>.'},
    {t:'tip', x:'El footer muestra carpeta, sesión, modelo, uso de contexto y <b>coste acumulado</b>. Los pilotos profesionales miran los instrumentos constantemente.'}
  ],
  quiz:[
    {type:'blank', q:'Escribe el comando para arrancar pi en la carpeta actual:',
     accept:['pi'], placeholder:'…',
     ex:'Simplemente <code>pi</code> desde la carpeta de trabajo. La carpeta define qué archivos, instrucciones y sesiones descubre.'},
    {type:'single', q:'¿Para qué sirve teclear @ en el editor de pi?',
     opts:['Para buscar un archivo e incluirlo en el prompt','Para cambiar de modelo rápidamente','Para ejecutar un comando de terminal','Para abrir el selector de temas'],
     a:0, ex:'@ abre un buscador de archivos: contexto quirúrgico en el prompt. El selector de modelo es Ctrl+L o /model.'},
    {type:'single', q:'¿Cuál es la diferencia entre ! y !! en pi?',
     opts:['! es para git, !! para npm','! ejecuta y envía la salida al modelo; !! ejecuta sin enviarla','!! ejecuta dos veces el comando','No hay diferencia, es estilo'],
     a:1, ex:'Con ! el modelo ve la salida (útil para diagnosticar). Con !! mantienes el contexto limpio (útil para builds largos).'},
    {type:'multi', q:'¿Cuáles son comandos reales de pi?',
     opts:['/compact','/resume','/llama','/deploy'],
     a:[0,1,2], ex:'/compact libera contexto, /resume abre sesiones guardadas y /llama gestiona modelos del router llama.cpp. /deploy no existe… todavía.'},
    {type:'tf', q:'El comando pi --continue retoma la sesión más reciente de esa carpeta de trabajo.', a:true,
     ex:'Cierto. Las sesiones se agrupan por carpeta: --continue retoma la última, /resume te deja elegir cualquier otra.'}
  ]
},
/* ============ MÓDULO 3 ============ */
{
  id:'pi-pro', num:'03', tag:'Nivel 3', ac:'#a78bfa', icon:'🧩',
  title:'pi pro: personalización',
  desc:'AGENTS.md, skills, templates y extensiones: construye un agente que ya sabe trabajar como tú.',
  blocks:[
    {t:'h', x:'El mecanismo más pequeño que resuelve tu necesidad'},
    {t:'p', x:'La filosofía de pi: empezar por lo simple. Cada problema tiene su herramienta de precisión:'},
    {t:'table', rows:[
      ['AGENTS.md','Instrucciones persistentes para una carpeta.'],
      ['Prompt template','Reutilizar un prompt desde el menú /.'],
      ['Skill','Instrucciones específicas + archivos de apoyo por tipo de tarea.'],
      ['Extension','Herramientas ejecutables, comandos y manejadores de eventos.'],
      ['Package','Distribuir varios de estos recursos vía npm o git.']
    ]},
    {t:'h', x:'AGENTS.md — la memoria permanente'},
    {t:'p', x:'Colócalo en la raíz de tu proyecto y pi lo cargará en cada sesión de esa carpeta. Escribe convenciones, comandos y restricciones — no un manual.'},
    {t:'code', x:'# AGENTS.md\n## Proyecto: API de pagos\n- Stack: Node 22 + Fastify. Tests: npm test (vitest)\n- Estilo: TypeScript estricto, sin any, comillas simples\n- Antes de commit: npm run lint && npm test\n- Nunca modificar /infra sin confirmación explícita'},
    {t:'h', x:'Skills — conocimiento bajo demanda'},
    {t:'p', x:'Una skill es una carpeta con <code>SKILL.md</code> y archivos de apoyo. Al arrancar, pi solo anuncia <b>nombre + descripción</b> en el system prompt; el contenido completo se carga solo cuando la tarea lo requiere. Contexto justo a tiempo.'},
    {t:'code', x:'pdf-tools/\n├── SKILL.md\n├── scripts/\n│   └── extract.sh\n└── references/\n    └── formats.md\n\n---\nname: pdf-tools\ndescription: Extrae texto y tablas de PDFs.\n  Usar al leer, convertir o inspeccionar PDFs.\n---'},
    {t:'p', x:'Fuerza una skill con <code>/skill:pdf-tools extraer reporte.pdf</code>. Tras editarla durante una sesión: <code>/reload</code>.'},
    {t:'tip', x:'La <b>descripción es el enrutador</b>: debe decir qué hace la skill Y cuándo aplicarla. «Ayuda con PDFs» no enruta nada; «Usar al leer, convertir o inspeccionar PDFs», sí.'},
    {t:'h', x:'Y los superpoderes restantes'},
    {t:'list', items:[
      '<b>Prompt templates</b> — tus prompts recurrentes, invocables desde el menú /.',
      '<b>Extensiones</b> — herramientas y comandos a medida en TypeScript.',
      '<b>Temas</b> — cambia la estética de la TUI.',
      '<b>Paquetes</b> — instala skills + extensiones + temas de la comunidad en un paso.',
      '<b>SDK</b> — embebe pi dentro de tus propias aplicaciones.'
    ]},
    {t:'warn', x:'Las skills y extensiones de proyectos se ejecutan con tus permisos. Revisa el código de terceros antes de otorgar project trust a una carpeta.'}
  ],
  quiz:[
    {type:'single', q:'Necesitas que pi siempre respete las convenciones de tu repo. ¿Mecanismo ideal?',
     opts:['Repetírselo en cada prompt','AGENTS.md en la carpeta del proyecto','Una extensión en TypeScript','Cambiar de modelo'],
     a:1, ex:'Instrucciones persistentes por carpeta = AGENTS.md. La regla de oro de pi: el mecanismo más pequeño que resuelve la necesidad.'},
    {type:'single', q:'¿Cuándo carga pi el contenido completo de una skill?',
     opts:['Al arrancar, siempre','Solo cuando la tarea coincide con su descripción','Nunca, hay que leerla tú','Solo si usas el SDK'],
     a:1, ex:'Solo nombre y descripción van al system prompt al inicio. El contenido se carga bajo demanda: contexto justo a tiempo.'},
    {type:'blank', q:'¿Qué comando fuerza la skill pdf-tools en pi?',
     accept:['/skill:pdf-tools'], placeholder:'/skill:…',
     ex:'<code>/skill:pdf-tools</code> (y puedes añadir argumentos después: se añaden a la petición como pedido del usuario).'},
    {type:'single', q:'¿Qué campo de SKILL.md determina cuándo el modelo la considera?',
     opts:['name','description','license','version'],
     a:1, ex:'La description se muestra al modelo como material de enrutamiento. Debe responder: ¿qué hace y cuándo aplicar?'},
    {type:'multi', q:'¿Qué emparejamientos mecanismo → uso son correctos?',
     opts:['Prompt template → reutilizar un prompt frecuente','Skill → instrucciones + archivos de apoyo por tarea','Extension → herramientas ejecutables y eventos','AGENTS.md → cambiar el modelo de la sesión'],
     a:[0,1,2], ex:'El modelo se cambia con /model o Ctrl+L. AGENTS.md es para instrucciones persistentes, no para elegir modelos.'}
  ]
},
/* ============ MÓDULO 4 ============ */
{
  id:'opencode', num:'04', tag:'Nivel 4', ac:'#ffc46b', icon:'⚡',
  title:'opencode de cero a pro',
  desc:'El agente open-source con arquitectura client/server: /init, agentes Plan y Build, permisos y modelos.',
  blocks:[
    {t:'h', x:'¿Por qué opencode también?'},
    {t:'p', x:'opencode es el agente <b>open-source</b> con arquitectura client/server: la misma sesión desde TUI, desde código con <code>opencode run</code>, o en modo servidor. Su catálogo (<i>models.dev</i>) conecta con casi cualquier proveedor — incluidos tus modelos locales vía endpoints compatibles con OpenAI.'},
    {t:'code', x:'curl -fsSL https://opencode.ai/install | bash\n# o bien:\nnpm i -g opencode-ai\n\nopencode        # TUI en tu carpeta\nopencode run "explica la estructura del repo"'},
    {t:'h', x:'Paso cero profesional: /init'},
    {t:'p', x:'En un repo nuevo, ejecuta <code>/init</code>: opencode analiza el proyecto y genera un <b>AGENTS.md</b> con su estructura, comandos y convenciones. Revisarlo y afinarlo a mano es la primera inversión que todo profesional hace.'},
    {t:'h', x:'Build vs Plan: dos velocidades'},
    {t:'p', x:'Con <b>Tab</b> alternas entre agentes. <b>Plan</b> es de solo lectura: perfecta para diseñar el enfoque sin tocar nada. <b>Build</b> ejecuta los cambios. El flujo pro: planear en Plan, validar contigo, y solo entonces pasar a Build.'},
    {t:'h', x:'Modelos, auth y configuración'},
    {t:'code', x:'opencode auth login   # conecta Anthropic, OpenAI, Google…\n/models                # cambia de modelo al vuelo'},
    {t:'p', x:'El archivo <code>opencode.json</code> configura todo: proveedores custom, MCP, formatters y permisos. Así conectas un modelo local servido por Ollama:'},
    {t:'code', x:'{\n  "$schema": "https://opencode.ai/config.json",\n  "provider": {\n    "mi-llama": {\n      "npm": "@ai-sdk/openai-compatible",\n      "options": { "baseURL": "http://localhost:11434/v1" },\n      "models": { "qwen2.5-coder-7b": {} }\n    }\n  }\n}'},
    {t:'h', x:'Control quirúrgico'},
    {t:'list', items:[
      '<b>/undo · /redo</b> — revierten los cambios de archivo del último mensaje. Experimentar sin miedo.',
      '<b>/compact</b> — resume la sesión cuando el contexto crece.',
      '<b>/share</b> — genera un enlace para revisar la sesión.',
      '<b>Permisos</b> — granulares por herramienta y patrón de comando.'
    ]},
    {t:'code', x:'{\n  "permission": {\n    "edit": "allow",\n    "bash": {\n      "git push": "ask",\n      "rm -rf *": "deny",\n      "*": "allow"\n    }\n  }\n}'},
    {t:'tip', x:'Los agentes custom viven en <code>.opencode/agent/</code> como Markdown con frontmatter: define modelo, tools y permisos por rol (reviewer, test-writer, docs…).'}
  ],
  quiz:[
    {type:'single', q:'¿Qué hace /init en opencode?',
     opts:['Inicializa git','Analiza el proyecto y genera un AGENTS.md','Descarga el modelo por defecto','Crea una cuenta'],
     a:1, ex:'/init escanea la estructura y convenciones del repo para generar AGENTS.md — el punto de partida profesional.'},
    {type:'single', q:'¿Qué alterna la tecla Tab en la TUI de opencode?',
     opts:['Entre archivos abiertos','Entre los agentes Plan y Build','Entre temas claro/oscuro','Entre proveedores'],
     a:1, ex:'Tab alterna Plan (solo lectura, para diseñar) y Build (ejecuta cambios). Dos velocidades, un flujo.'},
    {type:'single', q:'Ejecutaste un mensaje y el agente arruinó tres archivos. ¿Qué haces?',
     opts:['git reset --hard a ciegas','/undo para revertir los cambios de ese mensaje','Cerrar el terminal y rezar','/new'],
     a:1, ex:'/undo revierte exactamente los cambios de archivo del último mensaje. Precisión quirúrgica antes de recurrir a git.'},
    {type:'multi', q:'Sobre los permisos en opencode.json, ¿cuáles son ciertas?',
     opts:['Pueden pedir confirmación para comandos bash concretos','Pueden denegar patrones como rm -rf *','Son granulares por herramienta (edit, bash…)','Desactivan el LSP del proyecto'],
     a:[0,1,2], ex:'El sistema de permisos es granular: ask/allow/deny por herramienta y patrón. El LSP es otra pieza, ajena a permisos.'},
    {type:'tf', q:'opencode puede conectarse a modelos locales vía endpoints compatibles con OpenAI.', a:true,
     ex:'Cierto: defines un proveedor con npm @ai-sdk/openai-compatible y el baseURL de tu servidor local (Ollama, llama.cpp, LM Studio…).'}
  ]
},
/* ============ MÓDULO 5 ============ */
{
  id:'local', num:'05', tag:'Nivel 5', ac:'#ff7a8a', icon:'🔥',
  title:'LLMs locales en PCs humildes',
  desc:'Cuantización, GGUF, llama.cpp y trucos de profesional para exprimir hardware modesto hasta el máximo.',
  blocks:[
    {t:'h', x:'¿Por qué un LLM local?'},
    {t:'p', x:'<b>Privacidad total</b> (tu código nunca sale), <b>coste cero por token</b> y funciona <b>offline</b>. A cambio: menos capacidad bruta que los modelos cloud tope de gama. La jugada profesional no es elegir uno: es <b>usar cada herramienta donde gana</b>.'},
    {t:'h', x:'Cuantización en 20 segundos'},
    {t:'p', x:'Los pesos originales (FP16) se comprimen a enteros: <b>Q8 → Q5 → Q4 → Q3</b>, en formato <code>GGUF</code>. Cada paso reduce RAM y tiempo de carga… y un poco de calidad. El punto dulce para coding en hardware modesto: <b>Q4_K_M</b>.'},
    {t:'table', rows:[
      ['4 GB RAM','1–1.5B: Qwen2.5-Coder-1.5B, Llama-3.2-1B (Q4)'],
      ['8 GB RAM','3–4B: Qwen2.5-Coder-3B, Phi-4-mini, Gemma-3-4B (Q4)'],
      ['16 GB RAM','7–8B: Qwen2.5-Coder-7B ⭐ el mejor codificador pequeño'],
      ['32 GB RAM','14B cómodo; 32B en Q4 justito']
    ]},
    {t:'anim', v:'quant'},
    {t:'h', x:'llama.cpp: el motor'},
    {t:'code', x:'llama-server \\\n  --models-dir ~/models \\\n  --no-models-autoload \\\n  --jinja \\\n  --host 127.0.0.1 --port 8080 \\\n  -ngl 999 \\\n  -c 8192'},
    {t:'list', items:[
      '<b>--jinja</b> — activa chat templates y tool calling. SIN esto, los agentes no funcionan bien. Crítico.',
      '<b>-ngl N</b> — capas que se descargan a GPU. 999 = todas las que quepan. En PC sin GPU: -ngl 0.',
      '<b>-c N</b> — tamaño de contexto. Cada token de contexto consume RAM en la KV cache. No es gratis.',
      '<b>--cache-type-k q8_0</b> — cuantiza la KV cache: aprox. la mitad de RAM para el contexto.',
      '<b>-fa</b> — flash attention: menos memoria y más velocidad donde está soportado.',
      '<b>-t N</b> — hilos = núcleos físicos (no lógicos) en CPU.'
    ]},
    {t:'warn', x:'El error clásico: el modelo «cabe», pero pones -c 131072 y la máquina entra en swap. El contexto mata equipos humildes por sí solo: empieza en 4096–8192 y sube solo si lo necesitas.'},
    {t:'h', x:'Conéctalo a pi'},
    {t:'p', x:'pi soporta el router de llama.cpp de forma nativa. Dentro de pi:'},
    {t:'code', x:'/login llama.cpp      # URL: http://127.0.0.1:8080\n/llama                # carga, descarga y gestiona modelos\n/model                # selecciona el modelo cargado'},
    {t:'p', x:'Desde <code>/llama</code> puedes <b>buscar en Hugging Face y descargar cuantizaciones</b> sin salir del agente. Alternativas: <code>ollama serve</code> (puerto 11434, API en /v1) y LM Studio (puerto 1234, /v1) — ambos exponen API compatible con OpenAI para cualquier agente.'},
    {t:'h', x:'Trucos de profesional con modelos pequeños'},
    {t:'list', items:[
      '<b>Tareas pequeñas y específicas</b>: «renombra estas 3 funciones» rinde; «refactoriza el proyecto» fracasa.',
      '<b>Contexto mínimo viable</b>: @ solo los archivos necesarios. Cada token irrelevante degrada a un modelo pequeño.',
      '<b>AGENTS.md corto y concreto</b>: los modelos pequeños se pierden con manuales largos.',
      '<b>Temperatura baja</b> (0–0.3) para código: determinismo sobre creatividad.',
      '<b>Flujo híbrido</b>: local para lo mecánico y voluminoso, cloud para lo difícil. Así trabajan los pros.',
      '<b>Mide</b>: si procesa el prompt más rápido de lo que escribe, hay margen de contexto; si va a 2 tok/s, baja modelo o contexto.'
    ]},
    {t:'tip', x:'Un 7B bien dirigido —con contexto enfocado e instrucciones concretas— suele <b>ganar</b> a un 14B mal alimentado. Dirigir > tamaño.'}
  ],
  quiz:[
    {type:'single', q:'Para coding en hardware modesto, ¿qué cuantización es el punto dulce calidad/RAM?',
     opts:['FP16 (sin cuantizar)','Q4_K_M','Q2_K','Q8_0 siempre que quepa'],
     a:1, ex:'Q4_K_M ofrece el mejor equilibrio: ~4-5 GB para un 7B con pérdida de calidad mínima. FP16 y Q8 desperdician RAM; Q2 degrada demasiado.'},
    {type:'single', q:'PC con 8 GB de RAM. ¿Elección profesional?',
     opts:['Llama-3.2-3B o Qwen2.5-Coder-3B en Q4','Qwen2.5-Coder-32B en Q8','Un 70B porque «la RAM se estira»','Cualquiera, la RAM no importa'],
     a:0, ex:'Con 8 GB: familia 3–4B en Q4, dejando margen para contexto y sistema. Realismo > optimismo.'},
    {type:'multi', q:'¿Qué ajustes ayudan a exprimir un PC humilde con llama.cpp?',
     opts:['-ngl para descargar capas a GPU','-c bajo (4096–8192) para ahorrar RAM en la KV cache','--cache-type-k q8_0 para cuantizar la KV cache','-c 131072 para que nunca falte contexto'],
     a:[0,1,2], ex:'Contextos gigantes son el enemigo del hardware modesto: la KV cache consume RAM por sí sola. Empieza pequeño y sube según necesidad.'},
    {type:'tf', q:'El flag --jinja es crítico para usar modelos locales con agentes porque habilita chat templates y tool calling.', a:true,
     ex:'Cierto. Sin tool calling bien formateado, el agente no puede invocar herramientas de forma fiable. --jinja no es opcional en modo agente.'},
    {type:'blank', q:'En pi, ¿qué comando gestiona los modelos del router llama.cpp (cargar, descargar, buscar en Hugging Face)?',
     accept:['/llama'], placeholder:'/…',
     ex:'<code>/llama</code> — carga/descarga modelos y hasta busca cuantizaciones en Hugging Face sin salir de pi.'},
    {type:'order', q:'Ordena los pasos para conectar pi a tu modelo local:',
     items:['/login llama.cpp','Introducir la URL http://127.0.0.1:8080','/llama para cargar el modelo','/model para seleccionarlo en la sesión'],
     ex:'Autenticar → apuntar al router → cargar modelo → seleccionarlo. Cuatro pasos y tu agente vuela offline.'}
  ]
},
/* ============ MÓDULO 6 ============ */
{
  id:'workflow', num:'06', tag:'Nivel 6', ac:'#6fd3ff', icon:'🎯',
  title:'Workflow de profesional',
  desc:'El ciclo completo: planear, ejecutar por pasos, revisar diffs, seguridad y presupuesto. Cómo se trabaja de verdad.',
  blocks:[
    {t:'h', x:'El ciclo del profesional'},
    {t:'list', items:[
      '<b>1 · Clarifica</b> — objetivo y criterios de éxito antes de escribir el prompt.',
      '<b>2 · Red de seguridad</b> — commit limpio o rama nueva antes de tocar nada.',
      '<b>3 · Plan</b> — pide el enfoque primero (Plan en opencode, thinking alto en pi). Valídalo TÚ.',
      '<b>4 · Ejecuta en pasos</b> — tareas pequeñas y verificables, no «hazme la app».',
      '<b>5 · Revisa el diff</b> — git diff es tu trabajo de tech lead. Nadie mergea a ciegas.',
      '<b>6 · Verifica y commit</b> — tests, lint, commit. Sesión nueva para la siguiente tarea.'
    ]},
    {t:'p', x:'El error de principiante es un mega-prompt: «construye un e-commerce completo». El profesional descompone: modelo de datos → endpoints → tests → UI. Cada paso verificable, cada error barato de corregir.'},
    {t:'h', x:'El contexto es una inversión'},
    {t:'p', x:'AGENTS.md vivo y afinado, skills por dominio, <code>@</code> a archivos exactos, sesiones cortas por tarea y <code>/compact</code> preventivo. El contexto mal gestionado es la causa #1 de agentes que «se olvidan» o alucinan.'},
    {t:'h', x:'Seguridad: el manual que nadie lee hasta el incidente'},
    {t:'list', items:[
      '<b>Lee cada comando</b> que el agente ejecuta. Los transcript existen para eso.',
      '<b>Sandbox o contenedor</b> para código no confiable o trabajo desatendido.',
      '<b>Nunca pegues secretos</b> en el prompt: van al contexto, al historial y quizá a un /share.',
      '<b>/share publica toda la sesión</b> — prompts, archivos y credenciales incluidos. Revísala antes.'
    ]},
    {t:'h', x:'Presupuesto y foco'},
    {t:'p', x:'El footer de pi muestra coste acumulado: míralo. Modelos grandes solo donde aportan (arquitectura, debugging difícil); lo mecánico y voluminoso en modelos pequeños o locales. El coste de una sesión mal dirigida no es solo dinero: es tiempo revisando basura.'},
    {t:'h', x:'Cuándo NO usar un agente'},
    {t:'list', items:[
      'Tareas triviales de 10 segundos: abrir el agente cuesta más que hacerlas.',
      'Decisiones de diseño que son gusto personal: el agente propone, tú decides.',
      'Código crítico sin tests: primero la red de seguridad, después el agente.'
    ]},
    {t:'tip', x:'Tu certificación final es este módulo dominado + las misiones del simulador. Después: el terminal real. El bucle es el mismo — razona, actúa, observa, repite.'}
  ],
  quiz:[
    {type:'order', q:'Ordena el ciclo de trabajo profesional con agentes:',
     items:['Commit limpio o rama nueva','Planear el enfoque con el agente','Ejecutar en pasos verificables','Revisar el git diff','Tests y commit final'],
     ex:'Red de seguridad → plan → pasos → revisión → verificación. Así los errores se detectan donde son baratos.'},
    {type:'single', q:'¿Qué haces ANTES de dejar a un agente editar libremente tu proyecto?',
     opts:['Subir el volumen de la música','Un commit limpio o crear una rama','Borrar los tests para que no molesten','Desactivar el terminal'],
     a:1, ex:'Sin punto de restauración, un error del agente se mezcla con tu trabajo. El commit previo hace que revertir sea barato.'},
    {type:'multi', q:'¿Cuáles son prácticas de seguridad correctas con agentes?',
     opts:['Revisar los comandos que ejecuta','Usar sandbox/contenedor con código no confiable','No pegar secretos en los prompts','Recordar que /share publica todo el historial'],
     a:[0,1,2,3], ex:'Todas. Los transcript existen para supervisar, los sandbox limitan daños, los secretos en el contexto se filtran fácil, y /share es público.'},
    {type:'single', q:'¿Cuál es la mejor estrategia de contexto para una sesión productiva?',
     opts:['Pegar el repositorio entero por si acaso','Archivos exactos con @, sesiones cortas por tarea y /compact preventivo','No dar nunca contexto, que adivine','Cambiar de modelo cada mensaje'],
     a:1, ex:'Contexto quirúrgico: relevante, mínimo y fresco. Pegar todo contamina el razonamiento y dispara coste.'},
    {type:'tf', q:'Para refactorizar 40 archivos con un contexto enorme, un modelo local de 3B es la mejor opción.', a:false,
     ex:'Falso: contextos enormes + tarea de gran alcance es el escenario cloud (o modelo grande). Los locales pequeños brillan en tareas enfocadas.'},
    {type:'single', q:'¿En qué caso NO deberías usar un agente?',
     opts:['Refactor multi-archivo con tests','Renombrar una variable en 10 segundos','Debugging de un fallo intermitente','Generar datos de prueba'],
     a:1, ex:'Abrir el agente, redactar el prompt y revisar la salida cuesta más que los 10 segundos manuales. El profesional sabe cuándo NO automatizar.'}
  ]
},
/* ============ MÓDULO 7 ============ */
{
  id:'mcp', num:'07', tag:'Nivel 7', ac:'#f0abfc', icon:'🔌',
  title:'MCP a fondo',
  desc:'Model Context Protocol: el estándar que conecta tu agente con el mundo. Servidores, transportes, exposición de tools y OAuth.',
  blocks:[
    {t:'h', x:'¿Qué es MCP y por qué te importa?'},
    {t:'p', x:'<b>Model Context Protocol</b> es el estándar abierto que conecta agentes con herramientas y datos externos. Piénsalo como el <b>USB-C de las herramientas de IA</b>: escribes (o instalas) un servidor una vez y lo conectas a pi, opencode, Claude Desktop, Cursor… sin código pegamento.'},
    {t:'anim', v:'mcp'},
    {t:'p', x:'La arquitectura: tu agente actúa como <b>host/cliente MCP</b> y se conecta a <b>servidores MCP</b> — procesos locales o servicios remotos que exponen <b>tools</b> (funciones que el modelo invoca), <b>resources</b> (datos legibles) y <b>prompts</b> (plantillas). Todo habla JSON-RPC.'},
    {t:'code', x:'# Servidor local (stdio) en 10 segundos:\npi mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem .\n\n# Servidor remoto (HTTP) con token por variable de entorno:\npi mcp add docs --url https://example.com/mcp --bearer-token-env-var DOCS_TOKEN\n\n# Valida conexiones y tools:\npi mcp list'},
    {t:'h', x:'Los dos transportes'},
    {t:'table', rows:[
      ['stdio','Proceso local: command + args + env + cwd. Rápido y privado. Ideal para filesystem, git, bases de datos locales.'],
      ['streamable HTTP','Servidor remoto: url + headers + oauth. Para APIs compartidas y servicios en la nube.']
    ]},
    {t:'warn', x:'pi no soporta el transporte SSE legacy. Muchos servidores que documentan /sse también ofrecen streamable HTTP, normalmente en /mcp. Apunta ahí.'},
    {t:'h', x:'Dónde vive la configuración'},
    {t:'list', items:[
      '<b>~/.pi/agent/mcp.json</b> — servidores personales y con credenciales. Disponibles en todas tus carpetas.',
      '<b>.pi/mcp.json</b> (proyecto) — servidores que el proyecto exige. Solo se carga tras otorgar project trust; una entrada con el mismo nombre sustituye a la de usuario.'
    ]},
    {t:'code', x:'{\n  "mcpServers": {\n    "filesystem": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]\n    },\n    "docs": {\n      "url": "https://example.com/mcp",\n      "headers": { "Authorization": "Bearer ${DOCS_TOKEN}" },\n      "description": "Busca y lee la documentación del producto"\n    },\n    "sentry": { "url": "https://mcp.sentry.dev/mcp" }\n  }\n}'},
    {t:'p', x:'El formato <code>mcpServers</code> es el mismo que Claude Desktop, Claude Code y Cursor: copiar y pegar suele funcionar. Cada herramienta se registra como <code>mcp__servidor__herramienta</code>.'},
    {t:'h', x:'El concepto pro: exposición de herramientas'},
    {t:'p', x:'¿40 herramientas de GitHub declaradas siempre al modelo? Contexto inflado y modelo confundido. pi resuelve esto con <b>exposure</b> por servidor y por herramienta:'},
    {t:'table', rows:[
      ['codemode (default)','El modelo no las ve: las descubre con searchTools() y las llama desde scripts. Contexto magro.'],
      ['deferred','Se cargan al vuelo cuando tool_search encuentra una coincidencia. Para servidores grandes.'],
      ['direct','Declaradas al modelo siempre, como las built-in. Solo para sets pequeños y de uso frecuente.'],
      ['hidden','Registradas pero inalcanzables. Perfecto para desactivar delete_* y similares.']
    ]},
    {t:'code', x:'"github": {\n  "url": "https://api.githubcopilot.com/mcp/",\n  "exposure": "deferred",\n  "toolExposure": {\n    "search_code": "direct",\n    "get_*": "codemode",\n    "delete_*": "hidden"\n  }\n}'},
    {t:'tip', x:'La regla profesional: <b>direct solo para lo que usas en cada sesión</b>; todo lo demás, codemode/deferred. Menos tokens de schema = más espacio para tu código.'},
    {t:'h', x:'OAuth sin dolor'},
    {t:'p', x:'Servidores remotos con OAuth (Sentry, Figma…): solo la <code>url</code> en la config. Cuando pidan credenciales, <code>/mcp</code> lo muestra y <code>/mcp login sentry</code> abre el navegador para autorizar. pi guarda y renueva los tokens solo.'},
    {t:'h', x:'Seguridad: lee esto dos veces'},
    {t:'list', items:[
      '<b>Los servidores se ejecutan con TUS permisos</b>. Audita qué instalas: código solo de fuentes confiables.',
      'La config de proyecto exige <b>project trust</b> — no la otorgues a carpetas ajenas a ciegas.',
      'Los resultados de tools pueden traer <b>inyección de prompts</b>. Revisa qué entra a tu contexto.',
      'Textos de resultados mayores de 20 KB llegan truncados al modelo; el texto completo va a un archivo temporal.'
    ]},
    {t:'h', x:'En opencode'},
    {t:'code', x:'// opencode.json\n{\n  "mcp": {\n    "filesystem": {\n      "type": "local",\n      "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "."]\n    },\n    "docs": { "type": "remote", "url": "https://example.com/mcp" }\n  }\n}'},
    {t:'tip', x:'Migrar entre clientes: Claude Desktop/Cursor copian tal cual; desde opencode, local → stdio (separa command y args), environment → env, {env:NAME} → ${NAME}. Después: pi mcp list para validar.'}
  ],
  quiz:[
    {type:'single', q:'¿Qué problema resuelve MCP?',
     opts:['Cómo se entrena un LLM','Cómo conectan los agentes con herramientas y datos externos, de forma estándar','Cómo se cuantizan los modelos','Cómo se facturan los tokens'],
     a:1, ex:'MCP estandariza la conexión host (pi, opencode, Claude Desktop…) ↔ servidores de herramientas. El «USB-C» de las herramientas de IA.'},
    {type:'multi', q:'¿Qué puede exponer un servidor MCP?',
     opts:['Tools: funciones que el modelo invoca','Resources: datos legibles por URI','Prompts: plantillas reutilizables','Modelos: para entrenar en local'],
     a:[0,1,2], ex:'Las tres primitivas del protocolo: tools, resources y prompts. Los modelos no se entrenan vía MCP.'},
    {type:'single', q:'Quieres dar a pi acceso a los archivos de tu disco. ¿Transporte y forma correcta?',
     opts:['HTTP con url pública','stdio local con command + args','SSE legacy a /sse','Copiar los archivos a mano'],
     a:1, ex:'Para procesos locales: stdio. Ej.: pi mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem .'},
    {type:'blank', q:'¿Qué comando de pi lista los servidores MCP, valida conexiones y muestra sus tools?',
     accept:['pi mcp list'], placeholder:'pi mcp …',
     ex:'<code>pi mcp list</code> — conecta a cada servidor activo y reporta estado y tools; sale con código 1 si algo falla (útil en CI).'},
    {type:'single', q:'¿Cuál es el nivel de exposición por defecto de las tools MCP en pi?',
     opts:['direct — siempre declaradas al modelo','hidden','codemode — el modelo las descubre vía scripts','deferred'],
     a:2, ex:'Por defecto codemode: el contexto queda magro y los scripts encuentran y combinan tools con searchTools().'},
    {type:'tf', q:'pi soporta servidores MCP que solo ofrecen transporte SSE legacy.', a:false,
     ex:'Falso: stdio y streamable HTTP. Si documentan /sse, prueba el endpoint /mcp — casi todos los servidores lo ofrecen.'},
    {type:'order', q:'Ordena el flujo profesional para adoptar un servidor MCP:',
     items:['Elegir un servidor confiable y auditar su código','Añadirlo con pi mcp add (o editando mcp.json)','Validar con pi mcp list','Inspeccionar y ajustar exposición dentro de la sesión con /mcp'],
     ex:'Auditar → configurar → validar → afinar exposición. Así se agregan integraciones sin abrir la puerta a nada raro.'}
  ]
},
/* ============ MÓDULO 8 ============ */
{
  id:'graduacion', num:'08', tag:'Nivel Final', ac:'#f6c945', icon:'🎓',
  title:'Graduación: vuelo solo',
  desc:'El examen final que cruza todo el temario, la checklist de ejercicios reales y el criterio de certificación.',
  blocks:[
    {t:'h', x:'El examen final'},
    {t:'p', x:'15 preguntas que cruzan los 7 módulos — sin simulador y sin pistas. Necesitas <b>80% (12/15)</b> para certificarte. Cada acierto vale <b>+25 XP</b> y el perfecto suma <b>+100</b> con insignia de oro. Es el único quiz que se siente como un examen de verdad: los errores aquí son exactamente los que te costarían sesiones reales.'},
    {t:'h', x:'Checklist de vuelo solo'},
    {t:'p', x:'La certificación real ocurre FUERA de esta app. Siete ejercicios con evidencia concreta:'},
    {t:'list', items:[
      '<b>1 · Instala y conecta</b> — pi y opencode instalados, un modelo activo (cloud o local). Evidencia: <code>pi --version</code> y una sesión con respuesta.',
      '<b>2 · Memoria permanente</b> — AGENTS.md real en tu proyecto (usa la Forja). Evidencia: pi lo anuncia al arrancar en el header de instrucciones.',
      '<b>3 · Conocimiento a demanda</b> — una skill para una tarea que hagas cada semana. Evidencia: <code>/skill:nombre</code> la fuerza y funciona.',
      '<b>4 · El puente</b> — un servidor MCP que necesites de verdad, añadido y validado. Evidencia: <code>pi mcp list</code> en verde.',
      '<b>5 · Vuelo completo</b> — una sesión pro de principio a fin: plan → 3 pasos verificables → diff revisado → tests → commit. Evidencia: el commit en tu historial.',
      '<b>6 · Combustible local</b> — una tarea real resuelta con un modelo servido por <code>llama-server --jinja</code>. En PC humilde: Q4_K_M y contexto pequeño.',
      '<b>7 · Recuperación</b> — rompe algo a propósito y recupera: <code>/undo</code> en opencode, git checkout en pi. Evidencia: working dir limpio otra vez.'
    ]},
    {t:'tip', x:'Criterio de graduación: <b>7/7 ejercicios con evidencia + examen ≥ 80%</b>. Apúntalo en un issue o README de tu proyecto — la honestidad es parte del pro.'},
    {t:'warn', x:'Nadie te va a examinar de verdad: la certificación es autoimpuesta. El único juez es la calidad de tu trabajo en el terminal real.'},
    {t:'h', x:'Después de graduarte'},
    {t:'list', items:[
      '<b>Contribuye</b> — publica tus skills y paquetes a la comunidad vía npm o git.',
      '<b>Construye</b> — el SDK de pi te deja embeber agentes en tus propias apps.',
      '<b>Multiplica</b> — dirigir agentes es una habilidad que se enseña enseñando.',
      '<b>Madura la Forja</b> — tus artefactos reales evolucionan con cada proyecto; vuelve a regenerarlos cuando tu stack cambie.'
    ]}
  ],
  quiz:[
    {type:'single', q:'El agente lleva 3 ediciones raras y el contexto va al 90%. ¿Secuencia correcta?',
     opts:['Esc para abortar → /compact → reorientar con un mensaje preciso','/new inmediatamente y empezar de cero','Dejar que termine y revisar todo al final','Subir el thinking a máximo y continuar'],
     a:0, ex:'Frenar → liberar contexto → reorientar con precisión. Dejar que termine multiplica el daño; /new descarta trabajo útil.'},
    {type:'tf', q:'Un AGENTS.md largo y detallado siempre mejora el rendimiento de los modelos pequeños.', a:false,
     ex:'Falso: los modelos pequeños se pierden con manuales. AGENTS.md profesional = convenciones y comandos concretos, no documentación.'},
    {type:'multi', q:'¿Qué meten los profesionales en su AGENTS.md?',
     opts:['Comandos de build y test','Convenciones de estilo del repo','Zonas prohibidas (ej: /infra)','El historial completo de sesiones anteriores'],
     a:[0,1,2], ex:'Reglas accionables sí; historia no. El contexto histórico lo gestiona la sesión, no el AGENTS.md.'},
    {type:'single', q:'¿Cuál description de SKILL.md enruta mejor?',
     opts:['Ayuda con PDFs','Utilidades varias de documentos','Extrae texto y tablas de PDFs. Usar al leer, convertir o inspeccionar PDFs.','skill v2 final corregida'],
     a:2, ex:'La descripción es el enrutador: debe decir qué hace Y cuándo aplicar. Las otras son ruido que el modelo ignora.'},
    {type:'blank', q:'Comando de pi que lista los servidores MCP, valida conexiones y sale con código 1 si algo falla:',
     accept:['pi mcp list'], placeholder:'pi mcp …',
     ex:'<code>pi mcp list</code> — tu puerta de validación en CI y antes de cada sesión.'},
    {type:'single', q:'Un servidor MCP trae 40+ tools. ¿Exposure para que el modelo no las vea todas pero los scripts puedan encontrarlas?',
     opts:['direct','hidden','codemode','ninguna: hay que elegirlas a mano'],
     a:2, ex:'codemode: el modelo las descubre con searchTools() y las combina en scripts. Contexto magro, poder completo.'},
    {type:'order', q:'Ordena la recuperación de un agente que va por mal camino:',
     items:['Detecta la desviación temprano','Aborta la tarea (Esc)','Revisa qué cambió con git diff','Reorienta con un mensaje preciso y pequeño','Commit del arreglo verificado'],
     ex:'Detectar → frenar → diagnosticar → corregir pequeño → sellar. El arreglo pequeño y verificado siempre gana.'},
    {type:'single', q:'PC con 16 GB de RAM. ¿Configuración profesional para coding local?',
     opts:['Qwen2.5-Coder-7B en Q4_K_M con -c 8192','Un 32B en Q8 «por si acaso»','-c 131072 para nunca quedarte sin contexto','Dos modelos a la vez en la misma GPU'],
     a:0, ex:'7B Q4_K_M (~4.4 GB) + contexto moderado = margen para el sistema y la KV cache. Realismo > optimismo.'},
    {type:'tf', q:'El flag --jinja de llama-server es opcional si tu modelo local es pequeño.', a:false,
     ex:'Falso: sin --jinja no hay chat templates ni tool calling fiables. Sin tool calling, no hay agente. Es crítico a cualquier tamaño.'},
    {type:'multi', q:'Señales de alerta al instalar un servidor MCP de terceros:',
     opts:['Ejecuta con tus permisos y nadie explica qué hace su código','Pide project trust en carpetas que no son tuyas','Documentación inexistente o repo sin mantenimiento','Enriquece tu contexto con datos relevantes'],
     a:[0,1,2], ex:'Los servidores MCP corren con TUS permisos. Audita código, origen y mantenimiento antes de conectar.'},
    {type:'single', q:'En opencode, el último mensaje de Build dejó 3 archivos rotos. ¿Primera acción?',
     opts:['git reset --hard y a rezar','/undo — revierte exactamente los cambios de ese mensaje','/new','Borrar los archivos rotos a mano'],
     a:1, ex:'/undo es precisión quirúrgica: revierte los cambios de archivo del último mensaje sin tocar el resto.'},
    {type:'blank', q:'Comando para forzar en pi una skill llamada commit-writer:',
     accept:['/skill:commit-writer'], placeholder:'/skill:…',
     ex:'<code>/skill:commit-writer</code> — carga las instrucciones al instante; lo que escribas después va como petición.'},
    {type:'single', q:'¿Cuál es el flujo híbrido correcto con modelos locales y cloud?',
     opts:['Todo local siempre, por privacidad','Todo cloud siempre, por calidad','Local para lo mecánico y voluminoso; cloud para lo difícil','Local de día, cloud de noche'],
     a:2, ex:'Cada herramienta donde gana: lo repetitivo y voluminoso al local (coste 0, privado); arquitectura y debugging difícil al cloud.'},
    {type:'tf', q:'Revisar el git diff del agente es opcional si los tests pasan.', a:false,
     ex:'Falso: los tests no cubren todo. El diff es tu trabajo de tech lead — nadie mergea a ciegas, ni con tests en verde.'},
    {type:'order', q:'Ordena la adopción profesional de una skill nueva:',
     items:['Identificar la tarea recurrente y sus entradas','Escribir SKILL.md con una description que enrute','Probarla forzándola con /skill:nombre','Afinar viendo cómo el modelo la usa en tareas reales'],
     ex:'Repetición → definición → prueba forzada → afinado con uso real. Así las skills crecen contigo.'}
  ]
},
/* ============ MÓDULO 9 ============ */
{
  id:'extensiones', num:'09', tag:'Nivel 8', ac:'#2dd4bf', icon:'🧬',
  title:'Extensiones: superpoderes de pi',
  desc:'TypeScript ejecutable dentro de pi: tools, comandos, eventos y UI. Y el catálogo de paquetes de pi.dev/packages.',
  blocks:[
    {t:'h', x:'¿Qué es una extensión?'},
    {t:'p', x:'Una skill da <b>instrucciones</b>; una extensión da <b>comportamiento ejecutable</b>. Es un módulo TypeScript que corre dentro del proceso de pi y puede añadir tools para el modelo, comandos /, reaccionar a eventos, registrar proveedores de modelos, servidores MCP y hasta componentes de terminal.'},
    {t:'code', x:'// ~/.pi/agent/extensions/hello.ts\nimport type { ExtensionAPI } from "@earendil-works/pi-coding-agent";\n\nexport default function (pi: ExtensionAPI) {\n  pi.registerCommand("hello", {\n    description: "Saluda",\n    handler: async (name, ctx) => {\n      ctx.ui.notify(`Hola, ${name || "mundo"}!`, "info");\n    },\n  });\n}'},
    {t:'p', x:'pi usa <code>jiti</code>: TypeScript sin compilar. Durante el desarrollo, carga el archivo directo con <code>pi --extension ./hello.ts</code>; en producción, suéltalo en <code>~/.pi/agent/extensions/</code> (usuario) o en la carpeta de extensiones del proyecto. Tras editar en caliente: <code>/reload</code>.'},
    {t:'h', x:'Los puntos de integración'},
    {t:'table', rows:[
      ['registerTool()','Tool invocable por el modelo: nombre, descripción, schema TypeBox y execute().'],
      ['registerCommand()','Comando / personalizado con handler y acceso a ctx.ui.'],
      ['pi.on(...)','Eventos: before_agent_start (prompt), tool_call (bloquear/mutar), tool_result, agent_end…'],
      ['registerProvider()','Conectar servicios de modelos propios.'],
      ['registerMcpServer()','Añadir servidores MCP por sesión, con código.'],
      ['ctx.ui','Diálogos, notificaciones, widgets y componentes de terminal.']
    ]},
    {t:'p', x:'El evento más usado por los pros: <code>tool_call</code> como <b>guardia de seguridad</b> — pedir confirmación antes de llamadas destructivas usando las anotaciones de las tools:'},
    {t:'code', x:'pi.on("tool_call", async (event, ctx) => {\n  const meta = pi.getAllTools().find(t => t.name === event.toolName);\n  if (meta?.annotations?.destructiveHint) {\n    const ok = await ctx.ui.confirm("¿Permitir llamada?", event.toolName);\n    if (!ok) return { block: true, reason: event.toolName + " no aprobada" };\n  }\n});'},
    {t:'h', x:'Exposure: el mismo concepto que en MCP'},
    {t:'p', x:'Las tools de extensiones también tienen <b>exposure</b>: <code>direct</code> (default, declarada al modelo), <code>model-only</code>, <code>codemode</code> (callable desde scripts), <code>deferred</code> (descubrible con tool_search) y <code>hidden</code>. Registra todo, activa lo necesario con <code>pi.setActiveTools()</code>.'},
    {t:'h', x:'El catálogo: Pi Packages'},
    {t:'p', x:'Un <b>paquete</b> agrupa extensiones, skills, prompts y temas en una unidad distribuible por npm o git. Instalar es un comando:'},
    {t:'code', x:'pi install npm:@example/pi-tools@1.0.0\npi install git:github.com/example/pi-tools@v1\npi install ./mi-paquete-local\n\npi list              # paquetes configurados\npi remove <fuente>   # quitar\npi update --extensions  # reconciliar\n\n# Probar SIN instalar (una sola invocación):\npi -e npm:@example/pi-tools'},
    {t:'p', x:'La instalación personal va a <code>~/.pi/agent/settings.json</code>; con <code>--local</code> al proyecto (requiere project trust). Los paquetes npm versionados quedan pineados.'},
    {t:'h', x:'Publica el tuyo en la galería'},
    {t:'code', x:'my-pi-package/\n├── package.json\n├── extensions/\n├── skills/\n├── prompts/\n└── themes/\n\n// package.json\n{\n  "name": "mi-paquete",\n  "keywords": ["pi-package"],\n  "pi": { "extensions": ["./src/ext.ts"] }\n}'},
    {t:'tip', x:'La keyword <b>"pi-package"</b> hace tu paquete elegible para la galería de <b>pi.dev/packages</b>, y los campos opcionales pi.image / pi.video le añaden previews. Descubre el ecosistema ahí antes de escribir desde cero.'},
    {t:'warn', x:'Las extensiones corren con los permisos de pi y pueden leer prompts, credenciales e historial. Revisa el código de cualquier paquete de terceros antes de instalarlo — y antes de otorgar project trust a paquetes de proyecto.'},
    {t:'h', x:'Reglas del ciclo de vida'},
    {t:'list', items:[
      '<b>Nada de procesos, sockets o timers en la factory</b> — arráncalos desde session_start o desde el comando/tool que los necesita.',
      '<b>Limpia en session_shutdown</b> de forma idempotente: cancelación, reload y salida convergen en el mismo camino.',
      '<b>Empieza por el ejemplo más pequeño</b> que coincida con tu punto de integración (hay ejemplos oficiales en el repo de pi).'
    ]}
  ],
  quiz:[
    {type:'single', q:'¿Qué añade una extensión que una skill no puede?',
     opts:['Más instrucciones para el modelo','Comportamiento ejecutable: tools, comandos, eventos y UI','Mejores descripciones','Contexto adicional'],
     a:1, ex:'La skill es conocimiento; la extensión es código TypeScript que ejecuta cosas dentro de pi.'},
    {type:'blank', q:'Comando para probar una extensión en desarrollo, sin instalarla:',
     accept:['pi --extension ./hello.ts','pi --extension hello.ts'], placeholder:'pi --extension …',
     ex:'<code>pi --extension ./hello.ts</code> — carga directa para desarrollo. En producción, a ~/.pi/agent/extensions/.'},
    {type:'multi', q:'¿Cuáles son puntos de integración reales de la API de extensiones?',
     opts:['pi.registerTool() — tool invocable por el modelo','pi.registerCommand() — comandos personalizados /','pi.on("tool_call") — bloquear o mutar llamadas','pi.deleteModel() — eliminar modelos del usuario'],
     a:[0,1,2], ex:'Los tres primeros son API real. No existe pi.deleteModel(): los proveedores se registran con registerProvider().'},
    {type:'single', q:'¿Qué hace elegible a un paquete npm para la galería de pi.dev/packages?',
     opts:['La keyword "pi-package" en package.json','Publicarlo con scope @pi','Un archivo pi.config','Tener más de 100 estrellas'],
     a:0, ex:'keywords: ["pi-package"] + los campos opcionales pi.image / pi.video para previews en la galería.'},
    {type:'single', q:'Quieres probar un paquete SIN añadirlo a tus settings. ¿Cómo?',
     opts:['pi install --temp','pi -e npm:@example/pi-tools','pi try @example/pi-tools','Descargar y copiar a mano'],
     a:1, ex:'pi -e (o --extension) carga el paquete para una sola invocación, sin tocar settings.'},
    {type:'tf', q:'Las extensiones se ejecutan con los permisos de pi y pueden leer prompts, credenciales e historial de sesión.', a:true,
     ex:'Cierto — por eso se cargan solo de fuentes confiables y los paquetes de proyecto exigen project trust.'},
    {type:'order', q:'Ordena el flujo de desarrollo de una extensión:',
     items:['Escribe hello.ts con una factory que recibe ExtensionAPI','Pruébala con pi --extension ./hello.ts','Muévela a ~/.pi/agent/extensions/ para uso diario','Distribúyela como paquete npm con la keyword pi-package'],
     ex:'Escribir → probar en caliente → instalar en usuario → distribuir. El camino completo de cero a galería.'}
  ]
}
];
