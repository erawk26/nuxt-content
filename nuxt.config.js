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
      // {
      //   rel: 'stylesheet',
      //   href: 'https://fonts.googleapis.com/css?family=Lato|Unica+One',
      // },
    ],
  },

  css: [
    '@/assets/scss/global.scss',
    path.resolve(
      __dirname,
      'node_modules/vue-multiselect/dist/vue-multiselect.min.css'
    ),
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
    '@nuxtjs/style-resources',
    '@nuxtjs/vuetify',
    'nuxt-font-loader',
  ],

  modules: ['@nuxt/content'],

  content: {},
  fontLoader: {
    url: {
      local: '/fonts/font-face.css',
      google:
        'https://fonts.googleapis.com/css2?family=Fjalla+One&family=Open+Sans&display=swap',
      custom:
        'https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css',
    },
  },
  vuetify: {
    customVariables: ['@/assets/scss/vuetify-vars.scss'],
    treeShake: true,
    defaultAssets: false,
    icons: {
      iconfont: 'mdi', // default - only for display purposes
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
  googleAnalytics: {
    id: 'UA-115116018-1',
  },
  plugins: [
    { src: '@/plugins/starRating.js', mode: 'client' },
    // { src: '@/plugins/youtube.js', mode: 'client' },
    '@/plugins/globalMethods.js',
    '@/plugins/directives.js',
  ],
  styleResources: {
    scss: ['@/assets/scss/_init.scss'], // alternative: scss
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/resume',
        components: {
          default: resolve(__dirname, 'pages/_slug.vue'), // or routes[index].component
          resume: resolve(__dirname, 'components/Resume.vue'),
        },
        chunkNames: {
          resume: 'components',
        },
      })

      routes.push({
        path: '/contact',
        components: {
          default: resolve(__dirname, 'pages/_slug.vue'), // or routes[index].component
          contact: resolve(__dirname, 'components/Contact.vue'),
        },
        chunkNames: {
          contact: 'components',
        },
      })
    },
  },
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
        autoprefixer: {
          grid: true,
        },
      },
    },
  },
}
