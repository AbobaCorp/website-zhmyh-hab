/* ====== САЙТЫ (данные в config.js) ====== */
const placeholderHTML = site => `
      <div class="preview-placeholder">
        <span class="preview-emoji">${site.emoji || '🌐'}</span>
        <span class="preview-label">${site.label || ''}</span>
      </div>`;

// Пробует загрузить превью. Расширение можно не указывать или указать любое:
// если файла нет, пробуются jpg / jpeg / png / webp. Не нашлось — остаётся смайлик.
function loadPreview(path, onFound) {
    if (!path) return;
    const base = path.replace(/\.(jpe?g|png|webp|gif|avif)$/i, '');
    const candidates = [path, ...['jpg', 'jpeg', 'png', 'webp'].map(e => `${base}.${e}`)]
        .filter((p, i, arr) => arr.indexOf(p) === i);
    (function tryNext(i) {
        if (i >= candidates.length) return;
        const img = new Image();
        img.onload = () => onFound(img);
        img.onerror = () => tryNext(i + 1);
        img.src = candidates[i];
    })(0);
}

const sitesGrid = document.getElementById('sitesGrid');

function plural(n, forms) {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 === 1) return forms[0];
    return forms[2];
}

document.getElementById('siteCount').textContent = SITES.length;
document.getElementById('siteLabel').textContent = plural(SITES.length, ['сайт', 'сайта', 'сайтов']);

SITES.forEach(site => {
    const card = document.createElement('article');
    card.className = 'site-card';
    card.style.setProperty('--tint', site.tint || '255, 77, 125');
    const isLive = site.type === 'live';
    card.innerHTML = `
        <div class="site-preview"></div>
        <div class="site-body">
          <span class="site-tag ${isLive ? 'tag-live' : 'tag-local'}">${isLive ? 'LIVE' : 'Local'}</span>
          <h3 class="site-title">${site.title}</h3>
          <p class="site-desc">${site.desc}</p>
          <a href="${site.url}" ${isLive ? 'target="_blank" rel="noopener"' : ''} class="btn btn-primary">Открыть ↗</a>
        </div>`;

    const preview = card.querySelector('.site-preview');
    preview.innerHTML = placeholderHTML(site);
    loadPreview(site.preview, img => {
        img.alt = 'Скриншот: ' + site.title;
        preview.replaceChildren(img);
    });
    sitesGrid.appendChild(card);
});

/* ====== ВКЛАДКИ (запоминаются после перезагрузки) ====== */
const TABS = ['sites', 'gallery'];
const root = document.documentElement;

function showSection(id, { updateHash = true } = {}) {
    if (!TABS.includes(id)) id = 'sites';
    root.setAttribute('data-tab', id);
    document.querySelectorAll('.nav-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.section === id));
    try { localStorage.setItem('zhmykh-tab', id); } catch (e) { }
    if (updateHash && location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
    window.scrollTo({ top: 0 });
}

document.querySelectorAll('.nav-btn').forEach(b =>
    b.addEventListener('click', () => showSection(b.dataset.section)));
document.querySelector('[data-go]').addEventListener('click', e => {
    e.preventDefault();
    showSection('sites');
});
window.addEventListener('hashchange', () => {
    const h = location.hash.replace('#', '');
    if (TABS.includes(h)) showSection(h, { updateHash: false });
});

showSection(root.getAttribute('data-tab'));

/* ====== ГАЛЕРЕЯ ====== */
const grid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
const lbCounter = document.getElementById('lbCounter');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let current = 0;
let ignoreClickUntil = 0; // после свайпа гасим «случайный» клик, чтобы лайтбокс не закрылся

function preload(i) {
    const p = PHOTOS[(i + PHOTOS.length) % PHOTOS.length];
    if (p) new Image().src = p.src;
}

// dir: 1 — следующее, -1 — предыдущее, 0 — без анимации (первое открытие)
function showPhoto(index, dir = 0) {
    const n = PHOTOS.length;
    current = (index + n) % n;
    const p = PHOTOS[current];

    lbImg.src = p.src;
    // alt показываем подписью, поэтому у самой картинки он пустой, чтобы скринридер не читал дважды
    lbImg.alt = p.alt ? '' : 'Руслан';
    lbCaption.textContent = p.alt || '';
    lbCaption.hidden = !p.alt;
    lbCounter.textContent = (current + 1) + ' / ' + n;

    preload(current + 1);
    preload(current - 1);

    if (dir && !reduceMotion.matches && lbImg.animate) {
        lbImg.animate(
            [{ opacity: 0, transform: 'translateX(' + dir * 40 + 'px)' },
            { opacity: 1, transform: 'none' }],
            { duration: 260, easing: 'cubic-bezier(.22, 1, .36, 1)' }
        );
    }
}

const go = dir => { if (PHOTOS.length > 1) showPhoto(current + dir, dir); };

if (PHOTOS.length) {
    document.getElementById('galleryNote').hidden = true;
    lightbox.classList.toggle('single', PHOTOS.length < 2);

    PHOTOS.forEach((p, i) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'gallery-item filled';
        item.innerHTML = '<img loading="lazy"><span class="gallery-cap"></span>';
        const img = item.querySelector('img');
        img.src = p.src;
        img.alt = p.alt || 'Руслан';
        item.querySelector('.gallery-cap').textContent = p.alt || '';
        item.addEventListener('click', () => {
            showPhoto(i);
            lightbox.showModal();
        });
        grid.appendChild(item);
    });
} else {
    for (let i = 0; i < 6; i++) {
        const ph = document.createElement('div');
        ph.className = 'gallery-item';
        ph.innerHTML = '<div class="plus">+</div><span>Добавить фото</span>';
        grid.appendChild(ph);
    }
}

/* --- кнопки --- */
lightbox.querySelector('.lb-prev').addEventListener('click', () => go(-1));
lightbox.querySelector('.lb-next').addEventListener('click', () => go(1));

/* --- клавиатура (Esc закрывает сам <dialog>) --- */
lightbox.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    else if (e.key === 'Home' && PHOTOS.length > 1) { e.preventDefault(); showPhoto(0, -1); }
    else if (e.key === 'End' && PHOTOS.length > 1) { e.preventDefault(); showPhoto(PHOTOS.length - 1, 1); }
});

/* --- свайп (телефон / планшет, работает и мышью) --- */
let sx = 0, sy = 0, tracking = false;
lightbox.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (e.target.closest('.lb-nav, .lightbox-close')) return;
    sx = e.clientX; sy = e.clientY; tracking = true;
});
lightbox.addEventListener('pointerup', e => {
    if (!tracking) return;
    tracking = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        ignoreClickUntil = Date.now() + 400;
        go(dx < 0 ? 1 : -1);
    }
});
lightbox.addEventListener('pointercancel', () => { tracking = false; });

/* --- закрытие: крестик или клик по затемнённому фону --- */
lightbox.addEventListener('click', e => {
    if (Date.now() < ignoreClickUntil) return;
    if (e.target.closest('.lightbox-close')) { lightbox.close(); return; }
    if (e.target.closest('.lb-nav, img, figcaption, .lb-counter')) return;
    lightbox.close();
});
