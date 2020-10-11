import Vue from 'vue'
Vue.mixin({
  methods: {
    looper(arr, index, dir = 1) {
      // loop through the pages
      const len = arr.length
      return (index + (dir % len) + len) % len
    },

    debounce(func, wait, immediate) {
      let timeout
      return function () {
        const context = this
        const args = arguments
        const later = function () {
          timeout = null
          if (!immediate) func.apply(context, args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
      }
    },
    getMediaBind(data, i) {
      if (typeof i === 'undefined') {
        i = 0
      }
      const media = data.media[i]
      const obj = {
        aspectRatio: data.aspectRatio === undefined ? 1.77 : data.aspectRatio,
        lazyUrl: media.lazyUrl || null,
        ytId: media.ytId || null,
        sources: [],
        type: media.type,
        alt: media.alt || media.type + ' of ' + data.title,
        title: media.title || media.type + ' of ' + data.title,
      }
      if (media.type === 'video') {
        obj.sources = media.sources.map((file) =>
          require(`~/assets/video/${file}`)
        )
        if (media.poster) {
          obj.poster = `~/assets/video/${media.poster}`
        }
      }
      if (media.src) {
        obj.src = require(`~/assets/img/${media.src}`)
      }
      return obj
    },
    onHover(ref, bool) {
      if (bool) {
        this.$refs[ref][0].enter()
      } else {
        this.$refs[ref][0].exit()
      }
    },
    kebab: (val) =>
      val
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-'),
  },
})
