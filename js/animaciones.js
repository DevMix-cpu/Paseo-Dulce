// ==========================================================================
// ANIMACIONES Y DESPLAZAMIENTOS DE PERSONAJES
// ==========================================================================

function animarPasoDulce() {
    const dulceImg = document.getElementById("dulce-personaje");
    dulceImg.style.display = "block";
    let frame = 1;
    let posicionX = 150;

    let intervaloDulce = setInterval(() => {
        frame++;
        posicionX += 8;
        if (frame <= 8) {
            dulceImg.src = `./Images/Dulce_${frame}.png`;
            dulceImg.style.left = posicionX + "px";
        } else {
            clearInterval(intervaloDulce);
            dulceImg.src = "./Images/Dulce_1.png";
        }
    }, 100);
}

function animarMokaCorriendo() {
    const mokaImg = document.getElementById("moka-personaje");
    let frame = 1;
    let posX = 580;
    let destinoX = 260;
    mokaImg.classList.add("voltear");

    let intervaloMoka = setInterval(() => {
        frame = (frame % 8) + 1;
        mokaImg.src = `./Images/Moka_${frame}.png`;
        posX -= 10;
        mokaImg.style.left = posX + "px";

        if (posX <= destinoX) {
            clearInterval(intervaloMoka);
            mokaImg.classList.remove("voltear");
            mokaImg.src = "./Images/Moka_4.png";
            etapaJuego = 2;
            document.getElementById("mensaje").innerText = "¡Ahora Cremas se ha perdido en las estrellas! Pista: Mira hacia el cielo...";
            document.getElementById("hotspots-cremas").style.display = "block";
            reiniciarCicloGlobos();
        }
    }, 80);
}

function animarCremasBajandoYCorriendo() {
    const cremasImg = document.getElementById("cremas-personaje");
    let posY = 110;
    let sueloY = 330;

    let intervaloBajar = setInterval(() => {
        posY += 8;
        cremasImg.style.top = posY + "px";
        if (posY >= sueloY) {
            clearInterval(intervaloBajar);
            let frame = 1;
            let posX = 600;
            let destinoX = 185;
            cremasImg.classList.add("voltear");

            let intervaloCorrer = setInterval(() => {
                frame = (frame % 8) + 1;
                cremasImg.src = `./Images/Cremas_${frame}.png`;
                posX -= 10;
                cremasImg.style.left = posX + "px";

                if (posX <= destinoX) {
                    clearInterval(intervaloCorrer);
                    cremasImg.classList.remove("voltear");
                    cremasImg.src = "./Images/Cremas_4.png";

                    setTimeout(avanzarPasoDosConjuntoAnimado, 500);
                }
            }, 80);
        }
    }, 50);
}

function avanzarPasoDosConjuntoAnimado() {
    const dulce = document.getElementById("dulce-personaje");
    const moka = document.getElementById("moka-personaje");
    const cremas = document.getElementById("cremas-personaje");

    let dx = parseInt(dulce.style.left) || 260;
    let mx = parseInt(moka.style.left) || 260;
    let cx = parseInt(cremas.style.left) || 185;

    let frame = 1;
    let pasosContador = 0;

    let avanzaGrupo = setInterval(() => {
        frame = (frame % 8) + 1;
        pasosContador++;
        dx += 3; mx += 3; cx += 3;

        dulce.src = `./Images/Dulce_${frame}.png`;
        moka.src = `./Images/Moka_${frame}.png`;
        cremas.src = `./Images/Cremas_${frame}.png`;

        dulce.style.left = dx + "px";
        moka.style.left = mx + "px";
        cremas.style.left = cx + "px";

        if (pasosContador >= 22) {
            clearInterval(avanzaGrupo);

            dulce.src = "./Images/Dulce_1.png";
            moka.src = "./Images/Moka_4.png";
            cremas.src = "./Images/Cremas_4.png";

            document.getElementById("mensaje").innerText = "2 pasos listos (2/10). Ahora la sopa de letras, a ver qué tal tu vista...";

            iniciarSopaDeLetras();
        }
    }, 90);
}

function animarXimenaCorriendo() {
    const ximenaImg = document.getElementById("ximena-personaje");
    ximenaImg.style.display = "block";

    let frame = 1;
    let posX = 580;
    let destinoX = 190;

    ximenaImg.classList.add("voltear");

    let intervaloXimena = setInterval(() => {
        frame = (frame % 8) + 1;
        ximenaImg.src = `./Images/Ximena_${frame}.png`;

        posX -= 10;
        ximenaImg.style.left = posX + "px";

        if (posX <= destinoX) {
            clearInterval(intervaloXimena);
            ximenaImg.classList.remove("voltear");
            ximenaImg.src = "./Images/Ximena_1.png";

            document.getElementById("mensaje").innerText = "El equipo está completo. Ahora responde el reto del Paso 4 (4/10)...";

            setTimeout(mostrarPreguntaPokemon, 1500);
        }
    }, 80);
}

