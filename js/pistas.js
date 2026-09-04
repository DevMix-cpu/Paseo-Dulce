// ==========================================================================
// PASOS 1 Y 2: SISTEMA DE PISTAS Y GLOBOS FLOTANTES
// ==========================================================================

let temporizadorGlobo = null;
let timeoutInicioGlobo = null;
let timeoutOcultarGlobo = null;
let indiceTextoPista = 0;

function mostrarGloboPistaActual() {
    const globo = document.getElementById("globo-pista");
    if (!globo) return;

    let config = null;
    if (etapaJuego === 1 && pistasConfig.moka[pistaMoka]) {
        config = pistasConfig.moka[pistaMoka];
    } else if (etapaJuego === 2 && pistasConfig.cremas[pistaCremas]) {
        config = pistasConfig.cremas[pistaCremas];
    }

    if (!config) {
        globo.classList.remove("visible");
        return;
    }

    const texto = config.textos[indiceTextoPista % config.textos.length];
    indiceTextoPista++;

    globo.innerHTML = texto;
    globo.style.left = config.x + "px";
    globo.style.top = config.y + "px";

    if (config.apuntaArriba) {
        globo.classList.add("apunta-arriba");
    } else {
        globo.classList.remove("apunta-arriba");
    }

    globo.classList.add("visible");

    // Permanece visible 6 segundos
    if (timeoutOcultarGlobo) clearTimeout(timeoutOcultarGlobo);
    timeoutOcultarGlobo = setTimeout(() => {
        globo.classList.remove("visible");
    }, 6000);
}

function reiniciarCicloGlobos() {
    detenerCicloGlobos();
    // Espera 15 segundos antes de mostrar la pista por primera vez
    timeoutInicioGlobo = setTimeout(() => {
        mostrarGloboPistaActual();
        temporizadorGlobo = setInterval(mostrarGloboPistaActual, 20000);
    }, 15000);
}

function detenerCicloGlobos() {
    if (timeoutInicioGlobo) clearTimeout(timeoutInicioGlobo);
    if (temporizadorGlobo) clearInterval(temporizadorGlobo);
    if (timeoutOcultarGlobo) clearTimeout(timeoutOcultarGlobo);
    const globo = document.getElementById("globo-pista");
    if (globo) globo.classList.remove("visible");
}

function encontrarPistaMoka(opcion, event) {
    if (event) crearDestelloClic(event);
    const mensaje = document.getElementById("mensaje");

    if (etapaJuego === 2) {
        mensaje.innerText = "Moka ya está contigo, deja de buscarla y concéntrate en Cremas.";
        return;
    }
    if (etapaJuego > 2) return;

    if (opcion === 1 && pistaMoka === 1) {
        mensaje.innerText = "Obvio ahí no está, pero dejó huellas hacia el árbol de la izquierda...";
        pistaMoka = 2;
        reiniciarCicloGlobos();
    } else if (opcion === 2 && pistaMoka === 2) {
        mensaje.innerText = "Tampoco. Seguro anda buscando una siesta cómoda en la banca...";
        pistaMoka = 3;
        reiniciarCicloGlobos();
    } else if (opcion === 3 && pistaMoka === 3) {
        mensaje.innerText = "¡Por fin encontraste a Moka! Ya viene antes de que rompa algo. (1/10)";
        detenerCicloGlobos();
        document.getElementById("moka-personaje").style.display = "block";
        animarPasoDulce();
        animarMokaCorriendo();
        pistaMoka = 4;
    } else {
        if (pistaMoka === 1) mensaje.innerText = "Por ahí no es... concéntrate tantito.";
        else if (pistaMoka === 2) mensaje.innerText = "Ni cerca. Mira bien el árbol.";
        else if (pistaMoka === 3) mensaje.innerText = "Frío, frío. Fíjate en la banca.";
    }
}

function encontrarPistaCremas(opcion, event) {
    if (event) crearDestelloClic(event);
    if (etapaJuego !== 2) return;
    const mensaje = document.getElementById("mensaje");

    if (opcion === 1 && pistaCremas === 1) {
        mensaje.innerText = "Por las estrellas no está, fíjate hacia dónde sopla el viento...";
        pistaCremas = 2;
        reiniciarCicloGlobos();
    } else if (opcion === 2 && pistaCremas === 2) {
        mensaje.innerText = "Ni por el viento. Está trepada en el árbol como si pagara renta...";
        pistaCremas = 3;
        reiniciarCicloGlobos();
    } else if (opcion === 3 && pistaCremas === 3) {
        mensaje.innerText = "¡Bajaste a la gata! Paso 2 listo (2/10). No te emociones, apenas calentamos.";
        detenerCicloGlobos();
        document.getElementById("hotspots-cremas").style.display = "none";

        const cremasImg = document.getElementById("cremas-personaje");
        cremasImg.style.display = "block";
        cremasImg.style.top = "110px";
        cremasImg.style.left = "600px";

        animarCremasBajandoYCorriendo();
        etapaJuego = 3;
    } else {
        if (pistaCremas === 1) mensaje.innerText = "Mmm no, mira hacia las estrellas.";
        else if (pistaCremas === 2) mensaje.innerText = "Por ahí no, busca por el viento.";
        else if (pistaCremas === 3) mensaje.innerText = "Revisa bien el árbol de la derecha.";
    }
}
