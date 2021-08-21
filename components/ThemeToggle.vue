<template lang="pug">
span.theme-toggle
  v-tooltip(
    allow-overflow,
    right,
    :position-y='150',
    :position-x='350',
    v-model='showTooltip'
  )
    template(#activator='showTooltip')
      v-btn.dark-btn(
        :aria-label='`set theme to ${getNextColorMode()} mode`',
        link,
        icon,
        @mouseenter='flashTooltip()',
        @click='cycleTheme()'
      )
        v-icon {{ colorMode === "auto" ? "mdi-brightness-auto" : $vuetify.theme.dark ? "mdi-brightness-3" : "mdi-brightness-5" }}
    span {{ colorMode === "auto" ? "Auto" : $vuetify.theme.dark ? "Dark" : "Light" }} Mode
</template>

<script>
export default {
  props: {},
  data: () => ({
    colorMode: 'auto',
    isMini: true,
    showTooltip: false,
    timeout: null,
  }),
  computed: {
    isNight: () => new Date().getHours() < 7 || new Date().getHours() > 17,
  },
  mounted() {
    const storedColorMode = localStorage.getItem('colorMode')
    if (storedColorMode) {
      this.colorMode = storedColorMode
    }
    const bool =
      this.colorMode === 'auto' ? this.isNight : this.colorMode === 'dark'
    this.changeTheme(bool)
  },
  methods: {
    changeTheme(bool) {
      // just change from light to dark, not cycling modes in here
      this.$vuetify.theme.dark =
        !bool === undefined ? !this.$vuetify.theme.dark : bool
      this.flashTooltip()
    },
    flashTooltip(time) {
      time = time || 3000
      this.showTooltip = true
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.showTooltip = false
      }, time)
    },
    getNextColorMode(color = this.colorMode) {
      const arr = ['light', 'dark', 'auto']
      const i = arr.indexOf(color)
      return arr[this.looper(arr, i)]
    },
    cycleTheme() {
      // set colormode var, set theme
      this.colorMode = this.getNextColorMode()
      localStorage.setItem('colorMode', this.colorMode)
      const bool =
        this.colorMode === 'auto' ? this.isNight : this.colorMode === 'dark'
      this.changeTheme(bool)
    },
  },
}
</script>

<style lang="scss">
.theme-toggle i {
  line-height: 0.875 !important;
}
</style>