function avanzarPasoCuatroConjuntoAnimado() {
    const dulce = document.getElementById("dulce-personaje");
    const moka = document.getElementById("moka-personaje");
    const cremas = document.getElementById("cremas-personaje");
    const ximena = document.getElementById("ximena-personaje");

    let dx = parseInt(dulce.style.left) || 326;
    let mx = parseInt(moka.style.left) || 326;
    let cx = parseInt(cremas.style.left) || 251;
    let xx = parseInt(ximena.style.left) || 205;

    let frame = 1;
    let pasosContador = 0;

    let avanzaGrupo = setInterval(() => {
        frame = (frame % 8) + 1;
        pasosContador++;
        dx += 3; mx += 3; cx += 3; xx += 3;

        dulce.src = `./Images/Dulce_${frame}.png`;
        moka.src = `./Images/Moka_${frame}.png`;
        cremas.src = `./Images/Cremas_${frame}.png`;
        ximena.src = `./Images/Ximena_${frame}.png`;

        dulce.style.left = dx + "px";
        moka.style.left = mx + "px";
        cremas.style.left = cx + "px";
        ximena.style.left = xx + "px";

        if (pasosContador >= 20) {
            clearInterval(avanzaGrupo);

            dulce.src = "./Images/Dulce_1.png";
            moka.src = "./Images/Moka_4.png";
            cremas.src = "./Images/Cremas_4.png";
            ximena.src = "./Images/Ximena_1.png";

            document.getElementById("mensaje").innerText = "4 pasos listos (4/10). Siguiente pregunta, no te confíes...";

            setTimeout(mostrarPreguntaRazon, 1500);
        }
    }, 90);
}

function avanzarPasoCincoConjuntoAnimado() {
    const dulce = document.getElementById("dulce-personaje");
    const moka = document.getElementById("moka-personaje");
    const cremas = document.getElementById("cremas-personaje");
    const ximena = document.getElementById("ximena-personaje");

    let dx = parseInt(dulce.style.left) || 386;
    let mx = parseInt(moka.style.left) || 386;
    let cx = parseInt(cremas.style.left) || 311;
    let xx = parseInt(ximena.style.left) || 265;

    let frame = 1;
    let pasosContador = 0;

    let avanzaGrupo = setInterval(() => {
        frame = (frame % 8) + 1;
        pasosContador++;
        dx += 2.5; mx += 2.5; cx += 2.5; xx += 2.5;

        dulce.src = `./Images/Dulce_${frame}.png`;
        moka.src = `./Images/Moka_${frame}.png`;
        cremas.src = `./Images/Cremas_${frame}.png`;
        ximena.src = `./Images/Ximena_${frame}.png`;

        dulce.style.left = dx + "px";
        moka.style.left = mx + "px";
        cremas.style.left = cx + "px";
        ximena.style.left = xx + "px";

        if (pasosContador >= 18) {
            clearInterval(avanzaGrupo);

            dulce.src = "./Images/Dulce_1.png";
            moka.src = "./Images/Moka_4.png";
            cremas.src = "./Images/Cremas_4.png";
            ximena.src = "./Images/Ximena_1.png";

            document.getElementById("mensaje").innerText = "5 pasos listos (5/10). Ahora la prueba de coordinación y ritmo...";

            // --- LLAMAMOS AL MINIJUEGO DEL PASO 6 ---
            setTimeout(iniciarMinijuegoRitmo, 1400);
        }
    }, 90);
}

// Avance conjunto tras completar Paso 6 (Ritmo)
function avanzarPasoSeisConjuntoAnimado() {
    const dulce = document.getElementById("dulce-personaje");
    const moka = document.getElementById("moka-personaje");
    const cremas = document.getElementById("cremas-personaje");
    const ximena = document.getElementById("ximena-personaje");

    let dx = parseInt(dulce.style.left) || 431;
    let mx = parseInt(moka.style.left) || 431;
    let cx = parseInt(cremas.style.left) || 356;
    let xx = parseInt(ximena.style.left) || 310;

    let frame = 1;
    let pasosContador = 0;

    let avanzaPasoSeis = setInterval(() => {
        frame = (frame % 8) + 1;
        pasosContador++;
        dx += 2.5; mx += 2.5; cx += 2.5; xx += 2.5;

        dulce.src = `./Images/Dulce_${frame}.png`;
        moka.src = `./Images/Moka_${frame}.png`;
        cremas.src = `./Images/Cremas_${frame}.png`;
        ximena.src = `./Images/Ximena_${frame}.png`;

        dulce.style.left = dx + "px";
        moka.style.left = mx + "px";
        cremas.style.left = cx + "px";
        ximena.style.left = xx + "px";

        if (pasosContador >= 18) {
            clearInterval(avanzaPasoSeis);

            dulce.src = "./Images/Dulce_1.png";
            moka.src = "./Images/Moka_4.png";
            cremas.src = "./Images/Cremas_4.png";
            ximena.src = "./Images/Ximena_1.png";

            document.getElementById("mensaje").innerText = "6 pasos listos (6/10). A ver si en astronomía te va mejor... ✨";

            // Iniciar Paso 7 (Constelación de Estrellas)
            setTimeout(iniciarMinijuegoConstelacion, 1500);
        }
    }, 90);
}

