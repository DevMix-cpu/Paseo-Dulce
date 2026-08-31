let pistaMoka = 1;
let pistaCremas = 1;
let etapaJuego = 1;

function encontrarPistaMoka(opcion) {
    const mensaje = document.getElementById("mensaje");

    if (etapaJuego === 2) {
        mensaje.innerText = "¡Moka ya está a salvo con Dulce! Concéntrate en buscar a Cremas.";
        return;
    }
    if (etapaJuego > 2) return;

    if (opcion === 1 && pistaMoka === 1) {
        mensaje.innerText = "¡Bien! Aquí no está, pero dejó huellas hacia el gran árbol de la izquierda...";
        pistaMoka = 2;
    } else if (opcion === 2 && pistaMoka === 2) {
        mensaje.innerText = "¡Tampoco está aquí! Parece que está dormida en algún lugar cómodo...";
        pistaMoka = 3;
    } else if (opcion === 3 && pistaMoka === 3) {
        mensaje.innerText = "¡Encontraste a Moka! Va corriendo con Dulce...";
        document.getElementById("moka-personaje").style.display = "block";
        animarPasoDulce();
        animarMokaCorriendo();
        pistaMoka = 4;
    } else {
        if (pistaMoka === 1) mensaje.innerText = "Mmmm, por ahí no está. Revisa bien la lámpara.";
        else if (pistaMoka === 2) mensaje.innerText = "Mmmm, por ahí no está. Revisa bien el árbol.";
        else if (pistaMoka === 3) mensaje.innerText = "Mmmm, por ahí no está. Revisa bien la banca.";
    }
}

function encontrarPistaCremas(opcion) {
    if (etapaJuego !== 2) return;
    const mensaje = document.getElementById("mensaje");

    if (opcion === 1 && pistaCremas === 1) {
        mensaje.innerText = "¡Bien! Por las estrellas no está, pero siente hacia dónde va el viento...";
        pistaCremas = 2;
    } else if (opcion === 2 && pistaCremas === 2) {
        mensaje.innerText = "¡Tampoco por el viento! Está tan alta que parece un gatito trepado en el árbol...";
        pistaCremas = 3;
    } else if (opcion === 3 && pistaCremas === 3) {
        mensaje.innerText = "¡Encontraste a Cremas trepada en la rama! ¡Segundo paso logrado (2/6)! 🎉";
        document.getElementById("hotspots-cremas").style.display = "none";

        const cremasImg = document.getElementById("cremas-personaje");
        cremasImg.style.display = "block";
        cremasImg.style.top = "110px";
        cremasImg.style.left = "600px";

        animarCremasBajandoYCorriendo();
        etapaJuego = 3;
    } else {
        if (pistaCremas === 1) mensaje.innerText = "Mmmm, por ahí no está. Revisa bien hacia las estrellas.";
        else if (pistaCremas === 2) mensaje.innerText = "Mmmm, por ahí no está. Siente hacia dónde sopla el viento.";
        else if (pistaCremas === 3) mensaje.innerText = "Mmmm, por ahí no está. Revisa bien el árbol de la derecha.";
    }
}

