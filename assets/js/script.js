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
    "./assets/img/avos.jpg",
    "./assets/img/eloah1.jpg",
    "./assets/img/eloah2.jpg",
    "./assets/img/eloah3.jpg",
    "./assets/img/eloah4.jpg",
    "./assets/img/eloah5.jpg",
    "./assets/img/eloah6.jpg",
    "./assets/img/eloah7.jpg",
    "./assets/img/eloah8.jpg",
    "./assets/img/eloah9.jpg",
    "./assets/img/eloah10.jpg",
    "./assets/img/eloah11.jpg",
    "./assets/img/eloah12.jpg",
    "./assets/img/eloah13.jpg",
    "./assets/img/eloah14.jpg",
    "./assets/img/eloah15.jpg",
    "./assets/img/eloah16.jpg",
    "./assets/img/eloah17.jpg",
];

const DURACAO_POR_FOTO = 14000;
const EMBARALHAR       = true;

// ════════════════════════════════════════════════════

document.getElementById("nome-display").textContent = NOME;
document.getElementById("data-display").textContent = DATA;

const label16 = document.querySelector(".label-16");
label16.setAttribute("data-text", label16.textContent);

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
let current = 0;
let startTime, rafId;

const flashEl = document.getElementById("flash");
function dispararFlash() {
    flashEl.classList.remove("ativo");
    void flashEl.offsetWidth;
    flashEl.classList.add("ativo");
}

function atualizarContador() {
    const el = document.getElementById("contador");
    if (!el) return;
    el.textContent = `${String(current+1).padStart(2,"0")} · ${String(slides.length).padStart(2,"0")}`;
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
    const newImg = oldImg.cloneNode(true);
    slides[idx].replaceChild(newImg, oldImg);

    current = idx;
    slides[current].classList.add("active");
    dots[current].classList.add("active");

    atualizarContador();
    reiniciarDivisor();
    dispararFlash();
    setTimeout(() => criarBurst(W/2, H * 0.76), 350);

    startTime = performance.now();
    cancelAnimationFrame(rafId);
    animarProgress();
}

function proximo() { mostrarSlide((current + 1) % slides.length); }

function animarProgress() {
    const bar = document.getElementById("progress");
    function tick(now) {
        const pct = Math.min(((now - startTime) / DURACAO_POR_FOTO) * 100, 100);
        bar.style.width = pct + "vw";
        if (now - startTime < DURACAO_POR_FOTO) rafId = requestAnimationFrame(tick);
        else proximo();
    }
    rafId = requestAnimationFrame(tick);
}

mostrarSlide(0);

// ═══════════════════════════
//  DIMENSÕES
// ═══════════════════════════
let W = window.innerWidth;
let H = window.innerHeight;
window.addEventListener("resize", () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; });

