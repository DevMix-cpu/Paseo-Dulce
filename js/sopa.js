// ==========================================================================
// PASO 3: SOPA DE LETRAS PROCEDURAL ALEATORIA
// ==========================================================================

const palabrasObjetivo = ["XIMENA", "DULCE", "CREMAS", "MOKA", "LUCIFER"];
let palabrasEncontradas = [];
const TAMANO_SOPA = 11;
let celdasSeleccionadas = [];
let arrastrandoSopa = false;

const DIRECCIONES_SOPA = [
    [0, 1],   // Derecha
    [0, -1],  // Izquierda
    [1, 0],   // Abajo
    [-1, 0],  // Arriba
    [1, 1],   // Diagonal Abajo-Derecha
    [-1, 1],  // Diagonal Arriba-Derecha
    [1, -1],  // Diagonal Abajo-Izquierda
    [-1, -1]  // Diagonal Arriba-Izquierda
];

const LETRAS_ESP = "AAAAEEEEIIIOOOUUUBBCDDDFFGGHHJLLMMNNNPPQRRRSSSTTTUVXYZ";

function generarMatrizAleatoriaSopa() {
    let matriz = [];

    for (let intento = 0; intento < 100; intento++) {
        matriz = Array.from({ length: TAMANO_SOPA }, () => Array(TAMANO_SOPA).fill(null));
        let palabras = [...palabrasObjetivo].sort((a, b) => b.length - a.length);
        let todasColocadas = true;

        for (let palabra of palabras) {
            let colocada = false;
            let intentosPalabra = 0;

            while (!colocada && intentosPalabra < 400) {
                intentosPalabra++;
                const dir = DIRECCIONES_SOPA[Math.floor(Math.random() * DIRECCIONES_SOPA.length)];
                const fInicio = Math.floor(Math.random() * TAMANO_SOPA);
                const cInicio = Math.floor(Math.random() * TAMANO_SOPA);

                const fFin = fInicio + dir[0] * (palabra.length - 1);
                const cFin = cInicio + dir[1] * (palabra.length - 1);

                if (fFin >= 0 && fFin < TAMANO_SOPA && cFin >= 0 && cFin < TAMANO_SOPA) {
                    let cabe = true;
                    for (let i = 0; i < palabra.length; i++) {
                        const f = fInicio + dir[0] * i;
                        const c = cInicio + dir[1] * i;
                        if (matriz[f][c] !== null && matriz[f][c] !== palabra[i]) {
                            cabe = false;
                            break;
                        }
                    }

                    if (cabe) {
                        for (let i = 0; i < palabra.length; i++) {
                            const f = fInicio + dir[0] * i;
                            const c = cInicio + dir[1] * i;
                            matriz[f][c] = palabra[i];
                        }
                        colocada = true;
                    }
                }
            }

            if (!colocada) {
                todasColocadas = false;
                break;
            }
        }

        if (todasColocadas) break;
    }

    // Rellenamos las celdas vacías con letras de distracción
    for (let f = 0; f < TAMANO_SOPA; f++) {
        for (let c = 0; c < TAMANO_SOPA; c++) {
            if (!matriz[f][c]) {
                matriz[f][c] = LETRAS_ESP[Math.floor(Math.random() * LETRAS_ESP.length)];
            }
        }
    }

    return matriz;
}

