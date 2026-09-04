// ==========================================================================
// PASO 6: MINIJUEGO DE RITMO Y CADENCIA ("A TU RITMO")
// ==========================================================================

let aciertosRitmo = 0;
const OBJETIVO_ACIERTOS_RITMO = 3;
let animacionRitmoId = null;
let posCursorRitmo = 0; // De 0 a 100%
let direccionRitmo = 1;  // 1: derecha, -1: izquierda
let velocidadRitmo = 0.9;
let puedePresionarRitmo = true;

const mensajesAciertoRitmo = [
    "1/3: Buen timing, parece que sí coordinas.",
    "2/3: Uno más y no te cobro la sesión de fisio.",
    "3/3: ¡Listo! Paso 6 dominado. A ver el que sigue."
];

function iniciarMinijuegoRitmo() {
    aciertosRitmo = 0;
    posCursorRitmo = 5;
    direccionRitmo = 1;
    puedePresionarRitmo = true;

    document.getElementById("mensaje").innerText = "Paso 6/10: Terapia de coordinación. Presiona el botón justo al centro. Sin prisas.";

    let modal = document.getElementById("ritmo-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "ritmo-modal";
        document.getElementById("game-container").appendChild(modal);
    }

    modal.innerHTML = `
        <h3>👣 A TU PROPIO RITMO 👣</h3>
        <p class="instruccion">
            Presiona el botón cuando la patita pase por la zona verde central.
        </p>

        <div class="pista-ritmo-contenedor">
            <div class="zona-objetivo-ritmo"></div>
            <div id="cursor-ritmo" class="cursor-ritmo">🐾</div>
        </div>

        <div class="pasos-indicador">
            <span id="chip-paso-1" class="paso-chip">🐾 Paso 1</span>
            <span id="chip-paso-2" class="paso-chip">🐾 Paso 2</span>
            <span id="chip-paso-3" class="paso-chip">🐾 Paso 3</span>
        </div>

        <button id="btn-dar-paso" class="btn-dar-paso" onclick="intentarDarPasoRitmo(event)">
            DAR PASO 🐾
        </button>

        <div id="ritmo-feedback">Tómate tu tiempo...</div>
    `;

    modal.style.display = "block";

    // Soporte para presionar barra espaciadora
    window.addEventListener("keydown", manejarTecladoRitmo);

    // Iniciar oscilador del cursor
    iniciarBucleRitmo();
}

function iniciarBucleRitmo() {
    if (animacionRitmoId) cancelAnimationFrame(animacionRitmoId);

    function bucle() {
        posCursorRitmo += velocidadRitmo * direccionRitmo;

        if (posCursorRitmo >= 96) {
            posCursorRitmo = 96;
            direccionRitmo = -1;
        } else if (posCursorRitmo <= 4) {
            posCursorRitmo = 4;
            direccionRitmo = 1;
        }

        const cursor = document.getElementById("cursor-ritmo");
        if (cursor) {
            cursor.style.left = `${posCursorRitmo}%`;
        }

        animacionRitmoId = requestAnimationFrame(bucle);
    }

    animacionRitmoId = requestAnimationFrame(bucle);
}

function manejarTecladoRitmo(e) {
    if (e.code === "Space" || e.key === " ") {
        const modal = document.getElementById("ritmo-modal");
        if (modal && modal.style.display === "block") {
            e.preventDefault();
            intentarDarPasoRitmo();
        }
    }
}

function intentarDarPasoRitmo(event) {
    if (event) crearDestelloClic(event);
    if (!puedePresionarRitmo) return;
    if (aciertosRitmo >= OBJETIVO_ACIERTOS_RITMO) return;

    const feedback = document.getElementById("ritmo-feedback");
    if (!feedback) return;

    // La zona objetivo está entre 40% y 60%
    const enZonaObjetivo = posCursorRitmo >= 37 && posCursorRitmo <= 63;

    if (enZonaObjetivo) {
        aciertosRitmo++;
        puedePresionarRitmo = false;

        // Actualizar chip de paso
        const chip = document.getElementById(`chip-paso-${aciertosRitmo}`);
        if (chip) {
            chip.classList.add("completado");
            chip.innerText = `✓ Paso ${aciertosRitmo}`;
        }

        feedback.style.color = "#72efdd";
        feedback.innerText = mensajesAciertoRitmo[aciertosRitmo - 1];

        if (aciertosRitmo >= OBJETIVO_ACIERTOS_RITMO) {
            // Completado con éxito
            if (animacionRitmoId) cancelAnimationFrame(animacionRitmoId);
            window.removeEventListener("keydown", manejarTecladoRitmo);

            const btn = document.getElementById("btn-dar-paso");
            if (btn) {
                btn.style.background = "#2a9d8f";
                btn.innerText = "¡PASO 6 LOGRADO! 🎉";
            }

            setTimeout(() => {
                const modal = document.getElementById("ritmo-modal");
                if (modal) modal.style.display = "none";
                avanzarPasoSeisConjuntoAnimado();
            }, 1400);
        } else {
            // Breve pausa para dar el siguiente paso
            setTimeout(() => {
                puedePresionarRitmo = true;
            }, 600);
        }
    } else {
        feedback.style.color = "#ffb703";
        feedback.innerText = "Casi, pero no. Con calma, dale justo cuando esté al centro.";
    }
}