// ═══════════════════════════
//  ESTRELAS FIXAS
// ═══════════════════════════
const starfield = document.getElementById("starfield");
for (let i = 0; i < 80; i++) {
    const s = document.createElement("div");
    s.className = "star-fixed";
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
        width:${size}px; height:${size}px;
        top:${Math.random()*100}%; left:${Math.random()*100}%;
        --dur:${(Math.random()*4+1.5).toFixed(1)}s;
        --delay:-${(Math.random()*6).toFixed(1)}s;
        --min-op:${(Math.random()*0.12+0.04).toFixed(2)};
        --max-op:${(Math.random()*0.6+0.3).toFixed(2)};
    `;
    starfield.appendChild(s);
}

// ═══════════════════════════
//  BOKEH
// ═══════════════════════════
const bokehEl = document.getElementById("bokeh");
const BOKEH_CONFIGS = [
    { w:280,h:280, top:"10%",  left:"5%",  blur:35, dur:22, delay:0,   op1:0.10, op2:0.20, tx1:"8vw",  ty1:"-5vh",  tx2:"-6vw", ty2:"8vh",  color:"rgba(196,96,126,0.55)"  },
    { w:200,h:200, top:"60%",  left:"75%", blur:28, dur:18, delay:-5,  op1:0.08, op2:0.18, tx1:"-7vw", ty1:"-8vh",  tx2:"5vw",  ty2:"-4vh", color:"rgba(232,192,122,0.45)"  },
    { w:160,h:160, top:"25%",  left:"50%", blur:22, dur:26, delay:-9,  op1:0.07, op2:0.15, tx1:"5vw",  ty1:"6vh",   tx2:"-4vw", ty2:"-7vh", color:"rgba(196,96,126,0.4)"   },
    { w:240,h:240, top:"70%",  left:"20%", blur:40, dur:30, delay:-14, op1:0.09, op2:0.17, tx1:"10vw", ty1:"-6vh",  tx2:"-8vw", ty2:"5vh",  color:"rgba(247,214,224,0.35)"  },
    { w:120,h:120, top:"45%",  left:"88%", blur:18, dur:16, delay:-3,  op1:0.06, op2:0.14, tx1:"-6vw", ty1:"4vh",   tx2:"4vw",  ty2:"-8vh", color:"rgba(232,192,122,0.5)"   },
    { w:180,h:180, top:"5%",   left:"65%", blur:30, dur:20, delay:-7,  op1:0.08, op2:0.16, tx1:"6vw",  ty1:"7vh",   tx2:"-5vw", ty2:"-5vh", color:"rgba(196,96,126,0.45)"  },
];
BOKEH_CONFIGS.forEach(c => {
    const el = document.createElement("div");
    el.className = "bokeh-circle";
    el.style.cssText = `
        width:${c.w}px; height:${c.h}px;
        top:${c.top}; left:${c.left};
        background:radial-gradient(circle, ${c.color}, transparent 70%);
        --blur:${c.blur}px; --dur:${c.dur}s; --delay:-${c.delay}s;
        --op1:${c.op1}; --op2:${c.op2};
        --tx1:${c.tx1}; --ty1:${c.ty1}; --tx2:${c.tx2}; --ty2:${c.ty2};
    `;
    bokehEl.appendChild(el);
});

// ═══════════════════════════
//  PARTÍCULAS
// ═══════════════════════════
const pc = document.getElementById("particles");
const HEARTS = ["♥","♡","❤","🌸","✿","❀"];

function criarParticula() {
    const p = document.createElement("div");
    const r = Math.random();
    let tipo = r < 0.22 ? "circle" : r < 0.40 ? "star" : r < 0.62 ? "heart" : r < 0.82 ? "petal" : "gold";
    p.className = `particle ${tipo}`;

    const size = {circle:Math.random()*4+1.5, star:Math.random()*5+2, heart:Math.random()*18+10, petal:Math.random()*14+8, gold:Math.random()*3+1.5}[tipo];
    const dur   = Math.random() * 16 + 9;
    const delay = Math.random() * 5;

    p.style.cssText = `
        left:${Math.random()*100}vw;
        bottom:-${size+6}px;
        width:${tipo==="heart"?"auto":size+"px"};
        height:${tipo==="heart"?"auto":size+"px"};
        font-size:${size}px;
        animation-duration:${dur}s;
        animation-delay:${delay}s;
    `;

    if (tipo === "heart") {
        p.textContent = HEARTS[Math.floor(Math.random()*HEARTS.length)];
        p.style.color = `rgba(${196+Math.floor(Math.random()*30)},${60+Math.floor(Math.random()*60)},${100+Math.floor(Math.random()*40)},0.8)`;
    }

    pc.appendChild(p);
    setTimeout(() => p.remove(), (dur + delay + 1) * 1000);
}

setInterval(criarParticula, 240);
for (let i = 0; i < 25; i++) criarParticula();

// ═══════════════════════════
//  FOGOS DE ARTIFÍCIO — CANVAS
// ═══════════════════════════
const canvas = document.getElementById("fireworks-canvas");
const ctx    = canvas.getContext("2d");
canvas.width  = W;
canvas.height = H;

const FIREWORK_COLORS = [
    [196,96,126], [232,192,122], [247,214,224],
    [220,130,160], [255,200,220], [245,223,160],
    [255,160,180], [200,80,110],
];

class Rocket {
    constructor() { this.reset(); }
    reset() {
        this.x    = W * (0.15 + Math.random() * 0.7);
        this.y    = H;
        this.tx   = W * (0.1 + Math.random() * 0.8);
        this.ty   = H * (0.08 + Math.random() * 0.45);
        this.speed = 18 + Math.random() * 10;
        const ang = Math.atan2(this.ty - this.y, this.tx - this.x);
        this.vx   = Math.cos(ang) * this.speed;
        this.vy   = Math.sin(ang) * this.speed;
        this.color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
        this.trail  = [];
        this.alive  = true;
        this.exploded = false;
    }
    update() {
        if (this.exploded) return;
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 12) this.trail.shift();
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.3; // gravity
        if (this.y <= this.ty || (this.vy > 0 && this.y > this.ty + 20)) {
            explode(this.x, this.y, this.color);
            this.exploded = true;
            this.alive = false;
        }
    }
    draw() {
        if (this.exploded) return;
        for (let i = 0; i < this.trail.length; i++) {
            const t = this.trail[i];
            const a = (i / this.trail.length) * 0.7;
            ctx.beginPath();
            ctx.arc(t.x, t.y, 2.5 - (i / this.trail.length) * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${a})`;
            ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
        ctx.shadowColor = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
        ctx.shadowBlur  = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

class Spark {
    constructor(x, y, color) {
        this.x = x; this.y = y;
        this.color = color;
        const ang = Math.random() * Math.PI * 2;
        const spd = Math.random() * 9 + 3;
        this.vx   = Math.cos(ang) * spd;
        this.vy   = Math.sin(ang) * spd;
        this.life = 1;
        this.decay = Math.random() * 0.018 + 0.012;
        this.size  = Math.random() * 3 + 1;
        this.tail  = [];
        this.isStar = Math.random() > 0.65;
    }
    update() {
        this.tail.push({ x: this.x, y: this.y });
        if (this.tail.length > 8) this.tail.shift();
        this.x  += this.vx;
        this.y  += this.vy;
        this.vy += 0.18; // gravity
        this.vx *= 0.97;
        this.vy *= 0.97;
        this.life -= this.decay;
    }
    draw() {
        if (this.life <= 0) return;
        // tail
        for (let i = 0; i < this.tail.length; i++) {
            const t = this.tail[i];
            const a = (i / this.tail.length) * this.life * 0.5;
            ctx.beginPath();
            ctx.arc(t.x, t.y, this.size * (i/this.tail.length) * 0.7, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${a})`;
            ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.life})`;
        ctx.shadowColor = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},0.8)`;
        ctx.shadowBlur  = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    get dead() { return this.life <= 0; }
}

function explode(x, y, color) {
    const count = 90 + Math.floor(Math.random() * 50);
    for (let i = 0; i < count; i++) sparks.push(new Spark(x, y, color));
    // segundo anel dourado
    if (Math.random() > 0.5) {
        const gold = FIREWORK_COLORS[1];
        for (let i = 0; i < 30; i++) sparks.push(new Spark(x, y, gold));
    }
    // flash no canvas
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
}

const rockets = [];
const sparks  = [];

function lancarFogo() {
    rockets.push(new Rocket());
}

// Intervalo de fogos — mais frequente para TV
setInterval(lancarFogo, 3200);
setTimeout(lancarFogo, 800);
setTimeout(lancarFogo, 2200);

// Salva de fogos a cada troca de slide
function salvaDeFogos() {
    const count = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
        setTimeout(() => rockets.push(new Rocket()), i * 280);
    }
}

function loopFogos() {
    ctx.fillStyle = "rgba(20,5,9,0.18)";
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

// ═══════════════════════════
//  BURST DOM
// ═══════════════════════════
function criarBurst(x, y) {
    const count = 14;
    for (let i = 0; i < count; i++) {
        const dot = document.createElement("div");
        dot.className = "burst-dot";
        const ang  = (i / count) * 360;
        const dist = Math.random() * 80 + 40;
        const rad  = (ang * Math.PI) / 180;
        dot.style.cssText = `
            left:${x}px; top:${y}px;
            --dx: calc(-50% + ${Math.cos(rad)*dist}px);
            --dy: calc(-50% + ${Math.sin(rad)*dist}px);
            background:${i%3===0?"rgba(232,192,122,0.95)":"rgba(196,96,126,0.88)"};
            width:${Math.random()*5+2}px; height:${Math.random()*5+2}px;
            animation-duration:${Math.random()*0.35+0.5}s;
            animation-delay:${i*0.02}s;
        `;
        document.body.appendChild(dot);
        setTimeout(() => dot.remove(), 1000);
    }
    [50,100,170].forEach((size, idx) => {
        const ring = document.createElement("div");
        ring.className = "burst-ring";
        ring.style.cssText = `
            left:${x}px; top:${y}px;
            width:${size}px; height:${size}px;
            animation-delay:${idx*0.13}s;
            border-color:${idx===1?"rgba(232,192,122,0.55)":"rgba(196,96,126,0.65)"};
        `;
        document.body.appendChild(ring);
        setTimeout(() => ring.remove(), 1400);
    });
}

// Burst automático periódico
setInterval(() => {
    const x = W * (0.1 + Math.random() * 0.8);
    const y = H * (0.1 + Math.random() * 0.65);
    criarBurst(x, y);
}, 6000);

// ═══════════════════════════
//  CURSOR
// ═══════════════════════════
const cursor    = document.getElementById("cursor");
const cursorDot = document.getElementById("cursor-dot");
document.addEventListener("mousemove", e => {
    cursor.style.left    = e.clientX + "px";
    cursor.style.top     = e.clientY + "px";
    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top  = e.clientY + "px";
});

// ═══════════════════════════
//  INTERAÇÃO
// ═══════════════════════════
document.addEventListener("click", e => {
    const r = document.createElement("div");
    r.className = "ripple";
    r.style.cssText = `left:${e.clientX}px; top:${e.clientY}px; width:100px; height:100px;`;
    document.body.appendChild(r);
    criarBurst(e.clientX, e.clientY);
    setTimeout(() => r.remove(), 900);
    proximo();
});

document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" || e.key === " ") proximo();
    if (e.key === "ArrowLeft") mostrarSlide((current - 1 + slides.length) % slides.length);
    if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
    }
});

// ── SALVA DE FOGOS a cada troca de slide (hookando mostrarSlide)
const _mostrarOriginal = mostrarSlide;
// Override feito via disparo no próprio mostrarSlide acima com salvaDeFogos
setInterval(salvaDeFogos, DURACAO_POR_FOTO);

let tx = 0;
document.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive:true });
document.addEventListener("touchend", e => {
    const d = tx - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) d > 0 ? proximo() : mostrarSlide((current - 1 + slides.length) % slides.length);
});
