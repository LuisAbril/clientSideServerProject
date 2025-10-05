// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  runtimeConfig: {
    BNET_CLIENT_ID: process.env.BNET_CLIENT_ID,
    BNET_CLIENT_SECRET: process.env.BNET_CLIENT_SECRET,
    BNET_REDIRECT_URI: process.env.BNET_REDIRECT_URI,
    // Make them available on server only by default
    public: {
      BNET_CLIENT_ID: process.env.BNET_CLIENT_ID,
      BNET_REDIRECT_URI: process.env.BNET_REDIRECT_URI,
    }
  },
  modules: [
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    // ...other modules
  ],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'es', name: 'Español', file: 'es.json' }
    ]
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'BattleNet Info',
      short_name: 'BattleNet',
      icons: [
        { src: '/favicon.ico', sizes: '64x64 32x32 24x24 16x16', type: 'image/x-icon' }
      ],
      start_url: '/',
      display: 'standalone',
      background_color: '#181a1b',
      theme_color: '#00ffe7'
    }
  }
})