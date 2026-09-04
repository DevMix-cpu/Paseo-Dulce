// ==========================================================================
// INICIALIZACIÓN Y SISTEMA RESPONSIVE DINÁMICO
// ==========================================================================

function ajustarEscalaJuego() {
    const container = document.getElementById("game-container");
    const aviso = document.getElementById("orientacion-aviso");
    if (!container) return;

    const BASE_WIDTH = 800;
    const BASE_HEIGHT = 450;

    // Margen de seguridad para que el marco respire bien en cualquier pantalla
    const padding = 16;
    const availableWidth = Math.max(window.innerWidth - padding, 200);
    const availableHeight = Math.max(window.innerHeight - padding, 150);

    // Factor de escala proporcional uniforme (mantiene 16:9 exacto)
    const scale = Math.min(availableWidth / BASE_WIDTH, availableHeight / BASE_HEIGHT);

    container.style.transform = `scale(${scale})`;

    // Notificación opcional de orientación en móviles verticales
    if (aviso) {
        if (window.innerHeight > window.innerWidth && window.innerWidth <= 768) {
            aviso.style.display = "block";
        } else {
            aviso.style.display = "none";
        }
    }
}

// Event Listeners globales
window.addEventListener("resize", ajustarEscalaJuego);
window.addEventListener("orientationchange", () => {
    setTimeout(ajustarEscalaJuego, 150);
});

document.addEventListener("DOMContentLoaded", () => {
    ajustarEscalaJuego();
    reiniciarCicloGlobos();
});

window.addEventListener("load", () => {
    ajustarEscalaJuego();
    reiniciarCicloGlobos();
});

ajustarEscalaJuego();
reiniciarCicloGlobos();
