// ==========================================================================
// CAMINANDO CON DULCE - ARCHIVO PRINCIPAL UNIFICADO
// ==========================================================================

let etapaJuego = 1;
let pistaMoka = 1;
let pistaCremas = 1;

// ==========================================================================
// CONFIGURACIÓN DE PISTAS Y GLOBOS (PASOS 1 Y 2)
// ==========================================================================
const pistasConfig = {
  moka: {
    1: {
      // Lámpara (hotspot left 215, width 60, top 210)
      x: 245,
      y: 175,
      apuntaArriba: false,
      textos: [
        "🐾 ¡Guau! Por el farol... si no me electrocutó",
        "🐾 Fíjate en la luz 💡",
        "🐾 ¿Ves la lámpara? Ahí cerca...",
      ],
    },
    2: {
      // Árbol izquierda (hotspot left 10, width 120, top 40)
      x: 75,
      y: 120,
      apuntaArriba: false,
      textos: [
        "🐾 En el árbol... buscando ardillas 🌳",
        "🐾 Entre las hojas 🍃",
        "🐾 Cerca del tronco...",
      ],
    },
    3: {
      // Banca (hotspot left 480, width 170, top 250)
      x: 565,
      y: 215,
      apuntaArriba: false,
      textos: [
        "🐾 ¡Durmiendo en la banca! 🪑",
        "🐾 Típico de Moka, echada...",
        "🐾 ¡Aquí estoy! Despiértame...",
      ],
    },
  },
  cremas: {
    1: {
      // Cielo / estrellas (hotspot left 300, width 260, top 10)
      x: 430,
      y: 78,
      apuntaArriba: true,
      textos: [
        "✨ ¡Miau! Por el cielo... se cree murciélago 🌌",
        "✨ Mirando las estrellas ⭐",
        "✨ Mira arriba, no al suelo...",
      ],
    },
    2: {
      // Farol derecho / viento (hotspot left 700, width 60, top 220)
      x: 710,
      y: 185,
      apuntaArriba: false,
      textos: [
        "💨 ¡Fshhh! Volando con la brisa 🍃",
        "💨 Por donde pega el viento 🌬️",
        "💨 Por el farol derecho...",
      ],
    },
    3: {
      // Árbol derecha (hotspot left 600, width 120, top 110)
      x: 660,
      y: 75,
      apuntaArriba: false,
      textos: [
        "🐱 ¡Miau! En la copa del árbol 🌳",
        "🐱 Se subió y ahora no sabe bajar 🐾",
        "🐱 ¡Aquí trepada! Bájame...",
      ],
    },
  },
};

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

  if (timeoutOcultarGlobo) clearTimeout(timeoutOcultarGlobo);
  timeoutOcultarGlobo = setTimeout(() => {
    globo.classList.remove("visible");
  }, 6000);
}