function animarPasoDulce() {
    const dulceImg = document.getElementById("dulce-personaje");
    dulceImg.style.display = "block";
    let frame = 1;
    let posicionX = 150;

    let intervaloDulce = setInterval(() => {
        frame++;
        posicionX += 8;
        if (frame <= 8) {
            dulceImg.src = `images/Dulce_${frame}.png`;
            dulceImg.style.left = posicionX + "px";
        } else {
            clearInterval(intervaloDulce);
            dulceImg.src = "images/Dulce_1.png";
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
        mokaImg.src = `images/Moka_${frame}.png`;
        posX -= 10;
        mokaImg.style.left = posX + "px";

        if (posX <= destinoX) {
            clearInterval(intervaloMoka);
            mokaImg.classList.remove("voltear");
            mokaImg.src = "images/Moka_4.png";
            etapaJuego = 2;
            document.getElementById("mensaje").innerText = "¡Ahora Cremas se ha perdido en las estrellas! Pista: Mira hacia el cielo...";
            document.getElementById("hotspots-cremas").style.display = "block";
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
                cremasImg.src = `images/Cremas_${frame}.png`;
                posX -= 10;
                cremasImg.style.left = posX + "px";

                if (posX <= destinoX) {
                    clearInterval(intervaloCorrer);
                    cremasImg.classList.remove("voltear");
                    cremasImg.src = "images/Cremas_4.png";

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

        dulce.src = `images/Dulce_${frame}.png`;
        moka.src = `images/Moka_${frame}.png`;
        cremas.src = `images/Cremas_${frame}.png`;

        dulce.style.left = dx + "px";
        moka.style.left = mx + "px";
        cremas.style.left = cx + "px";

        if (pasosContador >= 22) {
            clearInterval(avanzaGrupo);

            dulce.src = "images/Dulce_1.png";
            moka.src = "images/Moka_4.png";
            cremas.src = "images/Cremas_4.png";

            document.getElementById("mensaje").innerText = "¡Hermoso equipo! ¡2 pasos logrados! Ahora resuelve la Sopa de Letras...";

            iniciarSopaDeLetras();
        }
    }, 90);
}

// ================= SOPA DE LETRAS =================
const palabrasObjetivo = ["XIMENA", "DULCE", "CREMAS", "MOKA", "LUCIFER"];
let palabrasEncontradas = [];

function iniciarSopaDeLetras() {
    document.getElementById("sopa-letras-container").style.display = "block";

    const matriz = [
        ['Q', 'X', 'Z', 'A', 'D', 'N', 'M', 'S', 'B', 'C'],
        ['A', 'I', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O'],
        ['P', 'M', 'D', 'U', 'L', 'C', 'E', 'P', 'A', 'S'],
        ['D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X'],
        ['C', 'N', 'L', 'U', 'C', 'I', 'F', 'E', 'R', 'C'],
        ['R', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'R'],
        ['E', 'M', 'K', 'L', 'C', 'M', 'S', 'X', 'B', 'E'],
        ['M', 'X', 'O', 'P', 'Q', 'R', 'O', 'T', 'U', 'M'],
        ['A', 'Q', 'X', 'Y', 'Z', 'A', 'B', 'K', 'D', 'A'],
        ['S', 'T', 'G', 'M', 'R', 'T', 'A', 'W', 'A', 'S']
    ];

    const gridDiv = document.getElementById("grid-sopa");
    gridDiv.innerHTML = "";

    for (let f = 0; f < 10; f++) {
        for (let c = 0; c < 10; c++) {
            const celda = document.createElement("div");
            celda.className = "celda-sopa";
            celda.innerText = matriz[f][c];
            celda.dataset.letra = matriz[f][c];

            celda.onclick = () => seleccionarCelda(celda);
            gridDiv.appendChild(celda);
        }
    }
}

function seleccionarCelda(celda) {
    if (celda.classList.contains("encontrada")) return;

    celda.classList.toggle("seleccionada");

    const seleccionadas = document.querySelectorAll(".celda-sopa.seleccionada");
    let palabraFormada = Array.from(seleccionadas).map(el => el.dataset.letra).join("");

    palabrasObjetivo.forEach(palabra => {
        let palabraAlReves = palabra.split("").reverse().join("");

        if ((palabraFormada === palabra || palabraFormada === palabraAlReves) && !palabrasEncontradas.includes(palabra)) {
            palabrasEncontradas.push(palabra);

            seleccionadas.forEach(el => {
                el.classList.remove("seleccionada");
                el.classList.add("encontrada");
            });

            const spanPalabra = document.getElementById(`p-${palabra}`);
            if (spanPalabra) spanPalabra.classList.add("subrayada");

            actualizarEstadoSopa();
        }
    });
}

function actualizarEstadoSopa() {
    let restantes = palabrasObjetivo.filter(p => !palabrasEncontradas.includes(p));

    if (restantes.length === 0) {
        document.getElementById("mensaje").innerText = "¡Sopa de letras completada! ¡Tercer paso logrado (3/6)! 🎉";

        setTimeout(() => {
            document.getElementById("sopa-letras-container").style.display = "none";
            animarXimenaCorriendo();
        }, 2000);
    }
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
        ximenaImg.src = `images/Ximena_${frame}.png`;

        posX -= 10;
        ximenaImg.style.left = posX + "px";

        if (posX <= destinoX) {
            clearInterval(intervaloXimena);
            ximenaImg.classList.remove("voltear");
            ximenaImg.src = "images/Ximena_1.png";

            document.getElementById("mensaje").innerText = "¡El equipo está completo! Ahora responde el reto del Paso 4... 🤔";

            setTimeout(mostrarPreguntaPokemon, 1500);
        }
    }, 80);
}

// ================= PASO 4: PREGUNTA POKEMON =================
function mostrarPreguntaPokemon() {
    let modal = document.getElementById("quiz-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "quiz-modal";
        modal.style.cssText = "position:absolute; top:70px; left:200px; width:400px; background:rgba(20,20,35,0.96); border:3px solid #ffb703; padding:15px; border-radius:12px; color:white; text-align:center; z-index:30; box-shadow:0 10px 25px rgba(0,0,0,0.8); font-family:monospace;";
        document.getElementById("game-container").appendChild(modal);
    }

    modal.innerHTML = `
        <h3 style="color:#ffb703; margin-top:0;">❓ PREGUNTA 1 / 2</h3>
        <p style="font-size:14px; margin:10px 0;">¿Qué Pokémon me gusta más?</p>
        <button onclick="responderPokemon('pikachu')" style="margin:5px; padding:8px 15px; background:#2b2d42; color:white; border:1px solid #ffb703; border-radius:5px; cursor:pointer;">Pikachu</button>
        <button onclick="responderPokemon('lugia')" style="margin:5px; padding:8px 15px; background:#2b2d42; color:white; border:1px solid #ffb703; border-radius:5px; cursor:pointer;">Lugia</button>
        <button onclick="responderPokemon('psyduck')" style="margin:5px; padding:8px 15px; background:#2b2d42; color:white; border:1px solid #ffb703; border-radius:5px; cursor:pointer;">Psyduck</button>
        <p id="quiz-feedback" style="font-size:12px; margin-top:10px; color:#ffb703; min-height:20px;"></p>
    `;
    modal.style.display = "block";
}

function responderPokemon(opcion) {
    const feedback = document.getElementById("quiz-feedback");
    if (opcion === 'lugia') {
        feedback.innerText = "¡Correcto! ¡Paso 4 logrado (4/6)! 🎉";
        setTimeout(() => {
            document.getElementById("quiz-modal").style.display = "none";
            avanzarPasoCuatroConjuntoAnimado();
        }, 1500);
    } else {
        feedback.innerText = "Recuerda que lo tengo tatuado en el brazo derecho...";
    }
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

        dulce.src = `images/Dulce_${frame}.png`;
        moka.src = `images/Moka_${frame}.png`;
        cremas.src = `images/Cremas_${frame}.png`;
        ximena.src = `images/Ximena_${frame}.png`;

        dulce.style.left = dx + "px";
        moka.style.left = mx + "px";
        cremas.style.left = cx + "px";
        ximena.style.left = xx + "px";

        if (pasosContador >= 20) {
            clearInterval(avanzaGrupo);

            dulce.src = "images/Dulce_1.png";
            moka.src = "images/Moka_4.png";
            cremas.src = "images/Cremas_4.png";
            ximena.src = "images/Ximena_1.png";

            document.getElementById("mensaje").innerText = "¡Excelente equipo! 4 pasos logrados. Siguiente pregunta...";

            setTimeout(mostrarPreguntaRazon, 1500);
        }
    }, 90);
}

