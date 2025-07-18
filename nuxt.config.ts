// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  supabase: {
    redirect: false
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/supabase'
  ],
  runtimeConfig: {
    public: {
      userApiUrl: process.env.USER_API_URL || '',
      dbUrl: process.env.DATABASE_URL
    }
  }
})