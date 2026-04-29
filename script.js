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
