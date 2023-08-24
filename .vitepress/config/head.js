export const head = [
  ['meta', { name: 'theme-color', content: '#ffffff' }],
  ['link', { rel: 'icon', href: '/logo.png', type: 'image/png' }],
  ['meta', { name: 'author', content: 'vaebe' }],
  ['meta', { property: 'og:title', content: 'leaflet-example' }],
  [
    'meta',
    {
      property: 'og:description',
      content: 'leaflet 与 vue3 结合使用的一些示例'
    }
  ],
  [
    'meta',
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, viewport-fit=cover'
    }
  ],
  // 谷歌分析
  [
    'script',
    {
      async: '',
      src: 'https://www.googletagmanager.com/gtag/js?id=G-C38FF8YHL3'
    }
  ],
  [
    'script',
    {},
    `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-C38FF8YHL3');`
  ],
  // leaflet
  [
    'link',
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.css'
    }
  ],

  // 字体
  ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
  [
    'link',
    {
      rel: 'preconnect',
      crossorigin: 'anonymous',
      href: 'https://fonts.gstatic.com'
    }
  ],
  [
    'link',
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
    }
  ],
  [
    'link',
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap'
    }
  ]
];
