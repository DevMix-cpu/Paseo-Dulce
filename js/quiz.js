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
    if (opcion === 'lugia') {
        feedback.innerText = "¡Menos mal te acordaste! Si fallabas esta, había tabla. Paso 4 (4/10).";
        setTimeout(() => {
            document.getElementById("quiz-modal").style.display = "none";
            avanzarPasoCuatroConjuntoAnimado();
        }, 1400);
    } else {
        feedback.innerText = "¿En serio? Lo tengo tatuado en el brazo derecho, qué poca atención...";
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
    if (opcion === 'locura') {
        feedback.innerText = "Exacto. Tu personalidad rara que combina perfecto con la mía. Paso 5 (5/10).";
        setTimeout(() => {
            document.getElementById("quiz-modal").style.display = "none";
            avanzarPasoCincoConjuntoAnimado();
        }, 1400);
    } else if (opcion === 'ropa') {
        feedback.innerText = "¡Si estoy medio ciego, ni me fijo en eso! 😂 Intenta otra.";
    } else if (opcion === 'sonrisa') {
        feedback.innerText = "Eso me di cuenta después, no inventes 😉 Intenta otra.";
    }
}
