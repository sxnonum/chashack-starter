/* ---------- Medlemmar (byggda från en array, inte handskrivna i HTML) ---------- */
const members = [
  { name: 'Alexander Aziz', role: 'Fullstack & idéer', tool: 'VS Code + Live Server' },
  { name: 'Abdulqadir Nur', role: 'Fullstack & struktur', tool: 'Committa ofta och tidigt' }
];

function initials(name) {
  return name.split(' ').map(part => part[0]).join('').toUpperCase();
}

function renderMembers(list) {
  const container = document.getElementById('members-container');
  container.innerHTML = '';
  list.forEach(member => {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.innerHTML = `
      <div class="avatar">${initials(member.name)}</div>
      <h3>${member.name}</h3>
      <p>${member.role}</p>
    `;
    container.appendChild(card);
  });
}

renderMembers(members);

const memberSearch = document.getElementById('member-search');
memberSearch.addEventListener('input', () => {
  const query = memberSearch.value.trim().toLowerCase();
  const filtered = members.filter(m => m.name.toLowerCase().includes(query));
  renderMembers(filtered);
});

/* ---------- Mörkt / ljust läge (sparas i localStorage) ---------- */
const themeToggleBtn = document.getElementById('theme-toggle-btn');

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    themeToggleBtn.textContent = '☀️ Ljust läge';
    themeToggleBtn.setAttribute('aria-pressed', 'true');
  } else {
    document.body.removeAttribute('data-theme');
    themeToggleBtn.textContent = '🌙 Mörkt läge';
    themeToggleBtn.setAttribute('aria-pressed', 'false');
  }
}

let savedTheme = 'dark';
try {
  savedTheme = localStorage.getItem('bb-theme') || 'dark';
} catch (e) {
  console.warn('localStorage inte tillgängligt', e);
}
applyTheme(savedTheme);

themeToggleBtn.addEventListener('click', () => {
  const current = document.body.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  try {
    localStorage.setItem('bb-theme', next);
  } catch (e) {
    console.warn('Kunde inte spara tema', e);
  }
});

/* ---------- Typewriter-effekt ---------- */
const typewriterEl = document.getElementById('typewriter-text');
const typewriterFullText = 'Vi bygger. Vi lär oss. Vi levererar.';
let twIndex = 0;

function typeNextChar() {
  if (twIndex <= typewriterFullText.length) {
    typewriterEl.textContent = typewriterFullText.slice(0, twIndex);
    twIndex++;
    setTimeout(typeNextChar, 60);
  } else {
    typewriterEl.style.borderRight = 'none';
  }
}
typeNextChar();

/* ---------- Hälsningsknapp ---------- */
const greetButton = document.getElementById('greet-btn');
const greetText = document.getElementById('greet-text');
const greetings = [
  'Hej från Alexander och Abdulqadir! 👋',
  'B&B kör hackathon idag 🚀',
  'Tack för besöket på vår sida!'
];
let greetCount = 0;
greetButton.addEventListener('click', () => {
  greetText.textContent = greetings[greetCount % greetings.length];
  greetCount++;
});

/* ---------- Slumpat lagcitat ---------- */
const quoteButton = document.getElementById('quote-btn');
const quoteText = document.getElementById('quote-text');
const quotes = [
  '"Det funkar på min dator" — Alexander, ofta',
  '"Har du sparat filen?" — Abdulqadir, alltid',
  'Commit tidigt, commit ofta, panika sällan.',
  'Två skärmar, en vision, noll sömn.',
  '"git push" — sista raden innan paus'
];
quoteButton.addEventListener('click', () => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = random;
});

/* ---------- Klickräknare (sparas i localStorage) ---------- */
const counterButton = document.getElementById('counter-btn');
const counterDisplay = document.getElementById('counter-display');

let clickCount = 0;
try {
  clickCount = parseInt(localStorage.getItem('bb-click-count'), 10) || 0;
} catch (e) {
  console.warn('localStorage inte tillgängligt', e);
}
counterDisplay.textContent = clickCount;

counterButton.addEventListener('click', () => {
  clickCount++;
  counterDisplay.textContent = clickCount;
  try {
    localStorage.setItem('bb-click-count', clickCount);
  } catch (e) {
    console.warn('Kunde inte spara räknare', e);
  }
});

/* ---------- Konfetti ---------- */
const confettiButton = document.getElementById('confetti-btn');
const confettiColors = ['#E8A33D', '#4FD1C5', '#ECEEF3', '#E8734D'];

