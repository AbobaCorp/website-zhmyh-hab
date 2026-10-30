/* ---------- САЙТЫ ----------
   Чтобы добавить сайт — скопируй любой блок { ... }, и вставь его в список.

   title    — название
   desc     — описание
   url      — ссылка
   type     — 'live' (рабочий сайт) или 'local' (репозиторий)
   preview  — путь к скриншоту, например 'previews/zhmykhagochi.jpg'
              (положи файл в папку previews/). Если файла нет — покажется смайлик.
   emoji    — смайлик-заглушка, пока нет скриншота
   label    — подпись под смайликом
   tint     — цвет подсветки карточки в формате 'R, G, B'
*/
const SITES = [
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
  { src: 'gallery/photo5.jpg', alt: 'Селфи с языком и крошками на худи' },
  { src: 'gallery/photo4.jpg', alt: 'Сегодня точно на пары… после KFC и Евы' },
  { src: 'gallery/photo3.jpg', alt: 'В розыске: кличка Кабан, подайте на пиво' },
  { src: 'gallery/photo2.jpg', alt: 'Подайте на пиво, Балтика на голове' },
  { src: 'gallery/photo1.jpg', alt: 'Главный по шаверме с Балтикой 9' },
];
