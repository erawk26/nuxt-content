<template lang="pug">
v-app
  v-app-bar.z-index-100.dont-print(app)
    component(is='Header')
  .main-layout.css-grid-2
    v-main.full-width.px-5.row-1.row-span-1.col-full
      .max-pg-width
        nuxt.component-content
    component.row-2.row-span-1.col-full.dont-print(is='Footer')
</template>

<script>
export default {
  components: {
    Header: () => import('@/components/Header'),
    Footer: () => import('@/components/Footer'),
  },
  data() {
    return {
      scrolled: 'top',
    }
  },
  computed: {},
  watch: {},
  mounted() {
    window.addEventListener('scroll', this.debounce(this.onScroll, 200))
  },
  methods: {
    childRoute(href) {
      return this.$route.path.split('/').includes(href.replace('/', ''))
    },
    onScroll() {
      const threshhold = 100
      if (window.pageYOffset < threshhold) {
        this.scrolled = 'top'
      } else if (
        window.innerHeight + window.pageYOffset + 1 >=
        document.body.offsetHeight
      ) {
        this.scrolled = 'bottom'
      } else {
        this.scrolled = 'middle'
      }
    },
  },
}
</script>

<style lang="scss">
.main-layout {
  grid-template-rows: 1fr 5.5rem;
  // @media (max-width: $menu-bp - 1) {
  //   grid-template-rows: 0px 1fr 13.5rem;
  // }
  height: 100%;
  overflow: hidden;
}
.z-index-100 {
  z-index: 100 !important;
}
.scrolled:not(.top) .navigation-drawer {
  z-index: 100;
  top: -6rem;
  left: 0;
  width: 100%;
  transform: translateY(4.5rem);
  position: fixed;
  transition: all 1s ease;
}
// .scrolled:not(.bottom) footer {
//   z-index: 100;
//   bottom: -60px;
//   left: 0;
//   width: 100%;
//   transform: translateY(-60px);
//   position: fixed;
//   transition: all 1s ease 1s;
// }
</style>
