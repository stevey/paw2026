/* PAW 2026 */

// ---- Theme ----
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

(function initTheme() {
  const stored = localStorage.getItem('paw-theme');
  const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (!stored && sysDark)) html.classList.add('dark');
  syncToggle();
})();

function syncToggle() {
  const dark = html.classList.contains('dark');
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.textContent = dark ? '☀' : '☾';
}

themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('paw-theme', html.classList.contains('dark') ? 'dark' : 'light');
  syncToggle();
  swapMapTiles();
});

// ---- Mobile nav ----
const navToggle = document.getElementById('nav-toggle');
const navMobile = document.getElementById('nav-mobile');

navToggle.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

navMobile.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  })
);

// ---- Nav scroll state ----
const siteNav = document.querySelector('.site-nav');
function checkScroll() { siteNav.classList.toggle('scrolled', window.scrollY > 40); }
window.addEventListener('scroll', checkScroll, { passive: true });
checkScroll();

// ---- Hero paw click ----
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const PAW_COLORS = [
    '#FF9375', // Peach Coral
    '#528CFF', // Cornflower Blue
    '#FAE370', // Canary Yellow
    '#BFC9BD', // Sage Green
    '#1F453B', // Forest Green
    '#112621', // Coal Black
    '#F0EDEB', // Cloud Grey
    '#FCFBFA', // White
  ];

  const pawSVG = (color) =>
    `<svg viewBox="0 0 1110 1660" xmlns="http://www.w3.org/2000/svg" fill="${color}">
      <path d="M548.46,1085.91q23.79,7.38,23.8,27.89,0,27.92-35.28,27.9H336q-36.12,0-36.1-27.9a26.61,26.61,0,0,1,6.56-17.63,30.88,30.88,0,0,1,17.23-10.26l7.38-1.65q23-5.73,31.59-21.73t8.62-50.46V653.55q0-34.47-8.62-50t-30.76-22.16l-5.75-1.63q-11.49-2.46-18.05-10.26a26.6,26.6,0,0,1-6.56-17.64q0-27.07,36.1-27.07H619.84q118.95,0,184.19,44.3t65.23,133.74q0,86.15-65.23,130.44T613.28,877.53q-16.42,0-29.13-.41t-25.84-1.64q-13.14-1.23-27.9-3.29T496,866.86v145.21q0,31.18,8.2,46.35t27.07,21.74l12.31,4.1ZM582.1,566.58q-26.26,0-43.07,2.87t-26.26,10.67q-9.43,7.8-13.12,21.33T496,636.32V754.46q0,27.09,5.74,43.08t17.23,23.79q11.48,7.8,29.12,10.25A297.17,297.17,0,0,0,588.67,834q69.72,0,109.11-35.28t39.39-97.63a143.4,143.4,0,0,0-9.44-51.69A117.15,117.15,0,0,0,699,606.37q-19.29-18.45-48.41-29.12T582.1,566.58Z"/>
      <path d="M356.5,311.88A37.11,37.11,0,0,0,297.56,357l28.6,37.38a37.1,37.1,0,1,0,58.93-45.1Z"/>
      <path d="M731.36,397.94a37.1,37.1,0,0,0,52.2-5.4l28.2-34.71A37.1,37.1,0,1,0,754.17,311L726,345.75a37.09,37.09,0,0,0,5.39,52.19Z"/>
      <path d="M555.63,218.88A37.16,37.16,0,0,0,518.52,256v50.63a37.11,37.11,0,0,0,74.21,0V256A37.15,37.15,0,0,0,555.63,218.88Z"/>
      <path d="M783.84,1265.65h0a37.1,37.1,0,1,0-58.93,45.1l28.59,37.37A37.1,37.1,0,1,0,812.44,1303Z"/>
      <path d="M378.64,1262.06a37.1,37.1,0,0,0-52.2,5.4l-28.2,34.71a37.1,37.1,0,0,0,57.59,46.8l28.2-34.72a37.11,37.11,0,0,0-5.39-52.19Z"/>
      <path d="M554.37,1316.28a37.14,37.14,0,0,0-37.1,37.1V1404a37.11,37.11,0,0,0,74.21,0v-50.64A37.15,37.15,0,0,0,554.37,1316.28Z"/>
      <path d="M555,1646.79c-297.76,0-540-242.24-540-540V553.21c0-297.76,242.24-540,540-540s540,242.24,540,540v553.58C1095,1404.55,852.76,1646.79,555,1646.79ZM555,84C296.29,84,85.82,294.5,85.82,553.21v553.58C85.82,1365.5,296.29,1576,555,1576h0c258.71,0,469.18-210.47,469.18-469.18V553.21C1024.18,294.5,813.71,84,555,84Z"/>
    </svg>`;

  const queue = [];
  const MAX_PAWS = 50;

  hero.addEventListener('click', (e) => {
    const rect = hero.getBoundingClientRect();
    const maxSize = Math.max(window.innerWidth, window.innerHeight);
    const size  = Math.round(100 + Math.random() * (maxSize - 100));
    const rot   = (Math.random() - 0.5) * 160;            // –80° to +80°
    const color = PAW_COLORS[Math.floor(Math.random() * PAW_COLORS.length)];

    const paw = document.createElement('div');
    paw.className = 'paw-click';
    paw.innerHTML = pawSVG(color);
    paw.style.width  = size + 'px';
    paw.style.height = Math.round(size * 1.495) + 'px';
    paw.style.left   = (e.clientX - rect.left)  + 'px';
    paw.style.top    = (e.clientY - rect.top)    + 'px';
    paw.style.setProperty('--rot', rot.toFixed(1) + 'deg');

    hero.appendChild(paw);
    queue.push(paw);

    // Evict oldest when over cap — fade it out first
    if (queue.length > MAX_PAWS) {
      const oldest = queue.shift();
      oldest.style.transition = 'opacity 0.6s ease';
      oldest.style.opacity = '0';
      setTimeout(() => oldest.remove(), 650);
    }
  });
}());

