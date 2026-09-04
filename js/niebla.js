// ==========================================================================
// PASO 9: MINIJUEGO "DESPEJAR LA NIEBLA" (SCRATCH / ERASER EFFECT)
// ==========================================================================

let nieblaCompletada = false;
let arrastrandoBorradorNiebla = false;
let ultimoPuntoBorrador = null;
let temporizadorMuestreoNiebla = null;
let porcentajeNieblaDespejado = 0;

function iniciarMinijuegoNiebla() {
    nieblaCompletada = false;
    arrastrandoBorradorNiebla = false;
    ultimoPuntoBorrador = null;
    porcentajeNieblaDespejado = 0;

    document.getElementById("mensaje").innerText = "Paso 9/10: Despeja la niebla tallando la pantalla antes de que nos perdamos 🌫️";

    const gameContainer = document.getElementById("game-container");
    if (!gameContainer) return;

    // Eliminar canvas previo si existía
    const canvasViejo = document.getElementById("canvas-niebla");
    if (canvasViejo) canvasViejo.remove();
    const bannerViejo = document.getElementById("niebla-banner-progreso");
    if (bannerViejo) bannerViejo.remove();

    // Crear canvas interactivo
    const canvas = document.createElement("canvas");
    canvas.id = "canvas-niebla";
    canvas.width = 800;
    canvas.height = 450;
    gameContainer.appendChild(canvas);

    // Banner flotante de progreso
    const banner = document.createElement("div");
    banner.id = "niebla-banner-progreso";
    banner.innerText = "🌫️ Despejando el camino: 0% / 60%";
    gameContainer.appendChild(banner);

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    pintarCapaNiebla(ctx, canvas.width, canvas.height);

    // Configurar eventos de trazo / borrado
    configurarEventosBorradorNiebla(canvas, ctx);
}

function pintarCapaNiebla(ctx, width, height) {
    ctx.save();
    
    // Fondo de bruma nocturna profunda
    const gradFondo = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, 450);
    gradFondo.addColorStop(0, "rgba(22, 18, 38, 0.92)");
    gradFondo.addColorStop(0.6, "rgba(16, 13, 29, 0.95)");
    gradFondo.addColorStop(1, "rgba(10, 8, 20, 0.98)");

    ctx.fillStyle = gradFondo;
    ctx.fillRect(0, 0, width, height);

    // Nubes difusas de niebla suave
    for (let i = 0; i < 18; i++) {
        const cx = Math.random() * width;
        const cy = Math.random() * height;
        const rad = 60 + Math.random() * 90;

        const gradNube = ctx.createRadialGradient(cx, cy, 10, cx, cy, rad);
        gradNube.addColorStop(0, "rgba(140, 150, 190, 0.18)");
        gradNube.addColorStop(0.7, "rgba(80, 85, 120, 0.08)");
        gradNube.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradNube;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
    }

    // Texto central informativo dentro de la niebla
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "bold 20px monospace";
    ctx.fillStyle = "#ffb703";
    ctx.shadowColor = "rgba(255, 183, 3, 0.8)";
    ctx.shadowBlur = 10;
    ctx.fillText("🌫️ ¡Una densa niebla cubre el camino! 🌫️", width / 2, height / 2 - 25);

    ctx.font = "14px monospace";
    ctx.fillStyle = "#f0ebd8";
    ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    ctx.shadowBlur = 6;
    ctx.fillText("Desliza tu dedo o cursor para despejar la bruma antes de chocar...", width / 2, height / 2 + 15);

    ctx.font = "12px monospace";
    ctx.fillStyle = "#72efdd";
    ctx.fillText("✨ 9 de 10 pasos en juego ✨", width / 2, height / 2 + 45);

    ctx.restore();
}

function configurarEventosBorradorNiebla(canvas, ctx) {
    function obtenerCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const escala = rect.width / 800;
        return {
            x: (e.clientX - rect.left) / escala,
            y: (e.clientY - rect.top) / escala
        };
    }

    function borrarEnPunto(p1, p2) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 80;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        if (p1 && p2) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
        } else if (p2) {
            ctx.arc(p2.x, p2.y, 40, 0, Math.PI * 2);
        }
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    canvas.onpointerdown = (e) => {
        if (nieblaCompletada) return;
        arrastrandoBorradorNiebla = true;
        canvas.setPointerCapture(e.pointerId);

        const pos = obtenerCoords(e);
        ultimoPuntoBorrador = pos;
        borrarEnPunto(null, pos);
        solicitarMuestreoProgresoNiebla(ctx, canvas);
    };

    canvas.onpointermove = (e) => {
        if (!arrastrandoBorradorNiebla || nieblaCompletada) return;

        const pos = obtenerCoords(e);
        borrarEnPunto(ultimoPuntoBorrador, pos);
        ultimoPuntoBorrador = pos;

        solicitarMuestreoProgresoNiebla(ctx, canvas);
    };

    canvas.onpointerup = (e) => {
        arrastrandoBorradorNiebla = false;
        ultimoPuntoBorrador = null;
        try { canvas.releasePointerCapture(e.pointerId); } catch(err) {}
    };

    canvas.onpointercancel = () => {
        arrastrandoBorradorNiebla = false;
        ultimoPuntoBorrador = null;
    };
}

function solicitarMuestreoProgresoNiebla(ctx, canvas) {
    if (temporizadorMuestreoNiebla) return;

    temporizadorMuestreoNiebla = setTimeout(() => {
        temporizadorMuestreoNiebla = null;
        calcularProgresoNiebla(ctx, canvas);
    }, 180);
}

function calcularProgresoNiebla(ctx, canvas) {
    if (nieblaCompletada) return;

    try {
        const stepX = 25;
        const stepY = 25;
        let puntosTotales = 0;
        let puntosBorrados = 0;

        const imgData = ctx.getImageData(0, 0, 800, 450).data;

        for (let y = 30; y < 420; y += stepY) {
            for (let x = 40; x < 760; x += stepX) {
                puntosTotales++;
                const index = (y * 800 + x) * 4;
                const alpha = imgData[index + 3];
                if (alpha < 100) {
                    puntosBorrados++;
                }
            }
        }

        const porcentaje = Math.min(Math.round((puntosBorrados / puntosTotales) * 100), 100);
        porcentajeNieblaDespejado = porcentaje;

        const banner = document.getElementById("niebla-banner-progreso");
        if (banner) {
            banner.innerText = `🌫️ Niebla despejada: ${porcentaje}% / 60% ✨`;
        }

        // Meta alcanzada: 58% - 60%
        if (porcentaje >= 58) {
            finalizarMinijuegoNiebla(canvas);
        }
    } catch (e) {
        console.warn("Error en muestreo de niebla:", e);
    }
}

function finalizarMinijuegoNiebla(canvas) {
    if (nieblaCompletada) return;
    nieblaCompletada = true;

    const banner = document.getElementById("niebla-banner-progreso");
    if (banner) {
        banner.style.borderColor = "#ffb703";
        banner.style.color = "#ffb703";
        banner.innerText = "✨ ¡Camino despejado! (9/10) ✨";
    }

    document.getElementById("mensaje").innerText = "¡Niebla despejada! 9 de 10 pasos listos. Ni el clima nos frena.";

    // Transición suave de disipación total
    canvas.style.opacity = "0";

    setTimeout(() => {
        if (canvas && canvas.parentNode) canvas.remove();
        if (banner && banner.parentNode) banner.remove();

        // Avance conjunto animado del Paso 9
        avanzarPasoNueveConjuntoAnimado();
    }, 850);
}
