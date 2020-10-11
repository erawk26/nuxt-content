<template lang="pug">
  v-app
    v-app-bar.z-index-100.dont-print(app)
      header
    .main-layout.css-grid-2
      v-main.full-width.px-5.row-1.row-span-1.col-full
        .max-pg-width
          h1(v-if='error.statusCode === 404')
            | {{ pageNotFound }}
          h1(v-else='')
            | {{ otherError }}
      footer.row-2.row-span-1.col-full.dont-print
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
