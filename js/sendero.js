// ==========================================================================
// PASO 8: MINIJUEGO "EL SENDERO ILUMINADO" (TRAZO CON EL DEDO / CURSOR)
// ==========================================================================

// Recorrido desafiante en doble onda sinusoidal / S-curve (9 baldosas)
const baldosasSendero = [
    { id: 1, x: 20,  y: 75 },   // Inicio cerca de los pies
    { id: 2, x: 55,  y: 35 },   // Subida curva izquierda
    { id: 3, x: 95,  y: 20 },   // Cima superior
    { id: 4, x: 135, y: 55 },   // Bajada diagonal
    { id: 5, x: 170, y: 95 },   // Valle inferior
    { id: 6, x: 210, y: 105 },  // Curva base
    { id: 7, x: 245, y: 75 },   // Subida media
    { id: 8, x: 280, y: 38 },   // Cima derecha
    { id: 9, x: 315, y: 65 }    // Meta final del sendero
];

let indiceBaldosaEsperada = 1;
let arrastrandoTrazoSendero = false;
let puntosSenderoConectados = [];

function iniciarMinijuegoSendero() {
    indiceBaldosaEsperada = 1;
    arrastrandoTrazoSendero = false;
    puntosSenderoConectados = [];

    document.getElementById("mensaje").innerText = "Paso 8/10: Sigue el sendero sobre las 9 baldosas sin perder el pulso 👣";

    let container = document.getElementById("sendero-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "sendero-container";
        document.getElementById("game-container").appendChild(container);
    }

    container.innerHTML = `
        <svg id="svg-sendero" viewBox="0 0 330 130">
            <path id="linea-guia-sendero" class="linea-sendero-guia" d="M 20 75 C 40 30, 75 15, 95 20 C 120 25, 145 75, 170 95 C 190 110, 225 115, 245 75 C 265 40, 295 30, 315 65" />
        </svg>
    `;

    // Crear las baldosas del camino
    baldosasSendero.forEach(b => {
        const divBaldosa = document.createElement("div");
        divBaldosa.id = `baldosa-${b.id}`;
        divBaldosa.className = "baldosa-sendero";
        divBaldosa.style.left = `${b.x}px`;
        divBaldosa.style.top = `${b.y}px`;
        divBaldosa.innerText = b.id;
        container.appendChild(divBaldosa);
    });

    actualizarBaldosaProxima();
    container.style.display = "block";

    // Eventos de trazo (soporte unificado para pointer y touch)
    container.onpointerdown = (e) => {
        arrastrandoTrazoSendero = true;
        container.setPointerCapture(e.pointerId);
        comprobarColisionSendero(e);
    };

    container.onpointermove = (e) => {
        if (arrastrandoTrazoSendero) {
            comprobarColisionSendero(e);
            generarChispaTrazo(e);
        }
    };

    container.onpointerup = (e) => {
        arrastrandoTrazoSendero = false;
        try { container.releasePointerCapture(e.pointerId); } catch(err) {}
    };

    container.onpointercancel = () => {
        arrastrandoTrazoSendero = false;
    };
}

function actualizarBaldosaProxima() {
    baldosasSendero.forEach(b => {
        const el = document.getElementById(`baldosa-${b.id}`);
        if (!el) return;

        if (b.id === indiceBaldosaEsperada) {
            el.classList.add("proxima");
        } else {
            el.classList.remove("proxima");
        }
    });
}

function comprobarColisionSendero(event) {
    if (indiceBaldosaEsperada > baldosasSendero.length) return;

    const container = document.getElementById("sendero-container");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const escala = rect.width / 330;
    const clientX = event.clientX;
    const clientY = event.clientY;

    const x = (clientX - rect.left) / escala;
    const y = (clientY - rect.top) / escala;

    const baldosaActual = baldosasSendero.find(b => b.id === indiceBaldosaEsperada);
    if (!baldosaActual) return;

    // Distancia al centro de la baldosa esperada
    const dist = Math.hypot(x - baldosaActual.x, y - baldosaActual.y);

    if (dist <= 28) {
        // Baldosa activada con éxito
        const el = document.getElementById(`baldosa-${baldosaActual.id}`);
        if (el) {
            el.classList.remove("proxima");
            el.classList.add("iluminada");
        }

        // Trazar línea SVG activa
        if (puntosSenderoConectados.length > 0) {
            const anterior = puntosSenderoConectados[puntosSenderoConectados.length - 1];
            trazarSegmentoSenderoSVG(anterior, baldosaActual);
        }

        puntosSenderoConectados.push(baldosaActual);
        emitirExplosionChispas(baldosaActual.x, baldosaActual.y);

        indiceBaldosaEsperada++;

        if (indiceBaldosaEsperada > baldosasSendero.length) {
            // Sendero completado
            arrastrandoTrazoSendero = false;

            // Encender halo de luz ambiental del camino
            let halo = document.getElementById("sendero-halo-luz");
            if (!halo) {
                halo = document.createElement("div");
                halo.id = "sendero-halo-luz";
                document.getElementById("game-container").appendChild(halo);
            }
            halo.style.display = "block";

            document.getElementById("mensaje").innerText = "¡8 de 10 pasos! Ahh mejor te bloqueo, ya me dio ansiedad.";

            setTimeout(() => {
                const senderoCont = document.getElementById("sendero-container");
                if (senderoCont) senderoCont.style.display = "none";
                avanzarPasoOchoConjuntoAnimado();
            }, 1800);
        } else {
            actualizarBaldosaProxima();
        }
    }
}

function trazarSegmentoSenderoSVG(desde, hasta) {
    const svg = document.getElementById("svg-sendero");
    if (!svg) return;

    const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
    linea.setAttribute("x1", desde.x);
    linea.setAttribute("y1", desde.y);
    linea.setAttribute("x2", hasta.x);
    linea.setAttribute("y2", hasta.y);
    linea.setAttribute("class", "linea-sendero-activa");

    svg.appendChild(linea);
}

function generarChispaTrazo(event) {
    const container = document.getElementById("sendero-container");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const escala = rect.width / 330;
    const x = (event.clientX - rect.left) / escala;
    const y = (event.clientY - rect.top) / escala;

    const chispa = document.createElement("div");
    chispa.className = "chispa-sendero";
    chispa.style.left = `${x}px`;
    chispa.style.top = `${y}px`;

    const dx = (Math.random() - 0.5) * 20;
    const dy = -15 - Math.random() * 20;
    chispa.style.setProperty("--dx", `${dx}px`);
    chispa.style.setProperty("--dy", `${dy}px`);

    container.appendChild(chispa);
    setTimeout(() => chispa.remove(), 700);
}

function emitirExplosionChispas(x, y) {
    const container = document.getElementById("sendero-container");
    if (!container) return;

    for (let i = 0; i < 6; i++) {
        const chispa = document.createElement("div");
        chispa.className = "chispa-sendero";
        chispa.style.left = `${x}px`;
        chispa.style.top = `${y}px`;

        const angulo = (Math.PI * 2 * i) / 6;
        const dist = 18 + Math.random() * 15;
        const dx = Math.cos(angulo) * dist;
        const dy = Math.sin(angulo) * dist;

        chispa.style.setProperty("--dx", `${dx}px`);
        chispa.style.setProperty("--dy", `${dy}px`);

        container.appendChild(chispa);
        setTimeout(() => chispa.remove(), 700);
    }
}
