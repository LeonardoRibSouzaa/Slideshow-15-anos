// ════════════════════════════════════════════════════
//  ✏️  EDITE AQUI
// ════════════════════════════════════════════════════

const NOME = "Eloah";
const DATA = "06 de abril de 2026";


const FOTOS = [
    "./assets/img/eloah_quando_chegou.webp",
    "./assets/img/eloah_baby.webp",
    "./assets/img/eloah_3anos.webp",
    "./assets/img/eloah_13anos.webp",
    "./assets/img/eloah_amigos.webp",
    "./assets/img/eloah_ana.webp",
    "./assets/img/eloah_3anos2.webp",
    "./assets/img/eloah_3anos3.webp",
    "./assets/img/eloah_leo.webp",
    "./assets/img/eloah_fofa.webp",
    "./assets/img/eloah_3anos4.webp",
    "./assets/img/eloah_cadeira.webp",
    "./assets/img/avos.webp",
    "./assets/img/eloah1.webp",
    "./assets/img/eloah2.webp",
    "./assets/img/eloah3.webp",
    "./assets/img/eloah4.webp",
    "./assets/img/eloah5.webp",
    "./assets/img/eloah6.webp",
    "./assets/img/eloah7.webp",
    "./assets/img/eloah8.webp",
    "./assets/img/eloah9.webp",
    "./assets/img/eloah10.webp",
    "./assets/img/eloah11.webp",
    "./assets/img/eloah12.webp",
    "./assets/img/eloah13.webp",
    "./assets/img/eloah14.webp",
    "./assets/img/eloah15.webp",
    "./assets/img/eloah16.webp",
    "./assets/img/eloah17.webp"
];

const DURACAO_POR_FOTO = 14000;
const EMBARALHAR       = true;

// ════════════════════════════════════════════════════
// ⚡ CONFIGURAÇÕES DE PERFORMANCE
//    Ajuste esses valores se ainda travar
// ════════════════════════════════════════════════════
const MAX_PARTICULAS   = 14;   // máximo simultâneo de partículas no DOM
const INTERVALO_PART   = 700;  // ms entre cada nova partícula
const MAX_SPARKS       = 45;   // faíscas por explosão de fogo
const INTERVALO_FOGUETE = 4000; // ms entre cada foguete
// ════════════════════════════════════════════════════

document.getElementById("nome-display").textContent = NOME;
document.getElementById("data-display").textContent = DATA;
document.querySelector(".label-16").setAttribute("data-text", "15 Anos");

const fotos = EMBARALHAR
    ? [...FOTOS].sort(() => Math.random() - 0.5)
    : [...FOTOS];

const stage  = document.getElementById("stage");
const dotsEl = document.getElementById("dots");

fotos.forEach(() => {
    const slide = document.createElement("div");
    slide.className = "slide";
    const img = document.createElement("img");
    img.alt = ""; img.draggable = false;
    slide.appendChild(img);
    stage.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = "dot";
    dotsEl.appendChild(dot);
});
fotos.forEach((src, i) => {
    stage.querySelectorAll(".slide")[i].querySelector("img").src = src;
});

const slides = document.querySelectorAll(".slide");
const dots   = document.querySelectorAll(".dot");
let current = 0, startTime, rafId;

const flashEl = document.getElementById("flash");
function dispararFlash() {
    flashEl.classList.remove("ativo");
    void flashEl.offsetWidth;
    flashEl.classList.add("ativo");
}

function atualizarContador() {
    const el = document.getElementById("contador");
    if (el) el.textContent = `${String(current+1).padStart(2,"0")} · ${String(slides.length).padStart(2,"0")}`;
}

function reiniciarDivisor() {
    const d = document.querySelector(".divisor");
    if (!d) return;
    d.style.animation = "none";
    d.offsetHeight;
    d.style.animation = "";
}

function mostrarSlide(idx) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    const oldImg = slides[idx].querySelector("img");
    slides[idx].replaceChild(oldImg.cloneNode(true), oldImg);
    current = idx;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
    atualizarContador();
    reiniciarDivisor();
    dispararFlash();
    setTimeout(() => criarBurst(W / 2, H * 0.77), 320);
    startTime = performance.now();
    cancelAnimationFrame(rafId);
    animarProgress();
}

function proximo() { mostrarSlide((current + 1) % slides.length); }

function animarProgress() {
    const bar = document.getElementById("progress");
    function tick(now) {
        bar.style.width = Math.min(((now - startTime) / DURACAO_POR_FOTO) * 100, 100) + "vw";
        if (now - startTime < DURACAO_POR_FOTO) rafId = requestAnimationFrame(tick);
        else proximo();
    }
    rafId = requestAnimationFrame(tick);
}