function reiniciarCicloGlobos() {
  detenerCicloGlobos();
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

function crearDestelloClic(event) {
  if (!event) return;
  const container = document.getElementById("game-container");
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const escala = rect.width / 800;
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  const clientY = event.touches ? event.touches[0].clientY : event.clientY;

  const x = (clientX - rect.left) / escala;
  const y = (clientY - rect.top) / escala;

  const destello = document.createElement("div");
  destello.className = "destello-clic";
  destello.style.left = x - 30 + "px";
  destello.style.top = y - 30 + "px";
  destello.style.width = "60px";
  destello.style.height = "60px";
  container.appendChild(destello);

  setTimeout(() => destello.remove(), 600);
}

function encontrarPistaMoka(opcion, event) {
  if (event) crearDestelloClic(event);
  const mensaje = document.getElementById("mensaje");

  if (etapaJuego === 2) {
    mensaje.innerText =
      "Moka ya está contigo, deja de buscarla y concéntrate en Cremas.";
    return;
  }
  if (etapaJuego > 2) return;

  if (opcion === 1 && pistaMoka === 1) {
    mensaje.innerText =
      "Obvio ahí no está, pero dejó huellas hacia el árbol de la izquierda...";
    pistaMoka = 2;
    reiniciarCicloGlobos();
  } else if (opcion === 2 && pistaMoka === 2) {
    mensaje.innerText =
      "Tampoco. Seguro anda buscando una siesta cómoda en la banca...";
    pistaMoka = 3;
    reiniciarCicloGlobos();
  } else if (opcion === 3 && pistaMoka === 3) {
    mensaje.innerText =
      "¡Por fin encontraste a Moka! Ya viene antes de que rompa algo. (1/10)";
    detenerCicloGlobos();
    document.getElementById("moka-personaje").style.display = "block";
    animarPasoDulce();
    animarMokaCorriendo();
    pistaMoka = 4;
  } else {
    if (pistaMoka === 1)
      mensaje.innerText = "Por ahí no es... concéntrate tantito.";
    else if (pistaMoka === 2)
      mensaje.innerText = "Ni cerca. Mira bien el árbol.";
    else if (pistaMoka === 3)
      mensaje.innerText = "Frío, frío. Fíjate en la banca.";
  }
}

function encontrarPistaCremas(opcion, event) {
  if (event) crearDestelloClic(event);
  if (etapaJuego !== 2) return;
  const mensaje = document.getElementById("mensaje");

  if (opcion === 1 && pistaCremas === 1) {
    mensaje.innerText =
      "Por las estrellas no está, fíjate hacia dónde sopla el viento...";
    pistaCremas = 2;
    reiniciarCicloGlobos();
  } else if (opcion === 2 && pistaCremas === 2) {
    mensaje.innerText =
      "Ni por el viento. Está trepada en el árbol como si fuera ardilla...";
    pistaCremas = 3;
    reiniciarCicloGlobos();
  } else if (opcion === 3 && pistaCremas === 3) {
    mensaje.innerText =
      "¡Ya se cayo la enana! Paso 2 listo (2/10). No te emociones, apenas calentamos.";
    detenerCicloGlobos();
    document.getElementById("hotspots-cremas").style.display = "none";

    const cremasImg = document.getElementById("cremas-personaje");
    cremasImg.style.display = "block";
    cremasImg.style.top = "110px";
    cremasImg.style.left = "600px";

    animarCremasBajandoYCorriendo();
    etapaJuego = 3;
  } else {
    if (pistaCremas === 1)
      mensaje.innerText = "Mmm no, mira hacia las estrellas.";
    else if (pistaCremas === 2)
      mensaje.innerText = "Por ahí no, busca por el viento.";
    else if (pistaCremas === 3)
      mensaje.innerText = "Revisa bien el árbol de la derecha.";
  }
}

// ==========================================================================
// ANIMACIONES Y DESPLAZAMIENTOS
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
      document.getElementById("mensaje").innerText =
        "Ahora Cremas se cree pájaro y se subió a lo alto. Búscala por el cielo...";
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
    dx += 3;
    mx += 3;
    cx += 3;

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

      document.getElementById("mensaje").innerText =
        "2 pasos listos (2/10). Ahora la sopa de letras, a ver qué tal tu vista...";

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

      document.getElementById("mensaje").innerText =
        "El equipo está completo. Ahora responde el reto del Paso 4 (4/10)...";

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
    dx += 3;
    mx += 3;
    cx += 3;
    xx += 3;

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

      document.getElementById("mensaje").innerText =
        "4 pasos listos (4/10). Siguiente pregunta, no te confíes...";

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
    dx += 2.5;
    mx += 2.5;
    cx += 2.5;
    xx += 2.5;

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

      document.getElementById("mensaje").innerText =
        "5 pasos listos (5/10). Ahora la prueba de coordinación y ritmo...";

      setTimeout(iniciarMinijuegoRitmo, 1400);
    }
  }, 90);
}

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
    dx += 2.5;
    mx += 2.5;
    cx += 2.5;
    xx += 2.5;

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

      document.getElementById("mensaje").innerText =
        "6 pasos listos (6/10). A ver si en astronomía te va mejor... ✨";

      setTimeout(iniciarMinijuegoConstelacion, 1500);
    }
  }, 90);
}

// Animación de llegada de Lucifer desde el lado izquierdo tras el Paso 7 (Constelación)
function animarLuciferLlegando() {
  const lucifer = document.getElementById("lucifer-personaje");
  const ximena = document.getElementById("ximena-personaje");
  if (!lucifer) {
    avanzarPasoSieteConjuntoAnimado();
    return;
  }

  document.getElementById("mensaje").innerText =
    "¡Momento! Un pequeño diablo viene a toda velocidad a tirarte la basura...";

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

      document.getElementById("mensaje").innerText =
        "Lucifer se posicionó junto a Ximena como espia oficial 🐾";

      setTimeout(() => {
        avanzarPasoSieteConjuntoAnimado();
      }, 1600);
    }
  }, 60);
}

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
  let lx = parseInt(lucifer?.style.left) || xx - 45;

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
    dx += 2.5;
    mx += 2.5;
    cx += 2.5;
    xx += 2.5;
    lx += 2.5;

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

      document.getElementById("mensaje").innerText =
        "7 pasos listos (7/10). Ahora prueba de pulso en el sendero...";

      setTimeout(iniciarMinijuegoSendero, 1800);
    }
  }, 90);
}

