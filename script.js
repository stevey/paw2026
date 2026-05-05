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
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
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

function closeNav() {
  navMobile.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation menu');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  document.body.style.overflow = open ? 'hidden' : '';
});

navMobile.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', closeNav)
);

const navMobileClose = document.getElementById('nav-mobile-close');
if (navMobileClose) navMobileClose.addEventListener('click', closeNav);

// Close mobile nav on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMobile.classList.contains('open')) {
    closeNav();
    navToggle.focus();
  }
});

// ---- Nav scroll state ----
const siteNav = document.querySelector('.site-nav');
function checkScroll() { siteNav.classList.toggle('scrolled', window.scrollY > 40); }
window.addEventListener('scroll', checkScroll, { passive: true });
checkScroll();

// ---- Hero paw click ----
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Start both buttons inactive; activate on first canvas click
  const dlBtn    = document.querySelector('.hero-download');
  const clearBtn = document.querySelector('.hero-clear');
  if (dlBtn) {
    dlBtn.disabled = true;
    dlBtn.textContent = '↑ click the canvas above to paint';
    dlBtn.setAttribute('aria-label', 'Paint the canvas to create artwork');
  }

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

  // Each shape: paths[] + tight square viewBox centered on the shape's visual center
  const SHAPES = [
    { viewBox: '87 104 96 96',   paths: ['M138.39,119.25c-16.58,4.1-25.78,16.38-27.41,28.01-2.84,20.21,18.2,38.01,36.76,37.99,35.77-.04,43.82-48.34,12.4-62.03-4.63-2.01-15.44-5.54-21.75-3.98Z'] },
    { viewBox: '95 97 107 107',  paths: ['M187.29,162.1c-1.92,1.78-4.44,2.4-5.53,2.86-2.78,1.16-3.02,1.15-8.14,3.28-4.32,1.79-8.18,3.84-12.51,5.64-4.13,1.72-8.36,3.49-12.45,5.2-2.53,1.06-5.09,2.28-7.68,3.08-1.16.35-2.28.76-3.55,1.06-.91.22-2.22.47-3.24-.69-.99-1.12-2-4.13-2.74-5.53-3.59-6.78-5.97-14.38-8.93-21.48-3.35-8.09-7.47-15.76-10.83-23.84-.36-.86-.99-2.56-.92-3.69.08-1.17.65-2.27,1.29-3.22,1.77-2.62,4.79-3.23,7.66-4,4.37-1.17,9.63-1.47,14.17-1.27,3.67.17,7.3,1.52,10.95,2.05,5.43.8,10.82,4.06,15.48,6.87,1.39.84,2.72,1.89,4.02,2.92,2.08,1.65,3.13,2.63,4.9,4.12,1.87,1.58,3.42,3.24,4.99,5,1.62,1.8,3.43,3.71,4.88,5.35.86.97,5.89,7.35,8.55,11.66,1.33,2.15.38,3.9-.39,4.62'] },
    { viewBox: '105 137 89 89',  paths: ['M173.73,154.61c-3.65-.16-8.1-.35-11.75.15-6.18.84-12.32.27-18.6.79-4.62.39-10.77.69-15.37,1.33-1.59.22-4.65.54-5.96,1.7-1.73,1.53-1.73,4.87-.89,6.31,2.15,3.66,3.75,6.86,5.98,9.96,5.09,7.09,9.48,14.68,15.14,21.37,1.67,1.97,4.81,6.26,6.19,8.5,2.38,3.82,5.68,6.53,9.82,5.22,5-1.58,8.02-6.73,9.45-11.04.48-1.45.88-2.48,1.5-3.86.73-1.63,1.09-3.74,1.9-6.18,1.15-3.45,1.87-6.11,2.92-9.87,1.04-3.74,2.16-6.88,3.36-10.41.87-2.56,1.68-5.49,1.83-8.22.11-2.13-2.45-5.62-5.53-5.75Z'] },
    { viewBox: '100 133 98 98',  paths: ['M167.82,158.33c1.09.43,2.22,1.25,1.73,2.52-.76,2-1.37,3.44-1.92,4.8-.92,2.27-1.81,4.39-2.72,6.64-1.63,4-2.84,7.7-3.25,11.92-.26,2.71.48,6.09,1.72,8.84,1.19,2.64,3.45,4.24,5.49,5.78,1.03.78,2.33,1.6,4.33,2.24,1.22.39,1.89,1.45,1.32,2.83-.7,1.72-1.4,3.49-1.86,4.61-.95,2.34-2.04,4.91-3.11,7.2-.36.75-1.24,1.09-2.02.79-1.73-.68-3.4-1.37-5.18-2.01-3.07-1.12-6.83-2.85-9.77-4.14-9.01-3.94-14.64-6.52-21.31-8.79-.57-.19-2.98-1.14-5.06-2.1-1.01-.47-1.62-1.79-1.02-3.28.81-1.99,1.5-3.45,2.17-5.15,1.14-2.88,2.05-5.68,3.23-8.57,2.97-7.31,6.26-13.98,9.38-21.31,1.53-3.59,3.03-7.63,4.51-11.24.33-.81,1.26-1.19,1.79-.96,0,0,10.56,3.86,13.29,5.18,2.83,1.37,8.24,4.21,8.24,4.21'] },
    { viewBox: '107 140 85 85',  paths: ['M123.46,201.58c-.08-1.16-.19-2.04-.17-2.96.03-1.53.11-3.1-.05-4.65-.4-3.83-.28-7.62-.39-11.45-.15-5.08.5-10.02.13-15.06-.27-3.73-1.15-8.8,3.27-10.13,2.45-.73,5.37-.7,7.92-.64,4.13.09,8.22.18,12.37.06,4.93-.13,9.85-.27,14.78-.41,2.55-.07,5.09-.08,7.63-.08,1.52,0,4.15-.35,5.48.41,3.44,1.97,2.6,9.2,2.86,12.74.49,6.56.07,13.06.19,19.65.06,3.65.26,7.16.35,10.65.04,1.34,0,2.53-.34,3.81-.35,1.32-.91,1.82-2,2.58-1.39.98-2.86.97-4.58,1.14-2.61.26-5.24.19-7.86.36-1.28.09-2.57.11-3.85.19-1.61.1-3.15.53-4.77.55-3.37.03-6.76.19-10.14.28-1.75.05-3.46.34-5.19.48-1.87.14-3.75.01-5.63.16-2.17.16-4.63.33-6.8.1-3.52-.37-3.05-2.86-3.09-5.81,0-.62-.11-1.63-.13-1.97'] },
    { viewBox: '97 131 104 104', paths: ['M162.67,212.71c6.27-.97,7.66-1.18,13.95-2.14,2.88-.45,6.93,0,8.76-2.31,1.01-1.28,1.4-2.35,1.03-3.97-1.33-5.73-2.16-11.25-4.5-16.69-1.27-2.95-2.89-5.82-4.24-8.43-2.48-4.79-5.89-8.32-9.57-12.17-2.94-3.07-6.67-5.38-10.18-7.77-3.04-2.07-6.49-2.84-9.93-3.95-8.74-2.81-19.34-2.78-28.37-1.38-3.01.46-5.88,1.52-6.39,4.79-.31,2.02.64,4.41,1.48,8.31,1.13,5.24,1.87,7.82,2.93,13.02.8,3.94,1.82,7.82,6.67,7.11,5.5-.81,10.99-1.01,16.39,1.61,7.26,3.52,11.76,7.61,14.74,16.21.59,1.71.95,3.7,1.12,5.45.25,2.5,3.91,2.64,6.11,2.3'] },
    { viewBox: '100 133 100 100', paths: ['M164.83,214.37c2.52-2.23,4.85-4.9,7.2-7.32,2.35-2.42,4.66-5.16,6.95-7.37,1.77-1.7,3.99-3.57,4.89-5.92.9-2.36.86-4.08.43-6.32-.76-4-2.96-9.11-4.15-13.02-.79-2.59-1.39-5.21-2.19-7.82-.71-2.34-.94-4.97-2.43-6.9-1.58-2.04-3.78-3.29-6.09-4.3-3.25-1.42-6.91-1.99-10.23-3.29-3.02-1.18-7.54-2.55-10.63-3.56-3.55-1.16-7.71-1.47-11.05.7-2.38,1.54-4.14,4.33-6.13,6.35-2.34,2.39-4.97,4.95-7.11,7.5-3.66,4.36-9.37,9.09-8.14,15.34.83,4.25,2.32,9.16,3.38,13.43,1.12,4.51,1.48,9.63,3.89,13.68,2.64,4.44,8.88,6.07,13.8,7.36,2.7.71,5.01,1.39,7.75,2.26,2.27.72,4.53,1.76,6.89,2.33,2.48.61,4.2.89,6.75.28,2.55-.61,4.6-1.99,6.22-3.42Z'] },
    { viewBox: '121 154 56 56',  paths: ['M144.06,187.46c.08.02.23.06.31.09.07.03.25.09.31.14.12.12.24.23.33.37.08.12.13.26.18.39.07.19.13.38.17.57.07.32.1.65.16.97.09.49.24.96.4,1.43.24.73.46,1.49.73,2.2.02.06.07.2.1.26.17.47.33.75.61,1.1.17.22.35.44.59.57.43.23.95.11,1.39-.1.35-.17.67-.39.92-.68.13-.15.24-.31.34-.48.3-.45.67-1.07.96-1.53.52-.79.92-1.33,1.41-2.15.09-.15.22-.37.33-.49.14-.16.27-.3.42-.45.12-.11.24-.21.38-.28.47-.24,1.04-.1,1.56-.05.2.02.4.03.6.03.57.02,1.13.04,1.69.05.21,0,.43.01.64,0,.17-.02.35-.03.52-.03.27,0,.5,0,.75.02.23.02.55.01.79.02.54.03,1-.09,1.44-.38.19-.12.37-.28.47-.49.14-.27.15-.6.11-.91-.03-.27-.1-.54-.21-.79-.1-.21-.23-.41-.36-.6-.25-.38-.51-.76-.76-1.13-.48-.72-.97-1.43-1.49-2.13-.4-.53-.88-.98-1.22-1.55-.3-.5.02-1.12.23-1.66.52-1.34.92-2.63,1.44-3.97.17-.45.35-.97.42-1.44.07-.47.01-.97-.22-1.4-.2-.37-.53-.66-.93-.79-.65-.21-1.36,0-2.01.22-.88.29-1.56.65-2.43.97-.3.11-.6.22-.9.32-.58.19-1.43.28-2.04.38-.35.06-.7-.08-1-.26-.3-.19-.56-.38-.86-.57-.18-.11-.33-.25-.54-.39-.22-.15-.5-.33-.71-.49-1.04-.81-1.87-1.82-3.07-2.36-.33-.15-.67-.3-1.03-.27-.16.01-.31.07-.46.14-.41.18-.78.48-.95.89-.14.34-.14.71-.15,1.08,0,.72.09,1.48.09,2.2,0,1.14-.11,2.23-.14,3.37,0,.24-.01.49-.09.73-.15.45-.5.88-.92,1.21-1.39,1.11-2.89,1.97-4.35,2.99-.22.15-.44.3-.61.5-.36.42-.46.98-.31,1.51.16.53.56,1.01,1.07,1.21.33.13.7.21,1.04.31.33.1.68.18,1.01.3.58.22,1.21.3,1.78.54.27.12.56.21.84.29.56.16.74.29,1.19.43h0Z'] },
    { viewBox: '110 143 78 78',  paths: ['M140.75,196.29c-.95,2.71-1.5,4.86-.44,7.54,1.02,2.57,3.35,3.18,5.84,2.66,1.63-.34,3.3-1.5,4.32-2.83.76-1,2.69-1.21,3.74-.51,1.59,1.05,3.5,1.46,5.47.78,2-.69,2.75-2.16,3.13-4.13.14-.72.26-1.84.24-2.97-.01-.83,2.04-3.43,2.86-3.53,2.33-.3,4.75-.52,6.37-2.44,1.55-1.84,1.9-3.99,1.2-6.31-.49-1.62-2.07-3.75-3.65-4.43-.89-.38-1.88-.73-2.83-.91-.18-.03-.38-.07-.59-.09-.88-.12-1.2-1.03-.68-1.76.71-.98,1.46-2.13,1.8-3.31.84-2.91.8-5.82-.82-8.42-.56-.9-1.1-1.71-2.07-2.13-1.4-.61-2.98-.77-4.49-.65-1.64.13-3.07.79-4.43,1.59-1.06.62-2.16.09-2.68-1.02-.48-1.03-1.11-2.07-1.91-2.89-1.08-1.11-2.42-1.96-3.99-1.96-1.49,0-3.14-.07-4.59.39-2.06.65-4.18,2.31-4.86,4.43-.19.59-.28,1.18-.3,1.76-.06,1.79-1.21,3.43-3,3.42-1.57,0-3.11.15-4.51,1.03-2.63,1.66-4.36,3.92-4.06,7.09.13,1.4.51,2.62,1.3,3.73.53.74,1.3,1.5,1.89,2.19.68.79.73,2.54.21,3.44-.87,1.51-1.28,3.52-1.34,4.91-.07,1.48.18,2.43,1.16,3.55.91,1.06,2.14,2.06,3.41,2.62,1.6.7,3.65.89,5.36.45.86-.22,2.95-1.29,2.95-1.29', 'M145.31,175.01c-3.52,1.89-4.9,5.2-4.59,7.94.53,4.75,6.34,7.56,10.55,6.48,8.11-2.08,7.14-13.49-.79-14.77-1.17-.19-3.82-.36-5.16.36'] },
    { viewBox: '116 149 67 67',  paths: ['M159.36,165.02c-3.4-1.23-6.72.04-9.08,2.88-1.28,1.53-1.98,3.36-2.51,5.27-.31,1.13-.43,2.11-.52,3.26-.05.59-.03,1.01,0,1.6-.56-.17-.96-.27-1.54-.35-1.12-.15-2.09-.25-3.24-.18-1.95.11-3.85.42-5.59,1.36-3.23,1.75-5.16,4.78-4.71,8.42.38,3.05,2.21,5.18,4.22,7.14.83.81,2.15,1.41,3.18,1.88,1.08.5,2.17,1.06,3.29,1.45,3.24,1.13,6.34,2.29,9.68,3.09,1.74.41,3.51.57,5.29.72.96.08,2.81.14,3.94-.05.86-.14,2.36-.63,3.06-1.2.7-.57,1.49-1.97,1.81-2.79.42-1.08.99-2.93,1.09-3.84.23-1.88.09-3.87.07-5.69-.04-3.49-.31-6.63-.7-10.09-.14-1.2-.44-2.4-.69-3.59-.24-1.13-.57-2.54-1.12-3.57-1.37-2.49-3.09-4.7-5.94-5.73h0Z'] },
    { viewBox: '102 134 96 96',  paths: ['M147.84,211.41c1.11.35,1.66,1,1.66,1.97,0,1.31-.82,1.97-2.47,1.97h-14.06c-1.68,0-2.52-.66-2.52-1.97,0-.46.15-.88.46-1.25.31-.37.71-.61,1.2-.72l.52-.12c1.07-.27,1.81-.78,2.21-1.54.4-.75.6-1.94.6-3.56v-25.33c0-1.62-.2-2.8-.6-3.54-.4-.73-1.12-1.26-2.15-1.57l-.4-.12c-.54-.12-.96-.36-1.26-.72-.31-.37-.46-.78-.46-1.25,0-1.27.84-1.91,2.52-1.91h19.74c5.55,0,9.84,1.04,12.88,3.13,3.04,2.09,4.56,5.24,4.56,9.45s-1.52,7.13-4.56,9.22c-3.04,2.09-7.49,3.13-13.34,3.13-.77,0-1.44,0-2.04-.03-.59-.02-1.2-.06-1.81-.12-.61-.06-1.26-.13-1.95-.23-.69-.1-1.49-.22-2.41-.38v10.26c0,1.47.19,2.56.57,3.27.38.72,1.01,1.23,1.89,1.54l.86.29.34.12ZM150.19,174.72c-1.22,0-2.23.07-3.01.2-.78.14-1.4.39-1.84.75-.44.37-.75.87-.92,1.51-.17.64-.26,1.46-.26,2.46v8.35c0,1.28.13,2.29.4,3.04.27.75.67,1.31,1.2,1.68.54.37,1.21.61,2.04.72.82.12,1.77.17,2.84.17,3.25,0,5.79-.83,7.63-2.49,1.84-1.66,2.75-3.96,2.75-6.9,0-1.28-.22-2.49-.66-3.65-.44-1.16-1.11-2.17-2.01-3.04-.9-.87-2.03-1.56-3.39-2.06-1.36-.5-2.95-.75-4.79-.75Z', 'M134.42,156.73c-.87-1.15-2.5-1.37-3.64-.49-1.14.88-1.35,2.53-.48,3.67l2,2.64c.49.65,1.25,1.03,2.06,1.03.57,0,1.12-.19,1.58-.54,1.14-.88,1.35-2.53.48-3.67l-2-2.64Z', 'M160.63,162.81c.46.38,1.04.59,1.64.59.79,0,1.52-.35,2.01-.97l1.97-2.45c.9-1.12.73-2.78-.38-3.69-1.11-.91-2.75-.74-3.65.38l-1.97,2.45c-.44.54-.64,1.23-.57,1.92.07.7.41,1.32.94,1.76Z', 'M148.34,150.16c-1.43,0-2.59,1.18-2.59,2.62v3.58c0,1.45,1.16,2.62,2.59,2.62s2.59-1.18,2.59-2.62v-3.58c0-1.45-1.16-2.62-2.59-2.62Z'] },
  ];

  const shapeSVG = (shape, color) => {
    const pathEls = shape.paths.map(d => `<path fill="${color}" stroke-width="0" d="${d}"/>`).join('');
    return `<svg viewBox="${shape.viewBox}" xmlns="http://www.w3.org/2000/svg">${pathEls}</svg>`;
  };

  const queue = [];
  const MAX_PAWS = 50;

  let currentMode = 'paw';
  const modeToggle = document.querySelector('.hero-mode-toggle');
  if (modeToggle) {
    modeToggle.addEventListener('click', () => {
      currentMode = currentMode === 'paw' ? 'shape' : 'paw';
      const isShape = currentMode === 'shape';
      modeToggle.textContent = isShape ? '✳︎ shape' : '✳︎ logo';
      modeToggle.setAttribute('aria-pressed', String(isShape));
      modeToggle.setAttribute('aria-label', isShape ? 'Switch to logo mode' : 'Switch to shapes mode');
    });
  }

  hero.addEventListener('click', (e) => {
    const rect    = hero.getBoundingClientRect();
    const maxSize = Math.max(window.innerWidth, window.innerHeight);
    const size    = Math.round(100 + Math.random() * (maxSize - 100));
    const rot     = (Math.random() - 0.5) * 160;
    const color   = PAW_COLORS[Math.floor(Math.random() * PAW_COLORS.length)];

    const el = document.createElement('div');

    if (currentMode === 'paw') {
      el.className = 'paw-click';
      el.innerHTML = pawSVG(color);
      el.style.width  = size + 'px';
      el.style.height = Math.round(size * 1.495) + 'px';
    } else {
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      el.className = 'shape-click';
      el.innerHTML = shapeSVG(shape, color);
      const shapeSize = Math.round(200 + Math.random() * (maxSize - 200));
      el.style.width  = shapeSize + 'px';
      el.style.height = shapeSize + 'px';
    }

    el.style.left = (e.clientX - rect.left) + 'px';
    el.style.top  = (e.clientY - rect.top)  + 'px';
    el.style.setProperty('--rot', rot.toFixed(1) + 'deg');

    hero.appendChild(el);
    queue.push(el);

    // Unlock both buttons after first paint
    if (dlBtn && dlBtn.disabled) {
      dlBtn.disabled = false;
      dlBtn.textContent = '↓ save artwork';
      dlBtn.setAttribute('aria-label', 'Download hero artwork as PNG');
    }
    if (clearBtn) {
      clearBtn.hidden = false;
      clearBtn.removeAttribute('aria-hidden');
    }

    // Evict oldest when over cap — fade it out first
    if (queue.length > MAX_PAWS) {
      const oldest = queue.shift();
      oldest.style.transition = 'opacity 0.6s ease';
      oldest.style.opacity = '0';
      setTimeout(() => oldest.remove(), 650);
    }
  });

  // ---- Clear hero artwork ----
  document.querySelector('.hero-clear')?.addEventListener('click', () => {
    document.querySelectorAll('.hero .paw-click, .hero .shape-click').forEach(el => el.remove());
    queue.length = 0;
    if (dlBtn) {
      dlBtn.disabled = true;
      dlBtn.textContent = '↑ click the canvas above to paint';
      dlBtn.setAttribute('aria-label', 'Paint the canvas to create artwork');
    }
    if (clearBtn) {
      clearBtn.hidden = true;
      clearBtn.setAttribute('aria-hidden', 'true');
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
    if (!mapInstance.hasLayer(darkTiles))  darkTiles.addTo(mapInstance);
    if (mapInstance.hasLayer(lightTiles))  mapInstance.removeLayer(lightTiles);
  } else {
    if (!mapInstance.hasLayer(lightTiles)) lightTiles.addTo(mapInstance);
    if (mapInstance.hasLayer(darkTiles))   mapInstance.removeLayer(darkTiles);
  }
  mapInstance.invalidateSize();
}

if (typeof L !== 'undefined') {
  initMap();
} else {
  window.addEventListener('load', initMap);
}

// ---- Schedule PDF download ----
const statusAnnouncer = document.getElementById('status-announcer');
function announce(msg) {
  if (statusAnnouncer) { statusAnnouncer.textContent = ''; setTimeout(() => { statusAnnouncer.textContent = msg; }, 50); }
}

async function downloadDayPDF(dayColId, filename) {
  const el = document.getElementById(dayColId);
  if (!el) return;

  const btn = el.querySelector('.day-pdf-btn');
  const origText = btn.textContent;
  const origLabel = btn.getAttribute('aria-label');
  const dayName = dayColId === 'day-thu' ? 'Thursday' : 'Friday';
  btn.textContent = 'Generating…';
  btn.setAttribute('aria-label', `Generating ${dayName} schedule PDF, please wait`);
  btn.disabled = true;
  announce(`Generating ${dayName} schedule PDF…`);

  try {
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      onclone: (doc) => {
        doc.documentElement.classList.remove('dark');
        doc.getElementById(dayColId).querySelector('.day-pdf-btn').style.display = 'none';
        // Strip all background colours so the PDF renders on plain white
        const s = doc.createElement('style');
        s.textContent = `
          *, *::before, *::after {
            background-color: transparent !important;
            background-image: none !important;
            box-shadow: none !important;
          }
        `;
        doc.head.appendChild(s);
      },
    });

    const { jsPDF } = window.jspdf;
    const pdf   = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const maxW  = pageW * 0.8;          // 80% width → 10% margin each side
    const maxH  = pageH * 0.92;         // small top/bottom breathing room

    // Scale canvas to fit within the content area, centred
    const imgRatio = canvas.width / canvas.height;
    let drawW = maxW;
    let drawH = drawW / imgRatio;
    if (drawH > maxH) { drawH = maxH; drawW = drawH * imgRatio; }
    const x = (pageW - drawW) / 2;
    const y = (pageH - drawH) / 2;

    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, drawW, drawH);
    pdf.save(filename);
  } finally {
    btn.textContent = origText;
    btn.setAttribute('aria-label', origLabel);
    btn.disabled = false;
    announce(`${dayName} schedule PDF ready.`);
  }
}

