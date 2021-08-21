<template lang="pug">
div
  .match-select-wrap.eo-flex.a-center.mb-3
    | Match projects containing
    v-select(v-model='skillOperator', :items='["any", "all"]')
    | of the selected skills
  client-only(placeholder='Loading...', v-if='slug === "index"')
    vue-multiselect.unstyle(
      :options='Object.values(options)',
      placeholder='Filter Projects by Skill',
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
    skillOperator: 'any',
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
        if (this.skillOperator === 'any') {
          // match projects that contain ANY of the skills
          let bool = false
          this.selected.forEach((selectedSkill) => {
            if (p.skills.includes(selectedSkill.label)) {
              bool = true
            }
          })
          return bool
        } else {
          // match projects that contain ALL of the skills
          let bool = true
          this.selected.forEach((selectedSkill) => {
            if (!p.skills.includes(selectedSkill.label)) {
              bool = false
            }
          })
          return bool
        }
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
      return Object.keys(this.skills)
        .sort()
        .map((k) => ({
          id: k,
          label: this.skills[k],
        }))
    },
  },
  watch: {
    skillOperator(newValue, oldValue) {
      this.onChange()
    },
  },
  mounted() {
    this.getQuery()
  },
  methods: {
    onChange(evt) {
      this.setQuery()
      this.$emit('filterchange', this.filteredProjects)
    },
    setQuery() {
      const skills = this.selected.map((s) => s.id).join(',')
      if (this.selected.length) {
        const query = {
          ...this.$route.query,
          skills,
          match: this.skillOperator,
        }
        this.$router.push({ ...this.$route, query })
      } else {
        this.$router.push(this.$route.path)
      }
    },
    getQuery() {
      const { skills, match } = this.$route.query
      if (skills) {
        this.selected = this.options.filter((option) =>
          skills.split(',').includes(option.id)
        )
      }
      if (match) {
        this.skillOperator = match
      }
    },
  },
}
</script>

<style lang="scss"></style>
