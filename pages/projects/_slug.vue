<template lang="pug">
section.page
  h1 {{ project.title }}
  p {{ project.description }}
  div(v-for='item in projects', :key='item.title')
    | {{ item.title }}
  nuxt-content(:document='project')
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'index'
    const reportErr = (err) => {
      console.log(err)
      error({ statusCode: 404, message: 'Page not found', res: err })
    }
    const project = await $content('projects', slug).fetch().catch(reportErr)
    const projects = await $content('projects').fetch().catch(reportErr)

    const meta = {
      title: project.title,
      desc: project.description,
    }
    return {
      project,
      projects,
      meta,
    }
  },
}
</script>
