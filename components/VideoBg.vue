<template lang="pug">
  section.VideoBg
    //- youtube(v-if="type==='youtube'&&active" ref='video' @loaded="onVideoLoad" :player-vars="ytConfig" :yt-id="ytId" :poster="img||`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`")
    video(v-if="type==='video'" ref='video', :muted='muted', autoplay='', playsinline='', loop='')
      source(v-for='source in sources', :src='source', :type='getMediaType(source)')
    .VideoBg__content
      slot
</template>

<script>
export default {
  components: {
    // youtube: () => import('./Youtube'),
  },
  props: {
    sources: {
      type: Array,
      default: () => [],
    },
    img: {
      type: String,
      default: null,
    },
    ytId: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    active: {
      type: Boolean,
      default: true,
    },
    muted: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      videoRatio: null,
      ytConfig: {
        autoplay: 1, // Auto-play the video on load
        disablekb: 1,
        muted: 1,
        controls: 0, // Hide pause/play buttons in player
        showinfo: 0, // Hide the video title
        modestbranding: 1, // Hide the Youtube Logo
        loop: 1, // Run the video in a loop
        fs: 0, // Hide the full screen button
        autohide: 1, // Hide video controls when playing
        rel: 0,
        enablejsapi: 1,
      },
    }
  },

  mounted() {
    this.setImageUrl()
    this.setContainerHeight()

    if (this.type === 'video') {
      if (this.videoCanPlay()) {
        this.$refs.video.oncanplay = () => {
          if (!this.$refs.video) return

          this.videoRatio =
            this.$refs.video.videoWidth / this.$refs.video.videoHeight
          this.setVideoSize()
          this.$refs.video.style.visibility = 'visible'
        }
      }
      const sources = Array.prototype.slice
        .call(this.$refs.video.querySelectorAll('source'))
        .map((x) => x.attributes.src.value)
        .join(', ')
      this.$refs.video.addEventListener(
        'canplaythrough',
        this.onVideoLoad({ sources })
      )
    }
    window.addEventListener('resize', this.debounce(this.resize, 120))
  },

  beforeDestroy() {
    if (this.type === 'video') {
      this.removeListener()
    }
  },

  methods: {
    removeListener() {
      window.removeEventListener('resize', this.resize)
      this.$refs.video.removeEventListener('canplaythrough', this.onVideoLoad)
    },
    resize() {
      // console.log(`resized window & calc'ed ${new Date()}`)
      this.setContainerHeight()
      if (this.$refs.video && this.$refs.video.canPlayType) {
        this.setVideoSize()
      }
    },
    videoCanPlay() {
      return this.$refs.video.canPlayType
    },
    setImageUrl() {
      if (this.img) {
        this.$el.style.backgroundImage = `url(${this.img})`
      }
    },
    onVideoLoad(evt) {
      const type = evt.ytId ? 'youtube' : 'video'

      this.$emit('loaded', { ...evt, type })
    },
    setContainerHeight() {
      const parentHeight = this.$parent.$el.clientHeight
      if (parentHeight > 0) {
        this.$el.style.height = `${parentHeight}px`
      }
    },

    setVideoSize() {
      let width
      let height
      const containerRatio = this.$el.offsetWidth / this.$el.offsetHeight

      if (containerRatio > this.videoRatio) {
        width = this.$el.offsetWidth
      } else {
        height = this.$el.offsetHeight
      }

      this.$refs.video.style.width = width ? `${width}px` : 'auto'
      this.$refs.video.style.height = height ? `${height}px` : 'auto'
    },

    getMediaType(src) {
      return 'video/' + src.split('.').pop()
    },
  },
}
</script>

<style>
.VideoBg {
  position: relative;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.VideoBg video {
  position: absolute;
  top: 50%;
  left: 50%;
  visibility: hidden;
  transform: translate(-50%, -50%);
}

.VideoBg__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
