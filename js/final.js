// ==========================================================================
// CARTA FINAL Y MENSAJE DE RECUPERACIÓN (PASO 9)
// ==========================================================================

// Gancho para el Paso 9
function iniciarPasoNueve() {
    iniciarMinijuegoNiebla();
}

function mostrarCartaFinal() {
    let modalFinal = document.getElementById("carta-final-modal");
    if (!modalFinal) {
        modalFinal = document.createElement("div");
        modalFinal.id = "carta-final-modal";
        document.getElementById("game-container").appendChild(modalFinal);
    }

    modalFinal.innerHTML = `
        <h2 style="color:#ffb703; margin-top:0; font-size:18px; letter-spacing:1px;">✨ 7 DE 10 PASOS LOGRADOS ✨</h2>
        
        <div style="background:rgba(255,183,3,0.15); border:1px solid #ffb703; color:#ffb703; padding:6px 14px; border-radius:8px; font-weight:bold; font-size:12.5px; margin:6px auto 12px auto; display:inline-block;">
            Paso 10: Reservado para nosotros dos
        </div>

        <p style="font-size:13px; line-height:1.65; color:#f0ebd8; margin:10px 0; text-align:justify;">
            Sé que no soy de discursos ni de ponerme sentimental, pero quiero ser muy claro con esto: lo que estás haciendo en cada terapia tiene todo mi respeto. Ver el esfuerzo que le metes todos los días para ponerte de pie y avanzar no es poca cosa, y admiro mucho tu aguante.<br><br>
            No te presiones ni te desesperes por el tiempo; no hay ninguna prisa. Yo no me desespero ni me pesa esperarte, me importa acompañarte a tu propio ritmo. Medio locos los dos, con días pesados o con quejas válidas, pero aquí seguimos firmes y juntos.<br><br>
            Llegaste al paso 7 en el juego, pero el décimo paso lo tenemos guardado para la vida real: caminando juntos de la mano. Te quiero muchísimo.
        </p>

        <button onclick="location.reload()" style="margin-top:8px; padding:9px 18px; background:#ffb703; color:#110d1a; font-weight:bold; border:none; border-radius:8px; cursor:pointer; font-family:monospace; font-size:13px; box-shadow: 0 4px 15px rgba(255,183,3,0.4);">Volver a jugar 🐾</button>
    `;
    modalFinal.style.display = "block";
}