// ==========================================================================
// PASO 3: SOPA DE LETRAS PROCEDURAL
// ==========================================================================
const palabrasObjetivo = ["XIMENA", "DULCE", "CREMAS", "MOKA", "LUCIFER"];
const TAM_SOPA = 8;
let letrasSeleccionadas = [];
let palabrasEncontradas = [];
let celdaInicioDrag = null;

function generarMatrizAleatoriaSopa() {
  let matriz = Array.from({ length: TAM_SOPA }, () => Array(TAM_SOPA).fill(""));
  const direcciones = [
    { df: 0, dc: 1 },
    { df: 1, dc: 0 },
    { df: 1, dc: 1 },
    { df: -1, dc: 1 },
  ];

  let palabrasOrdenadas = [...palabrasObjetivo].sort(
    (a, b) => b.length - a.length,
  );

  for (let palabra of palabrasOrdenadas) {
    let colocada = false;
    let intentos = 0;

    while (!colocada && intentos < 200) {
      intentos++;
      const dir = direcciones[Math.floor(Math.random() * direcciones.length)];
      const fMax =
        dir.df === 1
          ? TAM_SOPA - palabra.length
          : dir.df === -1
            ? TAM_SOPA - 1
            : TAM_SOPA - 1;
      const fMin = dir.df === -1 ? palabra.length - 1 : 0;
      const cMax = TAM_SOPA - palabra.length;

      const fInicio = Math.floor(Math.random() * (fMax - fMin + 1)) + fMin;
      const cInicio = Math.floor(Math.random() * (cMax + 1));

      let cabe = true;
      for (let i = 0; i < palabra.length; i++) {
        const f = fInicio + dir.df * i;
        const c = cInicio + dir.dc * i;
        if (matriz[f][c] !== "" && matriz[f][c] !== palabra[i]) {
          cabe = false;
          break;
        }
      }

      if (cabe) {
        for (let i = 0; i < palabra.length; i++) {
          const f = fInicio + dir.df * i;
          const c = cInicio + dir.dc * i;
          matriz[f][c] = palabra[i];
        }
        colocada = true;
      }
    }
  }

  const alfabeto = "ABCDEFGHIJLMNOPQRSTUVXYZ";
  for (let f = 0; f < TAM_SOPA; f++) {
    for (let c = 0; c < TAM_SOPA; c++) {
      if (matriz[f][c] === "") {
        matriz[f][c] = alfabeto[Math.floor(Math.random() * alfabeto.length)];
      }
    }
  }

  return matriz;
}