// Animación de llegada de Lucifer desde la izquierda tras el Paso 7 (Constelación)
function animarLuciferLlegando() {
    const lucifer = document.getElementById("lucifer-personaje");
    const ximena = document.getElementById("ximena-personaje");
    if (!lucifer) {
        avanzarPasoSieteConjuntoAnimado();
        return;
    }

    document.getElementById("mensaje").innerText = "¡Momento! Un pequeño intruso viene a toda velocidad desde la izquierda...";

    lucifer.style.display = "block";
    lucifer.style.top = "348px";
    lucifer.style.width = "62px";
    lucifer.style.zIndex = "4"; // Queda al frente de Ximena (z-index: 3)

    let lx = -80;
    lucifer.style.left = lx + "px";

    let xx = parseInt(ximena?.style.left) || 355;
    let destinoX = xx - 45;
    if (destinoX < 120) destinoX = 310;

    let frame = 1;
    let carreraLucifer = setInterval(() => {
        frame = (frame % 8) + 1;
        lucifer.src = `./Images/Lucifer_${frame}.png`;
        lx += 7;
        lucifer.style.left = lx + "px";

        if (lx >= destinoX) {
            clearInterval(carreraLucifer);
            lucifer.style.left = destinoX + "px";
            lucifer.style.top = "348px";
            lucifer.src = "./Images/Lucifer_1.png";

            document.getElementById("mensaje").innerText = "Lucifer se posicionó junto a Ximena como escolta oficial 🐾";

            setTimeout(() => {
                avanzarPasoSieteConjuntoAnimado();
            }, 1600);
        }
    }, 60);
}

// Avance conjunto tras completar Paso 7 (Constelación) y llegada de Lucifer
function avanzarPasoSieteConjuntoAnimado() {
    const dulce = document.getElementById("dulce-personaje");
    const moka = document.getElementById("moka-personaje");
    const cremas = document.getElementById("cremas-personaje");
    const ximena = document.getElementById("ximena-personaje");
    const lucifer = document.getElementById("lucifer-personaje");

    let dx = parseInt(dulce.style.left) || 476;
    let mx = parseInt(moka.style.left) || 476;
    let cx = parseInt(cremas.style.left) || 401;
    let xx = parseInt(ximena.style.left) || 355;
    let lx = parseInt(lucifer?.style.left) || (xx - 45);

    if (lucifer) {
        lucifer.style.display = "block";
        lucifer.style.top = "348px";
        lucifer.style.width = "62px";
        lucifer.style.zIndex = "4";
    }

    let frame = 1;
    let pasosContador = 0;

    let avanzaPasoSiete = setInterval(() => {
        frame = (frame % 8) + 1;
        pasosContador++;
        dx += 2.5; mx += 2.5; cx += 2.5; xx += 2.5; lx += 2.5;

        dulce.src = `./Images/Dulce_${frame}.png`;
        moka.src = `./Images/Moka_${frame}.png`;
        cremas.src = `./Images/Cremas_${frame}.png`;
        ximena.src = `./Images/Ximena_${frame}.png`;
        if (lucifer) lucifer.src = `./Images/Lucifer_${frame}.png`;

        dulce.style.left = dx + "px";
        moka.style.left = mx + "px";
        cremas.style.left = cx + "px";
        ximena.style.left = xx + "px";
        if (lucifer) {
            lucifer.style.left = lx + "px";
            lucifer.style.top = "348px";
        }

        if (pasosContador >= 18) {
            clearInterval(avanzaPasoSiete);

            dulce.src = "./Images/Dulce_1.png";
            moka.src = "./Images/Moka_4.png";
            cremas.src = "./Images/Cremas_4.png";
            ximena.src = "./Images/Ximena_1.png";
            if (lucifer) {
                lucifer.src = "./Images/Lucifer_1.png";
                lucifer.style.top = "348px";
            }

            document.getElementById("mensaje").innerText = "7 de 10 pasos completados... pero falta lo bueno.";

            // Mostrar Carta Final provisional en Paso 7
            setTimeout(mostrarCartaFinal, 1500);
        }
    }, 90);
}

