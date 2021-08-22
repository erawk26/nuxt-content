<template lang="pug">
v-card.mx-auto.px-4.py-3
  .eo-flex.wrap.j-space-b.top-info-wrap
    .client-project.ml-3.mt-2
      h3 {{ project.title }}
      h4.mb-0 {{ project.client }}
    small.ml-3.mt-2.time-since
      time-since(:date='project.date')
      | &nbsp;ago
  v-card-actions.actions.mt-3.pa-0
    v-btn(text, rounded, outlined, small, :to='project.path')
      | View Project
    v-spacer
    v-btn(text, rounded, small, @click='show = !show')
      | skills
      v-icon {{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}
  v-expand-transition
    div(v-show='show')
      v-divider.mt-3.mb-2
      v-card-text.pa-0
        .skill-wrap.flex-grow.flex-shrink.overflow
          ul.unstyle
            li.ma-1(v-for='(skill, i) in project.skills', :key='i') {{ skill }}
</template>
<script>
export default {
  props: {
    // direction: { type: Number, default: 0 },
    // hover: { type: Boolean, default: false },
    project: {
      type: Object,
      default: () => ({}),
    },
    orientation: {
      type: String,
      default: 'left',
    },
  },
  data() {
    return {
      show: false,
      hover: false,
    }
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
  },
}
</script>
<style lang="scss" scoped="true">
.actions {
  font-family: $heading-font-family;
  .v-btn {
    font-weight: normal;
    font-size: 1.4rem;
    line-height: 1;
    &.v-size--small {
      height: auto;
      min-height: 2.7rem;
      i.mdi::before {
        position: relative;
        top: -1px;
      }
    }
  }
  .spacer + .v-btn {
    padding-right: 0.3rem;
  }
}
h3,
h4 {
  font-weight: 500;
  margin-top: 0;
  line-height: 1.2;
}
h4 {
  font-size: 1.8rem;
}
h3 {
  font-size: 2.4rem;
}
.top-info-wrap {
  margin: -8px 0 0 -12px;
}
.skill-wrap ul {
  column-count: 2;
  li {
    font-size: 1.4rem;
    line-height: 1.4;
  }
}
</style>
