/* ---------- САЙТЫ ----------
   Чтобы добавить сайт — скопируй любой блок { ... }, и вставь его в список.

   title    — название
   desc     — описание
   url      — ссылка
   type     — 'live' (рабочий сайт), 'local' (репозиторий)
              или 'soon' (ещё в разработке: кнопка «Открыть» заменяется на «Скоро премьера»)
   preview  — путь к скриншоту, например 'previews/zhmykhagochi.jpg'
              (положи файл в папку previews/). Если файла нет — покажется смайлик.
   emoji    — смайлик-заглушка, пока нет скриншота
   label    — подпись под смайликом
   tint     — цвет подсветки карточки в формате 'R, G, B'

   Только для type: 'soon' (всё необязательное, url можно не указывать):
   date     — дата/срок премьеры, например 'декабрь 2026' (появится на плашке вместо «Скоро премьера»)
   progress — готовность в процентах, 0–100 (покажет полоску «В разработке»)

   Когда сайт будет готов — поменяй type на 'live' или 'local', добавь url, и карточка станет обычной.
*/
const SITES = [
  {
    title: 'Собери Руслана',
    desc: 'Онлайн-игра в пазл: собери по кусочкам четыре фото Руслана. Готовой картинки нет, зато есть повороты, таймер и финальный босс.',
    url: 'sites/website-lazy-puzzle/index.html',
    type: 'local',
    preview: 'sites/website-lazy-puzzle/preview/website_preview.jpg',
    emoji: '🧩',
    label: 'Пазл-игра',
    tint: '167, 139, 250',
  },
  {
    title: 'Руслан Камазов Records',
    desc: 'Официальный сайт рэп-артиста с дискографией прогулов, туром «Где ты?» и мерчем со справками.',
    url: 'sites/website-ruslan-records/index.html',
    type: 'local',
    preview: 'sites/website-ruslan-records/preview/website_preview.jpg',
    emoji: '🎤',
    label: 'Рэп-лейбл',
    tint: '111, 208, 255',
  },
  {
    title: 'ЖМЫХАГОЧИ',
    desc: 'Симулятор ответственного студента. Корми, укладывай, надейся… пока ещё числится. Тамагочи с академическим долгом.',
    url: 'https://zhmykhagochi.run.place/',
    type: 'live',
    preview: 'previews/zhmykhagochi.jpg',
    emoji: '🐣',
    label: 'Тамагочи',
    tint: '94, 234, 150',
  },
  {
    title: 'Homo Studentus Pomytus',
    desc: 'Шутливый сайт в стиле National Geographic про редкий вид — ленивого студента. Есть мягкая и полная (без цензуры) версии.',
    url: 'sites/website-homo-studentus/index.html',
    type: 'local',
    preview: 'sites/website-homo-studentus/preview/website_preview.jpg',
    emoji: '🦒',
    label: 'National Geographic',
    tint: '252, 191, 73',
  },
  {
    title: 'Ruslan Fat Site',
    desc: 'Неоново-розовый шедевр. №1 фанат Аянами Рей + куриные эмодзи. Glitch-эффекты, радуга и максимальный хаос.',
    url: 'sites/website-ruslan-fat-site/index.html',
    type: 'local',
    preview: 'sites/website-ruslan-fat-site/preview/website_preview.jpg',
    emoji: '🌸',
    label: 'Neon / Anime',
    tint: '255, 120, 200',
  },
  {
    title: 'Розыск №1',
    desc: 'Классический wanted-постер. Руслан «Жирный…» Камазов разыскивается. Неоновые эффекты, тряска, печать и весь вайб 90-х.',
    url: 'sites/website-wanted/index.html',
    type: 'local',
    preview: 'sites/website-wanted/preview/website_preview.jpg',
    emoji: '🚨',
    label: 'Розыск',
    tint: '255, 90, 90',
  },
];

/* ---------- ФОТО ДЛЯ ГАЛЕРЕИ ----------*/
const PHOTOS = [
  { src: 'gallery/photo10.jpg', alt: 'Хаотичная битва носков и солдатиков' },
  { src: 'gallery/photo9.jpg', alt: 'Руслан снова на парах (не FEDUK)' },
  { src: 'gallery/photo8.jpg', alt: 'Легенда в адиках и очках на кровати' },
  { src: 'gallery/photo7.jpg', alt: 'FEDUK-вайб с блондинкой и цепью' },
  { src: 'gallery/photo6.jpg', alt: 'Рэпер с цепью «R» и взглядом в будущее' },
  { src: 'gallery/photo5.jpg', alt: 'Гримаса уровня: понедельник' },
  { src: 'gallery/photo4.jpg', alt: 'Сегодня точно на пары… после KFC и Евы' },
  { src: 'gallery/photo3.jpg', alt: 'В розыске: кличка Кабан, подайте на пиво' },
  { src: 'gallery/photo2.jpg', alt: 'Шапка, бутылка и сигарета – база' },
  { src: 'gallery/photo1.jpg', alt: 'Балтика 9: выбор чемпиона' },
];
