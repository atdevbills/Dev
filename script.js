// 1. SUPABASE SETUP
const SUPABASE_URL = 'https://ljrdfqewddbqdztwpmlh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqcmRmcWV3ZGRicWR6dHdwbWxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ4NTAwODYsImV4cCI6MjExMDQyNjA4Nn0.jSwbF81BsGPaUzYmdt9XavPUkAvJICGoXkFF58aS4IQ';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SCHOOL = {
  name: "Dev Bills School",
  tagline: "Learning with purpose. Growing with confidence.",
  location: "Accra, Ghana",
  mapQuery: "Accra, Ghana",
  phone: "0593798620",
  whatsapp: "233593798620",
  email: "hello@devbills.com",
  headmistress: "Mrs. Rejoice Oklu",
  headmistressPhoto: "madam.jpeg",
  headmistressRole: "Headmistress",
  headmistressMessage: "At Dev Bills School, we work with families to provide a caring environment where learners can grow in knowledge, character and confidence.",
  about: "Dev Bills School is committed to helping learners develop strong foundations for learning and life. We value a safe school environment, responsible behaviour, curiosity and a close partnership between the school and parents.",
  calendarEmbedUrl: "https://calendar.google.com/calendar/embed?src=royalagapeschoolcomplex13%40gmail.com&ctz=Africa%2FAbidjan"
};

// Offline-safe placeholder (no external site needed, so it can never loop)
const IMG_FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#eaf2ff"/><text x="50%" y="50%" fill="#4a5578" font-family="sans-serif" font-size="24" text-anchor="middle">Image coming soon</text></svg>');

const $ = (selector, root = document) => root.querySelector(selector);

const icon = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.4 2 2 3.8 4.5 4.5l1.2-1.2 2 1c-.3 1.6-1.5 2.2-2.7 2.1-3.8-.6-6.8-3.7-7.2-7.2-.1-1.2.6-2.3 2.1-2.6l1 2L9 8.5Z"/></svg>'
};

function escapeHTML(value = "") { return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]); }
function whatsappURL() { const digits = SCHOOL.whatsapp.replace(/\D/g, ""); return digits ? `https://wa.me/${digits}` : "#footer"; }

