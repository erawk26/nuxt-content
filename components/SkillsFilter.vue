<template lang="pug">
client-only(placeholder='Loading...', v-if='slug === "index"')
  vue-multiselect.unstyle(
    :options='Object.values(options)',
    v-model='selected',
    :multiple='true',
    track-by='id',
    label='label',
    @input='onChange'
  )
</template>

<script>
export default {
  components: {
    VueMultiselect: () => import('vue-multiselect'),
  },
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
    slug: {
      type: String,
      default: 'index',
    },
  },
  data: () => ({
    selected: [],
  }),
  computed: {
    skills() {
      return this.projects.reduce((skillsObj, currentProject) => {
        currentProject.skills.forEach((skill) => {
          if (!(this.kebab(skill) in skillsObj)) {
            skillsObj[this.kebab(skill)] = skill
          }
        })
        return skillsObj
      }, {})
    },
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
    onChange() {
      this.$emit('filterchange', this.filteredProjects)
    },
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search)
    const skillQuery = urlParams.get('skills')
    if (skillQuery) {
      this.selected = [this.options.find((option) => option.id === skillQuery)]
      this.onChange()
    }
  },
}
</script>

<style lang="scss" scoped></style>
