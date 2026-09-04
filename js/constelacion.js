// ==========================================================================
// PASO 7: MINIJUEGO DE CONSTELACIÓN ("GUÍA LAS ESTRELLAS - SILUETA MOKA")
// ==========================================================================

// Silueta detallada de la cabeza de Chihuahua (Moka) con orejas erguidas
const estrellasConstelacion = [
    { id: 1,  x: 400, y: 195, label: "1" },  // Barbilla / hociquito
    { id: 2,  x: 365, y: 180, label: "2" },  // Mandíbula izquierda
    { id: 3,  x: 330, y: 150, label: "3" },  // Mejilla izquierda
    { id: 4,  x: 310, y: 105, label: "4" },  // Base exterior oreja izquierda
    { id: 5,  x: 285, y: 60,  label: "5" },  // Lado exterior oreja izquierda
    { id: 6,  x: 265, y: 25,  label: "6" },  // Punta oreja izquierda
    { id: 7,  x: 320, y: 50,  label: "7" },  // Lado interior oreja izquierda
    { id: 8,  x: 355, y: 75,  label: "8" },  // Base interior oreja izquierda / frente
    { id: 9,  x: 400, y: 60,  label: "9" },  // Coronilla / centro superior
    { id: 10, x: 445, y: 75,  label: "10" }, // Base interior oreja derecha / frente
    { id: 11, x: 480, y: 50,  label: "11" }, // Lado interior oreja derecha
    { id: 12, x: 535, y: 25,  label: "12" }, // Punta oreja derecha
    { id: 13, x: 515, y: 60,  label: "13" }, // Lado exterior oreja derecha
    { id: 14, x: 490, y: 105, label: "14" }, // Base exterior oreja derecha
    { id: 15, x: 470, y: 150, label: "15" }, // Mejilla derecha
    { id: 16, x: 435, y: 180, label: "16" }  // Mandíbula derecha
];

let indiceEstrellaEsperada = 1;
let puntosConectados = [];

function iniciarMinijuegoConstelacion() {
    indiceEstrellaEsperada = 1;
    puntosConectados = [];

    document.getElementById("mensaje").innerText = "Paso 7/10: Guía las estrellas del 1 al 16. A ver si reconoces al monstruito orejón...";

    let container = document.getElementById("constelacion-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "constelacion-container";
        document.getElementById("game-container").appendChild(container);
    }

    container.innerHTML = `
        <svg id="svg-constelacion" viewBox="0 0 800 450"></svg>
        <div id="constelacion-banner-exito">✨ ¡Silueta de Lucifer lista! Aunque no lo conozco en persona 🐾✨</div>
    `;

    // Crear las estrellas interactivas
    estrellasConstelacion.forEach(estrella => {
        const divEstrella = document.createElement("div");
        divEstrella.id = `estrella-${estrella.id}`;
        divEstrella.className = "estrella-constelacion";
        divEstrella.style.left = `${estrella.x}px`;
        divEstrella.style.top = `${estrella.y}px`;
        divEstrella.innerText = estrella.label;

        divEstrella.onclick = (e) => tocarEstrella(estrella, e);
        divEstrella.ontouchstart = (e) => {
            e.preventDefault();
            tocarEstrella(estrella, e);
        };

        container.appendChild(divEstrella);
    });

    actualizarEstrellaActiva();
    container.style.display = "block";
}

function actualizarEstrellaActiva() {
    estrellasConstelacion.forEach(e => {
        const el = document.getElementById(`estrella-${e.id}`);
        if (!el) return;

        if (e.id === indiceEstrellaEsperada) {
            el.classList.add("estrella-activa");
        } else {
            el.classList.remove("estrella-activa");
        }
    });
}

function tocarEstrella(estrella, event) {
    if (event) crearDestelloClic(event);

    if (estrella.id !== indiceEstrellaEsperada) {
        // Si toca una estrella equivocada, la estrella correcta destella para orientar
        const estrellaCorrecta = document.getElementById(`estrella-${indiceEstrellaEsperada}`);
        if (estrellaCorrecta) {
            estrellaCorrecta.style.transform = "translate(-50%, -50%) scale(1.4)";
            setTimeout(() => {
                estrellaCorrecta.style.transform = "";
            }, 300);
        }
        return;
    }

    // Estrella tocada con éxito
    const elEstrella = document.getElementById(`estrella-${estrella.id}`);
    if (elEstrella) {
        elEstrella.classList.remove("estrella-activa");
        elEstrella.classList.add("estrella-conectada");
    }

    // Trazar línea con la estrella anterior
    if (puntosConectados.length > 0) {
        const puntoAnterior = puntosConectados[puntosConectados.length - 1];
        trazarLineaSVG(puntoAnterior, estrella);
    }

    puntosConectados.push(estrella);
    indiceEstrellaEsperada++;

    if (indiceEstrellaEsperada > estrellasConstelacion.length) {
        // Conectar la última estrella con la primera para cerrar la cabeza
        trazarLineaSVG(estrella, estrellasConstelacion[0]);

        // Celebración de la constelación
        const banner = document.getElementById("constelacion-banner-exito");
        if (banner) banner.style.display = "block";

        document.getElementById("mensaje").innerText = "Paso 7 terminado (7/10). Ni la NASA hace mapas estelares tan rápido.";

        setTimeout(() => {
            const container = document.getElementById("constelacion-container");
            if (container) container.style.display = "none";
            if (typeof animarLuciferLlegando === "function") {
                animarLuciferLlegando();
            } else {
                avanzarPasoSieteConjuntoAnimado();
            }
        }, 2200);
    } else {
        actualizarEstrellaActiva();
    }
}

function trazarLineaSVG(desde, hasta) {
    const svg = document.getElementById("svg-constelacion");
    if (!svg) return;

    const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
    linea.setAttribute("x1", desde.x);
    linea.setAttribute("y1", desde.y);
    linea.setAttribute("x2", hasta.x);
    linea.setAttribute("y2", hasta.y);
    linea.setAttribute("class", "linea-constelacion");

    svg.appendChild(linea);
}
