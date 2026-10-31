// AGENT/OS - datos: diagramas animados de las lecciones
const ANIMS = {
  loop: `<div class="anim"><svg viewBox="0 0 260 210" width="100%">
    <circle cx="130" cy="105" r="64" fill="none" stroke="rgba(79,227,165,.35)" stroke-width="2" stroke-dasharray="5 9" class="a-dash"/>
    <g class="a-orbit"><circle cx="130" cy="41" r="5" fill="#4fe3a5"/></g>
    <g class="a-node"><circle cx="130" cy="41" r="21" fill="rgba(79,227,165,.13)" stroke="#4fe3a5" stroke-width="1.4"/><text x="130" y="45" text-anchor="middle" font-size="10" fill="#4fe3a5">Razona</text></g>
    <g class="a-node" style="animation-delay:1.5s"><circle cx="194" cy="105" r="21" fill="rgba(99,210,255,.12)" stroke="#63d2ff" stroke-width="1.4"/><text x="194" y="109" text-anchor="middle" font-size="10" fill="#63d2ff">Actúa</text></g>
    <g class="a-node" style="animation-delay:3s"><circle cx="130" cy="169" r="21" fill="rgba(255,196,107,.12)" stroke="#ffc46b" stroke-width="1.4"/><text x="130" y="173" text-anchor="middle" font-size="10" fill="#ffc46b">Observa</text></g>
    <g class="a-node" style="animation-delay:4.5s"><circle cx="66" cy="105" r="21" fill="rgba(167,139,250,.13)" stroke="#a78bfa" stroke-width="1.4"/><text x="66" y="109" text-anchor="middle" font-size="10" fill="#a78bfa">Corrige</text></g>
  </svg><div class="a-cap">El bucle agéntico — girando hasta cumplir tu objetivo</div></div>`,
  quant: `<div class="anim a-quant">
    <div class="aq-row"><span class="aq-l">FP16</span><div class="aq-track"><i style="--w:100%;background:#ff7a8a;animation-delay:.05s"></i></div><span class="aq-v">14 GB</span></div>
    <div class="aq-row"><span class="aq-l">Q8_0</span><div class="aq-track"><i style="--w:53%;background:#ffc46b;animation-delay:.2s"></i></div><span class="aq-v">7.5 GB</span></div>
    <div class="aq-row"><span class="aq-l">Q5_K_M</span><div class="aq-track"><i style="--w:40%;background:#63d2ff;animation-delay:.35s"></i></div><span class="aq-v">5.4 GB</span></div>
    <div class="aq-row"><span class="aq-l">Q4_K_M ⭐</span><div class="aq-track"><i style="--w:31%;background:#4fe3a5;animation-delay:.5s"></i></div><span class="aq-v">4.4 GB</span></div>
    <div class="aq-row"><span class="aq-l">Q3</span><div class="aq-track"><i style="--w:25%;background:#a78bfa;animation-delay:.65s"></i></div><span class="aq-v">3.5 GB</span></div>
    <div class="a-cap">RAM de un 7B según cuantización · Q4_K_M = el punto dulce</div></div>`,
  mcp: `<div class="anim"><svg viewBox="0 0 260 210" width="100%">
    <line x1="130" y1="105" x2="130" y2="42" class="a-wire"/>
    <line x1="130" y1="105" x2="194" y2="105" class="a-wire" style="animation-delay:.4s"/>
    <line x1="130" y1="105" x2="130" y2="168" class="a-wire" style="animation-delay:.8s"/>
    <line x1="130" y1="105" x2="66" y2="105" class="a-wire" style="animation-delay:1.2s"/>
    <circle cx="130" cy="105" r="26" fill="rgba(240,171,252,.14)" stroke="#f0abfc" stroke-width="1.6" class="a-hub"/>
    <text x="130" y="103" text-anchor="middle" font-size="10.5" fill="#f0abfc" font-weight="700">HOST</text>
    <text x="130" y="115" text-anchor="middle" font-size="8.5" fill="#c6d4ce">pi / opencode</text>
    <g class="a-node"><rect x="92" y="20" width="76" height="22" rx="8" fill="rgba(255,255,255,.05)" stroke="rgba(240,171,252,.45)"/><text x="130" y="34.5" text-anchor="middle" font-size="9.5" fill="#e9f2ee">filesystem</text></g>
    <g class="a-node" style="animation-delay:.5s"><rect x="156" y="94" width="76" height="22" rx="8" fill="rgba(255,255,255,.05)" stroke="rgba(240,171,252,.45)"/><text x="194" y="108.5" text-anchor="middle" font-size="9.5" fill="#e9f2ee">github</text></g>
    <g class="a-node" style="animation-delay:1s"><rect x="92" y="168" width="76" height="22" rx="8" fill="rgba(255,255,255,.05)" stroke="rgba(240,171,252,.45)"/><text x="130" y="182.5" text-anchor="middle" font-size="9.5" fill="#e9f2ee">postgres</text></g>
    <g class="a-node" style="animation-delay:1.5s"><rect x="28" y="94" width="76" height="22" rx="8" fill="rgba(255,255,255,.05)" stroke="rgba(240,171,252,.45)"/><text x="66" y="108.5" text-anchor="middle" font-size="9.5" fill="#e9f2ee">sentry ☁</text></g>
  </svg><div class="a-cap">MCP: un protocolo, infinitas integraciones · tools · resources · prompts</div></div>`
};
