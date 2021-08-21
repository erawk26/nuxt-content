// import colors from 'vuetify/es5/util/colors'
import path from 'path'
export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    // titleTemplate: '%s - nuxt-content',
    htmlAttrs: {
      lang: 'en',
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lato|Unica+One',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/scss/global.scss',
    path.resolve(
      __dirname,
      'node_modules/vue-multiselect/dist/vue-multiselect.min.css'
    ),
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['@/assets/scss/vuetify-vars.scss'],
    icons: {
      iconfont: 'mdi', // default - only for display purposes
    },
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Playfair Display',
      },
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          // primary: '#263238',
          // primary: '#342a21',
          primary: '#3b8070',
          // accent: '#C67171',
          // secondary: '#26A5B5',
          // success: '#4CAF50',
          // info: '#2196F3',
          // warning: '#FB8C00',
          // error: '#FF5252',
          // primary: '#3b8070'
        },
        light: {
          primary: '#3b8070',
          // accent: '#F44336',
          // secondary: '#757575',
          // accent: '#0277BD',
          // success: '#4CAF50',
          // info: '#2196F3',
          // warning: '#FB8C00',
          // error: '#FF5252',
          // charcoal: '#342a21'
        },
      },
    },
  },

  plugins: [
    { src: '@/plugins/starRating.js', mode: 'client' },
    { src: '@/plugins/youtube.js', mode: 'client' },
    '@/plugins/globalMethods.js',
    '@/plugins/directives.js',
  ],
  styleResources: {
    scss: ['@/assets/scss/_init.scss'], // alternative: scss
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['gsap'],
    extend: (config) => {
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))

      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      config.module.rules.push({
        test: /\.svg$/,
        use: ['babel-loader', 'vue-svg-loader'],
      })
    },
    postcss: {
      plugins: {
        'postcss-import': true,
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true,
        },
      },
    },
  },
}