function iniciarSopaDeLetras() {
  const container = document.getElementById("sopa-letras-container");
  const grid = document.getElementById("grid-sopa");
  if (!container || !grid) return;

  grid.innerHTML = "";
  grid.style.gridTemplateColumns = "repeat(8, 28px)";
  letrasSeleccionadas = [];
  palabrasEncontradas = [];

  // Resetear estados de palabras
  palabrasObjetivo.forEach((palabra) => {
    const span = document.getElementById(`p-${palabra}`);
    if (span) {
      span.classList.remove("subrayada");
      span.innerHTML = palabra;
    }
  });

  actualizarContadorSopa();

  const matriz = generarMatrizAleatoriaSopa();
  let arrastrandoSopa = false;

  for (let f = 0; f < TAM_SOPA; f++) {
    for (let c = 0; c < TAM_SOPA; c++) {
      const celda = document.createElement("div");
      celda.className = "celda-sopa";
      celda.dataset.f = f;
      celda.dataset.c = c;
      celda.innerText = matriz[f][c];

      // Selección por clic o inicio de arrastre
      celda.addEventListener("pointerdown", (e) => {
        arrastrandoSopa = true;
        crearDestelloClic(e);
        toggleCeldaSopa(celda, false);
      });

      // Selección continua al arrastrar sobre otras celdas
      celda.addEventListener("pointerenter", () => {
        if (arrastrandoSopa) {
          toggleCeldaSopa(celda, true);
        }
      });

      grid.appendChild(celda);
    }
  }

  // Soporte de arrastre táctil para móviles
  grid.onpointermove = (e) => {
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

  container.style.display = "block";
}

function toggleCeldaSopa(celda, soloAgregar = false) {
  if (celda.classList.contains("encontrada")) return;

  const f = parseInt(celda.dataset.f);
  const c = parseInt(celda.dataset.c);
  const letra = celda.innerText;

  const yaSeleccionada = letrasSeleccionadas.findIndex(
    (item) => item.f === f && item.c === c,
  );

  if (yaSeleccionada >= 0) {
    if (!soloAgregar) {
      letrasSeleccionadas.splice(yaSeleccionada, 1);
      celda.classList.remove("seleccionada");
    }
  } else {
    letrasSeleccionadas.push({ f, c, letra, el: celda });
    celda.classList.add("seleccionada");
  }

  verificarPalabrasSopa();
}

function deseleccionarTodoSopa() {
  letrasSeleccionadas.forEach((item) =>
    item.el.classList.remove("seleccionada"),
  );
  letrasSeleccionadas = [];
}

function verificarPalabrasSopa() {
  if (letrasSeleccionadas.length === 0) return;

  const textoDirecto = letrasSeleccionadas.map((item) => item.letra).join("");
  const textoInverso = [...textoDirecto].reverse().join("");

  palabrasObjetivo.forEach((palabra) => {
    if (!palabrasEncontradas.includes(palabra)) {
      if (textoDirecto === palabra || textoInverso === palabra) {
        palabrasEncontradas.push(palabra);

        letrasSeleccionadas.forEach((item) => {
          item.el.classList.remove("seleccionada");
          item.el.classList.add("encontrada");
        });

        const span = document.getElementById(`p-${palabra}`);
        if (span) {
          span.classList.add("subrayada");
          span.innerHTML = `${palabra} ✓`;
        }

        letrasSeleccionadas = [];
        actualizarContadorSopa();
        actualizarEstadoSopa();
      }
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
  let restantes = palabrasObjetivo.filter(
    (p) => !palabrasEncontradas.includes(p),
  );

  if (restantes.length === 0) {
    document.getElementById("mensaje").innerText =
      "Mira nada más, sí sabes leer. Paso 3 logrado (3/10). Avanzando...";

    setTimeout(() => {
      document.getElementById("sopa-letras-container").style.display = "none";
      animarXimenaCorriendo();
    }, 1800);
  }
}

function omitirSopaDeLetras() {
  palabrasEncontradas = [...palabrasObjetivo];
  palabrasObjetivo.forEach((p) => {
    const span = document.getElementById(`p-${p}`);
    if (span) {
      span.classList.add("subrayada");
      span.innerHTML = `${p} ✓`;
    }
  });
  document.querySelectorAll(".celda-sopa").forEach((c) => {
    c.classList.add("encontrada");
  });
  actualizarContadorSopa();
  document.getElementById("mensaje").innerText =
    "Paso 3 omitido por flojera. Sigamos avanzando...";
  setTimeout(() => {
    document.getElementById("sopa-letras-container").style.display = "none";
    animarXimenaCorriendo();
  }, 600);
}

// ==========================================================================
// PASOS 4 Y 5: PREGUNTAS PERSONALES (QUIZ)
// ==========================================================================
function mostrarPreguntaPokemon() {
  let modal = document.getElementById("quiz-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "quiz-modal";
    modal.className = "modal-juego";
    modal.style.cssText = "top:70px; left:200px; width:400px;";
    document.getElementById("game-container").appendChild(modal);
  }

  modal.innerHTML = `
        <h3 style="color:#ffb703; margin-top:0;">❓ PASO 4 (4/10)</h3>
        <p style="font-size:14px; margin:10px 0;">¿Cuál es mi Pokémon favorito?</p>
        <button class="btn-quiz" onclick="responderPokemon('pikachu')">Pikachu</button>
        <button class="btn-quiz" onclick="responderPokemon('lugia')">Lugia</button>
        <button class="btn-quiz" onclick="responderPokemon('psyduck')">Psyduck</button>
        <p id="quiz-feedback" style="font-size:12px; margin-top:10px; color:#ffb703; min-height:20px;"></p>
    `;
  modal.style.display = "block";
}

function responderPokemon(opcion) {
  const feedback = document.getElementById("quiz-feedback");
  if (opcion === "lugia") {
    feedback.innerText = "¡De seguro te equivocaste!. Paso 4 (4/10).";
    setTimeout(() => {
      document.getElementById("quiz-modal").style.display = "none";
      avanzarPasoCuatroConjuntoAnimado();
    }, 1400);
  } else {
    feedback.innerText =
      "¿En serio? Lo tengo tatuado en el brazo derecho, qué poca atención...";
  }
}

function mostrarPreguntaRazon() {
  let modal = document.getElementById("quiz-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "quiz-modal";
    modal.className = "modal-juego";
    modal.style.cssText = "top:70px; left:200px; width:400px;";
    document.getElementById("game-container").appendChild(modal);
  }

  modal.innerHTML = `
        <h3 style="color:#ffb703; margin-top:0;">❓ PASO 5 (5/10)</h3>
        <p style="font-size:14px; margin:10px 0;">¿Por qué me animé a hablarte?</p>
        <button class="btn-quiz" onclick="responderRazon('ropa')">Tu ropa</button>
        <button class="btn-quiz" onclick="responderRazon('locura')">Tu manera de ser</button>
        <button class="btn-quiz" onclick="responderRazon('sonrisa')">Tu sonrisa</button>
        <p id="quiz-feedback" style="font-size:12px; margin-top:10px; color:#ffb703; min-height:20px;"></p>
    `;
  modal.style.display = "block";
}

function responderRazon(opcion) {
  const feedback = document.getElementById("quiz-feedback");
  if (opcion === "sonrisa") {
    feedback.innerText =
      "Exacto. Tu sonrisa me encanta y me tranquiliza cuando te escucho reir. Paso 5 (5/10).";
    setTimeout(() => {
      document.getElementById("quiz-modal").style.display = "none";
      avanzarPasoCincoConjuntoAnimado();
    }, 1400);
  } else if (opcion === "ropa") {
    feedback.innerText =
      "Si me preguntas que sueter traias hace 5 minutos, ni me acuerdo 😂. Paso 5 (5/10).";
  } else if (opcion === "locura") {
    feedback.innerText =
      "Tu locura combina con la mía, pero no es por eso. Paso 5 (5/10).";
  }
}

// ==========================================================================
// PASO 6: MINIJUEGO DE RITMO Y CADENCIA ("A TU RITMO")
// ==========================================================================
let aciertosRitmo = 0;
const OBJETIVO_ACIERTOS_RITMO = 3;
let animacionRitmoId = null;
let posCursorRitmo = 0;
let direccionRitmo = 1;
let velocidadRitmo = 0.9;
let puedePresionarRitmo = true;

const mensajesAciertoRitmo = [
  "1/3: Buen timing, parece que sí coordinas.",
  "2/3: Uno más y te inscribo a zumba 😂.",
  "3/3: ¡Listo! Paso 6 dominado. A ver el que sigue.",
];

function iniciarMinijuegoRitmo() {
  aciertosRitmo = 0;
  posCursorRitmo = 5;
  direccionRitmo = 1;
  puedePresionarRitmo = true;

  document.getElementById("mensaje").innerText =
    "Paso 6/10: Terapia de coordinación. Presiona el botón justo al centro. Sin prisas.";

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
  window.addEventListener("keydown", manejarTecladoRitmo);
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

  const enZonaObjetivo = posCursorRitmo >= 37 && posCursorRitmo <= 63;

  if (enZonaObjetivo) {
    aciertosRitmo++;
    puedePresionarRitmo = false;

    const chip = document.getElementById(`chip-paso-${aciertosRitmo}`);
    if (chip) {
      chip.classList.add("completado");
      chip.innerText = `✓ Paso ${aciertosRitmo}`;
    }

    feedback.style.color = "#72efdd";
    feedback.innerText = mensajesAciertoRitmo[aciertosRitmo - 1];

    if (aciertosRitmo >= OBJETIVO_ACIERTOS_RITMO) {
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
      setTimeout(() => {
        puedePresionarRitmo = true;
      }, 600);
    }
  } else {
    feedback.style.color = "#ffb703";
    feedback.innerText =
      "Casi, pero no. Con calma, dale justo cuando esté al centro.";
  }
}

// ==========================================================================
// PASO 7: MINIJUEGO DE CONSTELACIÓN ("GUÍA LAS ESTRELLAS - SILUETA MOKA")
// ==========================================================================
const estrellasConstelacion = [
  { id: 1, x: 400, y: 195, label: "1" }, // Barbilla / hociquito
  { id: 2, x: 365, y: 180, label: "2" }, // Mandíbula izquierda
  { id: 3, x: 330, y: 150, label: "3" }, // Mejilla izquierda
  { id: 4, x: 310, y: 105, label: "4" }, // Base exterior oreja izquierda
  { id: 5, x: 285, y: 60, label: "5" }, // Lado exterior oreja izquierda
  { id: 6, x: 265, y: 25, label: "6" }, // Punta oreja izquierda
  { id: 7, x: 320, y: 50, label: "7" }, // Lado interior oreja izquierda
  { id: 8, x: 355, y: 75, label: "8" }, // Base interior oreja izquierda / frente
  { id: 9, x: 400, y: 60, label: "9" }, // Coronilla / centro superior
  { id: 10, x: 445, y: 75, label: "10" }, // Base interior oreja derecha / frente
  { id: 11, x: 480, y: 50, label: "11" }, // Lado interior oreja derecha
  { id: 12, x: 535, y: 25, label: "12" }, // Punta oreja derecha
  { id: 13, x: 515, y: 60, label: "13" }, // Lado exterior oreja derecha
  { id: 14, x: 490, y: 105, label: "14" }, // Base exterior oreja derecha
  { id: 15, x: 470, y: 150, label: "15" }, // Mejilla derecha
  { id: 16, x: 435, y: 180, label: "16" }, // Mandíbula derecha
];

let indiceEstrellaEsperada = 1;
let puntosConectados = [];

function iniciarMinijuegoConstelacion() {
  indiceEstrellaEsperada = 1;
  puntosConectados = [];

  document.getElementById("mensaje").innerText =
    "Paso 7/10: Guía las estrellas del 1 al 16. A ver si reconoces al monstruito orejón...";

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

  estrellasConstelacion.forEach((estrella) => {
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
  estrellasConstelacion.forEach((e) => {
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
    const estrellaCorrecta = document.getElementById(
      `estrella-${indiceEstrellaEsperada}`,
    );
    if (estrellaCorrecta) {
      estrellaCorrecta.style.transform = "translate(-50%, -50%) scale(1.4)";
      setTimeout(() => {
        estrellaCorrecta.style.transform = "";
      }, 300);
    }
    return;
  }

  const elEstrella = document.getElementById(`estrella-${estrella.id}`);
  if (elEstrella) {
    elEstrella.classList.remove("estrella-activa");
    elEstrella.classList.add("estrella-conectada");
  }

  if (puntosConectados.length > 0) {
    const puntoAnterior = puntosConectados[puntosConectados.length - 1];
    trazarLineaSVG(puntoAnterior, estrella);
  }

  puntosConectados.push(estrella);
  indiceEstrellaEsperada++;

  if (indiceEstrellaEsperada > estrellasConstelacion.length) {
    trazarLineaSVG(estrella, estrellasConstelacion[0]);

    const banner = document.getElementById("constelacion-banner-exito");
    if (banner) banner.style.display = "block";

    document.getElementById("mensaje").innerText =
      "Paso 7 terminado (7/10). Ni la NASA hace mapas estelares tan rápido.";

    setTimeout(() => {
      const container = document.getElementById("constelacion-container");
      if (container) container.style.display = "none";
      animarLuciferLlegando();
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

// ==========================================================================
// PASO 8: MINIJUEGO "EL SENDERO ILUMINADO" (TRAZO CON EL DEDO / CURSOR)
// ==========================================================================
const baldosasSendero = [
  { id: 1, x: 20, y: 75 }, // Inicio cerca de los pies
  { id: 2, x: 55, y: 35 }, // Subida curva izquierda
  { id: 3, x: 95, y: 20 }, // Cima superior
  { id: 4, x: 135, y: 55 }, // Bajada diagonal
  { id: 5, x: 170, y: 95 }, // Valle inferior
  { id: 6, x: 210, y: 105 }, // Curva base
  { id: 7, x: 245, y: 75 }, // Subida media
  { id: 8, x: 280, y: 38 }, // Cima derecha
  { id: 9, x: 315, y: 65 }, // Meta final del sendero
];

let indiceBaldosaEsperada = 1;
let arrastrandoTrazoSendero = false;
let puntosSenderoConectados = [];

function iniciarMinijuegoSendero() {
  indiceBaldosaEsperada = 1;
  arrastrandoTrazoSendero = false;
  puntosSenderoConectados = [];

  document.getElementById("mensaje").innerText =
    "Paso 8/10: Sigue el sendero sobre las 9 baldosas sin perder el pulso 👣";

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

  baldosasSendero.forEach((b) => {
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
    try {
      container.releasePointerCapture(e.pointerId);
    } catch (err) {}
  };

  container.onpointercancel = () => {
    arrastrandoTrazoSendero = false;
  };
}

function actualizarBaldosaProxima() {
  baldosasSendero.forEach((b) => {
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

  const baldosaActual = baldosasSendero.find(
    (b) => b.id === indiceBaldosaEsperada,
  );
  if (!baldosaActual) return;

  const dist = Math.hypot(x - baldosaActual.x, y - baldosaActual.y);

  if (dist <= 26) {
    const el = document.getElementById(`baldosa-${baldosaActual.id}`);
    if (el) {
      el.classList.remove("proxima");
      el.classList.add("iluminada");
    }

    if (puntosSenderoConectados.length > 0) {
      const anterior =
        puntosSenderoConectados[puntosSenderoConectados.length - 1];
      trazarSegmentoSenderoSVG(anterior, baldosaActual);
    }

    puntosSenderoConectados.push(baldosaActual);
    emitirExplosionChispas(baldosaActual.x, baldosaActual.y);

    indiceBaldosaEsperada++;

    if (indiceBaldosaEsperada > baldosasSendero.length) {
      arrastrandoTrazoSendero = false;

      let halo = document.getElementById("sendero-halo-luz");
      if (!halo) {
        halo = document.createElement("div");
        halo.id = "sendero-halo-luz";
        document.getElementById("game-container").appendChild(halo);
      }
      halo.style.display = "block";

      document.getElementById("mensaje").innerText =
        "¡8 de 10 pasos! Ahh mejor te bloqueo, ya me dio ansiedad.";

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
  let lx = parseInt(lucifer?.style.left) || xx - 45;

  if (lucifer) {
    lucifer.style.top = "348px";
    lucifer.style.width = "62px";
  }

  let frame = 1;
  let pasosContador = 0;

  let avanzaPasoOcho = setInterval(() => {
    frame = (frame % 8) + 1;
    pasosContador++;
    dx += 2.5;
    mx += 2.5;
    cx += 2.5;
    xx += 2.5;
    lx += 2.5;

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

      document.getElementById("mensaje").innerText =
        "8 pasos listos (8/10). Hora de cosechar energía para el tramo final 🌾✨";

      setTimeout(iniciarMinijuegoCosecha, 1600);
    }
  }, 90);
}

// ==========================================================================
// PASO 9: MINIJUEGO "COSECHANDO PASOS" (RECOLECCIÓN DE ENERGÍA)
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
  { icono: "🍃", nombre: "hojita", puntos: 10 },
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

  const tipo =
    TIPOS_ELEMENTOS_COSECHA[
      Math.floor(Math.random() * TIPOS_ELEMENTOS_COSECHA.length)
    ];
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
    tiempo: 0,
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
      item.x =
        item.baseX +
        Math.sin(item.tiempo + item.swayFase) * (item.swayAmplitud * 18);

      item.el.style.top = `${item.y}px`;
      item.el.style.left = `${item.x}px`;

      // Detección de colisión con la canasta
      const distX = Math.abs(item.x - canastaCosechaX);
      const enAlturaCanasta = item.y >= 365 && item.y <= 415;

      if (enAlturaCanasta && distX <= 48) {
        energiaCosecha = Math.min(
          OBJETIVO_ENERGIA_COSECHA,
          energiaCosecha + item.puntos,
        );

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

  elementosCosecha.forEach((item) => item.el.remove());
  elementosCosecha = [];

  const banner = document.getElementById("cosecha-banner-exito");
  if (banner) banner.style.display = "block";

  document.getElementById("mensaje").innerText =
    "¡100% de energía cosechada! Paso 9 completado (9/10) 🎉";

  setTimeout(() => {
    const container = document.getElementById("cosecha-container");
    if (container) container.style.display = "none";

    avanzarPasoNueveConjuntoAnimado();
  }, 1800);
}

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
  let lx = parseInt(lucifer?.style.left) || xx - 45;

  if (lucifer) {
    lucifer.style.top = "348px";
    lucifer.style.width = "62px";
    lucifer.style.zIndex = "4";
  }

  let frame = 1;
  let pasosContador = 0;

  let avanzaPasoNueve = setInterval(() => {
    frame = (frame % 8) + 1;
    pasosContador++;
    dx += 2.5;
    mx += 2.5;
    cx += 2.5;
    xx += 2.5;
    lx += 2.5;

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
      clearInterval(avanzaPasoNueve);

      dulce.src = "./Images/Dulce_1.png";
      moka.src = "./Images/Moka_4.png";
      cremas.src = "./Images/Cremas_4.png";
      ximena.src = "./Images/Ximena_1.png";
      if (lucifer) {
        lucifer.src = "./Images/Lucifer_1.png";
        lucifer.style.top = "348px";
      }

      document.getElementById("mensaje").innerText =
        "El grupo se detiene... Una densa niebla cubre el camino adelante 🌫️";

      setTimeout(mostrarNieblaInactivaYPasoDiez, 1400);
    }
  }, 90);
}

// ==========================================================================
// PASO 10: NIEBLA INACTIVA (PASO BLOQUEADO) Y MENSAJE ESPECIAL
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

  // Capa completamente estática e inactiva (sin eventos de borrado)
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
    width / 2,
    height / 2,
    70,
    width / 2,
    height / 2,
    440,
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

function mostrarModalMensajeEspecial() {
  let modal = document.getElementById("modal-mensaje-especial");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal-mensaje-especial";
    modal.className = "modal-juego";
    document.getElementById("game-container").appendChild(modal);
  }

  modal.innerHTML = `
    <div class="icono-especial-candado">🔒 ✨ 👣</div>
    <h3 style="color:#ffb703; margin:0 0 6px 0; font-size:17px; letter-spacing:1.5px;">EL SIGUIENTE PASO</h3>
    <div style="background:rgba(114,239,221,0.12); border:1px solid #72efdd; color:#72efdd; padding:4px 12px; border-radius:12px; font-size:11.5px; font-weight:bold; margin-bottom:12px; display:inline-block;">
      Paso 10: Reservado para nosotros
    </div>
    <div class="caja-cita-especial">
      <p class="frase-especial">
        “Ya te estoy viendo y tú aún no lo sabes... Avísame cuando estés lista para dar el siguiente paso y yo caminaré contigo.”
      </p>
    </div>
    <button class="btn-sopa" onclick="cerrarMensajeEspecialYAbrirCarta()" style="background:#ffb703; color:#110d1a; font-weight:bold; font-size:13px; padding:10px 22px; border:none; border-radius:8px; cursor:pointer; box-shadow:0 4px 15px rgba(255,183,3,0.4);">
      Caminar juntos 💛
    </button>
  `;

  modal.style.display = "block";
}

function cerrarMensajeEspecialYAbrirCarta() {
  const modalEspecial = document.getElementById("modal-mensaje-especial");
  if (modalEspecial) {
    modalEspecial.style.display = "none";
  }

  mostrarCartaFinal();
}

// ==========================================================================
// CARTA FINAL Y MENSAJE DE RECUPERACIÓN (PASO 10 EN LA VIDA REAL)
// ==========================================================================
function mostrarCartaFinal() {
  let modalFinal = document.getElementById("carta-final-modal");
  if (!modalFinal) {
    modalFinal = document.createElement("div");
    modalFinal.id = "carta-final-modal";
    document.getElementById("game-container").appendChild(modalFinal);
  }

  modalFinal.innerHTML = `
    <h2 style="color:#ffb703; margin-top:0; font-size:18px; letter-spacing:1px;">✨ 9 DE 10 PASOS LOGRADOS ✨</h2>

    <div style="background:rgba(255,183,3,0.15); border:1px solid #ffb703; color:#ffb703; padding:5px 14px; border-radius:8px; font-weight:bold; font-size:12px; margin:4px auto 10px auto; display:inline-block;">
        Paso 10: Reservado para nosotros dos en la vida real 🔒
    </div>

    <p style="font-size:13px; line-height:1.65; color:#f0ebd8; margin:10px 0; text-align:justify;">
        Sé que no soy de discursos ni de ponerme sentimental, pero quiero ser muy claro con esto: lo que estás haciendo en cada terapia tiene todo mi respeto. Ver el esfuerzo que le metes todos los días para ponerte de pie y avanzar no es poca cosa, y admiro mucho tu aguante.<br><br>
        No te presiones ni te desesperes por el tiempo; no hay ninguna prisa. Yo no me desespero ni me pesa esperarte, me importa acompañarte a tu propio ritmo. Medio locos los dos, con días pesados o con quejas válidas, pero aquí seguimos firmes y juntos.<br><br>
        Llegaste al paso 9 en el juego, y ese último paso cubierto de niebla lo dejamos así a propósito: el décimo paso lo tenemos guardado para darlo juntos en la vida real, caminando de la mano. Te quiero muchísimo.
    </p>

    <button onclick="location.reload()" style="margin-top:8px; padding:9px 18px; background:#ffb703; color:#110d1a; font-weight:bold; border:none; border-radius:8px; cursor:pointer; font-family:monospace; font-size:12.5px; box-shadow: 0 4px 15px rgba(255,183,3,0.4);">Volver a jugar 🐾</button>
  `;
  modalFinal.style.display = "block";
}

// ==========================================================================
// SISTEMA RESPONSIVE DINÁMICO (VIEWPORT FIT)
// ==========================================================================
function ajustarEscalaJuego() {
  const container = document.getElementById("game-container");
  const aviso = document.getElementById("orientacion-aviso");
  if (!container) return;

  const BASE_WIDTH = 800;
  const BASE_HEIGHT = 450;

  const padding = 16;
  const availableWidth = Math.max(window.innerWidth - padding, 200);
  const availableHeight = Math.max(window.innerHeight - padding, 150);

  const scale = Math.min(
    availableWidth / BASE_WIDTH,
    availableHeight / BASE_HEIGHT,
  );

  container.style.transform = `scale(${scale})`;

  if (aviso) {
    if (window.innerHeight > window.innerWidth && window.innerWidth <= 768) {
      aviso.style.display = "block";
    } else {
      aviso.style.display = "none";
    }
  }
}

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
