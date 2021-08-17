<template lang="pug">
section.page
  h1 {{ page.title }}
  p {{ page.description }}
  nuxt-content(:document='page')
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'index'
    const reportErr = (err) => {
      error({ statusCode: 404, message: 'Page not found', res: err })
    }
    const page = await $content(slug).fetch().catch(reportErr)

    const meta = {
      title: page.title,
      desc: page.description,
    }
    return {
      page,
      meta,
    }
  },
}
</script>
