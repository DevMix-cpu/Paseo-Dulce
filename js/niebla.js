// ==========================================================================
// PASO 9: MINIJUEGO "COSECHANDO PASOS" Y PASO 10 NIEBLA INACTIVA
// ==========================================================================

let energiaCosecha = 0;
const OBJETIVO_ENERGIA_COSECHA = 100;
let cosechaActiva = false;
let animacionCosechaId = null;
let temporizadorSpawnCosecha = null;
let elementosCosecha = [];
let canastaCosechaX = 400;

const TIPOS_ELEMENTOS_COSECHA = [
    { icono: "🐾", nombre: "huellita", puntos: 10 },
    { icono: "💖", nombre: "corazon", puntos: 10 },
    { icono: "⭐", nombre: "estrella", puntos: 10 },
    { icono: "🍃", nombre: "hojita", puntos: 10 }
];

function iniciarMinijuegoCosecha() {
    energiaCosecha = 0;
    cosechaActiva = true;
    elementosCosecha = [];
    canastaCosechaX = 400;

    document.getElementById("mensaje").innerText =
        "Paso 9/10: Cosechando Pasos. Mueve la canasta y atrapa la energía flotante 🧺✨";

    let container = document.getElementById("cosecha-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "cosecha-container";
        document.getElementById("game-container").appendChild(container);
    }

    container.innerHTML = `
        <div id="cosecha-overlay">
            <div id="cosecha-hud">
                <div class="cosecha-titulo">✨ COSECHANDO PASOS (9/10) ✨</div>
                <div class="cosecha-instruccion">Mueve la canasta con el cursor o el dedo para atrapar energía 🧺</div>
                <div id="cosecha-barra-contenedor">
                    <div id="cosecha-barra-progreso" style="width: 0%;"></div>
                    <span id="cosecha-progreso-texto">⚡ Energía: 0% / 100%</span>
                </div>
            </div>
            <div id="cosecha-items-area"></div>
            <div id="cosecha-canasta" style="left: 400px;">
                <div class="canasta-icono">🧺</div>
            </div>
            <div id="cosecha-banner-exito" style="display: none;">
                ✨ ¡100% ENERGÍA RECOLECTADA! ✨
            </div>
        </div>
    `;
    container.style.display = "block";

    function actualizarPosicionCanasta(e) {
        if (!cosechaActiva) return;
        const gameCont = document.getElementById("game-container");
        if (!gameCont) return;
        const rect = gameCont.getBoundingClientRect();
        const escala = rect.width / 800;
        let x = (e.clientX - rect.left) / escala;
        x = Math.max(50, Math.min(750, x));
        canastaCosechaX = x;

        const canasta = document.getElementById("cosecha-canasta");
        if (canasta) {
            canasta.style.left = `${x}px`;
        }
    }

    container.onpointerdown = (e) => {
        actualizarPosicionCanasta(e);
    };
    container.onpointermove = (e) => {
        actualizarPosicionCanasta(e);
    };

    iniciarBucleCosecha();
    if (temporizadorSpawnCosecha) clearInterval(temporizadorSpawnCosecha);
    temporizadorSpawnCosecha = setInterval(() => {
        if (!cosechaActiva) return;
        spawnElementoCosecha();
    }, 620);
}

function spawnElementoCosecha() {
    const itemsArea = document.getElementById("cosecha-items-area");
    if (!itemsArea || !cosechaActiva) return;

    const tipo = TIPOS_ELEMENTOS_COSECHA[Math.floor(Math.random() * TIPOS_ELEMENTOS_COSECHA.length)];
    const x = 70 + Math.random() * 660;
    const y = -25;
    const velocidadY = 2.4 + Math.random() * 1.3;
    const swayAmplitud = 0.8 + Math.random() * 1.2;
    const swayFase = Math.random() * Math.PI * 2;

    const div = document.createElement("div");
    div.className = `item-cosecha item-${tipo.nombre}`;
    div.innerText = tipo.icono;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    itemsArea.appendChild(div);

    elementosCosecha.push({
        el: div,
        x: x,
        baseX: x,
        y: y,
        velocidadY: velocidadY,
        swayAmplitud: swayAmplitud,
        swayFase: swayFase,
        puntos: tipo.puntos,
        tiempo: 0
    });
}

