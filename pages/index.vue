<template lang="pug">
section.intro.d-flex.flex-column.align-center.justify-center
  v-avatar.headshot.d-block(:size='$vuetify.breakpoint.xsOnly ? "150px" : "210px"')
    media.img-circle.elevation-4(
      v-bind='getMediaBind(page)',
      :aspect-ratio="1"
      :title='$store.state.siteInfo.company.name',
      :alt='`Headshot of ${$store.state.siteInfo.company.name}`'
    )
  v-card.px-5.mx-5.center-text.avatar-padding(
    :color='"blue-grey " + $vuetify.theme.dark ? "darken-5" : "lighten-5"',
    elevation='6',
    :max-width='$vuetify.breakpoint.xsOnly ? "90%" : 400',
    :min-width='200'
  )
    h4.charcoal--text {{ $store.state.siteInfo.company.name }}
    h6.charcoal--text {{ $store.state.siteInfo.company.jobTitle }}
    p.charcoal--text {{ page.description }}
    nuxt-link.material-icons.mb-4(to='/projects')
      v-icon(large) mdi-chevron-down
    //- my-menu.nav-social.menu--social.eo-flex.wrap.center.text-center(
      :menu='cardMenu',
      :hide-text='true')
</template>

<script>
export default {
  components: {
    MyMenu: () => import('~/components/Menu'),
  },
  async asyncData({ $content, params, error }) {
    const slug = 'index'
    const reportErr = (err) => {
      error({ statusCode: 404, message: 'Page not found', res: err })
    }
    const page = await $content(slug).fetch().catch(reportErr)

    const meta = {
      title: page.title,
      desc: page.description,
    }
    return {
      page,
      meta,
    }
  },
  computed: {
    cardMenu() {
      return this.$store.state.menus.footer // .slice(1)
    },
  },
}
</script>
<style lang="scss">
section.intro {
  min-height: 75vh;
  .avatar-padding {
    padding-top: 50px;
  }
  .v-btn i {
    margin-right: 0.25em;
  }
  .nav-social a {
    flex: 0;
  }
  .headshot {
    transform: translateY(60px) scaleX(-1) rotate(8deg);
    z-index: 1;
  }
}
</style>
