// ==========================================================================
// CARTA FINAL Y MENSAJE DE RECUPERACIÓN (PASO 10 EN LA VIDA REAL)
// ==========================================================================

// Gancho para el Paso 9
function iniciarPasoNueve() {
    iniciarMinijuegoCosecha();
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