function iniciarSopaDeLetras() {
    detenerCicloGlobos();
    document.getElementById("sopa-letras-container").style.display = "block";
    palabrasEncontradas = [];
    celdasSeleccionadas = [];

    const matriz = generarMatrizAleatoriaSopa();
    const gridDiv = document.getElementById("grid-sopa");
    gridDiv.innerHTML = "";
    gridDiv.style.gridTemplateColumns = `repeat(${TAMANO_SOPA}, 28px)`;

    // Reiniciar lista de palabras y contador
    palabrasObjetivo.forEach(p => {
        const span = document.getElementById(`p-${p}`);
        if (span) {
            span.classList.remove("subrayada");
            span.innerHTML = p;
        }
    });
    actualizarContadorSopa();

    // Crear elementos de celdas
    for (let f = 0; f < TAMANO_SOPA; f++) {
        for (let c = 0; c < TAMANO_SOPA; c++) {
            const celda = document.createElement("div");
            celda.className = "celda-sopa";
            celda.innerText = matriz[f][c];
            celda.dataset.letra = matriz[f][c];
            celda.dataset.fila = f;
            celda.dataset.col = c;

            // Soporte para selección por clic o arrastre táctil / ratón
            celda.addEventListener("pointerdown", (e) => {
                arrastrandoSopa = true;
                toggleCeldaSopa(celda, false);
            });
            celda.addEventListener("pointerenter", () => {
                if (arrastrandoSopa) {
                    toggleCeldaSopa(celda, true);
                }
            });

            gridDiv.appendChild(celda);
        }
    }

    gridDiv.onpointermove = (e) => {
        if (arrastrandoSopa && e.pointerType === "touch") {
            const el = document.elementFromPoint(e.clientX, e.clientY);
            if (el && el.classList && el.classList.contains("celda-sopa")) {
                toggleCeldaSopa(el, true);
            }
        }
    };

    window.onpointerup = () => {
        if (arrastrandoSopa) {
            arrastrandoSopa = false;
            verificarPalabrasSopa();
        }
    };
}

function toggleCeldaSopa(celda, soloAgregar = false) {
    if (celda.classList.contains("encontrada")) return;

    if (soloAgregar) {
        if (!celdasSeleccionadas.includes(celda)) {
            celda.classList.add("seleccionada");
            celdasSeleccionadas.push(celda);
        }
    } else {
        if (celdasSeleccionadas.includes(celda)) {
            celda.classList.remove("seleccionada");
            celdasSeleccionadas = celdasSeleccionadas.filter(c => c !== celda);
        } else {
            celda.classList.add("seleccionada");
            celdasSeleccionadas.push(celda);
        }
    }

    verificarPalabrasSopa();
}

function deseleccionarTodoSopa() {
    celdasSeleccionadas.forEach(c => c.classList.remove("seleccionada"));
    celdasSeleccionadas = [];
}

function verificarPalabrasSopa() {
    if (celdasSeleccionadas.length === 0) return;

    const palabraFormada = celdasSeleccionadas.map(el => el.dataset.letra).join("");

    palabrasObjetivo.forEach(palabra => {
        const palabraInvertida = palabra.split("").reverse().join("");

        if ((palabraFormada === palabra || palabraFormada === palabraInvertida) && !palabrasEncontradas.includes(palabra)) {
            palabrasEncontradas.push(palabra);

            celdasSeleccionadas.forEach(el => {
                el.classList.remove("seleccionada");
                el.classList.add("encontrada");
            });

            const spanPalabra = document.getElementById(`p-${palabra}`);
            if (spanPalabra) {
                spanPalabra.classList.add("subrayada");
                spanPalabra.innerHTML = `${palabra} ✓`;
            }

            celdasSeleccionadas = [];
            actualizarContadorSopa();
            actualizarEstadoSopa();
        }
    });
}

function actualizarContadorSopa() {
    const progreso = document.getElementById("sopa-progreso");
    if (progreso) {
        progreso.innerText = `Encontradas: ${palabrasEncontradas.length} / ${palabrasObjetivo.length}`;
    }
}

function actualizarEstadoSopa() {
    let restantes = palabrasObjetivo.filter(p => !palabrasEncontradas.includes(p));

    if (restantes.length === 0) {
        document.getElementById("mensaje").innerText = "Mira nada más, sí sabes leer. Paso 3 logrado (3/10). Avanzando...";

        setTimeout(() => {
            document.getElementById("sopa-letras-container").style.display = "none";
            animarXimenaCorriendo();
        }, 1800);
    }
}

// Botón temporal para omitir en desarrollo
function omitirSopaDeLetras() {
    palabrasEncontradas = [...palabrasObjetivo];
    palabrasObjetivo.forEach(p => {
        const span = document.getElementById(`p-${p}`);
        if (span) {
            span.classList.add("subrayada");
            span.innerHTML = `${p} ✓`;
        }
    });
    document.querySelectorAll(".celda-sopa").forEach(c => {
        c.classList.add("encontrada");
    });
    actualizarContadorSopa();
    document.getElementById("mensaje").innerText = "Paso 3 omitido por flojera. Sigamos avanzando...";
    setTimeout(() => {
        document.getElementById("sopa-letras-container").style.display = "none";
        animarXimenaCorriendo();
    }, 600);
}