// --- 1. DRAW THE PAGE FIRST ---
function createHeaderAndNavigation() {
  const header = document.querySelector("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="container header-inner">
      <a class="brand" href="index.html">
        <span class="brand-name">${escapeHTML(SCHOOL.name)}</span>
        <span class="brand-tagline">${escapeHTML(SCHOOL.tagline)}</span>
      </a>
      <nav class="primary-nav">
        <a href="#about">About</a>
        <a href="#gallery">Gallery</a>
        <a href="notice.html" style="color:var(--blue);">Notice Board</a>
      </nav>
      <button class="menu-toggle" type="button">${icon.menu}</button>
    </div>
    <nav class="mobile-menu">
      <a href="#about">About</a>
      <a href="#gallery">Gallery</a>
      <a href="notice.html" style="color:var(--blue);">Notice Board</a>
    </nav>`;

  const toggle = $(".menu-toggle");
  const mobileMenu = $(".mobile-menu");
  toggle.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("is-open");
    toggle.innerHTML = open ? icon.close : icon.menu;
  });
}

function createHero() {
  const hero = document.createElement("section");
  hero.className = "hero";
  hero.innerHTML = `
    <div class="container hero-inner">
      <div class="hero-copy">
        <p class="section-kicker" style="color: #8f9bff;">Welcome to our school</p>
        <h1>Every child deserves <span>a strong start.</span></h1>
        <p class="hero-description">${escapeHTML(SCHOOL.tagline)}</p>
        <div class="hero-actions">
          <a class="button" href="#about">Discover our school</a>
          <a class="button button-secondary" href="notice.html">Listen to Notices</a>
        </div>
      </div>
    </div>`;
  $("header").insertAdjacentElement("afterend", hero);
}

function buildStaticSections() {
  $("#about").className = "section";
  $("#about").innerHTML = `
    <div class="container about-grid">
      <div class="about-copy">
        <p class="section-kicker">Who we are</p>
        <h2>A strong foundation for every learner.</h2>
        <p class="section-intro">${escapeHTML(SCHOOL.about)}</p>
      </div>
      <aside class="facts-panel">
        <h3>School information</h3>
        <div class="fact-row"><span>Location</span><strong>${escapeHTML(SCHOOL.location)}</strong></div>
        <div class="fact-row"><span>Contact</span><strong>${SCHOOL.phone}</strong></div>
      </aside>
    </div>`;

  $("#Headmistress").className = "section headmistress-section";
  $("#Headmistress").innerHTML = `
    <div class="container headmistress-grid">
      <div class="portrait-frame">
        <img src="${escapeHTML(SCHOOL.headmistressPhoto)}" alt="Headmistress" onerror="this.onerror=null;this.src=IMG_FALLBACK">
      </div>
      <div class="headmistress-copy">
        <p class="section-kicker">School leadership</p>
        <h2>A message from our headmistress</h2>
        <h3>${escapeHTML(SCHOOL.headmistress)}</h3>
        <p class="role-label">${escapeHTML(SCHOOL.headmistressRole)}</p>
        <p>${escapeHTML(SCHOOL.headmistressMessage)}</p>
      </div>
    </div>`;

  $("#gallery").className = "section";
  $("#gallery").innerHTML = `
    <div class="container">
      <div class="section-heading">
        <p class="section-kicker">Life at school</p>
        <h2>Learning, friendship and growth.</h2>
      </div>
      <div class="gallery-grid">
        <figure class="gallery-item"><img id="main-gallery-img" src="unnamed.webp" alt="School image" onerror="this.onerror=null;this.src=IMG_FALLBACK"></figure>
        <figure class="gallery-item"><img src="school2.webp" alt="School image" onerror="this.onerror=null;this.src=IMG_FALLBACK"></figure>
        <figure class="gallery-item"><img src="school3.webp" alt="School image" onerror="this.onerror=null;this.src=IMG_FALLBACK"></figure>
        <figure class="gallery-item"><img src="school4.webp" alt="School image" onerror="this.onerror=null;this.src=IMG_FALLBACK"></figure>
      </div>
    </div>`;

  $("#googleacademiccalender").className = "section calendar-section";
  $("#googleacademiccalender").innerHTML = `
    <div class="container">
      <p class="section-kicker" style="color: #8f9bff;">Stay informed</p>
      <h2>Academic calendar</h2>
      <div class="calendar-frame" style="margin-top:20px;">
        <iframe src="${escapeHTML(SCHOOL.calendarEmbedUrl)}" title="School calendar"></iframe>
      </div>
    </div>`;

  $("#location").className = "section";
  $("#location").innerHTML = `
    <div class="container">
      <p class="section-kicker">Find us</p>
      <h2>Visit our school</h2>
      <p class="section-intro">${escapeHTML(SCHOOL.location)}</p>
      <div class="map-frame">
        <iframe src="https://www.google.com/maps?q=${encodeURIComponent(SCHOOL.mapQuery)}&output=embed"></iframe>
      </div>
    </div>`;

  $("#footer").innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="brand-name">${escapeHTML(SCHOOL.name)}</span>
          <p style="margin-top:10px;">Working together with families to help every learner grow.</p>
        </div>
        <div class="footer-column">
          <h3>Contact</h3>
          <p>${escapeHTML(SCHOOL.location)}</p>
          <a href="tel:${SCHOOL.phone}">${SCHOOL.phone}</a>
        </div>
      </div>
      <div class="footer-bottom">© ${new Date().getFullYear()} ${escapeHTML(SCHOOL.name)}.</div>
    </div>`;
}

function createContactButtons() {
  const wrapper = document.createElement("div");
  wrapper.className = "floating-contact";
  wrapper.insertAdjacentHTML("beforeend", `
    <a href="notice.html" style="background: var(--blue-dark);" aria-label="Listen to notices">${icon.speaker}</a>`);
  if (SCHOOL.whatsapp) {
    wrapper.insertAdjacentHTML("beforeend", `
      <a class="whatsapp" href="${whatsappURL()}" target="_blank">${icon.whatsapp}</a>`);
  }
  document.body.appendChild(wrapper);
}

// --- 2. LOAD DATABASE DATA (NON-BLOCKING) ---
function loadDatabaseData() {
  supabase.from('site_images').select('*').eq('section_name', 'hero').single()
    .then(({ data, error }) => {
      if (error) console.warn("site_images:", error.message);
      if (data && data.image_url) {
        const imgEl = document.getElementById('main-gallery-img');
        if (imgEl) imgEl.src = data.image_url;
      }
    })
    .catch(() => console.log("Database fetch failed, using fallback image."));
}

// --- 3. START EVERYTHING ---
document.addEventListener("DOMContentLoaded", () => {
  createHeaderAndNavigation();
  createHero();
  buildStaticSections();
  createContactButtons();
  loadDatabaseData(); // Runs in background, doesn't block the page
});