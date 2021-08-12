<template lang="pug">
section.page
  h1 {{ project.title }}
  .eo-flex.col
    project-teaser.my-5(
      v-scrolltrigger='{ tween: animatedScroll}',
      v-for='(item, i) in projects',
      :key='i',
      :project='item',
      :ref='project.slug',
      :index='i'
    )
  nuxt-content(:document='project')
</template>

<script>
export default {
  components: {
    ProjectTeaser: () => import('@/components/ProjectTeaser'),
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

      return tl
    },
  },
}
</script>
<style lang="scss" scoped></style>
