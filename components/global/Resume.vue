<template lang="pug">
.resume.my-5
  .obtions.mb3.eo-flex.a-center.j-end.dont-print
    my-link.ml-2.mb-2(
      :hide-text='true',
      icon='mdi-file-pdf-box',
      href='./ErikOlsen_Resume_nuxt.pdf',
      text='View Pdf'
    )
    my-link.ml-2.mb-2(
      :hide-text='true',
      icon='mdi-download',
      href='./ErikOlsen_Resume_nuxt.pdf',
      text='Download',
      download
    )
  v-divider.my2
  .document.css-grid-2
    .top-block.eo-flex.j-center.a-center.col-left.row-1.row-span-1.pt-3
      .ma-4
        headshot-svg.headshot
      span.content
        .uc.ma-0
          .fname {{ resume.fname }}
          .lname {{ resume.lname }}
        .jobtitle.uc.mt-2 {{ resume.title }}
    .eo-flex.pa-0.col.a-stretch.col-left.row-2.row-span-1
      .skill.pl-4.eo-flex.rel(
        v-for='(rating, name) in resume.skills',
        :key='name',
        :title='"Experience Level: " + rating'
      )
        .name.my-2.flex-grow-1.all-caps {{ name }}
        client-only(placeholder='Loading...')
          star-rating(
            :rating='rating',
            rtl,
            read-only,
            :increment='0.25',
            :star-size='20',
            :show-rating='false'
          )
    .contact-info.pl-4.eo-flex.col.a-stretch.col-left.row-3.row-span-1
      h3.uc Get in Touch
      .css-grid-2.content
        .row-1.col-left mobile
        a.row-1.col-right.block.unstyle(:href='resume.mobile.url') {{ resume.mobile.label }}
        .row-2.col-left email
        a.row-2.col-right.block.unstyle(:href='resume.email.url') {{ resume.email.label }}
        .row-3.col-left website
        a.row-3.col-right.block.unstyle(:href='resume.website.url') {{ resume.website.label }}
        .row-4.col-left linkedin
        a.row-4.col-right.block.unstyle(:href='resume.linkedin.url') {{ resume.linkedin.label }}
    .eo-flex.col.a-stretch.col-right.row-1.row-span-3
      h3.uc.my-3
        v-icon(:size='40', :left='true') mdi-history
        | Experience
      .eo-flex.wrap(v-for='exp in resume.experience', :key='exp.company')
        .heading.uc.flex-shrink-1.ma-0 {{ exp.company }}
        .dates.eo-flex.j-end.ra.flex-grow-1.flex-shrink-1 {{ formatDate(exp.start) }}&nbsp;-&nbsp;{{ formatDate(exp.end) }}
        .subtitle.bold.caps.ma-0.full-width {{ exp.position }}
        p.mt-1.full-width.block {{ exp.desc }}
      h3.uc.my-3.group
        v-icon(:size='40', :left='true') mdi-school
        | Education
      div(v-for='edu in resume.education', :key='edu.orginization')
        .heading.uc.ma-0 {{ edu.orginization }}
        .subtitle.bold.caps {{ edu.category }}
        p.mt-1.full-width.block {{ edu.desc }}
</template>

<script>
import { format, parseISO } from 'date-fns'
export default {
  head() {
    return {
      title: `EO Portfolio | ${this.meta.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta.desc,
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Fjalla+One&family=Open+Sans&display=swap',
        },
      ],
    }
  },
  // return +to.query.page < +from.query.page ? 'slide-up' : 'slide-down'
  components: {
    HeadshotSvg: () => import('~/assets/img/headshot.svg'),
    MyMenu: () => import('~/components/Menu.vue'),
    MyLink: () => import('~/components/Link.vue'),
  },
  data() {
    return {
      meta: { title: '', desc: '' },
      page: null,
      resume: this.$store.state.siteInfo.resume,
    }
  },
  transition: 'slide-down',
  computed: {},
  methods: {
    formatDate: (str) =>
      str !== 'Present'
        ? format(parseISO(str + 'T00:00:30'), `LLL yy`).replace(' ', " '")
        : str,
  },
}
</script>

<style lang="scss">
.resume {
  > .css-grid-2 {
    border: 1px solid #ccc;
    grid-column-gap: 10px;
    > .col-left {
      border-right: 1px solid #ccc;
    }
    > .col-right {
      padding-right: 2rem;
    }
    @media (max-width: $bp-xs - 1) {
      font-size: 0.815em;
    }
  }
  $rBodyText: 'Open Sans', sans-serif;
  $rHeadingText: 'Fjalla One', sans-serif;
  font-family: $rBodyText;
  .top-block {
    .fname {
      font-family: $rHeadingText;
      font-size: 5.2rem;
      letter-spacing: 1rem;
      line-height: 1.2;
    }
    .lname {
      font-family: $rBodyText;
      font-size: 3.6rem;
      letter-spacing: 0.2rem;
      line-height: 1;
    }
    .jobtitle {
      font-size: 1.4rem;
      letter-spacing: 0.1rem;
      line-height: 1.3;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: $rHeadingText;
  }

  .heading {
    font-size: 2.4rem;
    @media (max-width: $bp-xs - 1) {
      font-size: 2rem;
    }
    letter-spacing: 0;
    line-height: 1;
  }
  .theme--light & {
    $fontColor: $black;
    a.unstyle {
      color: $fontColor;
      &:hover,
      &:visited,
      &:active,
      &:focus {
        color: $fontColor;
      }
    }

    .subtitle {
      color: rgba($fontColor, 0.5);
    }
    .contact-info {
      background: #eee;
    }
  }
  .theme--dark & {
    $fontColor: $white;
    a.unstyle {
      color: $fontColor;
      &:hover,
      &:visited,
      &:active,
      &:focus {
        color: $fontColor;
      }
    }
    .headshot path {
      fill: white;
    }
    .subtitle {
      color: rgba($fontColor, 0.5);
    }
    .contact-info {
      background: rgba(#eee, 0.2);
    }
  }
  // @include set-max-width(76.8rem);
  .headshot {
    width: 85px;
    path {
      transition: fill 300ms ease;
    }
  }
  .skill {
    flex: 1;
    border-top: 1px solid #ccc;
    border-left: none;
    border-right: none;
    padding-right: 11rem;
    .name {
      font-size: 2.4rem;
      @media (max-width: $bp-xs - 1) {
        font-size: 2rem;
      }
    }
    &:last-child {
      border-bottom: 1px solid #ccc;
    }
    // border-left: 2px dashed #999;
  }

  .vue-star-rating {
    top: 50%;
    right: 0.5rem;
    width: 10rem;
    transform: translateY(-0.5rem);
    position: absolute;
    z-index: 2;
  }
  .contact-info {
    .content {
      grid-column-gap: 40px;
      grid-template-columns: auto minmax(0, 1fr);
    }
  }
  @media screen and(max-width: 900px) {
    > .css-grid-2 {
      display: flex;
      flex-direction: column;
      .col-right.row-1 {
        order: 1;
      }
      .top-block {
        border-bottom: 1px solid #ccc;
      }
      > .col-left {
        border-right: none;
        &.row-1 {
          order: 0;
        }
        &.row-2 {
          order: 2;
        }
        &.row-3 {
          order: 3;
        }
      }
    }
  }
}
@media print {
  .dont-print {
    display: none !important;
  }
  .document {
    margin: 0 !important;
    max-width: 100% !important;
    width: 100% !important;
  }
}
</style>
