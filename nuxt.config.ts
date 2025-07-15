// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    'nuxt-charts'
  ],
  runtimeConfig: {
    public: {
      userApiUrl: process.env.USER_API_URL || '',
      dbUrl: process.env.DATABASE_URL
    }
  }
})