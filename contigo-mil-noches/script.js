// ---------------------------------------------------------
// EDITA AQUÍ tus fotos y mensajes. Cada objeto es una "noche".
// La imagen debe existir dentro de assets/fotos/
// ---------------------------------------------------------
const noches = [
  { img: "assets/fotos/foto1.png", caption: "Nuestra primera cita" },
  { img: "assets/fotos/foto2.png", caption: "Ese viaje que no olvido" },
  { img: "assets/fotos/foto3.png", caption: "La familia que hemos formado" },
  { img: "assets/fotos/foto4.png", caption: "Cuando unimos nuestras vidas para siempre" },
  { img: "assets/fotos/foto5.png", caption: "Esta porque me veo muy bonita xd" },
  { img: "assets/fotos/foto6.png", caption: "Siempre feliz a tu lado" },
];

const pantallas = document.querySelectorAll(".pantalla");
function mostrarPantalla(id){
  pantallas.forEach(p => p.classList.remove("activa"));
  document.getElementById(id).classList.add("activa");
}

// --- INTRO ---
document.getElementById("btn-empezar").addEventListener("click", () => {
  mostrarPantalla("juego");
  generarEstrellas();
});

// --- JUEGO: generar estrellas en posiciones aleatorias sin encimarse mucho ---
const campo = document.getElementById("campo-estrellas");
const contadorNum = document.getElementById("contador-num");
document.getElementById("contador-total").textContent = noches.length;

let encontradas = 0;

function generarEstrellas(){
  campo.innerHTML = "";
  const posiciones = distribuirPosiciones(noches.length);

  noches.forEach((noche, i) => {
    const btn = document.createElement("button");
    btn.className = "estrella";
    btn.textContent = "✦";
    btn.style.left = posiciones[i].x + "%";
    btn.style.top = posiciones[i].y + "%";
    btn.style.animationDelay = (i * 0.3) + "s";
    btn.addEventListener("click", () => recolectar(btn, noche));
    campo.appendChild(btn);
  });
}

// reparte puntos en una grilla con algo de variación aleatoria, para que no se encimen
function distribuirPosiciones(cantidad){
  const cols = 3;
  const filas = Math.ceil(cantidad / cols);
  const posiciones = [];
  for (let i = 0; i < cantidad; i++){
    const col = i % cols;
    const fila = Math.floor(i / cols);
    const baseX = (col / cols) * 80 + 8;
    const baseY = (fila / filas) * 80 + 8;
    posiciones.push({
      x: baseX + (Math.random() * 10 - 5),
      y: baseY + (Math.random() * 10 - 5),
    });
  }
  return posiciones;
}

function recolectar(btn, noche){
  if (btn.classList.contains("encontrada")) return;

  btn.classList.add("encontrada");
  encontradas++;
  contadorNum.textContent = encontradas;

  // Al encontrar las 6 estrellas
  if (encontradas === noches.length){
    setTimeout(() => {
      construirGaleria();
      mostrarPantalla("final");

      // Intentar comenzar la canción automáticamente
      audio.play().then(() => {
        btnMusica.textContent = "⏸ Pausar canción";
      }).catch(() => {
        // El navegador puede bloquear el autoplay.
        // En ese caso, el botón permitirá iniciarla.
        btnMusica.textContent = "▶ Escuchar nuestra canción";
      });

    }, 600);
  }
}

// --- GALERÍA FINAL ---
function construirGaleria(){
  const galeria = document.getElementById("galeria");
  galeria.innerHTML = "";
  noches.forEach(noche => {
    const figure = document.createElement("figure");
    figure.innerHTML = `<img src="${noche.img}" alt="${noche.caption}"><figcaption>${noche.caption}</figcaption>`;
    galeria.appendChild(figure);
  });
}

// --- MÚSICA ---
const audio = document.getElementById("audio");
const btnMusica = document.getElementById("btn-musica");
btnMusica.addEventListener("click", () => {
  if (audio.paused){
    audio.play();
    btnMusica.textContent = "⏸ Pausar canción";
  } else {
    audio.pause();
    btnMusica.textContent = "▶ Escuchar nuestra canción";
  }
});