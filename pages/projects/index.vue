<template lang="pug">
section.page
  h1 {{ project.title }}
  nuxt-content(:document='project')
  v-row(justify='center')
    v-expansion-panels.mb-1(:value='openedPanel')
      v-expansion-panel
        v-expansion-panel-header
          subheading.filter Filters
        v-expansion-panel-content(eager)
          skills-filter(
            :projects='projects',
            :slug='project.slug',
            @filterchange='(evt) => { filteredProjects = evt; }'
          )
    v-container.pa-0(fluid)
      v-row(dense)
        v-col.col-12.col-md-6(
          v-for='(item, i) in filteredProjects || projects',
          :key='project.slug + i',
          align-self='start'
        )
          project-teaser(:project='item', :ref='project.slug')
</template>

<script>
export default {
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
  data() {
    return {
      filteredProjects: null,
      openedPanel: null,
    }
  },
  mounted() {
    if (this.$route.query.skills && this.$route.query.skills.length) {
      this.openedPanel = 0
    }
  },
  methods: {
    closeAllPanels() {
      this.openedPanel = []
    },
    openPanel(index) {
      this.openedPanel.push(index)
    },
    closePanel(index) {
      this.openedPanel.splice(index, 1)
    },
  },
  // beforeMount() {
  //   this.skillQuery = this.$route.query.skills
  // },
}
</script>
<style lang="scss">
.match-select-wrap .v-input {
  flex: 0 0 5rem;
  padding: 0 1rem;
  margin-top: 0;
  // margin: 1rem 1rem 0 1rem;
  .v-input__slot {
    margin-bottom: 0;
  }
  .v-text-field__details {
    height: 0;
    min-height: 0;
  }
}
.v-expansion-panels button.v-expansion-panel-header {
  padding-top: 10px;
  padding-bottom: 10px;
}

.filter.subheading {
  margin: 0;
}
</style>
<style scoped>
.row--dense > .col,
.row--dense > [class*='col-'] {
  padding: 7.5px;
}
.row--dense {
  margin-right: -7.5px;
  margin-left: -7.5px;
}
</style>