mostrarSlide(0);

let W = window.innerWidth, H = window.innerHeight;
window.addEventListener("resize", () => {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W; canvas.height = H;
});

// ══════════════════════════════════════════
//  STARFIELD — 35 estrelas (era 80)
// ══════════════════════════════════════════
const starfield = document.getElementById("starfield");
for (let i = 0; i < 35; i++) {
    const s = document.createElement("div");
    s.className = "star-fixed";
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
        width:${size}px; height:${size}px;
        top:${Math.random()*100}%; left:${Math.random()*100}%;
        --dur:${(Math.random()*4+2).toFixed(1)}s;
        --delay:-${(Math.random()*6).toFixed(1)}s;
        --lo:${(Math.random()*0.1+0.04).toFixed(2)};
        --hi:${(Math.random()*0.55+0.25).toFixed(2)};
    `;
    starfield.appendChild(s);
}

// ══════════════════════════════════════════
//  BOKEH — 4 bolas (era 6), blur menor
// ══════════════════════════════════════════
const bokehEl = document.getElementById("bokeh");
[
    { w:240,h:240, top:"8%",  left:"4%",  blur:28, dur:22, delay:0,  op1:.10,op2:.20, tx:"7vw",  ty:"-5vh"  },
    { w:180,h:180, top:"60%", left:"74%", blur:22, dur:18, delay:-5, op1:.08,op2:.17, tx:"-6vw", ty:"-7vh"  },
    { w:150,h:150, top:"28%", left:"52%", blur:18, dur:26, delay:-9, op1:.06,op2:.14, tx:"5vw",  ty:"6vh"   },
    { w:200,h:200, top:"68%", left:"18%", blur:30, dur:30, delay:-14,op1:.08,op2:.16, tx:"8vw",  ty:"-5vh"  },
].forEach(c => {
    const el = document.createElement("div");
    el.className = "bokeh-circle";
    el.style.cssText = `
        width:${c.w}px; height:${c.h}px; top:${c.top}; left:${c.left};
        background:radial-gradient(circle, rgba(196,96,126,0.5), transparent 70%);
        --blur:${c.blur}px; --dur:${c.dur}s; --delay:-${c.delay}s;
        --op1:${c.op1}; --op2:${c.op2}; --tx:${c.tx}; --ty:${c.ty};
    `;
    bokehEl.appendChild(el);
});

// ══════════════════════════════════════════
//  PARTÍCULAS — máx MAX_PARTICULAS
// ══════════════════════════════════════════
const pc = document.getElementById("particles");
const HEARTS = ["♥","♡","❀","✿"];
let particleCount = 0;

function criarParticula() {
    if (particleCount >= MAX_PARTICULAS) return;
    const r    = Math.random();
    const tipo = r < 0.30 ? "circle" : r < 0.55 ? "heart" : r < 0.78 ? "petal" : "gold";
    const p    = document.createElement("div");
    p.className = `particle ${tipo}`;

    const size = tipo === "circle" ? Math.random()*5+2
        : tipo === "heart"  ? Math.random()*22+12
            : tipo === "petal"  ? Math.random()*16+8
                :                     Math.random()*4+2;
    const dur   = Math.random() * 12 + 10;
    const delay = Math.random() * 3;

    p.style.cssText = `
        left:${Math.random()*92+2}vw; bottom:-${size+4}px;
        width:${tipo==="heart"?"auto":size+"px"};
        height:${tipo==="heart"?"auto":size+"px"};
        font-size:${size}px;
        animation-duration:${dur}s;
        animation-delay:${delay}s;
    `;
    if (tipo === "heart") {
        p.textContent = HEARTS[Math.floor(Math.random()*HEARTS.length)];
        p.style.color = `rgba(196,${70+Math.floor(Math.random()*50)},${100+Math.floor(Math.random()*40)},0.8)`;
    }

    particleCount++;
    pc.appendChild(p);
    setTimeout(() => { p.remove(); particleCount--; }, (dur + delay + 0.5) * 1000);
}

setInterval(criarParticula, INTERVALO_PART);
for (let i = 0; i < 7; i++) setTimeout(criarParticula, i * 250);

// ══════════════════════════════════════════
//  FOGOS DE ARTIFÍCIO — canvas otimizado
//  Menos faíscas, menos foguetes simultâneos
// ══════════════════════════════════════════
const canvas = document.getElementById("fireworks-canvas");
const ctx    = canvas.getContext("2d");
canvas.width  = W;
canvas.height = H;

const CORES = [
    [196,96,126], [232,192,122], [247,214,224],
    [220,130,160], [245,223,160],
];

class Rocket {
    constructor() {
        this.x  = W * (0.15 + Math.random() * 0.7);
        this.y  = H;
        this.ty = H * (0.08 + Math.random() * 0.45);
        const ang = Math.atan2(this.ty - H, (W * (0.1 + Math.random()*0.8)) - this.x);
        const spd = 16 + Math.random() * 8;
        this.vx = Math.cos(ang) * spd;
        this.vy = Math.sin(ang) * spd;
        this.color = CORES[Math.floor(Math.random() * CORES.length)];
        this.trail = [];
        this.alive = true;
    }
    update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 8) this.trail.shift(); // cauda curta
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.35;
        if (this.vy > 0 || this.y <= this.ty) {
            explode(this.x, this.y, this.color);
            this.alive = false;
        }
    }
    draw() {
        for (let i = 0; i < this.trail.length; i++) {
            ctx.beginPath();
            ctx.arc(this.trail[i].x, this.trail[i].y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${(i / this.trail.length) * 0.6})`;
            ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${this.color})`;
        ctx.shadowColor = `rgb(${this.color})`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

class Spark {
    constructor(x, y, color) {
        this.x = x; this.y = y; this.color = color;
        const ang = Math.random() * Math.PI * 2;
        const spd = Math.random() * 7 + 2;
        this.vx = Math.cos(ang) * spd;
        this.vy = Math.sin(ang) * spd;
        this.life = 1;
        this.decay = Math.random() * 0.022 + 0.014; // decai mais rápido = menos tempo no canvas
        this.size = Math.random() * 2.5 + 1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2;
        this.vx *= 0.96;
        this.life -= this.decay;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.life * 0.9})`;
        ctx.fill();
    }
    get dead() { return this.life <= 0; }
}