// ================= PASO 5: PREGUNTA RAZÓN =================
function mostrarPreguntaRazon() {
    let modal = document.getElementById("quiz-modal");
    modal.innerHTML = `
        <h3 style="color:#ffb703; margin-top:0;">❓ PREGUNTA 2 / 2</h3>
        <p style="font-size:14px; margin:10px 0;">¿Por qué me animé a hablarte?</p>
        <button onclick="responderRazon('sonrisa')" style="margin:5px; padding:8px 12px; background:#2b2d42; color:white; border:1px solid #ffb703; border-radius:5px; cursor:pointer;">Tu sonrisa</button>
        <button onclick="responderRazon('ropa')" style="margin:5px; padding:8px 12px; background:#2b2d42; color:white; border:1px solid #ffb703; border-radius:5px; cursor:pointer;">Tu ropa</button>
        <button onclick="responderRazon('locura')" style="margin:5px; padding:8px 12px; background:#2b2d42; color:white; border:1px solid #ffb703; border-radius:5px; cursor:pointer;">Tu locura</button>
        <p id="quiz-feedback" style="font-size:12px; margin-top:10px; color:#ffb703; min-height:20px;"></p>
    `;
    modal.style.display = "block";
}

function responderRazon(opcion) {
    const feedback = document.getElementById("quiz-feedback");
    if (opcion === 'sonrisa') {
        feedback.innerText = "¡Exacto! ¡Paso 5 logrado (5/6)! 💖";
        setTimeout(() => {
            document.getElementById("quiz-modal").style.display = "none";
            avanzarPasoCincoConjuntoAnimado();
        }, 1500);
    } else if (opcion === 'ropa') {
        feedback.innerText = "¡Eso ni lo veo, estoy ciego! 😂 (Intenta otra)";
    } else if (opcion === 'locura') {
        feedback.innerText = "Sí, pero eso lo descubrí después... 😉 (Intenta otra)";
    }
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
        dx += 3; mx += 3; cx += 3; xx += 3;

        dulce.src = `images/Dulce_${frame}.png`;
        moka.src = `images/Moka_${frame}.png`;
        cremas.src = `images/Cremas_${frame}.png`;
        ximena.src = `images/Ximena_${frame}.png`;

        dulce.style.left = dx + "px";
        moka.style.left = mx + "px";
        cremas.style.left = cx + "px";
        ximena.style.left = xx + "px";

        if (pasosContador >= 20) {
            clearInterval(avanzaGrupo);

            dulce.src = "images/Dulce_1.png";
            moka.src = "images/Moka_4.png";
            cremas.src = "images/Cremas_4.png";
            ximena.src = "images/Ximena_1.png";

            document.getElementById("mensaje").innerText = "¡5 pasos logrados! ¡Vamos al gran final!";

            // --- AQUÍ LLAMAMOS AL GRAN FINAL (PASO 6) ---
            setTimeout(avanzarPasoSeisFinal, 1500);
        }
    }, 90);
}

