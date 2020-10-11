<template lang="pug">
  figure.full-width.rel.media(ref="media" :class="type")
    v-img(v-if="type=='img'" @load="e=>onMediaLoad({src:e,type:'image'})" :aspect-ratio="aspectRatio" :alt="alt||title" :title="title||alt" :lazy-src="lazyUrl" :src="src" max-width="100%" max-height="100%" background-position="center")
    .video-wrap.full-width.rel.overflow(v-else ref="video-wrap" :style="{ height:0,paddingBottom: (1 / aspectRatio) * 100 + '%' }" )
      videobg(:type="type" :sources="sources" :yt-id="ytId" :active="active" :img="poster" @loaded="onMediaLoad")
</template>
<script>
// TODO add load event to videoBG and use v-img as fallback
export default {
  name: 'Media',
  components: {
    videobg: () => import('@/components/VideoBg'),
  },
  props: {
    src: { type: String, default: null },
    ytId: { type: String, default: null },
    sources: { type: Array, default: () => [] },
    poster: { type: String, default: null },
    lazyUrl: { type: String, default: null },
    type: { type: String, default: 'img' },
    alt: { type: String, default: null },
    aspectRatio: { type: Number, default: 1.77 },
    title: { type: String, default: null },
    active: { type: Boolean, default: true },
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {},
  watch: {},
  mounted() {
    // this.checkMedia(this.type)
    // console.log("Media Type " + this.mediaType + " mounted.");
  },
  beforeUpdate() {
    // this.loading = true
    // console.log("Media Type " + this.mediaType + " is about to update");
  },
  updated() {
    // this.checkMedia(this.type)
    // console.log("Media Type " + this.mediaType + " updated.");
  },
  methods: {
    onMediaLoad(data) {
      // console.log(
      //   data.type === 'image' ? 'Image Loaded' : 'Playing ' + data.type,
      //   data
      // )
      this.loading = false
      this.$emit('loaded', data)
    },
  },
}
</script>
<style lang="scss">
.VideoBg {
  // width: 100%;
  // height: 100%;
  // top: 0;
  // left: 0;
  // position: absolute;
}
</style>