function explode(x, y, color) {
    // MAX_SPARKS faíscas (era 90-140)
    for (let i = 0; i < MAX_SPARKS; i++) sparks.push(new Spark(x, y, color));
}

const rockets = [], sparks = [];

// Máx 2 foguetes simultâneos
function lancarFogo() {
    if (rockets.length < 2) rockets.push(new Rocket());
}
setInterval(lancarFogo, INTERVALO_FOGUETE);
setTimeout(lancarFogo, 1000);

// Loop do canvas — fundo semi-transparente para trilha (sem clearRect total)
function loopFogos() {
    ctx.fillStyle = "rgba(20,5,9,0.22)";
    ctx.fillRect(0, 0, W, H);

    for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update();
        rockets[i].draw();
        if (!rockets[i].alive) rockets.splice(i, 1);
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update();
        sparks[i].draw();
        if (sparks[i].dead) sparks.splice(i, 1);
    }

    requestAnimationFrame(loopFogos);
}
loopFogos();

// ══════════════════════════════════════════
//  BURST DOM — só na troca de slide
// ══════════════════════════════════════════
function criarBurst(x, y) {
    for (let i = 0; i < 10; i++) {
        const dot = document.createElement("div");
        dot.className = "burst-dot";
        const ang  = (i / 10) * Math.PI * 2;
        const dist = Math.random() * 60 + 30;
        dot.style.cssText = `
            left:${x}px; top:${y}px;
            --dx:calc(-50% + ${Math.cos(ang)*dist}px);
            --dy:calc(-50% + ${Math.sin(ang)*dist}px);
            width:${Math.random()*4+2}px; height:${Math.random()*4+2}px;
            background:${i%2===0?"rgba(196,96,126,0.9)":"rgba(232,192,122,0.85)"};
            animation-delay:${i*0.02}s;
        `;
        document.body.appendChild(dot);
        setTimeout(() => dot.remove(), 900);
    }
    [60, 130].forEach((size, idx) => {
        const ring = document.createElement("div");
        ring.className = "burst-ring";
        ring.style.cssText = `
            left:${x}px; top:${y}px;
            width:${size}px; height:${size}px;
            animation-delay:${idx*0.14}s;
            border-color:${idx===0?"rgba(196,96,126,0.7)":"rgba(232,192,122,0.5)"};
        `;
        document.body.appendChild(ring);
        setTimeout(() => ring.remove(), 1100);
    });
}

// ══════════════════════════════════════════
//  INTERAÇÃO
// ══════════════════════════════════════════
document.addEventListener("click", proximo);

document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" || e.key === " ") proximo();
    if (e.key === "ArrowLeft") mostrarSlide((current - 1 + slides.length) % slides.length);
    if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
    }
});

let tx = 0;
document.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
document.addEventListener("touchend", e => {
    const d = tx - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) d > 0
        ? proximo()
        : mostrarSlide((current - 1 + slides.length) % slides.length);
});
