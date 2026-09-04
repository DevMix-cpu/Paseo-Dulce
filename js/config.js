// ==========================================================================
// CONFIGURACIÓN Y ESTADO GLOBAL DEL JUEGO
// ==========================================================================

let etapaJuego = 1;
let pistaMoka = 1;
let pistaCremas = 1;

// Configuración de coordenadas y pistas elegantes
const pistasConfig = {
    moka: {
        1: { // Lámpara (hotspot left 215, width 60, top 210)
            x: 245, y: 175, apuntaArriba: false,
            textos: [
                "🐾 ¡Guau! Por el farol... si no se electrocutó",
                "🐾 Fíjate en la luz 💡",
                "🐾 ¿Ves la lámpara? Ahí cerca..."
            ]
        },
        2: { // Árbol izquierda (hotspot left 10, width 120, top 40)
            x: 75, y: 120, apuntaArriba: false,
            textos: [
                "🐾 En el árbol... buscando ardillas 🌳",
                "🐾 Entre las hojas 🍃",
                "🐾 Cerca del tronco..."
            ]
        },
        3: { // Banca (hotspot left 480, width 170, top 250)
            x: 565, y: 215, apuntaArriba: false,
            textos: [
                "🐾 ¡Durmiendo en la banca! 🪑",
                "🐾 Típico de Moka, echada...",
                "🐾 ¡Aquí estoy! Despiértame..."
            ]
        }
    },
    cremas: {
        1: { // Cielo / estrellas (hotspot left 300, width 260, top 10)
            x: 430, y: 78, apuntaArriba: true,
            textos: [
                "✨ ¡Miau! Por el cielo... se cree murciélago 🌌",
                "✨ Mirando las estrellas ⭐",
                "✨ Mira arriba, no al suelo..."
            ]
        },
        2: { // Farol derecho / viento (hotspot left 700, width 60, top 220)
            x: 710, y: 185, apuntaArriba: false,
            textos: [
                "💨 ¡Fshhh! Volando con la brisa 🍃",
                "💨 Por donde pega el viento 🌬️",
                "💨 Por el farol derecho..."
            ]
        },
        3: { // Árbol derecha (hotspot left 600, width 120, top 110)
            x: 660, y: 75, apuntaArriba: false,
            textos: [
                "🐱 ¡Miau! En la copa del árbol 🌳",
                "🐱 Se subió y ahora no sabe bajar 🐾",
                "🐱 ¡Aquí trepada! Bájame..."
            ]
        }
    }
};

// Helper para crear destellos dorados en clics o toques
function crearDestelloClic(event) {
    if (!event) return;
    const container = document.getElementById("game-container");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const escala = rect.width / 800;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    const x = (clientX - rect.left) / escala;
    const y = (clientY - rect.top) / escala;

    const destello = document.createElement("div");
    destello.className = "destello-clic";
    destello.style.left = (x - 30) + "px";
    destello.style.top = (y - 30) + "px";
    destello.style.width = "60px";
    destello.style.height = "60px";
    container.appendChild(destello);

    setTimeout(() => destello.remove(), 600);
}
