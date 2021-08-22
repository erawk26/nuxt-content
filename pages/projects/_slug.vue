<template lang="pug">
section.page(:class="`${project.slug}--page`")
  project(:project="project" :projects="projects" :prev="prev" :next="next")
</template>

<script>
export default {
  components: {
    Project: () => import('~/components/ProjectFull'),
  },
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'index'
    const reportErr = (err) => {
      error({ statusCode: 404, message: 'Page not found', res: err })
    }
    const project = await $content('projects', slug).fetch().catch(reportErr)
    let [prev, next] = await $content('projects')
      .only(['title', 'slug'])
      .where({ slug: { $ne: 'index' } })
      .sortBy('date', 'desc')
      .surround(params.slug)
      .fetch()
      .catch(reportErr)
    const projects = await $content('projects')
      .only(['title', 'slug'])
      .where({ slug: { $ne: 'index' } })
      .sortBy('date', 'desc')
      .fetch()
      .catch(reportErr)

    const meta = {
      title: project.title,
      desc: project.description,
    }
    prev = prev || projects[projects.length - 1]
    next = next || projects[0]
    return {
      project,
      projects,
      prev,
      next,
      meta,
    }
  },
}
</script>