// Avance conjunto tras completar Paso 8 (Sendero Iluminado)
function avanzarPasoOchoConjuntoAnimado() {
    const dulce = document.getElementById("dulce-personaje");
    const moka = document.getElementById("moka-personaje");
    const cremas = document.getElementById("cremas-personaje");
    const ximena = document.getElementById("ximena-personaje");
    const lucifer = document.getElementById("lucifer-personaje");

    let dx = parseInt(dulce.style.left) || 521;
    let mx = parseInt(moka.style.left) || 521;
    let cx = parseInt(cremas.style.left) || 446;
    let xx = parseInt(ximena.style.left) || 400;
    let lx = parseInt(lucifer?.style.left) || (xx - 45);

    if (lucifer) {
        lucifer.style.top = "348px";
        lucifer.style.width = "62px";
    }

    let frame = 1;
    let pasosContador = 0;

    let avanzaPasoOcho = setInterval(() => {
        frame = (frame % 8) + 1;
        pasosContador++;
        dx += 2.5; mx += 2.5; cx += 2.5; xx += 2.5; lx += 2.5;

        dulce.src = `./Images/Dulce_${frame}.png`;
        moka.src = `./Images/Moka_${frame}.png`;
        cremas.src = `./Images/Cremas_${frame}.png`;
        ximena.src = `./Images/Ximena_${frame}.png`;
        if (lucifer) lucifer.src = `./Images/Lucifer_${frame}.png`;

        dulce.style.left = dx + "px";
        moka.style.left = mx + "px";
        cremas.style.left = cx + "px";
        ximena.style.left = xx + "px";
        if (lucifer) {
            lucifer.style.left = lx + "px";
            lucifer.style.top = "348px";
        }

        if (pasosContador >= 15) {
            clearInterval(avanzaPasoOcho);

            dulce.src = "./Images/Dulce_1.png";
            moka.src = "./Images/Moka_4.png";
            cremas.src = "./Images/Cremas_4.png";
            ximena.src = "./Images/Ximena_1.png";
            if (lucifer) {
                lucifer.src = "./Images/Lucifer_1.png";
                lucifer.style.top = "348px";
            }

            document.getElementById("mensaje").innerText = "8 de 10 pasos completados... pero falta lo bueno.";

            // Mostrar Carta Final provisional en Paso 8
            setTimeout(mostrarCartaFinal, 1500);
        }
    }, 90);
}

// Avance conjunto tras completar Paso 9 (Despejar la Niebla)
function avanzarPasoNueveConjuntoAnimado() {
    const dulce = document.getElementById("dulce-personaje");
    const moka = document.getElementById("moka-personaje");
    const cremas = document.getElementById("cremas-personaje");
    const ximena = document.getElementById("ximena-personaje");
    const lucifer = document.getElementById("lucifer-personaje");

    let dx = parseInt(dulce.style.left) || 558;
    let mx = parseInt(moka.style.left) || 558;
    let cx = parseInt(cremas.style.left) || 483;
    let xx = parseInt(ximena.style.left) || 437;
    let lx = parseInt(lucifer?.style.left) || (xx - 45);

    if (lucifer) {
        lucifer.style.top = "348px";
        lucifer.style.width = "62px";
    }

    let frame = 1;
    let pasosContador = 0;

    let avanzaPasoNueve = setInterval(() => {
        frame = (frame % 8) + 1;
        pasosContador++;
        dx += 2.5; mx += 2.5; cx += 2.5; xx += 2.5; lx += 2.5;

        dulce.src = `./Images/Dulce_${frame}.png`;
        moka.src = `./Images/Moka_${frame}.png`;
        cremas.src = `./Images/Cremas_${frame}.png`;
        ximena.src = `./Images/Ximena_${frame}.png`;
        if (lucifer) lucifer.src = `./Images/Lucifer_${frame}.png`;

        dulce.style.left = dx + "px";
        moka.style.left = mx + "px";
        cremas.style.left = cx + "px";
        ximena.style.left = xx + "px";
        if (lucifer) lucifer.style.left = lx + "px";

        if (pasosContador >= 15) {
            clearInterval(avanzaPasoNueve);

            dulce.src = "./Images/Dulce_1.png";
            moka.src = "./Images/Moka_4.png";
            cremas.src = "./Images/Cremas_4.png";
            ximena.src = "./Images/Ximena_1.png";
            if (lucifer) lucifer.src = "./Images/Lucifer_1.png";

            document.getElementById("mensaje").innerText = "9 de 10 pasos completados... pero falta lo bueno.";

            // Mostrar Carta Final y aviso de paso pendiente en el Paso 9
            setTimeout(mostrarCartaFinal, 1500);
        }
    }, 90);
}

