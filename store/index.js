import { company } from '~/site.info.js'
import resume from '~/assets/resumeData'
export const state = () => ({
  siteInfo: {
    company,
    resume,
  },
  menus: {
    main: [
      {
        external: false,
        icon: 'mdi-home',
        title: 'Intro',
        to: '/',
      },
      {
        external: false,
        icon: 'mdi-briefcase',
        title: 'Projects',
        to: '/projects',
      },
      {
        external: false,
        icon: 'mdi-email-outline',
        title: 'Contact',
        to: '/contact',
      },
      {
        external: false,
        icon: 'mdi-file-pdf-box',
        title: 'Resume',
        to: '/resume',
      },
    ],
    footer: [
      {
        external: false,
        icon: 'mdi-email-outline',
        to: '/contact',
        title: company.email,
      },
      {
        external: true,
        icon: 'mdi-linkedin',
        href: `https://www.linkedin.com/in/${company.linkedin}`,
        title: 'LinkedIn',
      },
      {
        external: true,
        icon: 'mdi-facebook',
        href: `https://www.facebook.com/${company.facebook}`,
        title: 'FaceBook',
      },
      {
        external: true,
        icon: 'mdi-twitter',
        href: `https://twitter.com/${company.twitter}`,
        title: 'Twitter',
      },
      {
        external: true,
        icon: 'mdi-instagram',
        href: `https://www.instagram.com/${company.instagram}`,
        title: 'Instagram',
      },
    ],
  },
})

export const mutations = {
  SET_STATE(state, payload) {
    state[payload.key] = payload.data
  },
  ADD_SUBMENU(state, payload) {
    const i = state.menus.main.map((x) => x.to).indexOf(payload.key)
    state.menus.main[i].submenu = payload.menu.map((x) => ({
      external: false,
      icon: null,
      title: x.title,
      to: payload.key + '/' + x.slug,
    }))
  },
}

// const kebab = (val) =>
//   val
//     .toLowerCase()
//     .replace(/[^\w ]+/g, '')
//     .replace(/ +/g, '-')

// export const actions = {
//   async nuxtServerInit({ commit }) {
//     const projects = await this.$content('projects')
//       .where({ slug: { $ne: 'index' } })
//       .sortBy('title')
//       .fetch()
//       .catch((err) => {
//         // eslint-disable-next-line no-console
//         console.log({ err, statusCode: 404, message: 'Project not found' })
//       })
//     const pages = await this.$content()
//       // .where({ slug: { $ne: 'index' } })
//       .sortBy('title')
//       .fetch()
//       .catch((err) => {
//         // eslint-disable-next-line no-console
//         console.log({ err, statusCode: 404, message: 'Page not found' })
//       })
//     const skills = projects.reduce((skillsObj, currentProject) => {
//       currentProject.skills.forEach((skill) => {
//         if (!(kebab(skill) in skillsObj)) {
//           skillsObj[kebab(skill)] = skill
//         }
//       })
//       return skillsObj
//     }, {})
//     this.commit('SET_STATE', {
//       key: 'cmsData',
//       data: { projects, pages, skills },
//     })
//   },
// }