confettiButton.addEventListener('click', () => {
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.animationDelay = (Math.random() * 0.4) + 's';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2600);
  }
});

/* ---------- Klickljud (Web Audio, ingen ljudfil behövs) ---------- */
const soundButton = document.getElementById('sound-btn');
soundButton.addEventListener('click', () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = 660;
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.3);
  } catch (e) {
    console.warn('Ljud kunde inte spelas', e);
  }
});

/* ---------- Hämta data från öppet API ---------- */
const factButton = document.getElementById('fact-btn');
const factText = document.getElementById('fact-text');

factButton.addEventListener('click', async () => {
  factText.textContent = 'Hämtar...';
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    if (!response.ok) throw new Error('Nätverksfel');
    const data = await response.json();
    factText.textContent = data.slip.advice;
  } catch (error) {
    factText.textContent = 'Kunde inte hämta data just nu, testa igen.';
  }
});

/* ---------- Nedräkning ---------- */
/* Ändra target-datumet nedan till er faktiska redovisningstid */
const countdownTarget = new Date();
countdownTarget.setHours(countdownTarget.getHours() + 5);

const countdownEl = document.getElementById('countdown');

function updateCountdown() {
  const now = new Date();
  const diff = countdownTarget - now;

  if (diff <= 0) {
    countdownEl.textContent = 'Redovisningen har börjat!';
    return;
  }

  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.textContent =
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ---------- Bildkarusell ---------- */
const carouselImages = [
  { src: 'carousel-1.svg', alt: 'Illustration: laget började koda sidan' },
  { src: 'carousel-2.svg', alt: 'Illustration: laget fixade buggar tillsammans' },
  { src: 'carousel-3.svg', alt: 'Illustration: laget levererade den färdiga sidan' },
  { src: 'logo.png', alt: "B&B:s logotyp: handritad text 'ChasGPT' i svart, med en orange stjärnformad sol bakom" }
];
let carouselIndex = 0;
const carouselImageEl = document.getElementById('carousel-image');

function renderCarousel() {
  const current = carouselImages[carouselIndex];
  carouselImageEl.src = current.src;
  carouselImageEl.alt = current.alt;
}

document.getElementById('carousel-prev').addEventListener('click', () => {
  carouselIndex = (carouselIndex - 1 + carouselImages.length) % carouselImages.length;
  renderCarousel();
});

document.getElementById('carousel-next').addEventListener('click', () => {
  carouselIndex = (carouselIndex + 1) % carouselImages.length;
  renderCarousel();
});

/* ---------- Formulär med validering ---------- */
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

function setError(fieldId, message) {
  document.getElementById(fieldId + '-error').textContent = message;
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formFeedback.textContent = '';

  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  let valid = true;

  if (!name) {
    setError('cf-name', 'Fyll i ditt namn.');
    valid = false;
  } else {
    setError('cf-name', '');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setError('cf-email', 'Fyll i din e-post.');
    valid = false;
  } else if (!emailPattern.test(email)) {
    setError('cf-email', 'Det där ser inte ut som en giltig e-postadress.');
    valid = false;
  } else {
    setError('cf-email', '');
  }

  if (!message) {
    setError('cf-message', 'Skriv ett meddelande.');
    valid = false;
  } else {
    setError('cf-message', '');
  }

  if (valid) {
    formFeedback.textContent = 'Tack, ' + name + '! Meddelandet är skickat (simulerat, inget skickas på riktigt).';
    contactForm.reset();
  }
});

/* ---------- Muspekarens spår ---------- */
let lastTrailTime = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastTrailTime < 40) return;
  lastTrailTime = now;

  const dot = document.createElement('div');
  dot.className = 'trail-dot';
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
  document.body.appendChild(dot);
  setTimeout(() => dot.remove(), 600);
});

/* ---------- Easter egg ---------- */
/* Skriv "chas" var som helst på sidan (bara tangentbordet, ingen input behöver vara fokuserad) */
let easterBuffer = '';
document.addEventListener('keydown', (e) => {
  if (e.key.length !== 1) return;
  easterBuffer = (easterBuffer + e.key).slice(-4).toLowerCase();
  if (easterBuffer === 'chas') {
    document.body.style.transition = 'background 0.3s ease';
    const original = document.body.style.background;
    document.body.style.background = 'var(--accent)';
    setTimeout(() => {
      document.body.style.background = original;
    }, 400);
    quoteText.textContent = '🥚 Ni hittade ägget! B&B tackar för besöket.';
  }
});