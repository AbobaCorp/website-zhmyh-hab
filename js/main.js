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
const lbImg = lightbox.querySelector('img');

if (PHOTOS.length) {
    document.getElementById('galleryNote').hidden = true;
    PHOTOS.forEach(p => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'gallery-item filled';
        item.innerHTML = '<img loading="lazy">';
        const img = item.querySelector('img');
        img.src = p.src;
        img.alt = p.alt || 'Руслан';
        item.addEventListener('click', () => {
            lbImg.src = p.src;
            lbImg.alt = p.alt || 'Руслан';
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

lightbox.addEventListener('click', e => { if (e.target !== lbImg) lightbox.close(); });