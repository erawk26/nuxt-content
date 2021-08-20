<template lang="pug">
span
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
    if (this.colorMode === 'auto') {
      // if the color mode is set to auto change the theme based on time of day
      this.changeTheme(this.isNight)
    }
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
      this.colorMode === 'auto'
        ? this.changeTheme(this.isNight)
        : this.colorMode === 'dark'
        ? this.changeTheme(true)
        : this.changeTheme(false)
    },
  },
}
</script>

<style lang="scss" scoped></style>
