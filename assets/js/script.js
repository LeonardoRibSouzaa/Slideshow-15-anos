// ════════════════════════════════════════════════════
//  ✏️  EDITE AQUI
// ════════════════════════════════════════════════════

const NOME = "Eloah";
const DATA = "06 de abril de 2026";

const FOTOS = [
    "./assets/img/eloah_quando_chegou.jpg",
    "./assets/img/eloah_baby.jpg",
    "./assets/img/eloah_3anos.jpg",
    "./assets/img/eloah_13anos.jpg",
    "./assets/img/eloah_amigos.jpg",
    "./assets/img/eloah_ana.jpg",
    "./assets/img/eloah_3anos2.jpg",
    "./assets/img/eloah_3anos3.jpg",
    "./assets/img/eloah_leo.jpg",
    "./assets/img/eloah_fofa.jpg",
    "./assets/img/eloah_3anos4.jpg",
    "./assets/img/eloah_cadeira.jpg",
];

const DURACAO_POR_FOTO = 14000;
const EMBARALHAR       = true;

// ════════════════════════════════════════════════════

document.getElementById("nome-display").textContent = NOME;
document.getElementById("data-display").textContent = DATA;

const fotos = EMBARALHAR
    ? [...FOTOS].sort(() => Math.random() - 0.5)
    : [...FOTOS];

const stage  = document.getElementById("stage");
const dotsEl = document.getElementById("dots");

fotos.forEach(() => {
    const slide = document.createElement("div");
    slide.className = "slide";
    const img = document.createElement("img");
    img.alt = "";
    img.draggable = false;
    slide.appendChild(img);
    stage.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = "dot";
    dotsEl.appendChild(dot);
});

// Pré-carrega imagens
fotos.forEach((src, i) => {
    stage.querySelectorAll(".slide")[i].querySelector("img").src = src;
});

const slides = document.querySelectorAll(".slide");
const dots   = document.querySelectorAll(".dot");
let current  = 0;
let startTime, rafId;

function atualizarContador() {
    const el = document.getElementById("contador");
    if (!el) return;
    const n = String(current + 1).padStart(2, "0");
    const t = String(slides.length).padStart(2, "0");
    el.textContent = `${n} · ${t}`;
}

function reiniciarDivisor() {
    const d = document.querySelector(".divisor");
    if (!d) return;
    d.style.animation = "none";
    d.offsetHeight; // reflow
    d.style.animation = "";
}

function mostrarSlide(idx) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");

    const oldImg = slides[idx].querySelector("img");
    const newImg = oldImg.cloneNode(true);
    slides[idx].replaceChild(newImg, oldImg);

    current = idx;
    slides[current].classList.add("active");
    dots[current].classList.add("active");

    atualizarContador();
    reiniciarDivisor();

    startTime = performance.now();
    cancelAnimationFrame(rafId);
    animarProgress();
}

function proximo() {
    mostrarSlide((current + 1) % slides.length);
}

function animarProgress() {
    const bar = document.getElementById("progress");
    function tick(now) {
        const elapsed = now - startTime;
        const pct = Math.min((elapsed / DURACAO_POR_FOTO) * 100, 100);
        bar.style.width = pct + "vw";
        if (elapsed < DURACAO_POR_FOTO) {
            rafId = requestAnimationFrame(tick);
        } else {
            proximo();
        }
    }
    rafId = requestAnimationFrame(tick);
}

mostrarSlide(0);

// ── PARTÍCULAS MIX ──
const pc = document.getElementById("particles");

function criarParticula() {
    const p   = document.createElement("div");
    const tipo = Math.random() > 0.4 ? "circle" : "star";
    p.className = `particle ${tipo}`;

    const size = tipo === "circle"
        ? Math.random() * 3.5 + 1
        : Math.random() * 4 + 2;

    p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}vw;
        bottom: -${size}px;
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * 5}s;
    `;
    pc.appendChild(p);
    setTimeout(() => p.remove(), 20000);
}

setInterval(criarParticula, 380);
for (let i = 0; i < 15; i++) criarParticula();

// ── NAVEGAÇÃO ──
document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" || e.key === " ") proximo();
    if (e.key === "ArrowLeft") mostrarSlide((current - 1 + slides.length) % slides.length);
    if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
    }
});

let tx = 0;
document.addEventListener("touchstart", e => { tx = e.touches[0].clientX; });
document.addEventListener("touchend", e => {
    const d = tx - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) d > 0
        ? proximo()
        : mostrarSlide((current - 1 + slides.length) % slides.length);
});

document.addEventListener("click", proximo);