// ---- FAQ accordion ----
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ---- Leaflet map ----
let mapInstance, lightTiles, darkTiles;

function initMap() {
  const el = document.getElementById('leaflet-map');
  if (!el || typeof L === 'undefined') return;

  mapInstance = L.map('leaflet-map', {
    center: [45.513, -73.574],
    zoom: 13,
    scrollWheelZoom: false,
  });

  lightTiles = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>', maxZoom: 19 }
  );

  darkTiles = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
    { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>', maxZoom: 19 }
  );

  (html.classList.contains('dark') ? darkTiles : lightTiles).addTo(mapInstance);

  const places = [
    { lat: 45.505765, lng: -73.567263, name: 'Plank HQ',     addr: '372 Rue Sainte-Catherine O, Suite 101', note: 'Main venue — all group activities',       color: '#ff9375' },
    { lat: 45.529229, lng: -73.578221, name: 'India Rosa',   addr: '1241 Mont-Royal Ave E',                 note: 'Thursday Group Dinner · 5:30 pm',        color: '#c8a96e' },
    { lat: 45.518777, lng: -73.582797, name: 'Atelier Make', addr: '4267 Boul. Saint-Laurent, Suite 300',   note: 'Friday Pottery Workshop · 1:30–4:00 pm', color: '#78b48c' },
    { lat: 45.504434, lng: -73.573694, name: 'McCord Museum',addr: '690 Sherbrooke St W',                   note: 'Walking tour backup venue',              color: '#a89ad4' },
  ];

  places.forEach(({ lat, lng, name, addr, note, color }) => {
    L.circleMarker([lat, lng], {
      radius: 9, fillColor: color,
      color: '#112621', weight: 2, fillOpacity: 0.92,
    })
    .addTo(mapInstance)
    .bindPopup(
      `<strong>${name}</strong><br>
       <span style="color:#777;font-size:12px">${addr}</span><br>
       <em style="color:#999;font-size:11px">${note}</em>`
    );
  });
}

function swapMapTiles() {
  if (!mapInstance) return;
  if (html.classList.contains('dark')) {
    if (mapInstance.hasLayer(lightTiles)) { mapInstance.removeLayer(lightTiles); darkTiles.addTo(mapInstance); }
  } else {
    if (mapInstance.hasLayer(darkTiles)) { mapInstance.removeLayer(darkTiles); lightTiles.addTo(mapInstance); }
  }
}

if (typeof L !== 'undefined') {
  initMap();
} else {
  window.addEventListener('load', initMap);
}
