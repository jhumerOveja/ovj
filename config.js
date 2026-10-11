// ==========================================
// OVJ STUDIO — CONFIGURACIÓN PÚBLICA (FALLBACK)
// ==========================================
//
// 🔥 IMPORTANTE:
// Este archivo es un FALLBACK. El frontend carga PRIMERO:
//
//   <script src="https://ovj-b2-proxy.jhumerali2.workers.dev/config.js"></script>
//
// Y después este archivo. Si el Worker ya cargó una config,
// este archivo NO la sobreescribe.
//
// Solo se usa si el Worker está caído o no tiene config_publica.json
// en B2 (por ejemplo, en el primer arranque).
//
// Para actualizar la URL del túnel:
//   1. Arrancá el túnel con /start_tunnel desde Telegram.
//   2. Copiá la nueva URL y mandá /set_url <url> en Telegram.
//   3. El bot-control actualiza config.json Y publica config_publica.json a B2.
//   4. Los frontends lo toman del Worker automáticamente.
//
// NO hace falta editar este archivo manualmente cuando cambia el túnel.
// ==========================================

window.OVJ_CONFIG = Object.assign(
    {
        // Fallback de desarrollo local (por si ni el Worker ni GitHub Pages responden)
        urlTunel: 'http://localhost:3000',
        workerUrl: 'https://ovj-b2-proxy.jhumerali2.workers.dev',
        whatsappPublicidad: '59160004962',
        whatsappClienteFallback: '59160004962'
    },
    window.OVJ_CONFIG || {}  // si el Worker ya trajo algo, gana
);
