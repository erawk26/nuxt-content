<template lang="pug">
nuxt-link.flip-card.d-flex.flex-wrap.align-start.rel.ar(
  :to='"/projects/" + project.slug',
  :class='$vuetify.breakpoint.smAndUp ? "seven-five" : "square"'
)
  article
    v-card.card-front.abs-center.eo-flex.col.center(
      ripple,
      :elevation='hover ? 5 : 10'
    )
      media(v-if='project.media', v-bind='getMediaBind(project)')
      .content.la.uc.full-width
        div {{ project.title }}
        small {{ project.client }}
    v-card.card-back.abs-center(ripple, :elevation='hover ? 5 : 10')
      .content.eo-flex.col.fill.dk-green.la.pa-5.full-height
        subheading.mt-0.underline Skills:
        ul.skill-wrap.unstyle.eo-flex.col.wrap.full-height
          li.ma-1(v-for='(skill, i) in project.skills') {{ skill }}
</template>
<script>
import { gsap } from 'gsap'
export default {
  props: {
    // direction: { type: Number, default: 0 },
    // hover: { type: Boolean, default: false },
    project: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      hover: false,
    }
  },
  computed: {},
  watch: {
    hover(newVal) {
      if (newVal) {
        this.animation(1)
      } else {
        this.animation(-1)
      }
    },
  },
  mounted() {
    gsap.set(this.$el.querySelector('.card-front'), { rotationY: 0 })
    gsap.set(this.$el.querySelector('.card-back'), { rotationY: -180 })
  },
  methods: {
    enter() {
      this.hover = true
      this.$emit('enter')
    },
    exit() {
      this.hover = false
      this.$emit('exit')
    },
    animation(dir) {
      const frontRotation = dir > 0 ? 180 : 0
      const backRotation = dir > 0 ? 0 : -180
      gsap.to(this.$el.querySelector('.card-front'), {
        rotationY: frontRotation,
        duration: 1,
      })
      gsap.to(this.$el.querySelector('.card-back'), {
        rotationY: backRotation,
        duration: 1,
      })
    },
  },
}
</script>
<style lang="scss">
/// FLIP ANIMATION STYLING GOES UNDER HERE ///
.flip-card article {
  .img {
    width: 100%;
    flex: 1 0 calc(100% - 55px);
  }
  overflow: visible;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    &:before {
      position: absolute;
      width: 100%;
      height: 100%;
      content: '';
      top: 0;
      left: 0;
      z-index: 0;
    }
  }
  .card-front {
    .v-image {
      height: 100%;
    }
  }
  .card-back {
    .content {
      .subheading {
        flex-grow: 1;
        flex-shrink: 0;
      }
      > ul {
        flex: 1;
      }
    }
  }
}
.skill-wrap {
  padding: 3rem;
  display: flex;
  flex-wrap: wrap;
  span {
    text-align: left;
    flex: 1 1 49.5%;
    min-width: 49.5%;
    max-width: 49.5%;
    padding: 0.5rem 1rem;
  }
}
</style>