document.querySelectorAll('.day-pdf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const day = btn.dataset.day;
    downloadDayPDF(
      `day-${day}`,
      day === 'thu' ? 'PAW26-Thursday.pdf' : 'PAW26-Friday.pdf'
    );
  });
});

// ---- Hero artwork download ----
const heroDownloadBtn = document.querySelector('.hero-download');
if (heroDownloadBtn) {
  heroDownloadBtn.addEventListener('click', async () => {
    const hero = document.querySelector('.hero');
    const rect = hero.getBoundingClientRect();
    const dpr  = window.devicePixelRatio || 1;
    const OUT_W = Math.round(rect.width  * dpr);
    const OUT_H = Math.round(rect.height * dpr);
    const sx = dpr, sy = dpr;

    const canvas = document.createElement('canvas');
    canvas.width  = OUT_W;
    canvas.height = OUT_H;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = html.classList.contains('dark') ? '#112621' : '#f0ede8';
    ctx.fillRect(0, 0, OUT_W, OUT_H);

    // Draw each logo in DOM order (oldest → newest)
    for (const el of hero.querySelectorAll('.paw-click, .shape-click')) {
      const cs      = getComputedStyle(el);
      const opacity = parseFloat(cs.opacity);
      if (opacity <= 0) continue;

      const blurMatch = cs.filter.match(/blur\(([\d.]+)px\)/);
      const blurCSS   = blurMatch ? parseFloat(blurMatch[1]) : 0; // CSS px

      const left      = parseFloat(el.style.left)   * sx;
      const top       = parseFloat(el.style.top)     * sy;
      const width     = parseFloat(el.style.width)   * sx;
      const height    = parseFloat(el.style.height)  * sy;
      const rotRad    = parseFloat(el.style.getPropertyValue('--rot') || 0) * Math.PI / 180;
      const cssWidth  = parseFloat(el.style.width);  // un-scaled, for stdDeviation calc

      // Clone the SVG and expand its viewBox symmetrically so the Gaussian
      // falloff has room to breathe before it hits the viewport boundary.
      // Equal padding on all sides keeps the content centre unchanged, so the
      // existing centred drawImage call still places it correctly.
      const isPaw = el.classList.contains('paw-click');
      const vb  = el.querySelector('svg').getAttribute('viewBox').split(/\s+/).map(Number);
      const VW  = vb[2];
      const VH  = vb[3];
      const PAD = isPaw ? 350 : Math.ceil(Math.max(VW, VH) * 0.3);
      const pvW = VW + 2 * PAD;
      const pvH = VH + 2 * PAD;
      const svgEl = el.querySelector('svg').cloneNode(true);
      svgEl.setAttribute('viewBox', `-${PAD} -${PAD} ${pvW} ${pvH}`);
      svgEl.setAttribute('overflow', 'visible');

      // Canvas draw size for the padded SVG (content stays same visual scale)
      const pWidth  = width  * (pvW / VW);
      const pHeight = height * (pvH / VH);

      if (blurCSS > 0) {
        const ns     = 'http://www.w3.org/2000/svg';
        const stdDev = (blurCSS * VW / cssWidth).toFixed(1);
        const defs   = document.createElementNS(ns, 'defs');
        const filt   = document.createElementNS(ns, 'filter');
        filt.setAttribute('id', 'xb');
        filt.setAttribute('filterUnits', 'userSpaceOnUse');
        filt.setAttribute('x',      `-${PAD}`);
        filt.setAttribute('y',      `-${PAD}`);
        filt.setAttribute('width',  String(pvW));
        filt.setAttribute('height', String(pvH));
        const feBlur = document.createElementNS(ns, 'feGaussianBlur');
        feBlur.setAttribute('stdDeviation', stdDev);
        filt.appendChild(feBlur);
        defs.appendChild(filt);
        svgEl.insertBefore(defs, svgEl.firstChild);
        const g = document.createElementNS(ns, 'g');
        g.setAttribute('filter', 'url(#xb)');
        [...svgEl.children].filter(c => c !== defs).forEach(c => g.appendChild(c));
        svgEl.appendChild(g);
      }

      const url = URL.createObjectURL(
        new Blob([new XMLSerializer().serializeToString(svgEl)], { type: 'image/svg+xml' })
      );

      await new Promise(resolve => {
        const img  = new Image();
        img.onload = () => {
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.translate(left, top);
          ctx.rotate(rotRad);
          ctx.drawImage(img, -pWidth / 2, -pHeight / 2, pWidth, pHeight);
          ctx.restore();
          URL.revokeObjectURL(url);
          resolve();
        };
        img.onerror = () => { URL.revokeObjectURL(url); resolve(); };
        img.src = url;
      });
    }

    const a = document.createElement('a');
    a.download = `paw26-artwork-${html.classList.contains('dark') ? 'dark' : 'light'}.png`;
    a.href     = canvas.toDataURL('image/png');
    a.click();
  });
}