function iniciarBucleCosecha() {
    if (animacionCosechaId) cancelAnimationFrame(animacionCosechaId);

    function bucle() {
        if (!cosechaActiva) return;

        for (let i = elementosCosecha.length - 1; i >= 0; i--) {
            const item = elementosCosecha[i];
            item.tiempo += 0.04;
            item.y += item.velocidadY;
            item.x = item.baseX + Math.sin(item.tiempo + item.swayFase) * (item.swayAmplitud * 18);

            item.el.style.top = `${item.y}px`;
            item.el.style.left = `${item.x}px`;

            // Detección de colisión con la canasta
            const distX = Math.abs(item.x - canastaCosechaX);
            const enAlturaCanasta = item.y >= 365 && item.y <= 415;

            if (enAlturaCanasta && distX <= 48) {
                energiaCosecha = Math.min(OBJETIVO_ENERGIA_COSECHA, energiaCosecha + item.puntos);

                crearPopCosecha(item.x, item.y, `+${item.puntos}% ⚡`);
                animarReboteCanasta();

                const barra = document.getElementById("cosecha-barra-progreso");
                const texto = document.getElementById("cosecha-progreso-texto");
                if (barra) barra.style.width = `${energiaCosecha}%`;
                if (texto) texto.innerText = `⚡ Energía: ${energiaCosecha}% / 100%`;

                item.el.remove();
                elementosCosecha.splice(i, 1);

                if (energiaCosecha >= OBJETIVO_ENERGIA_COSECHA) {
                    finalizarMinijuegoCosecha();
                    return;
                }
                continue;
            }

            if (item.y > 450) {
                item.el.remove();
                elementosCosecha.splice(i, 1);
            }
        }

        animacionCosechaId = requestAnimationFrame(bucle);
    }

    animacionCosechaId = requestAnimationFrame(bucle);
}

function animarReboteCanasta() {
    const canasta = document.getElementById("cosecha-canasta");
    if (!canasta) return;
    canasta.classList.remove("recolectado");
    void canasta.offsetWidth;
    canasta.classList.add("recolectado");
}

function crearPopCosecha(x, y, texto) {
    const container = document.getElementById("cosecha-overlay");
    if (!container) return;
    const pop = document.createElement("div");
    pop.className = "pop-cosecha";
    pop.innerText = texto;
    pop.style.left = `${x}px`;
    pop.style.top = `${y}px`;
    container.appendChild(pop);
    setTimeout(() => pop.remove(), 650);
}

function finalizarMinijuegoCosecha() {
    cosechaActiva = false;
    if (animacionCosechaId) cancelAnimationFrame(animacionCosechaId);
    if (temporizadorSpawnCosecha) clearInterval(temporizadorSpawnCosecha);

    elementosCosecha.forEach(item => item.el.remove());
    elementosCosecha = [];

    const banner = document.getElementById("cosecha-banner-exito");
    if (banner) banner.style.display = "block";

    document.getElementById("mensaje").innerText = "¡100% de energía cosechada! Paso 9 completado (9/10) 🎉";

    setTimeout(() => {
        const container = document.getElementById("cosecha-container");
        if (container) container.style.display = "none";

        avanzarPasoNueveConjuntoAnimado();
    }, 1800);
}

// ==========================================================================
// PASO 10: NIEBLA INACTIVA (PASO BLOQUEADO)
// ==========================================================================
function mostrarNieblaInactivaYPasoDiez() {
    const gameContainer = document.getElementById("game-container");
    if (!gameContainer) return;

    let canvas = document.getElementById("canvas-niebla");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "canvas-niebla";
        canvas.width = 800;
        canvas.height = 450;
        gameContainer.appendChild(canvas);
    }

    canvas.style.pointerEvents = "none";
    canvas.style.opacity = "0";
    canvas.style.display = "block";

    const ctx = canvas.getContext("2d");
    pintarCapaNieblaInactiva(ctx, canvas.width, canvas.height);

    setTimeout(() => {
        canvas.style.opacity = "0.94";
    }, 50);

    setTimeout(mostrarModalMensajeEspecial, 1600);
}

function pintarCapaNieblaInactiva(ctx, width, height) {
    ctx.save();

    const gradFondo = ctx.createRadialGradient(
        width / 2, height / 2, 70,
        width / 2, height / 2, 440
    );
    gradFondo.addColorStop(0, "rgba(22, 17, 36, 0.90)");
    gradFondo.addColorStop(0.65, "rgba(16, 12, 28, 0.94)");
    gradFondo.addColorStop(1, "rgba(10, 7, 20, 0.98)");

    ctx.fillStyle = gradFondo;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 22; i++) {
        const cx = Math.random() * width;
        const cy = Math.random() * height;
        const rad = 70 + Math.random() * 110;

        const gradNube = ctx.createRadialGradient(cx, cy, 10, cx, cy, rad);
        gradNube.addColorStop(0, "rgba(140, 150, 195, 0.16)");
        gradNube.addColorStop(0.7, "rgba(80, 85, 125, 0.07)");
        gradNube.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradNube;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "bold 18px monospace";
    ctx.fillStyle = "#ffb703";
    ctx.shadowColor = "rgba(255, 183, 3, 0.7)";
    ctx.shadowBlur = 12;
    ctx.fillText("🌫️ PASO 10: BLOQUEADO 🌫️", width / 2, 80);

    ctx.font = "12px monospace";
    ctx.fillStyle = "#72efdd";
    ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    ctx.shadowBlur = 6;
    ctx.fillText("El camino continúa en la vida real...", width / 2, 108);

    ctx.restore();
}
