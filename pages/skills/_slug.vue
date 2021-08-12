<template lang="pug">
section.page
  h1 {{ skills[slug] || "Skills" }}
  client-only(placeholder='Loading...' v-if="slug==='index'")
    multiselect.unstyle(
      :options='Object.values(options)',
      v-model='selected',
      :multiple='true',
      track-by='id',
      label='label'
    )
  .eo-flex.col
    project-teaser.my-5(
      v-scrolltrigger='{ tween: animatedScroll}',
      v-for='(item, i) in filteredProjects',
      :key='i',
      :project='item',
      :index='i'
    ) {{ item.title }}

  //- nuxt-content(:document='page')
</template>

<script>
export default {
  components: {
    ProjectTeaser: () => import('@/components/ProjectTeaser'),
    Multiselect: () => import('vue-multiselect'),
  },
  async asyncData({ $content, error, params }) {
    const slug = params.slug || 'index'
    const reportErr = (err) => {
      error({ statusCode: 404, message: 'Page not found', res: err })
    }
    const projects = await $content('projects')
      .where({ slug: { $ne: 'index' } })
      .sortBy('title')
      .fetch()
      .catch(reportErr)
    const kebab = (val) =>
      val
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
    const skills = projects.reduce((skillsObj, currentProject) => {
      currentProject.skills.forEach((skill) => {
        if (!(kebab(skill) in skillsObj)) {
          skillsObj[kebab(skill)] = skill
        }
      })
      return skillsObj
    }, {})
    // const meta = {
    //   title: page.title,
    //   desc: page.description,
    // }
    return {
      slug,
      projects,
      skills,
      // meta,
    }
  },
  data: () => ({
    selected: [],
  }),
  computed: {
    filteredProjects() {
      const filterSelected = this.projects.filter((p) => {
        let bool = false
        this.selected.forEach((selectedSkill) => {
          if (p.skills.includes(selectedSkill.label)) {
            bool = true
          }
        })
        return bool
      })
      const filterSlug = this.projects.filter((p) => {
        const keys = p.skills.map((s) => this.kebab(s))
        const bool = keys.includes(this.slug)
        return bool
      })
      return this.slug && this.slug !== 'index'
        ? filterSlug
        : this.selected.length
        ? filterSelected
        : this.projects
    },
    options() {
      return Object.keys(this.skills).map((k) => ({
        id: k,
        label: this.skills[k],
      }))
    },
  },
  methods: {
    animatedScroll(gsap, scrollCfg) {
      const container = scrollCfg.trigger
      const ele1 = container.querySelector('.cell.alpha')
      const ele2 = container.querySelector('.cell.omega')
      const photoLeft = container.classList.contains('photo-left')
      scrollCfg.start = 'top 80%'
      scrollCfg.end = 'top 80%'
      const tl = gsap.timeline({
        scrollTrigger: scrollCfg,
        ease: 'power2.inOut',
        onComplete: () => {
          container.classList.add('animation-complete')
        },
      })
      tl.fromTo(
        container,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.25,
        }
      )
        .fromTo(
          ele1,
          {
            x: photoLeft ? -200 : 200,
          },
          {
            x: 0,
            duration: 0.5,
          },
          0.2
        )
        .fromTo(
          ele2,
          {
            x: photoLeft ? 200 : -200,
          },
          {
            x: 0,
            duration: 0.5,
          },
          0.2
        )

      // return tl
    },
  },
}
</script>

<style lang="css">
ul.multiselect__content,
ul.multiselect__content li {
  padding: 0;
  margin: 0;
}
</style>
