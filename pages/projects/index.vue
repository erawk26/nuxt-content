<template lang="pug">
section.page
  h1 {{ project.title }}
  nuxt-content(:document='project')
  skills-filter(
    :projects='projects',
    :slug='project.slug',
    @filterchange='(evt) => { filteredProjects = evt; }'
  )
  v-container.pa-0(fluid)
    v-row
      v-col.col-12.col-md-6(
        v-for='(item, i) in filteredProjects || projects',
        :key='i',
        align-self='start'
      )
        project-teaser(
          :project='item',
          :ref='project.slug',
          :orientation='i % 2 === 0 ? "left" : "right"'
        )
</template>

<script>
export default {
  data() {
    return {
      filteredProjects: null,
    }
  },
  components: {
    ProjectTeaser: () => import('@/components/ProjectTeaser'),
    SkillsFilter: () => import('@/components/SkillsFilter'),
  },
  async asyncData({ $content, params, error }) {
    const slug = 'index'
    const reportErr = (err) => {
      error({ statusCode: 404, message: 'Page not found', res: err })
    }
    const project = await $content('projects', slug).fetch().catch(reportErr)
    const projects = await $content('projects')
      .where({ slug: { $ne: 'index' } })
      .sortBy('date', 'desc')
      .fetch()
      .catch(reportErr)

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
  methods: {},
}
</script>
<style lang="scss" scoped></style>