// ================= PASO 6: EL GRAN FINAL =================
function avanzarPasoSeisFinal() {
    const dulce = document.getElementById("dulce-personaje");
    const moka = document.getElementById("moka-personaje");
    const cremas = document.getElementById("cremas-personaje");
    const ximena = document.getElementById("ximena-personaje");

    let dx = parseInt(dulce.style.left) || 446;
    let mx = parseInt(moka.style.left) || 446;
    let cx = parseInt(cremas.style.left) || 371;
    let xx = parseInt(ximena.style.left) || 325;

    let frame = 1;
    let pasosContador = 0;

    let avanzaUltimoPaso = setInterval(() => {
        frame = (frame % 8) + 1;
        pasosContador++;
        dx += 3; mx += 3; cx += 3; xx += 3;

        dulce.src = `images/Dulce_${frame}.png`;
        moka.src = `images/Moka_${frame}.png`;
        cremas.src = `images/Cremas_${frame}.png`;
        ximena.src = `images/Ximena_${frame}.png`;

        dulce.style.left = dx + "px";
        moka.style.left = mx + "px";
        cremas.style.left = cx + "px";
        ximena.style.left = xx + "px";

        if (pasosContador >= 15) {
            clearInterval(avanzaUltimoPaso);

            dulce.src = "images/Dulce_1.png";
            moka.src = "images/Moka_4.png";
            cremas.src = "images/Cremas_4.png";
            ximena.src = "images/Ximena_1.png";

            document.getElementById("mensaje").innerText = "¡Meta alcanzada! ¡6 de 6 pasos logrados! ❤️";

            mostrarCartaFinal();
        }
    }, 90);
}

function mostrarCartaFinal() {
    let modalFinal = document.getElementById("carta-final-modal");
    if (!modalFinal) {
        modalFinal = document.createElement("div");
        modalFinal.id = "carta-final-modal";
        modalFinal.style.cssText = "position:absolute; top:40px; left:150px; width:500px; background:rgba(20,20,35,0.98); border:4px solid #ffb703; padding:20px; border-radius:15px; color:white; text-align:center; z-index:40; box-shadow:0 15px 35px rgba(0,0,0,0.9); font-family:monospace;";
        document.getElementById("game-container").appendChild(modalFinal);
    }

    modalFinal.innerHTML = `
        <h2 style="color:#ffb703; margin-top:0; font-size:20px;">✨ ¡LO LOGRASTE, 😎❤️! ✨</h2>
        <p style="font-size:13px; line-height:1.6; color:#f0ebd8; margin:10px 0; text-align:justify;">
            No hay prisa por llegar a ningún lado, lo importante es ir a tu ritmo. No me pesa esperarte; al contrario, cada momento esperando a verte sonreir vale la pena. Siempre te lo repito: con calma. Te quiero muchisimo ❤️, así que mucho animo cada dia.
        </p>
        <button onclick="location.reload()" style="margin-top:5px; padding:8px 16px; background:#ffb703; color:black; font-weight:bold; border:none; border-radius:8px; cursor:pointer; font-family:monospace;">Volver a jugar 🐾</button>
    `;
    modalFinal.style.display = "block";
}