<template lang="pug">
v-container(v-on:keyup='onKeyUp')
  v-card(v-if='project.title')
    media.min-media-height(
      v-if='project.media && project.media.length === 1',
      v-bind='getMediaBind(project)'
    )
    v-carousel(
      v-else-if='project.media.length > 1',
      height='auto',
      hide-delimiter-background,
      show-arrows-on-hover,
      @change='onCarouselChange'
    )
      v-carousel-item(v-for='(item, i) in project.media', tag='div', :key='i')
        v-sheet(height='100%')
          v-row.fill-height(align='center', justify='center')
            media.min-media-height(
              v-bind='getMediaBind(project, i)',
              :active='i === activeSlide'
            )
  .title-wrapper.d-flex.align-end.justify-space-between
    .cell.eo-flex.a-center
      .display-2
        span.inline {{ project.title }}
        template(v-for='link in project.links')
          my-link.ml-2(
            :text='link.text',
            :icon='link.icon || "mdi-link"',
            :href='link.href',
            :target='link.target',
            :title='link.title',
            hideText
          )
      subheading.mt-2 {{ project.client }}
    .counter.flex-shrink-0 {{ active + 1 }} / {{ keys.length }}
      nuxt-link(
        :to='"/projects/" + next.slug',
        :title='next.title',
        aria-label='View Next Project'
      )
        v-icon mdi-chevron-right
  v-divider
  .eo-flex.wrap.j-center.a-start
    .cell.alpha
      p {{ project.description }}
      p
        | I worked on this project&#32;
        time-since(:date='project.date')
        | &#32;ago
      slot(name='below-body')
    .cell.omega.eo-flex.wrap.skills(v-if='project.skills')
      p.full-width.mb-2 Skills:
      v-chip.mr-1.mb-1(
        small,
        :to='"/projects/?skills=" + kebab(skill)',
        ripple,
        v-for='(skill, i) in project.skills',
        :key='"skill-" + i + 1'
      ) {{ skill }}
</template>

<script>
export default {
  components: {
    MyLink: () => import('~/components/Link'),
  },
  props: {
    project: {
      type: Object,
      default: () => {},
    },
    prev: {
      type: Object,
      default: () => ({ path: null }),
    },
    next: {
      type: Object,
      default: () => ({ path: null }),
    },
    projects: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      keys: this.projects.map((x) => x.slug),
      active: this.projects.map((x) => x.slug).indexOf(this.project.slug),
      activeSlide: null,
    }
  },
  mounted() {
    this.$el.querySelector('a,button').focus()
  },
  methods: {
    onKeyUp(evt) {
      let slug = null
      switch (evt.code) {
        case 'ArrowLeft':
          slug = this.prev.slug
          break
        case 'ArrowUp':
          slug = this.prev.slug
          break
        case 'ArrowRight':
          slug = this.next.slug
          break
        case 'ArrowDown':
          slug = this.next.slug
          break
      }
      if (slug) {
        this.$router.push({ path: /projects/ + slug })
      }
    },
    onCarouselChange(evt) {
      this.activeSlide = evt
      // console.log(evt)
    },
  },
}
</script>

<style lang="scss" scoped>
.skills {
  a {
    display: block;
    font-size: 0.8em;
  }
  h6 {
    width: 100%;
  }
}
.title-wrapper {
  margin-top: 2.5rem;
  .display-2 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .cell {
    flex-direction: column;
    align-items: flex-start;
  }
}
.counter {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  font-family: $heading-font-family;

  i {
    font-size: 4rem;
    &::before {
      height: 1.12em;
    }
  }
}
.v-card {
  width: 100%;
}
.v-btn i {
  margin-right: 0.25em;
}
.alpha {
  flex: 2;
  margin-right: 2rem;
  @media (max-width: 599px) {
    min-width: 100%;
    margin-right: 0;
  }
}
.omega {
  flex: 1;
}
.inline {
  display: inline;
}
</style>
<style lang="scss">
.min-media-height > * {
  min-height: 32rem;
}
.v-window__prev,
.v-window__next {
  i {
    position: relative;
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
