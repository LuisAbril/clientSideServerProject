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
    // ...other modules
  ],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'es', name: 'Español', file: 'es.json' }
    ]
  }
  
})